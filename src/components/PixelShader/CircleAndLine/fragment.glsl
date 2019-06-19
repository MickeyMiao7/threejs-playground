uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;

vec4 Circle(vec2 uv, vec2 p, float radius, vec3 color, float antialias) {
  float d = length(uv - p) - radius;
  float c = smoothstep(0., antialias, d);
  return vec4(color, 1. - c);
}

vec4 Line(vec2 uv, vec2 point0, vec2 point1, float width, vec3 color, float antialias) {
  float k = (point1.y - point0.y) / (point1.x - point0.x);
  float b = point1.y - k * point1.x; 
  float d = abs(k * point0.x + b)
}

void main() {
	 	vec2 pos = (2.0 * gl_FragCoord.xy - iResolution.xy) / min(iResolution.y, iResolution.x);

    vec4 bgColor = vec4(0., 1., 1., 1.);
    vec4 color = Circle(pos, vec2(0., 0.), .5, vec3(1., 1., 0.), .01);
    gl_FragColor = mix(bgColor, color, color.a);
}
