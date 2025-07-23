export interface ProgramInfo {
  program: WebGLProgram;
  attribLocations: {
    vertexPosition: GLuint;
    vertexColor: GLuint;
  };
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation;
    modelViewMatrix: WebGLUniformLocation;
  };
}
