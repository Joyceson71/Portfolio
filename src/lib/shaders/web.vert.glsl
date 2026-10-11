// Web-Verse Spider-Web Vertex Shader
// Deforms vertices based on cursor position and time-based ripple waves

uniform float uTime;
uniform vec2 uMouse;
uniform float uIntensity;

varying vec2 vUv;
varying float vDist;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);

  vec3 pos = position;

  // Calculate distance from cursor projected plane
  float distToMouse = distance(pos.xy, uMouse * 10.0);
  vDist = distToMouse;

  // Wave ripple radiating from cursor
  float ripple = sin(distToMouse * 4.0 - uTime * 3.0) * exp(-distToMouse * 0.25) * uIntensity;
  pos.z += ripple * 0.8;

  // Idle strand sag and harmonic vibration
  pos.y += sin(pos.x * 2.0 + uTime * 1.5) * 0.08;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
