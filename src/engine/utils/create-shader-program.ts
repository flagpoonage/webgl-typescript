import ShaderCompileError from "../errors/shader-compile-error";
import ShaderProgramCompileError from "../errors/shader-program-compile-error";
import createShader from './create-shader';

export default (gl: WebGLRenderingContext, vertex_content: string, fragment_content: string): WebGLProgram => {

  let v_shader: WebGLShader, 
      f_shader: WebGLShader;

  try {
    v_shader = createShader(gl, vertex_content, gl.VERTEX_SHADER);
    f_shader = createShader(gl, fragment_content, gl.FRAGMENT_SHADER);
  }
  catch (compile_error) {
    throw new ShaderProgramCompileError(compile_error);
  }

  let program: WebGLProgram = gl.createProgram();

  gl.attachShader(program, v_shader);
  gl.attachShader(program, f_shader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new ShaderProgramCompileError(
      `Unable to link shader program: ${gl.getProgramInfoLog(program)}`);
  }

  return program;
};