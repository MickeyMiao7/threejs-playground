// Vertex Shader
attribute float size;
attribute vec3 position2;
uniform float val;
varying float opacity;
varying vec3 vColor;

void main() {
  // gl_PointSize = 4. + 2. * sin(position.y / 4.);
  // gl_Position = projectionMatrix * modelViewMatrix * vec4(position2, 1.0);
  vec3 vPos;

  // 开始产生模糊的z轴分界
  float maxBorder = -150.0;
  // 最模糊的z轴分界
  float minBorder = -160.0;
  // 最大透明度
  float maxOpacity = 1.0;
  // 最小透明度
  float minOpacity = 0.03;
  // 模糊增加的粒子尺寸范围
  float sizeAdd = 20.0;

  // 变动的val值引导顶点位置的迁移
  vPos.x = position.x * val + position2.x * (1. - val);
  vPos.y = position.y * val + position2.y * (1. - val);
  vPos.z = position.z * val + position2.z * (1. - val);
  vec4 mvPosition = modelViewMatrix * vec4(vPos, 1.0 );
  if (mvPosition.z > maxBorder) {
    opacity = maxOpacity;
    gl_PointSize = size;
  } else if (mvPosition.z < minBorder) {
    opacity = minOpacity;
    gl_PointSize = size + sizeAdd;
  } else {
    float percent = (maxBorder - mvPosition.z) / (maxBorder - minBorder);
    opacity = (1.0 - percent) * (maxOpacity - minOpacity) + minOpacity;
    gl_PointSize = percent * sizeAdd + size;  
  }
  // 根据y轴坐标计算传递的顶点颜色值
  float positionY = vPos.y;
  vColor.x = abs(sin(positionY));
  vColor.y = abs(cos(positionY));
  vColor.z = abs(cos(positionY));

  gl_Position = projectionMatrix * mvPosition;
}