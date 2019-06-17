uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;

float constant = .3;

float Circle(vec2 uv, vec2 p, float r, float blur) {
    float d = length(uv - p);
    float c = smoothstep(r, r - blur, d);
    return c;
}

float Smile(vec2 uv, vec2 p, float size) {
    uv -= p;
    uv /= size;

    float c = Circle(uv, vec2(0.), .4, .05)                  // main circle
              - Circle(uv, vec2(-.13, .2), .07, .01)         // eye
              - Circle(uv, vec2(.13, .2), .07, .01);         // eye

    float mouth = Circle(uv, vec2(0.), .3, .02);             // mouth
    mouth -= Circle(uv, vec2(0.,0.1), .3, .02);

    c -= mouth;
    return c;
}

void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    uv -= 0.5;
    uv.x = uv.x * iResolution.x / iResolution.y;

    vec2 p = vec2(sin(iTime) * .7, cos(iTime) * .3);
    float c = Smile(uv, p, .5);
    vec3 color = vec3(1., 1., 0.) * c;

    gl_FragColor = vec4(color, 1.);
}
 