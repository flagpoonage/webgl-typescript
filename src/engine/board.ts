import GameView from './view';
import ICoordinates from '../types/ICoordinates';
import createShaderProgram from './utils/create-shader-program';
import VerticeSet from './primitives/vertice-set';

const hexvert = `
  attribute vec2 vPosition;
  attribute float vDepth;

  void main() {
    gl_Position = vec4(vPosition, 0.5, vDepth);
  }
`;

const hexfrag = `
  precision mediump float;

  void main() {
    gl_FragColor = vec4(0.5, 0.7, 0.0, 0);
  }
`;

export default class GameBoard {
  update_time: number
  shader_program: WebGLProgram
  vertex_position: number
  depth_position: number

  constructor (gl: WebGLRenderingContext) {
    this.update_time = (new Date()).getTime();
    this.setTime = this.setTime.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);

    this.shader_program = createShaderProgram(gl, hexvert, hexfrag);

    this.vertex_position = gl.getAttribLocation(this.shader_program, 'vPosition');
    this.depth_position = gl.getAttribLocation(this.shader_program, 'vDepth');

    gl.enableVertexAttribArray(this.vertex_position);
    gl.enableVertexAttribArray(this.depth_position);
  }

  setTime (value: number) {
    this.update_time = value;
  }

  update (time: number) {
    this.setTime(time);
  }

  render (gl: WebGLRenderingContext) {
    gl.useProgram(this.shader_program);

    let ratio = gl.canvas.width / gl.canvas.height;
    let radius = 0.5;

   

    let v: Array<number> = [
      -2.0 * radius,  0.0 * ratio * radius, 2.0,
       0.0 * radius,  0.0 * ratio * radius, 2.0,
      -0.5 * radius,  1.0 * ratio * radius, 2.0,
       0.5 * radius,  1.0 * ratio * radius, 2.0,
       1.0 * radius,  0.0 * ratio * radius, 2.0,
       0.5 * radius, -1.0 * ratio * radius, 2.0,
      -0.5 * radius, -1.0 * ratio * radius, 2.0,
      -1.0 * radius,  0.0 * ratio * radius, 2.0
    ];

    let buffer: WebGLBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(v), gl.STATIC_DRAW);

    gl.vertexAttribPointer(this.vertex_position, 2, gl.FLOAT, false, 12, 0);
    gl.vertexAttribPointer(this.depth_position, 1, gl.FLOAT, false, 12, 8);
    
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 8);
  }
}