import { mat4 } from "gl-matrix";
import type { ProgramInfo, ProgramInfoWithTexture } from "./types";
import type { initBuffers } from "./init-buffers";

type Buffers = ReturnType<typeof initBuffers>;

function drawScene(
  gl: WebGLRenderingContext,
  programInfo: ProgramInfo,
  buffers: Buffers,
  texture: WebGLTexture,
  cubeRotation: number
) {
  gl.clearColor(0.0, 0.0, 0.2, 1.0);
  gl.clearDepth(1.0);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // establish the viewing frustum
  const fieldOfView = (45 * Math.PI) / 180;
  const aspect =
    (gl.canvas as HTMLCanvasElement).clientWidth /
    (gl.canvas as HTMLCanvasElement).clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  const modelViewMatrix = mat4.create(); // identity

  // move the camera a back a bit as you'd do in three.js
  mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -6.0]);

  // const rotationMatrix = mat4.create();
  mat4.rotateX(modelViewMatrix, modelViewMatrix, cubeRotation * 0.3);
  mat4.rotateY(modelViewMatrix, modelViewMatrix, cubeRotation * 0.7);
  mat4.rotateZ(modelViewMatrix, modelViewMatrix, cubeRotation);

  setPositionAttribute(gl, buffers, programInfo);
  // setColorAttribute(gl, buffers, programInfo);
  setTextureAttribute(gl, buffers, programInfo);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  gl.useProgram(programInfo.program);

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );

  //
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

  //
  {
    const type = gl.UNSIGNED_SHORT;
    const vertexCount = 36;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }
}

function setTextureAttribute(
  gl: WebGLRenderingContext,
  buffers: Buffers,
  programInfo: ProgramInfoWithTexture
) {
  const num = 2;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);

  gl.vertexAttribPointer(
    programInfo.attribLocations.textureCoord,
    num,
    type,
    normalize,
    stride,
    offset
  );

  gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
}

function setPositionAttribute(
  gl: WebGLRenderingContext,
  buffers: Buffers,
  programInfo: ProgramInfo
) {
  const numComponents = 3;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );

  gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

function setColorAttribute(
  gl: WebGLRenderingContext,
  buffers: Buffers,
  programInfo: ProgramInfo
) {
  const numComponents = 4;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;

  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
  gl.vertexAttribPointer(
    programInfo.attribLocations.vertexColor,
    numComponents,
    type,
    normalize,
    stride,
    offset
  );

  gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
}

export { drawScene };
