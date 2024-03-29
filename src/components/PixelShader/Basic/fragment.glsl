//片元着色器
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;

void mainImage(out vec4 fragColor, in vec2 fragCoord ) {
    vec2 st = fragCoord.xy / iResolution.xy;
    fragColor = vec4(st.x, st.y, 0.0, 1.0);
}
