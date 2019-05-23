// fragment shafer

uniform vec3 color;
uniform sampler2D texture;
varying float opacity;
varying vec3 vColor;

void main()	{
  // gl_FragColor = vec4(color, 1.);
  // gl_FragColor = vec4(color, opacity);
  gl_FragColor = vec4(vColor * color, opacity);
  gl_FragColor = gl_FragColor * texture2D(texture, gl_PointCoord);
}