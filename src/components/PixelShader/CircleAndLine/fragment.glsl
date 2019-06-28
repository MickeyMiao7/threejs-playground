// Reference: https://blog.csdn.net/candycat1992/article/details/44244549
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
  float d = abs(k * uv.x - uv.y + b) / sqrt(k * k + 1.);
  float t = smoothstep(width/2.0, width/2.0 + antialias, d);
  return vec4(color, 1. - t);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord ) {
	 	vec2 pos = (2.0 * fragCoord.xy - iResolution.xy) / min(iResolution.y, iResolution.x);

    vec4 bgColor = vec4(0., 0., 0., 1.);
    vec4 circle = Circle(pos, vec2(0., 0.), .5, vec3(1., 1., 0.), .01);
    vec4 line = Line(pos, vec2(0., 0.), vec2(.5, .5), .05, vec3(0., 0., 1.), .01);
    vec4 color = mix(bgColor, circle, circle.a);
    color = mix(color, line, line.a);
    fragColor = color;
}

