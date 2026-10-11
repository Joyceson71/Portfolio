"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SKILLS, CLUSTER_CENTERS, type SkillCluster } from "@/lib/constants";

// ── Force-directed skill constellation ──────────────────────────
// Each skill is a glowing sphere node. Nodes in the same cluster
// connect with web strands. Hovering a node (3D raycasting) pulls
// it forward and highlights connections.

const CLUSTER_COLORS: Record<SkillCluster, string> = {
  frontend: "#61dafb",
  creative: "#CC0000",
  backend:  "#6cc24a",
  devops:   "#eab308",
};

interface NodeData {
  position: THREE.Vector3;
  cluster: SkillCluster;
  level: number;
  name: string;
  color: string;
}

function buildNodes(): NodeData[] {
  return SKILLS.map((skill) => {
    const center = CLUSTER_CENTERS[skill.cluster];
    const angle = Math.random() * Math.PI * 2;
    const r = 0.8 + Math.random() * 1.4;
    return {
      position: new THREE.Vector3(
        center[0] + Math.cos(angle) * r,
        center[1] + Math.sin(angle) * r,
        center[2] + (Math.random() - 0.5) * 0.8,
      ),
      cluster: skill.cluster,
      level: skill.level,
      name: skill.name,
      color: CLUSTER_COLORS[skill.cluster],
    };
  });
}

function ConnectingStrand({ a, b, color }: { a: THREE.Vector3; b: THREE.Vector3; color: string }) {
  const pts = useMemo(() => new Float32Array([a.x, a.y, a.z, b.x, b.y, b.z]), [a, b]);
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pts, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.25} />
    </line>
  );
}

interface SkillNodeProps {
  data: NodeData;
  index: number;
}

function SkillNode({ data, index }: SkillNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime + index * 0.4;
    meshRef.current.position.y = data.position.y + Math.sin(t * 0.6) * 0.12;
    meshRef.current.rotation.y += 0.008;
  });

  const size = 0.08 + (data.level / 100) * 0.14;

  return (
    <mesh ref={meshRef} position={data.position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={data.color}
        emissive={data.color}
        emissiveIntensity={2.5}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

interface StackGraphProps {
  scrollProgress: number;
}

export function StackGraph({ scrollProgress }: StackGraphProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const nodes = useMemo(() => buildNodes(), []);

  // Visible only in arsenal range 0.28–0.46
  const localT = Math.max(0, Math.min(1, (scrollProgress - 0.28) / 0.18));
  const fadeOut = scrollProgress > 0.46 ? Math.max(0, 1 - (scrollProgress - 0.46) / 0.08) : 1;
  const scale = localT * fadeOut;

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.04;
  });

  // Build intra-cluster strands
  const strands = useMemo(() => {
    const s: { a: THREE.Vector3; b: THREE.Vector3; color: string }[] = [];
    nodes.forEach((a, i) => {
      nodes.forEach((b, j) => {
        if (j <= i) return;
        if (a.cluster === b.cluster) {
          s.push({ a: a.position, b: b.position, color: a.color });
        }
      });
    });
    return s;
  }, [nodes]);

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {strands.map((strand, i) => (
        <ConnectingStrand key={i} a={strand.a} b={strand.b} color={strand.color} />
      ))}
      {nodes.map((node, i) => (
        <SkillNode key={node.name} data={node} index={i} />
      ))}

      {/* Cluster center glows */}
      {(Object.entries(CLUSTER_CENTERS) as [SkillCluster, [number, number, number]][]).map(([cluster, center]) => (
        <mesh key={cluster} position={new THREE.Vector3(...center)}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial
            color={CLUSTER_COLORS[cluster]}
            emissive={CLUSTER_COLORS[cluster]}
            emissiveIntensity={4}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}
