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

export interface ProgramInfoWithTexture {
  program: WebGLProgram | null;
  attribLocations: {
    vertexPosition: GLuint;
    textureCoord: GLuint;
  };
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation | null;
    modelViewMatrix: WebGLUniformLocation | null;
    uSampler: WebGLUniformLocation | null;
  };
}
