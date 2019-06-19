//片元着色器
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;
uniform vec2 iMous3w23e;

void main() {
    vec2 st = gl_FragCoord.xy / iResolution.xy;
//  vec2 pos = fragCoord; // pos.x ~ (0, iResolution.x), pos.y ~ (0, iResolution.y)
//  vec2 pos = fragCoord.xy / iResolution.xy; // pos.x ~ (0, 1), pos.y ~ (0, 1)
//  vec2 pos = fragCoord / min(iResolution.x, iResolution.y); // If iResolution.x > iResolution.y, pos.x ~ (0, 1.xx), pos.y ~ (0, 1)
//  vec2 pos =fragCoord.xy / iResolution.xy * 2. - 1.; // pos.x ~ (-1, 1), pos.y ~ (-1, 1)
//  vec2 pos = (2.0*fragCoord.xy-iResolution.xy)/min(iResolution.x,iResolution.y);	// If iResolution.x > iResolution.y, pos.x ~ (-1.xx, 1.xx), pos.y ~ (-1, 1)
			
    gl_FragColor = vec4(st.x, st.y, 0.0, 1.0);
}
 