// https://thebookofshaders.com/07/
uniform vec2 iResolution;
uniform float iTime;
uniform vec2 iMouse;

vec3 Circle(vec2 pos, vec2 center, float radius, float blur, vec3 color) {
    return color * (1. - smoothstep(radius, radius + blur, distance(pos, center)));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord ) {
    vec2 st = fragCoord.xy / iResolution.xy;
    // float color = distance(st, vec2(.5));

    // Use step() to turn everything above 0.5 to white and everything below to 0.0.
    // float color = step(.5, distance(st, vec2(.5)));

    // Inverse the colors of the background and foreground.
    // float color = step(.5, 1. - distance(st, vec2(.5)));

    // Using smoothstep(), experiment with different values to get nice smooth borders on your circle.
    // float color = smoothstep(.5, .5 + .05, distance(st, vec2(.5)));
    // fragColor = vec4(vec3(color), 1.);

    // Once you are happy with an implementation, make a function of it that you can reuse in the future.
    // Add color to the circle.
    // vec3 color = Circle(st, vec2(.0, .0), .5, .05, vec3(1., 0., 0.) );
    // fragColor = vec4(color, 1.);

    vec3 circle1 = Circle(st, vec2(.5, .5), .1, .01, vec3(.3, 0., 0.));
    vec3 circle2 = Circle(st, vec2(.8, .8), .1, .05, vec3(0., .4, 0.));
    vec3 color = circle1 + circle2;
    fragColor = vec4(color, 1.);

    float pct;
    pct = distance(st,vec2(0.4)) + distance(st,vec2(0.6));
    pct = distance(st,vec2(0.4)) * distance(st,vec2(0.6));
    pct = min(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
    // pct = max(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
    // pct = pow(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
    fragColor = vec4(vec3(pct), 1.);
}
