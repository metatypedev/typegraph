export namespace ExportsMetatypeTypegraphUtils {
  export function genApplyb(supertypeId: TypeId, data: Apply): TypeId;
}
export type Error = string;
export type TypeId = number;
export interface ApplyValue {
  inherit: boolean,
  payload?: string,
}
export interface ApplyPath {
  path: string[],
  value: ApplyValue,
}
export interface Apply {
  paths: ApplyPath[],
}
