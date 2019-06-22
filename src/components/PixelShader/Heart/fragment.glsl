// Reference: https://blog.csdn.net/candycat1992/article/details/44040273
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;

#define PI 3.1415926538;

vec4 Heart(vec2 uv) {
    // Shape
    float a = atan(uv.x, uv.y) / PI;
    float r = length(uv);
    float h = abs(a);
    float d = (13. * h - 22. * h * h + 10. * h * h * h) / (6. - 5. * h);    // 对心的形状进行修正

    // Color - 让心的颜色分布与心的形状拟合
    float s = 1.0 - 0.5 * clamp(r / d, .0, 1.);
		s = .75 + .75 * uv.x;
		s *= 1. - .25 * r;
		s = .5 + .6 * s;
		s *= 0.5 + .5 * pow(1. - clamp(r / d, 0., 1.), .1);
    vec3 color = vec3(1., .5 * r, .3) * s;

    return vec4(color, smoothstep(-.01, .01, d - r));
}

void main() {
	 	vec2 pos = (2.0 * gl_FragCoord.xy - iResolution.xy) / min(iResolution.x, iResolution.y);
    pos.y -= 0.25;

    // animate
  	float tt = mod(iTime, 4.) / 4.;        // 周期 4.0
  	float ss = pow(tt, .2) * .5 + .5;
  	ss = 1. + ss * .5 * sin(tt * 6.2831 * 3. + pos.y * .5) * exp(-tt * 4.);
  	pos *= vec2(.5, 1.5) + ss * vec2(.5, -.5);

    
    vec4 bgColor = vec4(vec3(1., .8, .7 - .07 * pos.y) * (1. - .25 * length(pos)), 1.);
    vec4 heart = Heart(pos);
    
    gl_FragColor = mix(bgColor, heart, heart.a);
}

