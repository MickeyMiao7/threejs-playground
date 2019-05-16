// Vertex Shader

void main() {
  // Transform the location of the vertex
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

