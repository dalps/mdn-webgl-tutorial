varying lowp vec4 vColor;

void main(){
  gl_FragColor = vColor * vec4(1.1, 1.2, 1.2, 1.0);
}