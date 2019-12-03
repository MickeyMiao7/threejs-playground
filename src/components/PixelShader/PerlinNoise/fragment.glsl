// Reference: https://blog.csdn.net/candycat1992/article/details/44040273
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;


// perlin
void mainImage(out vec4 fragColor, in vec2 fragCoord ) {
	 	vec2 pos = (2.0 * fragCoord.xy - iResolution.xy) / min(iResolution.x, iResolution.y);
    pos.y -= 0.25;

    // animate
  	float tt = mod(iTime, 4.) / 4.;        // 周期 4.0
  	float ss = pow(tt, .2) * .5 + .5;
  	ss = 1. + ss * .5 * sin(tt * 6.2831 * 3. + pos.y * .5) * exp(-tt * 4.);
  	pos *= vec2(.5, 1.5) + ss * vec2(.5, -.5);

    
    vec4 bgColor = vec4(vec3(1., .8, .7 - .07 * pos.y) * (1. - .25 * length(pos)), 1.);
    vec4 heart = Heart(pos);
    
    fragColor = mix(bgColor, heart, heart.a);
}
