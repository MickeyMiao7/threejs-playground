uniform float silhouetteLimit;

varying vec3 vNormal;
varying vec3 vColor;
varying vec3 vLight;

void main() {
    float silhouette = length(vNormal * vec3(0.0, 0.0, 1.0));
    if (silhouette < silhouetteLimit) {
        silhouette = 0.0;
    }
    else {
        silhouette = 1.0;
    }

    float diffuse = dot(normalize(vLight), vNormal);
    if (diffuse > 0.8) {
        diffuse = 1.0;
    }
    else if (diffuse > 0.5) {
        diffuse = 0.6;
    }
    else if (diffuse > 0.2) {
        diffuse = 0.4;
    }
    else {
        diffuse = 0.2;
    }
    gl_FragColor = vec4(vColor * diffuse * silhouette, 1.0);
}
