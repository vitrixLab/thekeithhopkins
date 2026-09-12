'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  spread?: number;
  depth?: number;
  color?: string;
}

export default function ParticleField({
  count = 800,
  spread = 20,
  depth = 20,
  color = '#fbbf24',
}: ParticleFieldProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const timeRef = useRef(0);

  // Pre-compute per-instance positions and drift velocities
  const { positions, velocities } = useMemo(() => {
    const positions: Float32Array = new Float32Array(count * 3);
    const velocities: Float32Array = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * depth;
      // slow random drift
      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.003;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions, velocities };
  }, [count, spread, depth]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const mesh = meshRef.current;
    const halfSpread = spread / 2;
    const halfDepth = depth / 2;

    for (let i = 0; i < count; i++) {
      // drift
      positions[i * 3 + 0] += velocities[i * 3 + 0];
      positions[i * 3 + 1] += velocities[i * 3 + 1];
      positions[i * 3 + 2] += velocities[i * 3 + 2];

      // wrap around bounds
      if (Math.abs(positions[i * 3 + 0]) > halfSpread)
        positions[i * 3 + 0] *= -0.98;
      if (Math.abs(positions[i * 3 + 1]) > halfSpread * 0.6)
        positions[i * 3 + 1] *= -0.98;
      if (Math.abs(positions[i * 3 + 2]) > halfDepth)
        positions[i * 3 + 2] *= -0.98;

      dummy.position.set(
        positions[i * 3 + 0],
        positions[i * 3 + 1],
        positions[i * 3 + 2],
      );
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.025, 4, 4]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2.5}
        roughness={0}
        metalness={0}
      />
    </instancedMesh>
  );
}
