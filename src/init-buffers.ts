function initBuffers(gl: WebGLRenderingContext) {
  const positionBuffer = init3DPositionBuffer(gl);
  const colorBuffer = init3DColorBuffer(gl);
  const indexBuffer = initIndexBuffer(gl);

  return {
    position: positionBuffer,
    color: colorBuffer,
    indices: indexBuffer,
  };
}

function initIndexBuffer(gl: WebGLRenderingContext) {
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // Each index refers to a triple in the cube vertex positions below
  // Two triangles for each face
  const indeces = [];

  for (let i = 0; i < 6; i++) {
    const j = i * 4;
    indeces.push(j, j + 1, j + 2);
    indeces.push(j + 1, j + 2, j + 3);
  }

  console.log(indeces)

  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indeces),
    gl.STATIC_DRAW
  );

  return indexBuffer;
}

/**
 * Initiate a vertex buffer for a cube
 */
function init3DPositionBuffer(gl: WebGLRenderingContext) {
  const positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // prettier-ignore
  const positions = [
    // Front face
    1.0, 1.0, 1.0,    -1.0, 1.0, 1.0,    1.0, -1.0, 1.0,  -1.0, -1.0, 1.0,
    
    // Back face
    1.0, 1.0, -1.0,    -1.0, 1.0, -1.0,    1.0, -1.0, -1.0,    -1.0, -1.0, -1.0,

    // Top face
    1.0, 1.0, 1.0,    -1.0, 1.0, 1.0,    1.0, 1.0, -1.0,    -1.0, 1.0, -1.0,
    
    // Bottom face
    1.0, -1.0, 1.0,    -1.0, -1.0, 1.0,    1.0, -1.0, -1.0,    -1.0, -1.0, -1.0,
    
    // Right face
    1.0, 1.0, 1.0,    1.0, -1.0, 1.0,    1.0, 1.0, -1.0,    1.0, -1.0, -1.0,

    // Left face
    -1.0, 1.0, 1.0,    -1.0, -1.0, 1.0,    -1.0, 1.0, -1.0,    -1.0, -1.0, -1.0,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  return positionBuffer;
}

function init3DColorBuffer(gl: WebGLRenderingContext) {
  const faceColors = [
    [1.0, 1.0, 1.0, 1.0], // white
    [1.0, 0.0, 0.0, 1.0], // red
    [0.0, 1.0, 0.0, 1.0], // green
    [0.0, 0.0, 1.0, 1.0], // blue
    [0.0, 1.0, 1.0, 1.0], // cyan
    [1.0, 0.0, 1.0, 1.0], // purple
  ];

  // Repeat each color four times for the four vertices forming the face
  const colors = faceColors.flatMap((values) => {
    return [values, values, values, values].flat();
  });

  const colorBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return colorBuffer;
}

/**
 * Initiate a vertex buffer for a vertical square
 */
function initPositionBuffer(gl: WebGLRenderingContext) {
  const positionBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const positions = [
    1.0,
    1.0, // top left
    -1.0,
    1.0, // top right
    1.0,
    -1.0, // bottom left
    -1.0,
    -1.0, // bottom right
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  return positionBuffer;
}

function initColorBuffer(gl: WebGLRenderingContext) {
  const colors = [
    1.0,
    1.0,
    1.0,
    1.0, // white
    1.0,
    0.0,
    0.0,
    1.0, // red
    0.0,
    1.0,
    0.0,
    1.0, // green
    0.0,
    0.0,
    1.0,
    1.0, // blue
  ];

  const colorBuffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return colorBuffer;
}

export { initBuffers };
