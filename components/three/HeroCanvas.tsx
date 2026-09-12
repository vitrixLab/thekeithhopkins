'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import ParticleField from './ParticleField';
import NeonGrid from './NeonGrid';
import PostFX from './PostFX';

/** Smoothly tracks mouse position and tilts camera */
function CameraRig() {
  const { camera, gl } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  // Listen on the canvas element to avoid global listeners
  useRef(() => {
    const el = gl.domElement;
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  });

  useFrame(() => {
    // Lerp toward mouse
    target.current.x += (mouse.current.x - target.current.x) * 0.04;
    target.current.y += (mouse.current.y - target.current.y) * 0.04;

    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      -target.current.x * 0.08,
      0.05,
    );
    camera.rotation.x = THREE.MathUtils.lerp(
      camera.rotation.x,
      target.current.y * 0.05,
      0.05,
    );
  });

  return null;
}

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.5, 8], fov: 60, near: 0.1, far: 100 }}
      gl={{
        antialias: false,
        powerPreference: 'high-performance',
        alpha: true,          // transparent bg so CSS bg shows through
      }}
      style={{ position: 'absolute', inset: 0 }}
    >
      {/* Minimal ambient + point light for particle sheen */}
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 4, 4]} intensity={2} color="#fbbf24" />

      <Suspense fallback={null}>
        <CameraRig />
        <ParticleField count={700} spread={22} depth={18} color="#fbbf24" />
        <NeonGrid baseSpeed={0.55} />
        <PostFX />
      </Suspense>
    </Canvas>
  );
}
