// Web-Verse Chromatic Glitch Post-Processing Shader
// Separates RGB channels horizontally based on noise and trigger intensity

uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uGlitchAmount;
varying vec2 vUv;

float random2d(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vUv;

  // Glitch band displacement
  float sliceY = floor(uv.y * 30.0);
  float noise = random2d(vec2(sliceY, floor(uTime * 15.0)));
  float shift = 0.0;

  if (noise > 0.85) {
    shift = (random2d(vec2(sliceY, uTime)) - 0.5) * 0.04 * uGlitchAmount;
  }

  // Chromatic aberration channel split
  float r = texture2D(tDiffuse, vec2(uv.x + shift + 0.005 * uGlitchAmount, uv.y)).r;
  float g = texture2D(tDiffuse, vec2(uv.x + shift, uv.y)).g;
  float b = texture2D(tDiffuse, vec2(uv.x + shift - 0.005 * uGlitchAmount, uv.y)).b;

  gl_FragColor = vec4(r, g, b, 1.0);
}
