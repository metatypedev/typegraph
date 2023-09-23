export namespace ExportsMetatypeTypegraphCore {
  export function initTypegraph(params: TypegraphInitParams): void;
  export function finalizeTypegraph(): string;
  export function withInjection(data: TypeWithInjection): TypeId;
  export function proxyb(data: TypeProxy): TypeId;
  export function integerb(data: TypeInteger, base: TypeBase): TypeId;
  export function floatb(data: TypeFloat, base: TypeBase): TypeId;
  export function booleanb(base: TypeBase): TypeId;
  export function stringb(data: TypeString, base: TypeBase): TypeId;
  export function arrayb(data: TypeArray, base: TypeBase): TypeId;
  export function optionalb(data: TypeOptional, base: TypeBase): TypeId;
  export function unionb(data: TypeUnion, base: TypeBase): TypeId;
  export function eitherb(data: TypeEither, base: TypeBase): TypeId;
  export function structb(data: TypeStruct, base: TypeBase): TypeId;
  export function getTypeRepr(id: TypeId): string;
  export function funcb(data: TypeFunc): TypeId;
  export function registerPolicy(pol: Policy): PolicyId;
  export function withPolicy(data: TypePolicy): TypeId;
  export function registerContextPolicy(key: string, check: ContextCheck): [PolicyId, string];
  export function expose(fns: [string, TypeId][], namespace: string[], defaultPolicy: PolicySpec[] | null): void;
}
export type Error = string;
export interface Cors {
  allowOrigin: string[],
  allowHeaders: string[],
  exposeHeaders: string[],
  allowMethods: string[],
  allowCredentials: boolean,
  maxAgeSec?: number,
}
export type AuthProtocol = AuthProtocolOauth2 | AuthProtocolJwt | AuthProtocolBasic;
export interface AuthProtocolOauth2 {
  tag: 'oauth2',
}
export interface AuthProtocolJwt {
  tag: 'jwt',
}
export interface AuthProtocolBasic {
  tag: 'basic',
}
export interface Auth {
  name: string,
  protocol: AuthProtocol,
  authData: [string, string][],
}
export interface Rate {
  windowLimit: number,
  windowSec: number,
  queryLimit: number,
  contextIdentifier?: string,
  localExcess: number,
}
export interface TypegraphInitParams {
  name: string,
  dynamic?: boolean,
  folder?: string,
  path: string,
  prefix?: string,
  secrets: string[],
  cors: Cors,
  auths: Auth[],
  rate?: Rate,
}
export type TypeId = number;
export interface TypeBase {
  name?: string,
  runtimeConfig?: [string, string][],
  asId: boolean,
}
export interface TypeWithInjection {
  tpe: TypeId,
  injection: string,
}
export interface TypeProxy {
  name: string,
  extras: [string, string][],
}
export interface TypeInteger {
  min?: number,
  max?: number,
  exclusiveMinimum?: number,
  exclusiveMaximum?: number,
  multipleOf?: number,
  enumeration?: Int32Array,
}
export interface TypeFloat {
  min?: number,
  max?: number,
  exclusiveMinimum?: number,
  exclusiveMaximum?: number,
  multipleOf?: number,
  enumeration?: Float64Array,
}
export interface TypeString {
  min?: number,
  max?: number,
  format?: string,
  pattern?: string,
  enumeration?: string[],
}
export interface TypeArray {
  of: TypeId,
  min?: number,
  max?: number,
  uniqueItems?: boolean,
}
export interface TypeOptional {
  of: TypeId,
  defaultItem?: string,
}
export interface TypeUnion {
  variants: Uint32Array,
}
export interface TypeEither {
  variants: Uint32Array,
}
export interface TypeStruct {
  props: [string, TypeId][],
  additionalProps: boolean,
  min?: number,
  max?: number,
}
export type PolicyId = number;
export interface PolicyPerEffect {
  none?: PolicyId,
  create?: PolicyId,
  update?: PolicyId,
  'delete'?: PolicyId,
}
export type PolicySpec = PolicySpecSimple | PolicySpecPerEffect;
export interface PolicySpecSimple {
  tag: 'simple',
  val: PolicyId,
}
export interface PolicySpecPerEffect {
  tag: 'per-effect',
  val: PolicyPerEffect,
}
export interface TypePolicy {
  tpe: TypeId,
  chain: PolicySpec[],
}
export type ContextCheck = ContextCheckValue | ContextCheckPattern;
export interface ContextCheckValue {
  tag: 'value',
  val: string,
}
export interface ContextCheckPattern {
  tag: 'pattern',
  val: string,
}
export type RuntimeId = number;
export type MaterializerId = number;
export interface TypeFunc {
  inp: TypeId,
  out: TypeId,
  mat: MaterializerId,
}
export interface Policy {
  name: string,
  materializer: MaterializerId,
}
