// Web-Verse Holographic HUD Shader
// Applies scanlines, chromatic fringe, and fresnel rim lighting

uniform float uTime;
uniform vec3 uColor;
uniform float uOpacity;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  // Horizontal scanline oscillation
  float scanline = sin(vUv.y * 300.0 + uTime * 6.0) * 0.5 + 0.5;
  scanline = pow(scanline, 2.0);

  // Fresnel rim computation
  vec3 viewDir = normalize(vViewPosition);
  float fresnel = 1.0 - max(dot(-viewDir, vNormal), 0.0);
  fresnel = pow(fresnel, 2.5);

  // Hologram interference jitter
  float jitter = sin(uTime * 30.0 + vUv.y * 20.0) * 0.05;

  vec3 col = uColor * (0.6 + scanline * 0.4 + fresnel * 0.8 + jitter);
  float alpha = uOpacity * (0.4 + fresnel * 0.6) * (0.7 + scanline * 0.3);

  gl_FragColor = vec4(col, alpha);
}
