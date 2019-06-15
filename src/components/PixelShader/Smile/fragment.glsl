uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;

float constant = .3;

float Circle(vec2 uv, vec2 p, float r, float blur) {
    float d = length(uv - p);
    float c = smoothstep(r, r - blur, d);
    return c;
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    uv -= 0.5;
    uv.x = uv.x * iResolution.x / iResolution.y;

    vec2 p = vec2(.2, -.1);
    // float c = Circle(uv, vec2(.2, -.1), .4, .05) + Circle(uv, vec2(-.5, .2), .1 ,.01);
    float c = Circle(uv, vec2(0.), .4, .05)
              - Circle(uv, vec2(-.13, .2), .07, .01)
              - Circle(uv, vec2(.13, .2), .07, .01);
              
    float mouth = Circle(uv, vec2(0.), .3, .02);
    mouth -= Circle(uv, vec2(0.,0.1), .3, .02);

    vec3 color = vec3(1., 1., 0.) * c;
    // c = Circle(uv, vec2(-.5, .2), .1, .01);
    gl_FragColor = vec4(color, 1.);
}
 