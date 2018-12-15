declare module 'glslify' {
  interface IGlslifyOpts {
      basedir?: string;
      transform?: string[];
  }
  function glsl(shaderSource: string, opts: IGlslifyOpts): string;
  export function compile(src: string, opts: IGlslifyOpts): string;
  export function file(filename: string, opts: IGlslifyOpts): string;
  export default glsl;
}

declare module '*.glsl';