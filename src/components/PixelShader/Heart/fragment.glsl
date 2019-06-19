uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;

vec4 Circle(vec2 uv, vec2 p, float radius, vec3 color, float antialias) {
  float d = length(uv - p) - radius;
  float c = smoothstep(0., antialias, d);
  // vec3 _color = color * (1. - c);
  // return vec4(_color, 1.);
  return vec4(color, 1. - c);
}

void main() {
	 	vec2 pos = (2.0 * gl_FragCoord.xy - iResolution.xy) / min(iResolution.y, iResolution.x);
    gl_FragColor = Circle(pos, vec2(0., 0.), .5, vec3(1., 1., 0.), .01);
	}
