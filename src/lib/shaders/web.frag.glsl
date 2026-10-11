// Web-Verse Spider-Web Fragment Shader
// Renders glowing neon strand lines with skin primary color and emissive falloff

uniform vec3 uColor;
uniform vec3 uGlowColor;
uniform float uOpacity;
uniform float uTime;

varying vec2 vUv;
varying float vDist;
varying vec3 vNormal;

void main() {
  // Edge glow falloff
  float pulse = 0.8 + 0.2 * sin(uTime * 2.5);
  vec3 finalColor = mix(uColor, uGlowColor, pulse * 0.4);

  // Soft proximity intensity
  float proximityGlow = exp(-vDist * 0.2) * 0.5;
  finalColor += uGlowColor * proximityGlow;

  gl_FragColor = vec4(finalColor, uOpacity);
}
