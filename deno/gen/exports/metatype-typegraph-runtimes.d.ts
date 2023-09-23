export namespace ExportsMetatypeTypegraphRuntimes {
  export function getDenoRuntime(): RuntimeId;
  export function registerDenoFunc(data: MaterializerDenoFunc, effect: Effect): MaterializerId;
  export function getPredefinedDenoFunc(data: MaterializerDenoPredefined): MaterializerId;
  export function importDenoFunction(data: MaterializerDenoImport, effect: Effect): MaterializerId;
  export function registerGraphqlRuntime(data: GraphqlRuntimeData): RuntimeId;
  export function graphqlQuery(base: BaseMaterializer, data: MaterializerGraphqlQuery): MaterializerId;
  export function graphqlMutation(base: BaseMaterializer, data: MaterializerGraphqlQuery): MaterializerId;
  export function registerHttpRuntime(data: HttpRuntimeData): RuntimeId;
  export function httpRequest(base: BaseMaterializer, data: MaterializerHttpRequest): MaterializerId;
  export function registerPythonRuntime(): RuntimeId;
  export function fromPythonLambda(base: BaseMaterializer, data: MaterializerPythonLambda): MaterializerId;
  export function fromPythonDef(base: BaseMaterializer, data: MaterializerPythonDef): MaterializerId;
  export function fromPythonModule(base: BaseMaterializer, data: MaterializerPythonModule): MaterializerId;
  export function fromPythonImport(base: BaseMaterializer, data: MaterializerPythonImport): MaterializerId;
  export function registerRandomRuntime(data: RandomRuntimeData): MaterializerId;
  export function createRandomMat(base: BaseMaterializer, data: MaterializerRandom): MaterializerId;
  export function registerWasmedgeRuntime(): RuntimeId;
  export function fromWasiModule(base: BaseMaterializer, data: MaterializerWasi): MaterializerId;
  export function registerPrismaRuntime(data: PrismaRuntimeData): RuntimeId;
  export function prismaFindUnique(runtime: RuntimeId, model: TypeId): TypeFunc;
  export function prismaFindMany(runtime: RuntimeId, model: TypeId): TypeFunc;
  export function prismaFindFirst(runtime: RuntimeId, model: TypeId): TypeFunc;
  export function prismaAggregate(runtime: RuntimeId, model: TypeId): TypeFunc;
  export function prismaCount(runtime: RuntimeId, model: TypeId): TypeFunc;
  export function prismaGroupBy(runtime: RuntimeId, model: TypeId): TypeFunc;
  export function prismaCreateOne(runtime: RuntimeId, model: TypeId): TypeFunc;
  export function prismaCreateMany(runtime: RuntimeId, model: TypeId): TypeFunc;
  export function prismaUpdateOne(runtime: RuntimeId, model: TypeId): TypeFunc;
  export function prismaUpdateMany(runtime: RuntimeId, model: TypeId): TypeFunc;
  export function prismaUpsertOne(runtime: RuntimeId, model: TypeId): TypeFunc;
  export function prismaDeleteOne(runtime: RuntimeId, model: TypeId): TypeFunc;
  export function prismaDeleteMany(runtime: RuntimeId, model: TypeId): TypeFunc;
  export function prismaLink(data: PrismaLinkData): TypeId;
  export function registerTemporalRuntime(data: TemporalRuntimeData): RuntimeId;
  export function generateTemporalOperation(runtime: RuntimeId, data: TemporalOperationData): TypeFunc;
}
import type { Error } from '../exports/metatype-typegraph-core.d.ts';
export { Error };
import type { TypeId } from '../exports/metatype-typegraph-core.d.ts';
export { TypeId };
import type { TypeFunc } from '../exports/metatype-typegraph-core.d.ts';
export { TypeFunc };
import type { RuntimeId } from '../exports/metatype-typegraph-core.d.ts';
export { RuntimeId };
import type { MaterializerId } from '../exports/metatype-typegraph-core.d.ts';
export { MaterializerId };
export type Idempotency = boolean;
export type Effect = EffectNone | EffectCreate | EffectUpdate | EffectDelete;
export interface EffectNone {
  tag: 'none',
}
export interface EffectCreate {
  tag: 'create',
  val: Idempotency,
}
export interface EffectUpdate {
  tag: 'update',
  val: Idempotency,
}
export interface EffectDelete {
  tag: 'delete',
  val: Idempotency,
}
export interface BaseMaterializer {
  runtime: RuntimeId,
  effect: Effect,
}
export interface MaterializerDenoFunc {
  code: string,
  secrets: string[],
}
export interface MaterializerDenoPredefined {
  name: string,
}
export interface MaterializerDenoImport {
  funcName: string,
  module: string,
  secrets: string[],
}
export interface GraphqlRuntimeData {
  endpoint: string,
}
export interface MaterializerGraphqlQuery {
  path?: string[],
}
export interface HttpRuntimeData {
  endpoint: string,
  certSecret?: string,
  basicAuthSecret?: string,
}
/**
 * # Variants
 * 
 * ## `"get"`
 * 
 * ## `"post"`
 * 
 * ## `"put"`
 * 
 * ## `"patch"`
 * 
 * ## `"delete"`
 */
export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';
export interface MaterializerHttpRequest {
  method: HttpMethod,
  path: string,
  contentType?: string,
  headerPrefix?: string,
  queryFields?: string[],
  renameFields?: [string, string][],
  bodyFields?: string[],
  authTokenField?: string,
}
export interface MaterializerPythonDef {
  runtime: RuntimeId,
  name: string,
  fn: string,
}
export interface MaterializerPythonLambda {
  runtime: RuntimeId,
  fn: string,
}
export interface MaterializerPythonModule {
  runtime: RuntimeId,
  file: string,
}
export interface MaterializerPythonImport {
  module: number,
  funcName: string,
  secrets: string[],
}
export interface RandomRuntimeData {
  seed: number,
  reset?: string,
}
export interface MaterializerRandom {
  runtime: RuntimeId,
}
export interface MaterializerWasi {
  funcName: string,
  module: string,
}
export interface PrismaRuntimeData {
  name: string,
  connectionStringSecret: string,
}
export interface PrismaLinkData {
  targetType: TypeId,
  relationshipName?: string,
  foreignKey?: boolean,
  targetField?: string,
  unique?: boolean,
}
export interface TemporalRuntimeData {
  name: string,
  host: string,
}
export type TemporalOperationType = TemporalOperationTypeStartWorkflow | TemporalOperationTypeSignalWorkflow | TemporalOperationTypeQueryWorkflow | TemporalOperationTypeDescribeWorkflow;
export interface TemporalOperationTypeStartWorkflow {
  tag: 'start-workflow',
}
export interface TemporalOperationTypeSignalWorkflow {
  tag: 'signal-workflow',
}
export interface TemporalOperationTypeQueryWorkflow {
  tag: 'query-workflow',
}
export interface TemporalOperationTypeDescribeWorkflow {
  tag: 'describe-workflow',
}
export interface TemporalOperationData {
  matArg?: string,
  funcArg?: TypeId,
  operation: TemporalOperationType,
}
