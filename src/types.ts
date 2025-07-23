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
  program: WebGLProgram;
  attribLocations: {
    vertexPosition: GLuint;
    textureCoord: GLuint;
  };
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation;
    modelViewMatrix: WebGLUniformLocation;
    uSampler: WebGLUniformLocation;
  };
}

export interface ProgramInfoWithTextureAndLighting {
  program: WebGLProgram;
  attribLocations: {
    vertexPosition: GLuint;
    vertexNormal: GLuint;
    textureCoord: GLuint;
  };
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation;
    normalMatrix: WebGLUniformLocation;
    modelViewMatrix: WebGLUniformLocation;
    uSampler: WebGLUniformLocation;
  };
}
