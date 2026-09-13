/* ============================================================
   THREE.JS GAME GALLERY — AMIX
   ネオンアーケード3D演出層。

   拡張方法：index.html に <article class="game"> を1つ追加するだけ。
   このスクリプトがDOMを読み取り、3D筐体・カメラ経路・ネオン色を
   自動生成する。JS側の編集は不要。
   （アクセント色は article の --c1 / --c2 カスタムプロパティから取得）

   依存：Three.js r185（/tl/common/libs/three/r185/ · importmapで解決）
   ============================================================ */

import * as THREE from 'three';
// ポストプロセス（ネオンのにじみ発光）。すべて common の r185 と同一リリース由来
import { EffectComposer } from '../../common/libs/three/r185/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from '../../common/libs/three/r185/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from '../../common/libs/three/r185/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from '../../common/libs/three/r185/examples/jsm/postprocessing/OutputPass.js';

const doc = document.documentElement;
const canvas = document.getElementById('gl');
const loaderEl = document.getElementById('loader');
const loaderBar = document.getElementById('loaderBar');
const toggleBtn = document.getElementById('glToggle');

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = matchMedia('(max-width: 760px)').matches;

/* ---------- WebGL可否とモード決定 ---------- */

function webglAvailable() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) {
    return false;
  }
}

const glCapable = webglAvailable();
const stored = sessionStorage.getItem('wg3_gl'); // 'on' | 'off' | null
let glOn = glCapable && stored !== 'off' && !(reducedMotion && stored !== 'on');

function applyModeClass() {
  doc.classList.toggle('gl-on', glOn);
  doc.classList.toggle('no-gl', !glOn);
  if (toggleBtn) {
    toggleBtn.hidden = !glCapable;
    toggleBtn.setAttribute('aria-pressed', String(glOn));
    toggleBtn.querySelector('span').textContent = glOn ? 'ON' : 'OFF';
  }
}
applyModeClass();
if (!glOn && loaderEl) loaderEl.classList.add('done');

// ローダーの文字はフォントが揃ってからフェードイン（FOUT隠し）。
// 読み込みが遅い場合も1.2秒で必ず表示する。
if (glOn && loaderEl) {
  const showInner = () => loaderEl.classList.add('fonts-in');
  if (document.fonts && document.fonts.load) {
    Promise.all([
      document.fonts.load('800 40px Outfit', 'AMIX'),
      document.fonts.load('700 24px Orbitron', 'THREE.JS GAME GALLERY'),
      document.fonts.load('12px DotGothic16', 'INSERT COIN')
    ]).then(showInner, showInner);
    setTimeout(showInner, 1200);
  } else {
    showInner();
  }
}

/* ---------- スクロール進捗バー（GLの有無に関わらず動く） ---------- */

const progress = document.createElement('div');
progress.className = 'progress';
progress.setAttribute('aria-hidden', 'true');
document.body.appendChild(progress);

let progressTicking = false;
function updateProgress() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const p = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
  progress.style.transform = `scaleX(${p})`;
  progressTicking = false;
}
addEventListener('scroll', () => {
  if (!progressTicking) {
    progressTicking = true;
    requestAnimationFrame(updateProgress);
  }
}, { passive: true });
updateProgress();

/* ---------- DOMからゲーム情報を収集（拡張ポイント） ---------- */

function collectGames() {
  return [...document.querySelectorAll('article.game')].map((el) => {
    const cs = getComputedStyle(el);
    const img = el.querySelector('.game-thumb img');
    const link = el.querySelector('.game-play');
    const titleNode = el.querySelector('.game-title');
    // .game-title の直下テキスト（subを除いた英字タイトル）
    let title = '';
    for (const n of titleNode.childNodes) {
      if (n.nodeType === Node.TEXT_NODE) title += n.textContent;
    }
    return {
      el,
      id: el.id,
      title: title.trim() || el.id.toUpperCase(),
      c1: cs.getPropertyValue('--c1').trim() || '#64d7ff',
      c2: cs.getPropertyValue('--c2').trim() || '#b48cff',
      texUrl: img ? img.getAttribute('src') : null,
      href: link ? link.getAttribute('href') : null
    };
  });
}

/* ============================================================
   3D演出層
   ============================================================ */

let renderer = null;
let composer = null;
let running = false;
let inited = false;

let scene, camera, clock;
let cabinets = [];          // { group, mirror, hit, game, marqueeMat, glowMat, baseScale }
let camPoses = {};          // sectionId → { pos, look }
let keyframes = [];         // { center, pose } スクロール位置→カメラ姿勢
let particles, comingMats = [];
let signState = null;
let continueMat = null;
let footReveal = 0; // 0→1 フィナーレへの接近度（CONTINUE？サインの出現に使う）
let raycaster, pointerNdc;
let hovered = null;
let diving = null;

const camState = {
  pos: new THREE.Vector3(0, 14, 18),
  look: new THREE.Vector3(0, 1.2, -10),
  targetPos: new THREE.Vector3(),
  targetLook: new THREE.Vector3(),
  mouse: new THREE.Vector2(0, 0),
  mouseSmooth: new THREE.Vector2(0, 0),
  intro: 0 // 0→1 でイントロ完了
};

const CAB_GAP = 7.5;   // 筐体のZ間隔
const CAB_X = 2.7;     // 筐体の左右オフセット

/* ---------- 小道具：canvasテクスチャ ---------- */

