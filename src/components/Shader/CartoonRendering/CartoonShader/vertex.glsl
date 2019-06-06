uniform vec3 color;
uniform vec3 light;

varying vec3 vNormal;
varying vec3 vLight;
varying vec3 vColor;

void main()
{
    vColor = color;
    vNormal = normalize(normalMatrix * normal);

    vLight = (viewMatrix * vec4(light, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
