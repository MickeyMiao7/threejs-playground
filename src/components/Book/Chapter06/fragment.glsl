// https://thebookofshaders.com/07/
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;

#define TWO_PI 6.28318530718

// float plotLine(vec2 st, float pct) {
//     return smoothstep(pct - .01, pct, st.y) - smoothstep(pct, pct + .1, st.y);
// }

// void mainImage(out vec4 fragColor, in vec2 fragCoord ) {
//     vec2 st = fragCoord.xy / iResolution.xy;
//     float pct = plotLine(st, st.x);

//     vec3 color  = (1. - pct) * vec3(0., 0., 0.) + pct * vec3(0., 1., 0.);
//     fragColor = vec4(color, 1.);
// }

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord ) {
    vec2 st = fragCoord.xy / iResolution.xy;

    vec2 toCenter = vec2(.5) - st;
    float angle = atan(toCenter.y, toCenter.x);
    float radius = length(toCenter);

    vec3 color = hsb2rgb(vec3(angle / TWO_PI, 2. * radius, 1.));

    // vec3 color  = (1. - pct) * vec3(0., 0., 0.) + pct * vec3(0., 1., 0.);
    fragColor = vec4(color, 1.);
}

