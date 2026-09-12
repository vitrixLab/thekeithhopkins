'use client';

import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Vector2 } from 'three';

export default function PostFX() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.25}
        luminanceSmoothing={0.9}
        intensity={1.4}
        blendFunction={BlendFunction.SCREEN}
        mipmapBlur
      />
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={new Vector2(0.0015, 0.0015)}
        radialModulation={false}
        modulationOffset={0}
      />
    </EffectComposer>
  );
}
