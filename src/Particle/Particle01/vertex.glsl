// Vertex Shader
attribute float size;
attribute vec3 position2;
uniform float val;

void main() {
  // gl_PointSize = 4. + 2. * sin(position.y / 4.);
  // gl_Position = projectionMatrix * modelViewMatrix * vec4(position2, 1.0);
  vec3 vPos;
  // 变动的val值引导顶点位置的迁移
  vPos.x = position.x * val + position2.x * (1. - val);
  vPos.y = position.y * val + position2.y * (1. - val);
  vPos.z = position.z * val + position2.z * (1. - val);
  vec4 mvPosition = modelViewMatrix * vec4( vPos, 1.0 );
  gl_PointSize = 4.;
  gl_Position = projectionMatrix * mvPosition;
}