function makeCanvasTexture(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d'), w, h);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function makeGlowTexture(color) {
  return makeCanvasTexture(128, 128, (ctx, w, h) => {
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, color);
    g.addColorStop(0.35, color + 'aa');
    g.addColorStop(1, '#00000000');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
}

function makeMarqueeTexture(text, c1, c2, dim = false) {
  return makeCanvasTexture(1024, 192, (ctx, w, h) => {
    ctx.fillStyle = '#07081a';
    ctx.fillRect(0, 0, w, h);
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, c1);
    grad.addColorStop(1, c2);
    ctx.font = `900 ${text.length > 12 ? 88 : 104}px Orbitron, "Noto Sans JP", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (!dim) {
      ctx.shadowColor = c1;
      ctx.shadowBlur = 42;
    }
    ctx.fillStyle = dim ? '#2a2e52' : grad;
    ctx.fillText(text, w / 2, h / 2 + 6);
    if (!dim) ctx.fillText(text, w / 2, h / 2 + 6); // 2度描きでネオンを強く
  });
}

function drawSign(ctx, w, h, main, sub, glitch) {
  ctx.clearRect(0, 0, w, h);
  ctx.textAlign = 'center';
  const grad = ctx.createLinearGradient(0, 0, w, 0);
  grad.addColorStop(0, '#6ec6ff');
  grad.addColorStop(0.5, '#b48cff');
  grad.addColorStop(1, '#ff8bd4');
  ctx.font = '400 190px DotGothic16, "Noto Sans JP", sans-serif';

  if (glitch > 0) {
    // RGBずれの残像（グリッチ時のみ）
    ctx.globalAlpha = 0.65;
    ctx.fillStyle = '#ff3b6b';
    ctx.fillText(main, w / 2 - 10 - glitch * 14, 250 + glitch * 4);
    ctx.fillStyle = '#3bd8ff';
    ctx.fillText(main, w / 2 + 10 + glitch * 14, 250 - glitch * 4);
    ctx.globalAlpha = 1;
  }
  ctx.shadowColor = '#7b9dff';
  ctx.shadowBlur = 60;
  ctx.fillStyle = grad;
  ctx.fillText(main, w / 2, 250);
  ctx.fillText(main, w / 2, 250);
  ctx.shadowBlur = 0;
  if (sub) {
    ctx.font = '800 72px Outfit, Orbitron, sans-serif';
    ctx.shadowBlur = 30;
    ctx.fillStyle = '#9aa0c0';
    ctx.fillText(sub, w / 2, 420);
    ctx.shadowBlur = 0;
  }
  if (glitch > 0) {
    // 水平スライスをランダムにずらす
    const slices = 4 + ((glitch * 6) | 0);
    for (let i = 0; i < slices; i++) {
      const sy = Math.random() * h;
      const sh = 8 + Math.random() * 30;
      const dx = (Math.random() - 0.5) * 90 * glitch;
      const band = ctx.getImageData(0, sy, w, sh);
      ctx.putImageData(band, dx, sy);
    }
  }
}

function makeSignTexture(main, sub) {
  return makeCanvasTexture(2048, 512, (ctx, w, h) => drawSign(ctx, w, h, main, sub, 0));
}

/* 筐体サイドアート（80年代アーケード風のストライプ＋リング＋通気スリット） */
function makeSideArtTexture(c1, c2) {
  return makeCanvasTexture(256, 512, (ctx, w, h) => {
    ctx.fillStyle = '#12152e';
    ctx.fillRect(0, 0, w, h);
    // 斜めストライプ
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(-0.5);
    for (let i = -6; i <= 6; i++) {
      ctx.fillStyle = i % 2 === 0 ? c1 + '33' : c2 + '22';
      ctx.fillRect(-w, i * 46, w * 2, 18);
    }
    ctx.restore();
    // リング
    ctx.strokeStyle = c1 + 'aa';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(w * 0.52, h * 0.34, 62, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = c2 + '88';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(w * 0.52, h * 0.34, 80, 0, Math.PI * 2);
    ctx.stroke();
    // 下部の通気スリット
    ctx.fillStyle = '#090b1c';
    for (let i = 0; i < 5; i++) ctx.fillRect(w * 0.2, h * 0.8 + i * 14, w * 0.6, 6);
    // 端の締まり
    const eg = ctx.createLinearGradient(0, 0, 0, h);
    eg.addColorStop(0, 'rgba(0,0,0,0.35)');
    eg.addColorStop(0.25, 'rgba(0,0,0,0)');
    eg.addColorStop(0.85, 'rgba(0,0,0,0)');
    eg.addColorStop(1, 'rgba(0,0,0,0.5)');
    ctx.fillStyle = eg;
    ctx.fillRect(0, 0, w, h);
  });
}

/* ビルの窓明かりテクスチャ（遠景用） */
function makeWindowsTexture(seed) {
  return makeCanvasTexture(64, 128, (ctx, w, h) => {
    ctx.fillStyle = '#070919';
    ctx.fillRect(0, 0, w, h);
    const cols = 5;
    const rows = 12;
    const warm = ['#ffd9a0', '#a0d8ff', '#e8f0ff', '#ffb0d8'];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const r = Math.abs(Math.sin(seed * 91.7 + x * 12.9898 + y * 78.233) * 43758.5453) % 1;
        if (r < 0.38) {
          ctx.fillStyle = warm[((r * 40) | 0) % warm.length];
          ctx.globalAlpha = 0.55 + r;
          ctx.fillRect(x * 12 + 3, y * 10 + 3, 6, 5);
        }
      }
    }
    ctx.globalAlpha = 1;
  });
}

/* ---------- 筐体ビルダー ---------- */

/* CRT風スクリーン：走査線＋流れる帯＋樽型歪み＋ビネット */
const crtMats = [];
function makeCrtMaterial() {
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uMap: { value: null },
      uHasMap: { value: 0 },
      uTime: { value: 0 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
    fragmentShader: `
      varying vec2 vUv;
      uniform sampler2D uMap;
      uniform float uHasMap;
      uniform float uTime;
      void main(){
        vec2 c = vUv - 0.5;
        vec2 uv = vUv + c * dot(c, c) * 0.22;   // ブラウン管の樽型歪み
        vec3 col = vec3(0.045, 0.055, 0.16);
        if (uHasMap > 0.5 && uv.x > 0.0 && uv.x < 1.0 && uv.y > 0.0 && uv.y < 1.0) {
          col = texture2D(uMap, uv).rgb;
        }
        col *= 0.86 + 0.14 * sin(uv.y * 520.0);                                   // 走査線
        float band = 1.0 - abs(fract(uv.y + uTime * 0.09) * 2.0 - 1.0);           // 流れる帯
        col += smoothstep(0.72, 1.0, band) * 0.06;
        col *= 1.12;                                                              // CRTの明るさ補正
        col *= smoothstep(1.35, 0.72, length(c) * 1.35);                          // ビネット（軽め）
        if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) col = vec3(0.01, 0.01, 0.03);
        gl_FragColor = vec4(col, 1.0);
      }`
  });
  crtMats.push(mat);
  return mat;
}

/* ネオン色をブルーム用にHDR増幅する。
   ブルームの明るさ判定は輝度（緑チャンネル重視）なので、一律倍率だと
   紫・青系だけ光らない。どの色相も同じ輝度に揃うよう色ごとに正規化する。
   モバイルはブルーム無し（＝LDRでクランプされ白飛びする）ため増幅しない */
function neonColor(hex, lumTarget = 1.35) {
  const c = new THREE.Color(hex);
  if (isMobile) return c;
  const lum = 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
  return c.multiplyScalar(lumTarget / Math.max(lum, 0.05));
}

function buildCabinet(game, texLoader) {
  const c1 = new THREE.Color(game.c1);
  const c2 = new THREE.Color(game.c2);
  const group = new THREE.Group();

  // 陰影が出るよう、明度と金属感を上げた本体マテリアル
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1e2348, roughness: 0.42, metalness: 0.5 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x0c0e22, roughness: 0.65, metalness: 0.3 });

  // 本体
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.7, 2.1, 1.05), bodyMat);
  body.position.y = 1.05;
  group.add(body);

  // スクリーン奥のベゼル（額縁の暗部で立体感を出す）
  const bezel = new THREE.Mesh(new THREE.BoxGeometry(1.56, 1.06, 0.06), darkMat);
  bezel.position.set(0, 1.45, 0.515);
  bezel.rotation.x = -0.06;
  group.add(bezel);

  // スクリーン（OGP画像はbuildWorld側で読み込んで鏡像にも反映する）
  const screenMat = makeCrtMaterial();
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.42, 0.92), screenMat);
  screen.name = 'screen';
  screen.position.set(0, 1.45, 0.551);
  screen.rotation.x = -0.06;
  group.add(screen);

  // スクリーンの縁光（ビルボードだと近距離で位置がずれるため、
  // スクリーンと平行な固定プレーンで発光させる）
  const glowMat = new THREE.MeshBasicMaterial({
    map: makeGlowTexture('#' + c1.getHexString()),
    color: c1, transparent: true, opacity: 0.4,
    blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false
  });
  // スクリーンのすぐ背後に大きめに置き、枠から漏れる光として見せる
  // （スクリーン本体は不透明なので、中央はスクリーンに隠れ、縁だけ光る）
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 1.8), glowMat);
  glow.position.set(0, 1.45, 0.548);
  glow.rotation.x = -0.06;
  group.add(glow);

  // マーキー（タイトル看板）
  const marqueeMat = new THREE.MeshBasicMaterial({
    map: makeMarqueeTexture(game.title, game.c1, game.c2, !!game.dim),
    toneMapped: false
  });
  const marquee = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.34, 0.22), marqueeMat.clone());
  // 上面・側面は暗色、前面のみテクスチャ
  const marqueeMats = [darkMat, darkMat, darkMat, darkMat, marqueeMat, darkMat];
  marquee.material = marqueeMats;
  marquee.position.set(0, 2.3, 0.42);
  marquee.rotation.x = 0.12;
  group.add(marquee);

  // ネオンエッジ（前面の縦2本＋足元）
  const neonMat = new THREE.MeshBasicMaterial({ color: neonColor(game.c1), toneMapped: false });
  const neonMat2 = new THREE.MeshBasicMaterial({ color: neonColor(game.c2), toneMapped: false });
  const edgeGeo = new THREE.BoxGeometry(0.035, 2.05, 0.035);
  const eL = new THREE.Mesh(edgeGeo, neonMat);
  eL.position.set(-0.87, 1.06, 0.53);
  const eR = eL.clone();
  eR.position.x = 0.87;
  group.add(eL, eR);
  const base = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.045, 0.045), neonMat2);
  base.position.set(0, 0.035, 0.56);
  group.add(base);

  // 足元グロー
  const floorGlowMat = new THREE.SpriteMaterial({
    map: makeGlowTexture('#' + c1.getHexString()),
    color: c1, transparent: true, opacity: 0.3,
    blending: THREE.AdditiveBlending, depthWrite: false
  });
  const floorGlow = new THREE.Sprite(floorGlowMat);
  floorGlow.scale.set(3.4, 1.1, 1);
  floorGlow.position.set(0, 0.06, 0.9);
  group.add(floorGlow);

  // サイドアート（両側面）
  const sideTex = makeSideArtTexture(game.c1, game.c2);
  const sideMat = new THREE.MeshStandardMaterial({ map: sideTex, roughness: 0.55, metalness: 0.25 });
  const sideGeo = new THREE.PlaneGeometry(1.0, 2.04);
  const sideL = new THREE.Mesh(sideGeo, sideMat);
  sideL.position.set(-0.851, 1.05, 0);
  sideL.rotation.y = -Math.PI / 2;
  const sideR = new THREE.Mesh(sideGeo, sideMat);
  sideR.position.set(0.851, 1.05, 0);
  sideR.rotation.y = Math.PI / 2;
  group.add(sideL, sideR);

  // キックプレート（足元の一段暗い前板）と脚
  const kick = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.2, 1.07), darkMat);
  kick.position.y = 0.1;
  group.add(kick);
  const footGeo = new THREE.BoxGeometry(0.12, 0.05, 0.12);
  [-0.7, 0.7].forEach((x) => {
    const foot = new THREE.Mesh(footGeo, darkMat);
    foot.position.set(x, 0.025, 0.44);
    group.add(foot);
  });

  // ベゼル四隅のネジ
  const screwGeo = new THREE.CylinderGeometry(0.018, 0.018, 0.015, 8);
  const screwMat = new THREE.MeshStandardMaterial({ color: 0x3a4066, roughness: 0.3, metalness: 0.85 });
  [[-0.72, 1.93], [0.72, 1.93], [-0.72, 0.97], [0.72, 0.97]].forEach(([sx, sy]) => {
    const screw = new THREE.Mesh(screwGeo, screwMat);
    screw.position.set(sx, sy, 0.548);
    screw.rotation.x = Math.PI / 2 - 0.06;
    group.add(screw);
  });

  // マーキー下の光条（スクリーンをうっすら照らすバー）
  const stripMat = new THREE.MeshBasicMaterial({ color: 0xfff2d8, toneMapped: false });
  const strip = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.022, 0.022), stripMat);
  strip.position.set(0, 2.1, 0.54);
  group.add(strip);

  // コイン投入口（スロットの縦スリットがアクセント色に光る）
  const coinPanel = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.04), darkMat);
  coinPanel.position.set(0.45, 0.52, 0.535);
  group.add(coinPanel);
  const coinSlit = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.1, 0.01), neonMat2);
  coinSlit.position.set(0.45, 0.52, 0.557);
  group.add(coinSlit);

  // コントロールデッキ＋ボタン
  const deck = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.14, 0.5), bodyMat);
  deck.position.set(0, 0.86, 0.66);
  deck.rotation.x = 0.28;
  group.add(deck);
  const btnGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.05, 20);
  const b1 = new THREE.Mesh(btnGeo, neonMat);
  b1.position.set(0.28, 0.95, 0.72);
  b1.rotation.x = 0.28;
  const b2 = new THREE.Mesh(btnGeo, neonMat2);
  b2.position.set(0.46, 0.93, 0.74);
  b2.rotation.x = 0.28;
  const stick = new THREE.Mesh(new THREE.SphereGeometry(0.055, 14, 12), neonMat2);
  stick.position.set(-0.32, 1.02, 0.7);
  group.add(b1, b2, stick);

  // 当たり判定用の透明ボックス
  const hit = new THREE.Mesh(
    new THREE.BoxGeometry(2.0, 2.7, 1.5),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hit.position.y = 1.3;
  hit.userData.game = game;
  group.add(hit);

  return { group, hit, marqueeMat, glowMat, screenMat, screen };
}

/* ---------- ワールド構築 ---------- */

function buildWorld(games, texLoader) {
  // 床（グリッドシェーダー）
  const floorMat = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: { uColor: { value: new THREE.Color(0x3a4a9f) } },
    vertexShader: `
      varying vec3 vPos;
      void main(){ vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      varying vec3 vPos;
      uniform vec3 uColor;
      void main(){
        vec2 fw = fwidth(vPos.xy * 0.5);
        vec2 g = abs(fract(vPos.xy * 0.5) - 0.5) / fw;
        float line = 1.0 - min(min(g.x, g.y), 1.0);
        float dist = length(vPos.xy) * 0.012;
        float fade = exp(-dist * dist * 2.2);
        // 線幅が1px未満になる遠距離ではグリッドを溶かしてチラつきを防ぐ
        float melt = 1.0 - smoothstep(0.3, 0.75, max(fw.x, fw.y));
        gl_FragColor = vec4(uColor, line * 0.5 * fade * melt + 0.02 * fade);
      }`
  });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(320, 320), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0.001;
  floor.renderOrder = 2;
  scene.add(floor);

  // 鏡面の暗い床面（鏡像を薄く見せるための半透明板）
  const floorDim = new THREE.Mesh(
    new THREE.PlaneGeometry(320, 320),
    new THREE.MeshBasicMaterial({ color: 0x05060e, transparent: true, opacity: 0.78 })
  );
  floorDim.rotation.x = -Math.PI / 2;
  floorDim.renderOrder = 1;
  scene.add(floorDim);

  // 筐体列＋鏡像
  const entries = [...games, { id: '_coming', title: 'COMING SOON', c1: '#3a4066', c2: '#2a2e52', texUrl: null, href: null, dim: true }];
  entries.forEach((game, i) => {
    const side = i % 2 === 0 ? 1 : -1;
    const z = -i * CAB_GAP;
    const cab = buildCabinet(game, texLoader);
    cab.group.position.set(side * CAB_X, 0, z);
    cab.group.rotation.y = -side * 0.42;
    scene.add(cab.group);

    // 鏡像（床下に反転コピー、薄く）
    const mirror = cab.group.clone(true);
    mirror.scale.y = -1;
    mirror.position.y = 0;
    let mirrorScreenMat = null;
    mirror.traverse((o) => {
      const fix = (m) => {
        const mm = m.clone();
        mm.transparent = true;
        mm.opacity = 0.25;
        mm.depthWrite = false;
        mm.side = THREE.DoubleSide; // 負スケールで面が反転するため
        return mm;
      };
      if (o.name === 'screen') {
        // 鏡像のスクリーンはCRTシェーダーではなく暗い通常マテリアルで
        o.material = new THREE.MeshBasicMaterial({
          color: 0x30355e, transparent: true, opacity: 0.22,
          depthWrite: false, side: THREE.DoubleSide
        });
        mirrorScreenMat = o.material;
      } else if (o.material && !Array.isArray(o.material)) {
        o.material = fix(o.material);
      } else if (Array.isArray(o.material)) {
        o.material = o.material.map(fix);
      }
      if (o.isSprite) o.visible = false;
    });
    mirror.renderOrder = 0;
    scene.add(mirror);

    // OGP画像を本体（CRTシェーダー）と鏡像のスクリーンへ
    if (game.texUrl) {
      texLoader.load(game.texUrl, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 8;
        cab.screenMat.uniforms.uMap.value = tex;
        cab.screenMat.uniforms.uHasMap.value = 1;
        if (mirrorScreenMat) {
          mirrorScreenMat.map = tex;
          mirrorScreenMat.color.set(0xffffff);
          mirrorScreenMat.needsUpdate = true;
        }
      });
    }

    if (game.dim) comingMats.push(cab.marqueeMat);
    cabinets.push({ ...cab, mirror, game, side, z, baseScale: 1 });
  });

  const zLast = -(entries.length - 1) * CAB_GAP;

  // ランドマークサイン（通路の奥に1枚だけ。DOMの見出しと重複させない）
  // グリッチ演出のためcanvasを保持してランタイムに再描画する
  const signCanvas = document.createElement('canvas');
  signCanvas.width = 2048;
  signCanvas.height = 512;
  const signCtx = signCanvas.getContext('2d', { willReadFrequently: true });
  drawSign(signCtx, 2048, 512, '電脳遊技場', 'AMIX GAME GALLERY', 0);
  const signTex = new THREE.CanvasTexture(signCanvas);
  signTex.colorSpace = THREE.SRGBColorSpace;
  signTex.anisotropy = 4;
  const sign = new THREE.Mesh(
    new THREE.PlaneGeometry(8.4, 2.1),
    new THREE.MeshBasicMaterial({
      map: signTex, transparent: true, toneMapped: false, depthWrite: false, fog: false
    })
  );
  sign.position.set(0, 4.4, zLast - 11);
  sign.renderOrder = 10; // 床の暗幕(renderOrder 1)より後に描き、黒帯に塗られないようにする
  scene.add(sign);
  signState = { ctx: signCtx, tex: signTex, burstEnd: 0, nextBurst: 2.5, wasActive: false };

  // 遠景シティ：窓明かりのビル群（2種の窓テクスチャ＋色味のばらつき）
  const cityCount = isMobile ? 100 : 200;
  const winTex1 = makeWindowsTexture(1);
  const winTex2 = makeWindowsTexture(7);
  winTex1.magFilter = winTex2.magFilter = THREE.NearestFilter;
  const cityGeo = new THREE.BoxGeometry(1, 1, 1);
  const m4 = new THREE.Matrix4();
  const bodyTints = ['#5a6390', '#6a5f9a', '#4c5f92', '#585585', '#465178'];
  const neonPalette = ['#6ec6ff', '#b48cff', '#ff8bd4', '#4dffb8', '#ffb340'];
  [winTex1, winTex2].forEach((tex, k) => {
    const mat = new THREE.MeshBasicMaterial({ map: tex, toneMapped: false });
    const city = new THREE.InstancedMesh(cityGeo, mat, cityCount / 2);
    for (let i = 0; i < cityCount / 2; i++) {
      const side = Math.random() < 0.5 ? -1 : 1;
      const x = side * (10 + Math.random() * 30);
      // フィナーレ（最奥から入口方向を見返す構図）でも左右にビルが入るよう、
      // 入口の手前側（+z）までスカイラインを延長する
      const z = 45 - Math.random() * (Math.abs(zLast) + 115);
      const h = 2 + Math.random() * 11;
      m4.makeScale(1 + Math.random() * 2.6, h, 1 + Math.random() * 2.6);
      m4.setPosition(x, h / 2, z);
      city.setMatrixAt(i, m4);
      city.setColorAt(i, new THREE.Color(bodyTints[(Math.random() * bodyTints.length) | 0]));
    }
    city.instanceMatrix.needsUpdate = true;
    if (city.instanceColor) city.instanceColor.needsUpdate = true;
    scene.add(city);
  });

  // ネオンスラブ（街のアクセント発光体）
  // 前半は通路沿いの「必ず画角に入る」位置へ規則的に、後半は遠景へランダムに置く
  const nearCount = isMobile ? 8 : 12;
  const farCount = isMobile ? 8 : 16;
  const slabMat = new THREE.MeshBasicMaterial({ toneMapped: false });
  const slabs = new THREE.InstancedMesh(cityGeo, slabMat, nearCount + farCount);
  for (let i = 0; i < nearCount; i++) {
    // 通路の両脇 x=±7〜11 を、ヒーローから最奥までZ方向に等間隔で挟む
    const side = i % 2 === 0 ? 1 : -1;
    const x = side * (7 + Math.random() * 4);
    const z = 4 - (i / (nearCount - 1)) * (Math.abs(zLast) + 16);
    const h = 2.6 + Math.random() * 3.4;
    m4.makeScale(0.12, h, 0.12);
    m4.setPosition(x, h / 2, z);
    slabs.setMatrixAt(i, m4);
    slabs.setColorAt(i, neonColor(neonPalette[i % neonPalette.length], 1.7));
  }
  for (let i = nearCount; i < nearCount + farCount; i++) {
    const side = Math.random() < 0.5 ? -1 : 1;
    const x = side * (13 + Math.random() * 22);
    const z = 25 - Math.random() * (Math.abs(zLast) + 80);
    const h = 3 + Math.random() * 8;
    m4.makeScale(0.14, h, 0.14);
    m4.setPosition(x, h / 2, z);
    slabs.setMatrixAt(i, m4);
    slabs.setColorAt(i, neonColor(neonPalette[(Math.random() * neonPalette.length) | 0], 1.7));
  }
  slabs.instanceMatrix.needsUpdate = true;
  if (slabs.instanceColor) slabs.instanceColor.needsUpdate = true;
  scene.add(slabs);

  // 星空
  const starCount = isMobile ? 250 : 500;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);
  for (let i = 0; i < starCount; i++) {
    starPos[i * 3] = (Math.random() - 0.5) * 160;
    starPos[i * 3 + 1] = 6 + Math.random() * 50;
    starPos[i * 3 + 2] = 10 - Math.random() * 150;
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
    size: 0.09, color: 0xcfe0ff, transparent: true, opacity: 0.7,
    depthWrite: false, sizeAttenuation: true
  }));
  scene.add(stars);

  // 月（大きく淡い発光ディスク）。手前側はフィナーレの空用
  const moonMat = new THREE.SpriteMaterial({
    map: makeGlowTexture('#cfe8ff'), color: 0xbfe0ff, transparent: true,
    opacity: 0.85, depthWrite: false, fog: false
  });
  const moon = new THREE.Sprite(moonMat);
  moon.scale.set(16, 16, 1);
  moon.position.set(24, 20, zLast - 70);
  moon.renderOrder = 10;
  scene.add(moon);
  const moon2 = new THREE.Sprite(moonMat.clone());
  moon2.scale.set(14, 14, 1);
  moon2.position.set(-16, 11, 30);
  moon2.renderOrder = 10;
  scene.add(moon2);

  // フィナーレ専用サイン「CONTINUE？」— 入口側の空中に-z向きで置き、
  // 最奥から見返したときだけ現れる（各ゲームのカメラからは背面で見えない）
  const contCanvas = document.createElement('canvas');
  contCanvas.width = 2048;
  contCanvas.height = 512;
  drawSign(contCanvas.getContext('2d'), 2048, 512, 'CONTINUE？', 'またあそびにきてね', 0);
  const contTex = new THREE.CanvasTexture(contCanvas);
  contTex.colorSpace = THREE.SRGBColorSpace;
  contTex.anisotropy = 4;
  continueMat = new THREE.MeshBasicMaterial({
    map: contTex, transparent: true, toneMapped: false, depthWrite: false, fog: false
  });
  continueMat.userData.redraw = () => {
    drawSign(contCanvas.getContext('2d'), 2048, 512, 'CONTINUE？', 'またあそびにきてね', 0);
    contTex.needsUpdate = true;
  };
  const contSign = new THREE.Mesh(new THREE.PlaneGeometry(11, 2.75), continueMat);
  contSign.position.set(0, 6.4, 16);
  contSign.rotation.y = Math.PI;
  contSign.renderOrder = 10;
  scene.add(contSign);

  // 街から立ちのぼるライトビーム
  const beamTex = makeCanvasTexture(64, 256, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, h, 0, 0);
    g.addColorStop(0, 'rgba(140,170,255,0.55)');
    g.addColorStop(1, 'rgba(140,170,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  });
  for (let i = 0; i < 3; i++) {
    const beam = new THREE.Mesh(
      new THREE.PlaneGeometry(1.4, 26),
      new THREE.MeshBasicMaterial({
        map: beamTex, transparent: true, depthWrite: false,
        blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
        color: [0x6ec6ff, 0xb48cff, 0xff8bd4][i]
      })
    );
    const side = i % 2 === 0 ? -1 : 1;
    beam.position.set(side * (14 + i * 6), 13, zLast * (0.25 + i * 0.3) - 14);
    scene.add(beam);
  }

  // 浮遊パーティクル
  const pCount = isMobile ? 160 : 340;
  const pGeo = new THREE.BufferGeometry();
  const pos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 26;
    pos[i * 3 + 1] = Math.random() * 7;
    pos[i * 3 + 2] = 6 - Math.random() * (Math.abs(zLast) + 24);
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
    size: 0.05, color: 0x8fb8ff, transparent: true, opacity: 0.55,
    blending: THREE.AdditiveBlending, depthWrite: false
  }));
  scene.add(particles);

  // ライト（筐体の面ごとに明暗差が出る構成）
  scene.add(new THREE.HemisphereLight(0x35407a, 0x05060e, 1.4));
  const moonKey = new THREE.DirectionalLight(0xbcd0ff, 1.8); // 月明かりのキーライト
  moonKey.position.set(-6, 10, 8);
  scene.add(moonKey);
  const key = new THREE.PointLight(0x6ec6ff, 46, 40);
  key.position.set(0, 6, 2);
  scene.add(key);
  const mid = new THREE.PointLight(0xb48cff, 40, 40);
  mid.position.set(0, 5, zLast / 2);
  scene.add(mid);
  const end = new THREE.PointLight(0xff8bd4, 34, 36);
  end.position.set(0, 5, zLast - 6);
  scene.add(end);

  return zLast;
}

/* ---------- カメラ経路 ---------- */

function buildCamPoses(zLast) {
  if (isMobile) {
    // モバイル（縦画面）：カードが下半分を占めるため、
    // 通路の中心軸から筐体を正面ぎみに、画面上半分へフレーミングする
    camPoses = {
      hero: { pos: new THREE.Vector3(0, 2.0, 10.5), look: new THREE.Vector3(0, 1.6, -12) },
      about: { pos: new THREE.Vector3(0, 9.5, zLast / 2 + 10), look: new THREE.Vector3(0, 0.2, zLast / 2 - 6) },
      faq: { pos: new THREE.Vector3(0, 1.7, zLast + 3), look: new THREE.Vector3(0, 3.2, zLast - 12) },
      foot: { pos: new THREE.Vector3(0, 12, zLast - 8), look: new THREE.Vector3(0, 2.6, 12) }
    };
    cabinets.forEach((cab) => {
      if (cab.game.dim) return;
      camPoses[cab.game.id] = {
        pos: new THREE.Vector3(cab.side * 0.9, 1.7, cab.z + 4.6),
        look: new THREE.Vector3(cab.side * 2.5, 2.0, cab.z - 0.2)
      };
    });
    return;
  }
  camPoses = {
    // ヒーローは斜めの引き構図：左半分は暗闇（DOMテキスト用）、
    // 右にSHIBA筐体が1台だけフォグから浮かぶ
    hero: { pos: new THREE.Vector3(-2.4, 1.5, 8.8), look: new THREE.Vector3(2.3, 1.55, -3.5) },
    about: { pos: new THREE.Vector3(0, 8.5, zLast / 2 + 9), look: new THREE.Vector3(0, 0.4, zLast / 2 - 6) },
    faq: { pos: new THREE.Vector3(0, 1.7, zLast + 1.5), look: new THREE.Vector3(0, 2.6, zLast - 12) },
    // フィナーレ：FAQ位置から上空へ浮上し、ネオンの通路全体と
    // 入口側の空（CONTINUE？サイン・月）を見渡す
    foot: { pos: new THREE.Vector3(0, 10.5, zLast - 10), look: new THREE.Vector3(0, 2.4, 12) }
  };
  cabinets.forEach((cab) => {
    if (cab.game.dim) return;
    camPoses[cab.game.id] = {
      pos: new THREE.Vector3(-cab.side * 1.05, 1.6, cab.z + 3.6),
      look: new THREE.Vector3(cab.side * 2.2, 1.35, cab.z - 0.3)
    };
  });
}

function measureKeyframes() {
  keyframes = [];
  document.querySelectorAll('.section').forEach((sec) => {
    const kind = sec.dataset.cam;
    const pose = kind === 'game' ? camPoses[sec.id] : camPoses[kind];
    if (!pose) return;
    const rect = sec.getBoundingClientRect();
    keyframes.push({ center: rect.top + scrollY + rect.height / 2, pose });
  });
  keyframes.sort((a, b) => a.center - b.center);
}

function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

function poseAtScroll() {
  const y = scrollY + innerHeight / 2;
  if (!keyframes.length) return;
  let a = keyframes[0];
  let b = keyframes[0];
  for (let i = 0; i < keyframes.length; i++) {
    if (keyframes[i].center <= y) {
      a = keyframes[i];
      b = keyframes[Math.min(i + 1, keyframes.length - 1)];
    }
  }
  const span = Math.max(1, b.center - a.center);
  const t = smoothstep(Math.min(1, Math.max(0, (y - a.center) / span)));
  camState.targetPos.lerpVectors(a.pose.pos, b.pose.pos, t);
  camState.targetLook.lerpVectors(a.pose.look, b.pose.look, t);

  // フィナーレ接近度：FAQ中心→フッター中心の間で0→1
  // （CONTINUE？サインはFAQのカードと重なる帯域では出さず、最後に浮かび上がらせる）
  if (keyframes.length >= 2) {
    const a2 = keyframes[keyframes.length - 2].center;
    const b2 = keyframes[keyframes.length - 1].center;
    footReveal = Math.min(1, Math.max(0, (y - a2) / Math.max(1, b2 - a2)));
  }
}

/* ---------- 初期化 ---------- */

function initGL() {
  if (inited) return;
  inited = true;

  const games = collectGames();

  renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1.6 : 2));
  renderer.setSize(innerWidth, innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x05060e);
  scene.fog = new THREE.FogExp2(0x05060e, 0.026);

  // モバイル縦画面は縦FOVを広げて筐体全体が収まるようにする
  camera = new THREE.PerspectiveCamera(isMobile ? 48 : 38, innerWidth / innerHeight, 0.1, 200);

  // ブルーム（デスクトップのみ。モバイルは負荷を優先して従来描画）
  if (!isMobile) {
    // Composer経由はMSAAが失われチラつくため、4xマルチサンプルのRTを渡す
    const rt = new THREE.WebGLRenderTarget(innerWidth, innerHeight, {
      type: THREE.HalfFloatType,
      samples: 4
    });
    composer = new EffectComposer(renderer, rt);
    composer.setPixelRatio(renderer.getPixelRatio());
    composer.setSize(innerWidth, innerHeight);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(
      new THREE.Vector2(innerWidth, innerHeight),
      0.5,   // strength
      0.5,   // radius
      0.8    // threshold（HDR増幅したネオンだけ光らせ、スクリーンの絵は飛ばさない）
    ));
    composer.addPass(new OutputPass());
  }
  clock = new THREE.Clock();
  raycaster = new THREE.Raycaster();
  pointerNdc = new THREE.Vector2(-2, -2);

  const manager = new THREE.LoadingManager();
  let ready = false;
  manager.onProgress = (url, loaded, total) => {
    if (loaderBar) loaderBar.style.width = `${Math.round((loaded / total) * 100)}%`;
  };
  const finish = () => {
    if (ready) return;
    ready = true;
    if (loaderBar) loaderBar.style.width = '100%';
    if (!loaderEl) return;
    if (reducedMotion) {
      loaderEl.classList.add('done');
      return;
    }
    // コイン投入 → 開場
    setTimeout(() => {
      loaderEl.classList.add('inserting');
      setTimeout(() => loaderEl.classList.add('done'), 820);
    }, 200);
  };
  manager.onLoad = finish;
  manager.onError = finish;
  setTimeout(finish, 5000); // 読み込みが滞っても開場する

  const texLoader = new THREE.TextureLoader(manager);
  const zLast = buildWorld(games, texLoader);
  buildCamPoses(zLast);
  measureKeyframes();
  poseAtScroll();

  // イントロ用の初期位置（上空から降りてくる）
  if (!reducedMotion && scrollY < innerHeight * 0.5) {
    camState.pos.set(-6, 13, 20);
    camState.look.set(2.3, 0, -8);
    camState.intro = 0;
  } else {
    camState.pos.copy(camState.targetPos);
    camState.look.copy(camState.targetLook);
    camState.intro = 1;
  }

  // フォント読み込み後にマーキーを描き直し、レイアウトを再計測する
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      cabinets.forEach((cab) => {
        const mat = cab.marqueeMat;
        if (mat.map) mat.map.dispose();
        mat.map = makeMarqueeTexture(cab.game.title, cab.game.c1, cab.game.c2, !!cab.game.dim);
        mat.needsUpdate = true;
      });
      if (signState) {
        drawSign(signState.ctx, 2048, 512, '電脳遊技場', 'AMIX GAME GALLERY', 0);
        signState.tex.needsUpdate = true;
      }
      if (continueMat && continueMat.userData.redraw) continueMat.userData.redraw();
      measureKeyframes();
      poseAtScroll();
    });
  }

  /* --- 入力 --- */

  addEventListener('pointermove', (e) => {
    camState.mouse.set((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1);
    pointerNdc.set(camState.mouse.x, -camState.mouse.y);
  }, { passive: true });

  canvas.addEventListener('click', () => {
    if (hovered && hovered.game.href && !diving) {
      const cab = hovered;
      diving = { t: 0, cab };
    }
  });

  addEventListener('scroll', () => { if (running) poseAtScroll(); }, { passive: true });

  let resizeTimer = 0;
  addEventListener('resize', () => {
    renderer.setSize(innerWidth, innerHeight);
    if (composer) composer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      measureKeyframes();
      poseAtScroll();
    }, 200);
  });
}

/* ---------- ループ ---------- */

function tick() {
  if (!running) return;
  requestAnimationFrame(tick);

  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;

  // イントロ：上空からヒーロー位置へ
  if (camState.intro < 1) {
    camState.intro = Math.min(1, camState.intro + dt * 0.55);
  }
  const ease = 1 - Math.exp(-dt * (camState.intro < 1 ? 1.7 : 3.4));
  camState.pos.lerp(camState.targetPos, ease);
  camState.look.lerp(camState.targetLook, ease);

  // マウスパララックス
  camState.mouseSmooth.lerp(camState.mouse, 1 - Math.exp(-dt * 4));
  const mx = camState.mouseSmooth.x;
  const my = camState.mouseSmooth.y;

  camera.position.set(
    camState.pos.x + mx * 0.55,
    camState.pos.y + my * -0.3,
    camState.pos.z
  );
  camera.lookAt(
    camState.look.x + mx * 1.1,
    camState.look.y + my * -0.55,
    camState.look.z
  );

  // ダイブ演出（筐体クリック→画面へ突入→遷移）
  if (diving) {
    diving.t += dt * 1.7;
    const k = smoothstep(Math.min(1, diving.t));
    const cab = diving.cab;
    const screenWorld = cab.screen.getWorldPosition(new THREE.Vector3());
    const approach = screenWorld.clone();
    approach.z += 1.4 * (1 - k) + 0.3;
    camera.position.lerp(approach, Math.min(1, k * 0.75));
    camera.lookAt(screenWorld);
    if (diving.t >= 1) {
      location.href = cab.game.href;
      diving = null;
    }
  }

  // ホバー判定
  if (!isMobile && !diving) {
    raycaster.setFromCamera(pointerNdc, camera);
    const hits = raycaster.intersectObjects(cabinets.map((c) => c.hit), false);
    const next = hits.length
      ? cabinets.find((c) => c.hit === hits[0].object && c.game.href) || null
      : null;
    if (next !== hovered) {
      hovered = next;
      canvas.style.cursor = hovered ? 'pointer' : '';
    }
  }

  // 筐体のホバー反応と待機モーション
  cabinets.forEach((cab, i) => {
    const target = cab === hovered ? 1.05 : 1;
    cab.baseScale += (target - cab.baseScale) * Math.min(1, dt * 8);
    cab.group.scale.setScalar(cab.baseScale);
    cab.glowMat.opacity = 0.5 + Math.sin(t * 1.6 + i * 1.3) * 0.08 + (cab === hovered ? 0.3 : 0);
  });

  // COMING SOON のフリッカー
  comingMats.forEach((mat) => {
    const flick = Math.random() < 0.03 ? 0.3 : 1;
    mat.color = mat.color || new THREE.Color();
    const v = (0.75 + Math.sin(t * 2.2) * 0.15) * flick;
    mat.color.setScalar(v);
  });

  // CRTスクリーンの走査帯
  crtMats.forEach((m) => { m.uniforms.uTime.value = t; });

  // 電脳遊技場サインのグリッチ（数秒おきに短いバースト）
  if (signState) {
    if (t > signState.nextBurst) {
      signState.burstEnd = t + 0.12 + Math.random() * 0.3;
      signState.nextBurst = t + 0.8 + Math.random() * 2.2;
    }
    const active = t < signState.burstEnd;
    if (active) {
      drawSign(signState.ctx, 2048, 512, '電脳遊技場', 'AMIX GAME GALLERY', 0.35 + Math.random() * 0.65);
      signState.tex.needsUpdate = true;
      signState.wasActive = true;
    } else if (signState.wasActive) {
      drawSign(signState.ctx, 2048, 512, '電脳遊技場', 'AMIX GAME GALLERY', 0);
      signState.tex.needsUpdate = true;
      signState.wasActive = false;
    }
  }

  // CONTINUE？サイン：フィナーレ接近で浮かび上がり、ゆっくり明滅する
  if (continueMat) {
    const reveal = footReveal * footReveal;
    continueMat.opacity = (0.78 + Math.sin(t * 2.2) * 0.22) * reveal;
  }

  // パーティクル浮遊
  if (particles) {
    particles.rotation.y = Math.sin(t * 0.05) * 0.04;
    particles.position.y = Math.sin(t * 0.4) * 0.14;
  }

  if (composer) {
    composer.render();
  } else {
    renderer.render(scene, camera);
  }
}

function startGL() {
  initGL();
  if (!running) {
    running = true;
    clock.getDelta();
    poseAtScroll();
    tick();
  }
}

function stopGL() {
  running = false;
}

/* ---------- 3Dトグル ---------- */

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    glOn = !glOn;
    sessionStorage.setItem('wg3_gl', glOn ? 'on' : 'off');
    applyModeClass();
    if (glOn) {
      startGL();
    } else {
      stopGL();
      if (loaderEl) loaderEl.classList.add('done');
    }
  });
}

/* ---------- 起動 ---------- */

if (glOn) {
  startGL();
} else {
  applyModeClass();
}
