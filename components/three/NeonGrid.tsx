'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Grid } from '@react-three/drei';
import * as THREE from 'three';

interface NeonGridProps {
  /** Base scroll speed in world-units/second */
  baseSpeed?: number;
}

export default function NeonGrid({ baseSpeed = 0.6 }: NeonGridProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const offsetRef = useRef(0);

  useFrame((_, delta) => {
    // Compute extra speed from scroll position (more scroll = faster grid)
    const scrollFactor = typeof window !== 'undefined'
      ? 1 + window.scrollY / 600
      : 1;

    offsetRef.current += delta * baseSpeed * scrollFactor;

    // Keep the offset in [0, gridSize) to avoid float drift
    const gridSize = 10;
    if (offsetRef.current >= gridSize) offsetRef.current -= gridSize;

    // Translate the entire group along Z so the grid "rushes" toward camera
    groupRef.current.position.z = offsetRef.current;
  });

  return (
    <group ref={groupRef} rotation={[0, 0, 0]}>
      <Grid
        args={[80, 80]}           // width, height of the plane
        cellSize={1}
        cellThickness={0.4}
        cellColor="#e7bd44"
        sectionSize={10}
        sectionThickness={0.8}
        sectionColor="#d9a92f"
        fadeDistance={35}
        fadeStrength={1.5}
        followCamera={false}
        position={[0, -3.5, -15]} // sits below camera horizon
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}
