export default class ShaderCompileError extends Error {

  shader_type: string
  error_log: string

  constructor (type, error) {
    super(`Error creating ${type}: ${error}`);
    
    this.shader_type = type;
    this.error_log = error;
  }

};