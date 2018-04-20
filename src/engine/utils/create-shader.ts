import ShaderCompileError from "../errors/shader-compile-error";

export default (gl: WebGLRenderingContext, shader_content: string, shader_type: number): WebGLShader => {
  let shader = gl.createShader(shader_type);

  gl.shaderSource(shader, shader_content);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new ShaderCompileError('vertex', gl.getShaderInfoLog(shader));
  }

  return shader;
}