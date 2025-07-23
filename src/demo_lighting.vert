attribute vec4 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uNormalMatrix; // inverse transpose of uModelViewMatrix

varying highp vec2 vTextureCoord;
varying highp vec3 vLighting;

void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  vTextureCoord = aTextureCoord;

  // Apply lighting effect

  highp vec3 ambientLightColor = vec3(0.53, 0.49, 0.58);
  highp vec3 directionalLightColor = vec3(0.0, 1.0, 0.12);
  highp vec3 directionalVector = normalize(vec3(-10, 10, 10));

  highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

  // The amount of directional lighting that needs to be applied to this vertex
  // Maximum when vertex normal is parallel and opposite to the light's direction
  highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);

  // a color without the alpha component
  vLighting = ambientLightColor + (directionalLightColor * directional);
}