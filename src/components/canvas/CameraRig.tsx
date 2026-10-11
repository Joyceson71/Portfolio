"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/lib/store";

// ── Camera spline waypoints  ────────────────────────────────────
// Each waypoint has a normalised scroll progress (0–1), a camera position,
// and a lookAt target. The rig interpolates between them based on scrollProgress.
const WAYPOINTS: { t: number; pos: [number, number, number]; look: [number, number, number] }[] = [
  { t: 0.00, pos: [0,  2, 15], look: [0, 0, 0] },   // Hero Rooftop
  { t: 0.14, pos: [0,  0, 12], look: [0, 0, 0] },   // Origins
  { t: 0.28, pos: [-3, 1, 10], look: [0, 0, 0] },   // Arsenal
  { t: 0.46, pos: [ 3,-1,  9], look: [0, 0, 0] },   // Work
  { t: 0.60, pos: [ 0, 2, 11], look: [0, 0, 0] },   // Credentials
  { t: 0.72, pos: [-2, 0,  9], look: [0, 0, 0] },   // Timeline
  { t: 0.84, pos: [ 1,-1, 10], look: [0, 0, 0] },   // Reviews
  { t: 1.00, pos: [ 0, 3, 14], look: [0, 0, 0] },   // Contact
];

// Build a CatmullRomCurve3 from the waypoint positions
const buildCurve = () => {
  return new THREE.CatmullRomCurve3(
    WAYPOINTS.map((w) => new THREE.Vector3(...w.pos)),
    false,  // not closed
    "catmullrom",
    0.5     // tension
  );
};

// Build a lookup-table for the lookAt targets (linear interp between waypoints)
const lerpLookAt = (t: number): THREE.Vector3 => {
  // find the surrounding pair
  let lo = WAYPOINTS[0];
  let hi = WAYPOINTS[WAYPOINTS.length - 1];
  for (let i = 0; i < WAYPOINTS.length - 1; i++) {
    if (t >= WAYPOINTS[i].t && t <= WAYPOINTS[i + 1].t) {
      lo = WAYPOINTS[i];
      hi = WAYPOINTS[i + 1];
      break;
    }
  }
  const span = hi.t - lo.t;
  const f = span === 0 ? 0 : (t - lo.t) / span;
  return new THREE.Vector3(
    THREE.MathUtils.lerp(lo.look[0], hi.look[0], f),
    THREE.MathUtils.lerp(lo.look[1], hi.look[1], f),
    THREE.MathUtils.lerp(lo.look[2], hi.look[2], f),
  );
};

interface CameraRigProps {
  mouseX?: number;
  mouseY?: number;
}

export function CameraRig({ mouseX = 0, mouseY = 0 }: CameraRigProps) {
  const { camera } = useThree();
  const scrollProgress = useStore((s) => s.scrollProgress);
  const curve = useMemo(() => buildCurve(), []);

  const targetPos = useRef(new THREE.Vector3(0, 2, 15));
  const targetLook = useRef(new THREE.Vector3(0, 0, 0));
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // Spline position from scroll progress
    const splinePoint = curve.getPoint(Math.max(0, Math.min(1, scrollProgress)));
    // Micro-parallax from mouse
    const parallaxX = mouseX * 1.4;
    const parallaxY = -mouseY * 1.0;
    targetPos.current.set(
      splinePoint.x + parallaxX,
      splinePoint.y + parallaxY,
      splinePoint.z,
    );

    // Smooth camera position
    camera.position.lerp(targetPos.current, 0.04);

    // Smooth lookAt
    const newLook = lerpLookAt(scrollProgress);
    targetLook.current.copy(newLook);
    currentLook.current.lerp(targetLook.current, 0.06);
    camera.lookAt(currentLook.current);
  });

  return null;
}
