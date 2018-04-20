import ShaderCompileError from "./shader-compile-error";

export default class ShaderProgramCompileError extends Error {

  constructor (error: any) {
    if (error instanceof Error) {
      super(error.message);
    }
    
    super(error);
  }

};