varying highp vec2 vTextureCoord;

uniform sampler2D uSampler;

void main(){
  // fetch the color of the texel: this is the color of the pixel
  gl_FragColor = texture2D(uSampler, vTextureCoord);
}