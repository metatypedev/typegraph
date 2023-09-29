import { glob, readFile } from "../src/imports.ts";

const base64Compile = (str) =>
  WebAssembly.compile(Uint8Array.from(atob(str), (b) => b.charCodeAt(0)));

class ComponentError extends Error {
  constructor(value) {
    const enumerable = typeof value !== "string";
    super(enumerable ? `${String(value)} (see error.payload)` : value);
    Object.defineProperty(this, "payload", { value, enumerable });
  }
}

let dv = new DataView(new ArrayBuffer());
const dataView = (mem) =>
  dv.buffer === mem.buffer ? dv : (dv = new DataView(mem.buffer));

const fetchCompile = (url) => {
  console.log(url);
  fetch(url).then(WebAssembly.compileStreaming);
};

function getErrorPayload(e) {
  if (e && hasOwnProperty.call(e, "payload")) return e.payload;
  return e;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

const instantiateCore = WebAssembly.instantiate;

function toInt32(val) {
  return val >> 0;
}

function toUint32(val) {
  return val >>> 0;
}

const utf8Decoder = new TextDecoder();

const utf8Encoder = new TextEncoder();

let utf8EncodedLen = 0;
function utf8Encode(s, realloc, memory) {
  if (typeof s !== "string") throw new TypeError("expected a string");
  if (s.length === 0) {
    utf8EncodedLen = 0;
    return 1;
  }
  let allocLen = 0;
  let ptr = 0;
  let writtenTotal = 0;
  while (s.length > 0) {
    ptr = realloc(ptr, allocLen, 1, allocLen + s.length);
    allocLen += s.length;
    const { read, written } = utf8Encoder.encodeInto(
      s,
      new Uint8Array(memory.buffer, ptr + writtenTotal, allocLen - writtenTotal)
    );
    writtenTotal += written;
    s = s.slice(read);
  }
  if (allocLen > writtenTotal) ptr = realloc(ptr, allocLen, 1, writtenTotal);
  utf8EncodedLen = writtenTotal;
  return ptr;
}

let exports0;
let exports1;
let memory0;
let realloc0;

function lowering0(arg0, arg1, arg2, arg3, arg4) {
  const ptr0 = arg0;
  const len0 = arg1;
  const result0 = utf8Decoder.decode(
    new Uint8Array(memory0.buffer, ptr0, len0)
  );
  const len2 = arg3;
  const base2 = arg2;
  const result2 = [];
  for (let i = 0; i < len2; i++) {
    const base = base2 + i * 8;
    const ptr1 = dataView(memory0).getInt32(base + 0, true);
    const len1 = dataView(memory0).getInt32(base + 4, true);
    const result1 = utf8Decoder.decode(
      new Uint8Array(memory0.buffer, ptr1, len1)
    );
    result2.push(result1);
  }
  let ret;
  try {
    ret = { tag: "ok", val: glob(result0, result2) };
  } catch (e) {
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  const variant6 = ret;
  switch (variant6.tag) {
    case "ok": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg4 + 0, 0, true);
      const vec4 = e;
      const len4 = vec4.length;
      const result4 = realloc0(0, 0, 4, len4 * 8);
      for (let i = 0; i < vec4.length; i++) {
        const e = vec4[i];
        const base = result4 + i * 8;
        const ptr3 = utf8Encode(e, realloc0, memory0);
        const len3 = utf8EncodedLen;
        dataView(memory0).setInt32(base + 4, len3, true);
        dataView(memory0).setInt32(base + 0, ptr3, true);
      }
      dataView(memory0).setInt32(arg4 + 8, len4, true);
      dataView(memory0).setInt32(arg4 + 4, result4, true);
      break;
    }
    case "err": {
      const e = variant6.val;
      dataView(memory0).setInt8(arg4 + 0, 1, true);
      const ptr5 = utf8Encode(e, realloc0, memory0);
      const len5 = utf8EncodedLen;
      dataView(memory0).setInt32(arg4 + 8, len5, true);
      dataView(memory0).setInt32(arg4 + 4, ptr5, true);
      break;
    }
    default: {
      throw new TypeError("invalid variant specified for result");
    }
  }
}

function lowering1(arg0, arg1, arg2) {
  const ptr0 = arg0;
  const len0 = arg1;
  const result0 = utf8Decoder.decode(
    new Uint8Array(memory0.buffer, ptr0, len0)
  );
  let ret;
  try {
    ret = { tag: "ok", val: readFile(result0) };
  } catch (e) {
    ret = { tag: "err", val: getErrorPayload(e) };
  }
  const variant3 = ret;
  switch (variant3.tag) {
    case "ok": {
      const e = variant3.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      const ptr1 = utf8Encode(e, realloc0, memory0);
      const len1 = utf8EncodedLen;
      dataView(memory0).setInt32(arg2 + 8, len1, true);
      dataView(memory0).setInt32(arg2 + 4, ptr1, true);
      break;
    }
    case "err": {
      const e = variant3.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      const ptr2 = utf8Encode(e, realloc0, memory0);
      const len2 = utf8EncodedLen;
      dataView(memory0).setInt32(arg2 + 8, len2, true);
      dataView(memory0).setInt32(arg2 + 4, ptr2, true);
      break;
    }
    default: {
      throw new TypeError("invalid variant specified for result");
    }
  }
}
let exports2;
let postReturn0;
let postReturn1;
let postReturn2;
let postReturn3;
let postReturn4;
let postReturn5;
let postReturn6;
let postReturn7;
let postReturn8;
let postReturn9;
let postReturn10;
let postReturn11;
let postReturn12;
let postReturn13;
let postReturn14;
let postReturn15;
let postReturn16;
let postReturn17;
let postReturn18;
let postReturn19;
let postReturn20;
let postReturn21;
let postReturn22;
let postReturn23;
let postReturn24;
let postReturn25;
let postReturn26;
let postReturn27;
let postReturn28;
let postReturn29;
let postReturn30;
let postReturn31;
let postReturn32;
let postReturn33;
let postReturn34;
let postReturn35;
let postReturn36;
let postReturn37;
let postReturn38;
let postReturn39;
let postReturn40;
let postReturn41;
let postReturn42;
let postReturn43;
let postReturn44;
let postReturn45;
let postReturn46;
let postReturn47;
let postReturn48;
let postReturn49;
let postReturn50;
let postReturn51;
let postReturn52;
let postReturn53;

function initTypegraph(arg0) {
  const ptr0 = realloc0(0, 0, 4, 136);
  const {
    name: v1_0,
    dynamic: v1_1,
    folder: v1_2,
    path: v1_3,
    prefix: v1_4,
    secrets: v1_5,
    cors: v1_6,
    auths: v1_7,
    rate: v1_8,
  } = arg0;
  const ptr2 = utf8Encode(v1_0, realloc0, memory0);
  const len2 = utf8EncodedLen;
  dataView(memory0).setInt32(ptr0 + 4, len2, true);
  dataView(memory0).setInt32(ptr0 + 0, ptr2, true);
  const variant3 = v1_1;
  if (variant3 === null || variant3 === undefined) {
    dataView(memory0).setInt8(ptr0 + 8, 0, true);
  } else {
    const e = variant3;
    dataView(memory0).setInt8(ptr0 + 8, 1, true);
    dataView(memory0).setInt8(ptr0 + 9, e ? 1 : 0, true);
  }
  const variant5 = v1_2;
  if (variant5 === null || variant5 === undefined) {
    dataView(memory0).setInt8(ptr0 + 12, 0, true);
  } else {
    const e = variant5;
    dataView(memory0).setInt8(ptr0 + 12, 1, true);
    const ptr4 = utf8Encode(e, realloc0, memory0);
    const len4 = utf8EncodedLen;
    dataView(memory0).setInt32(ptr0 + 20, len4, true);
    dataView(memory0).setInt32(ptr0 + 16, ptr4, true);
  }
  const ptr6 = utf8Encode(v1_3, realloc0, memory0);
  const len6 = utf8EncodedLen;
  dataView(memory0).setInt32(ptr0 + 28, len6, true);
  dataView(memory0).setInt32(ptr0 + 24, ptr6, true);
  const variant8 = v1_4;
  if (variant8 === null || variant8 === undefined) {
    dataView(memory0).setInt8(ptr0 + 32, 0, true);
  } else {
    const e = variant8;
    dataView(memory0).setInt8(ptr0 + 32, 1, true);
    const ptr7 = utf8Encode(e, realloc0, memory0);
    const len7 = utf8EncodedLen;
    dataView(memory0).setInt32(ptr0 + 40, len7, true);
    dataView(memory0).setInt32(ptr0 + 36, ptr7, true);
  }
  const vec10 = v1_5;
  const len10 = vec10.length;
  const result10 = realloc0(0, 0, 4, len10 * 8);
  for (let i = 0; i < vec10.length; i++) {
    const e = vec10[i];
    const base = result10 + i * 8;
    const ptr9 = utf8Encode(e, realloc0, memory0);
    const len9 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len9, true);
    dataView(memory0).setInt32(base + 0, ptr9, true);
  }
  dataView(memory0).setInt32(ptr0 + 48, len10, true);
  dataView(memory0).setInt32(ptr0 + 44, result10, true);
  const {
    allowOrigin: v11_0,
    allowHeaders: v11_1,
    exposeHeaders: v11_2,
    allowMethods: v11_3,
    allowCredentials: v11_4,
    maxAgeSec: v11_5,
  } = v1_6;
  const vec13 = v11_0;
  const len13 = vec13.length;
  const result13 = realloc0(0, 0, 4, len13 * 8);
  for (let i = 0; i < vec13.length; i++) {
    const e = vec13[i];
    const base = result13 + i * 8;
    const ptr12 = utf8Encode(e, realloc0, memory0);
    const len12 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len12, true);
    dataView(memory0).setInt32(base + 0, ptr12, true);
  }
  dataView(memory0).setInt32(ptr0 + 56, len13, true);
  dataView(memory0).setInt32(ptr0 + 52, result13, true);
  const vec15 = v11_1;
  const len15 = vec15.length;
  const result15 = realloc0(0, 0, 4, len15 * 8);
  for (let i = 0; i < vec15.length; i++) {
    const e = vec15[i];
    const base = result15 + i * 8;
    const ptr14 = utf8Encode(e, realloc0, memory0);
    const len14 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len14, true);
    dataView(memory0).setInt32(base + 0, ptr14, true);
  }
  dataView(memory0).setInt32(ptr0 + 64, len15, true);
  dataView(memory0).setInt32(ptr0 + 60, result15, true);
  const vec17 = v11_2;
  const len17 = vec17.length;
  const result17 = realloc0(0, 0, 4, len17 * 8);
  for (let i = 0; i < vec17.length; i++) {
    const e = vec17[i];
    const base = result17 + i * 8;
    const ptr16 = utf8Encode(e, realloc0, memory0);
    const len16 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len16, true);
    dataView(memory0).setInt32(base + 0, ptr16, true);
  }
  dataView(memory0).setInt32(ptr0 + 72, len17, true);
  dataView(memory0).setInt32(ptr0 + 68, result17, true);
  const vec19 = v11_3;
  const len19 = vec19.length;
  const result19 = realloc0(0, 0, 4, len19 * 8);
  for (let i = 0; i < vec19.length; i++) {
    const e = vec19[i];
    const base = result19 + i * 8;
    const ptr18 = utf8Encode(e, realloc0, memory0);
    const len18 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len18, true);
    dataView(memory0).setInt32(base + 0, ptr18, true);
  }
  dataView(memory0).setInt32(ptr0 + 80, len19, true);
  dataView(memory0).setInt32(ptr0 + 76, result19, true);
  dataView(memory0).setInt8(ptr0 + 84, v11_4 ? 1 : 0, true);
  const variant20 = v11_5;
  if (variant20 === null || variant20 === undefined) {
    dataView(memory0).setInt8(ptr0 + 88, 0, true);
  } else {
    const e = variant20;
    dataView(memory0).setInt8(ptr0 + 88, 1, true);
    dataView(memory0).setInt32(ptr0 + 92, toUint32(e), true);
  }
  const vec28 = v1_7;
  const len28 = vec28.length;
  const result28 = realloc0(0, 0, 4, len28 * 20);
  for (let i = 0; i < vec28.length; i++) {
    const e = vec28[i];
    const base = result28 + i * 20;
    const { name: v21_0, protocol: v21_1, authData: v21_2 } = e;
    const ptr22 = utf8Encode(v21_0, realloc0, memory0);
    const len22 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len22, true);
    dataView(memory0).setInt32(base + 0, ptr22, true);
    const variant23 = v21_1;
    switch (variant23.tag) {
      case "oauth2": {
        dataView(memory0).setInt8(base + 8, 0, true);
        break;
      }
      case "jwt": {
        dataView(memory0).setInt8(base + 8, 1, true);
        break;
      }
      case "basic": {
        dataView(memory0).setInt8(base + 8, 2, true);
        break;
      }
      default: {
        throw new TypeError("invalid variant specified for AuthProtocol");
      }
    }
    const vec27 = v21_2;
    const len27 = vec27.length;
    const result27 = realloc0(0, 0, 4, len27 * 16);
    for (let i = 0; i < vec27.length; i++) {
      const e = vec27[i];
      const base = result27 + i * 16;
      const [tuple24_0, tuple24_1] = e;
      const ptr25 = utf8Encode(tuple24_0, realloc0, memory0);
      const len25 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len25, true);
      dataView(memory0).setInt32(base + 0, ptr25, true);
      const ptr26 = utf8Encode(tuple24_1, realloc0, memory0);
      const len26 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 12, len26, true);
      dataView(memory0).setInt32(base + 8, ptr26, true);
    }
    dataView(memory0).setInt32(base + 16, len27, true);
    dataView(memory0).setInt32(base + 12, result27, true);
  }
  dataView(memory0).setInt32(ptr0 + 100, len28, true);
  dataView(memory0).setInt32(ptr0 + 96, result28, true);
  const variant32 = v1_8;
  if (variant32 === null || variant32 === undefined) {
    dataView(memory0).setInt8(ptr0 + 104, 0, true);
  } else {
    const e = variant32;
    dataView(memory0).setInt8(ptr0 + 104, 1, true);
    const {
      windowLimit: v29_0,
      windowSec: v29_1,
      queryLimit: v29_2,
      contextIdentifier: v29_3,
      localExcess: v29_4,
    } = e;
    dataView(memory0).setInt32(ptr0 + 108, toUint32(v29_0), true);
    dataView(memory0).setInt32(ptr0 + 112, toUint32(v29_1), true);
    dataView(memory0).setInt32(ptr0 + 116, toUint32(v29_2), true);
    const variant31 = v29_3;
    if (variant31 === null || variant31 === undefined) {
      dataView(memory0).setInt8(ptr0 + 120, 0, true);
    } else {
      const e = variant31;
      dataView(memory0).setInt8(ptr0 + 120, 1, true);
      const ptr30 = utf8Encode(e, realloc0, memory0);
      const len30 = utf8EncodedLen;
      dataView(memory0).setInt32(ptr0 + 128, len30, true);
      dataView(memory0).setInt32(ptr0 + 124, ptr30, true);
    }
    dataView(memory0).setInt32(ptr0 + 132, toUint32(v29_4), true);
  }
  const ret = exports1["metatype:typegraph/core#init-typegraph"](ptr0);
  let variant34;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant34 = {
        tag: "ok",
        val: undefined,
      };
      break;
    }
    case 1: {
      const ptr33 = dataView(memory0).getInt32(ret + 4, true);
      const len33 = dataView(memory0).getInt32(ret + 8, true);
      const result33 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr33, len33)
      );
      variant34 = {
        tag: "err",
        val: result33,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn0(ret);
  if (variant34.tag === "err") {
    throw new ComponentError(variant34.val);
  }
  return variant34.val;
}

function finalizeTypegraph() {
  const ret = exports1["metatype:typegraph/core#finalize-typegraph"]();
  let variant2;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      const ptr0 = dataView(memory0).getInt32(ret + 4, true);
      const len0 = dataView(memory0).getInt32(ret + 8, true);
      const result0 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr0, len0)
      );
      variant2 = {
        tag: "ok",
        val: result0,
      };
      break;
    }
    case 1: {
      const ptr1 = dataView(memory0).getInt32(ret + 4, true);
      const len1 = dataView(memory0).getInt32(ret + 8, true);
      const result1 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr1, len1)
      );
      variant2 = {
        tag: "err",
        val: result1,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn1(ret);
  if (variant2.tag === "err") {
    throw new ComponentError(variant2.val);
  }
  return variant2.val;
}

function withInjection(arg0) {
  const { tpe: v0_0, injection: v0_1 } = arg0;
  const ptr1 = utf8Encode(v0_1, realloc0, memory0);
  const len1 = utf8EncodedLen;
  const ret = exports1["metatype:typegraph/core#with-injection"](
    toUint32(v0_0),
    ptr1,
    len1
  );
  let variant3;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant3 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr2 = dataView(memory0).getInt32(ret + 4, true);
      const len2 = dataView(memory0).getInt32(ret + 8, true);
      const result2 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr2, len2)
      );
      variant3 = {
        tag: "err",
        val: result2,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn2(ret);
  if (variant3.tag === "err") {
    throw new ComponentError(variant3.val);
  }
  return variant3.val;
}

function proxyb(arg0) {
  const { name: v0_0, extras: v0_1 } = arg0;
  const ptr1 = utf8Encode(v0_0, realloc0, memory0);
  const len1 = utf8EncodedLen;
  const vec5 = v0_1;
  const len5 = vec5.length;
  const result5 = realloc0(0, 0, 4, len5 * 16);
  for (let i = 0; i < vec5.length; i++) {
    const e = vec5[i];
    const base = result5 + i * 16;
    const [tuple2_0, tuple2_1] = e;
    const ptr3 = utf8Encode(tuple2_0, realloc0, memory0);
    const len3 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len3, true);
    dataView(memory0).setInt32(base + 0, ptr3, true);
    const ptr4 = utf8Encode(tuple2_1, realloc0, memory0);
    const len4 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 12, len4, true);
    dataView(memory0).setInt32(base + 8, ptr4, true);
  }
  const ret = exports1["metatype:typegraph/core#proxyb"](
    ptr1,
    len1,
    result5,
    len5
  );
  let variant7;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant7 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr6 = dataView(memory0).getInt32(ret + 4, true);
      const len6 = dataView(memory0).getInt32(ret + 8, true);
      const result6 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr6, len6)
      );
      variant7 = {
        tag: "err",
        val: result6,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn3(ret);
  if (variant7.tag === "err") {
    throw new ComponentError(variant7.val);
  }
  return variant7.val;
}

function integerb(arg0, arg1) {
  const ptr0 = realloc0(0, 0, 4, 80);
  const {
    min: v1_0,
    max: v1_1,
    exclusiveMinimum: v1_2,
    exclusiveMaximum: v1_3,
    multipleOf: v1_4,
    enumeration: v1_5,
  } = arg0;
  const variant2 = v1_0;
  if (variant2 === null || variant2 === undefined) {
    dataView(memory0).setInt8(ptr0 + 0, 0, true);
  } else {
    const e = variant2;
    dataView(memory0).setInt8(ptr0 + 0, 1, true);
    dataView(memory0).setInt32(ptr0 + 4, toInt32(e), true);
  }
  const variant3 = v1_1;
  if (variant3 === null || variant3 === undefined) {
    dataView(memory0).setInt8(ptr0 + 8, 0, true);
  } else {
    const e = variant3;
    dataView(memory0).setInt8(ptr0 + 8, 1, true);
    dataView(memory0).setInt32(ptr0 + 12, toInt32(e), true);
  }
  const variant4 = v1_2;
  if (variant4 === null || variant4 === undefined) {
    dataView(memory0).setInt8(ptr0 + 16, 0, true);
  } else {
    const e = variant4;
    dataView(memory0).setInt8(ptr0 + 16, 1, true);
    dataView(memory0).setInt32(ptr0 + 20, toInt32(e), true);
  }
  const variant5 = v1_3;
  if (variant5 === null || variant5 === undefined) {
    dataView(memory0).setInt8(ptr0 + 24, 0, true);
  } else {
    const e = variant5;
    dataView(memory0).setInt8(ptr0 + 24, 1, true);
    dataView(memory0).setInt32(ptr0 + 28, toInt32(e), true);
  }
  const variant6 = v1_4;
  if (variant6 === null || variant6 === undefined) {
    dataView(memory0).setInt8(ptr0 + 32, 0, true);
  } else {
    const e = variant6;
    dataView(memory0).setInt8(ptr0 + 32, 1, true);
    dataView(memory0).setInt32(ptr0 + 36, toInt32(e), true);
  }
  const variant8 = v1_5;
  if (variant8 === null || variant8 === undefined) {
    dataView(memory0).setInt8(ptr0 + 40, 0, true);
  } else {
    const e = variant8;
    dataView(memory0).setInt8(ptr0 + 40, 1, true);
    const val7 = e;
    const len7 = val7.length;
    const ptr7 = realloc0(0, 0, 4, len7 * 4);
    const src7 = new Uint8Array(val7.buffer, val7.byteOffset, len7 * 4);
    new Uint8Array(memory0.buffer, ptr7, len7 * 4).set(src7);
    dataView(memory0).setInt32(ptr0 + 48, len7, true);
    dataView(memory0).setInt32(ptr0 + 44, ptr7, true);
  }
  const { name: v9_0, runtimeConfig: v9_1, asId: v9_2 } = arg1;
  const variant11 = v9_0;
  if (variant11 === null || variant11 === undefined) {
    dataView(memory0).setInt8(ptr0 + 52, 0, true);
  } else {
    const e = variant11;
    dataView(memory0).setInt8(ptr0 + 52, 1, true);
    const ptr10 = utf8Encode(e, realloc0, memory0);
    const len10 = utf8EncodedLen;
    dataView(memory0).setInt32(ptr0 + 60, len10, true);
    dataView(memory0).setInt32(ptr0 + 56, ptr10, true);
  }
  const variant16 = v9_1;
  if (variant16 === null || variant16 === undefined) {
    dataView(memory0).setInt8(ptr0 + 64, 0, true);
  } else {
    const e = variant16;
    dataView(memory0).setInt8(ptr0 + 64, 1, true);
    const vec15 = e;
    const len15 = vec15.length;
    const result15 = realloc0(0, 0, 4, len15 * 16);
    for (let i = 0; i < vec15.length; i++) {
      const e = vec15[i];
      const base = result15 + i * 16;
      const [tuple12_0, tuple12_1] = e;
      const ptr13 = utf8Encode(tuple12_0, realloc0, memory0);
      const len13 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len13, true);
      dataView(memory0).setInt32(base + 0, ptr13, true);
      const ptr14 = utf8Encode(tuple12_1, realloc0, memory0);
      const len14 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 12, len14, true);
      dataView(memory0).setInt32(base + 8, ptr14, true);
    }
    dataView(memory0).setInt32(ptr0 + 72, len15, true);
    dataView(memory0).setInt32(ptr0 + 68, result15, true);
  }
  dataView(memory0).setInt8(ptr0 + 76, v9_2 ? 1 : 0, true);
  const ret = exports1["metatype:typegraph/core#integerb"](ptr0);
  let variant18;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant18 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr17 = dataView(memory0).getInt32(ret + 4, true);
      const len17 = dataView(memory0).getInt32(ret + 8, true);
      const result17 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr17, len17)
      );
      variant18 = {
        tag: "err",
        val: result17,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn4(ret);
  if (variant18.tag === "err") {
    throw new ComponentError(variant18.val);
  }
  return variant18.val;
}

function floatb(arg0, arg1) {
  const ptr0 = realloc0(0, 0, 8, 128);
  const {
    min: v1_0,
    max: v1_1,
    exclusiveMinimum: v1_2,
    exclusiveMaximum: v1_3,
    multipleOf: v1_4,
    enumeration: v1_5,
  } = arg0;
  const variant2 = v1_0;
  if (variant2 === null || variant2 === undefined) {
    dataView(memory0).setInt8(ptr0 + 0, 0, true);
  } else {
    const e = variant2;
    dataView(memory0).setInt8(ptr0 + 0, 1, true);
    dataView(memory0).setFloat64(ptr0 + 8, +e, true);
  }
  const variant3 = v1_1;
  if (variant3 === null || variant3 === undefined) {
    dataView(memory0).setInt8(ptr0 + 16, 0, true);
  } else {
    const e = variant3;
    dataView(memory0).setInt8(ptr0 + 16, 1, true);
    dataView(memory0).setFloat64(ptr0 + 24, +e, true);
  }
  const variant4 = v1_2;
  if (variant4 === null || variant4 === undefined) {
    dataView(memory0).setInt8(ptr0 + 32, 0, true);
  } else {
    const e = variant4;
    dataView(memory0).setInt8(ptr0 + 32, 1, true);
    dataView(memory0).setFloat64(ptr0 + 40, +e, true);
  }
  const variant5 = v1_3;
  if (variant5 === null || variant5 === undefined) {
    dataView(memory0).setInt8(ptr0 + 48, 0, true);
  } else {
    const e = variant5;
    dataView(memory0).setInt8(ptr0 + 48, 1, true);
    dataView(memory0).setFloat64(ptr0 + 56, +e, true);
  }
  const variant6 = v1_4;
  if (variant6 === null || variant6 === undefined) {
    dataView(memory0).setInt8(ptr0 + 64, 0, true);
  } else {
    const e = variant6;
    dataView(memory0).setInt8(ptr0 + 64, 1, true);
    dataView(memory0).setFloat64(ptr0 + 72, +e, true);
  }
  const variant8 = v1_5;
  if (variant8 === null || variant8 === undefined) {
    dataView(memory0).setInt8(ptr0 + 80, 0, true);
  } else {
    const e = variant8;
    dataView(memory0).setInt8(ptr0 + 80, 1, true);
    const val7 = e;
    const len7 = val7.length;
    const ptr7 = realloc0(0, 0, 8, len7 * 8);
    const src7 = new Uint8Array(val7.buffer, val7.byteOffset, len7 * 8);
    new Uint8Array(memory0.buffer, ptr7, len7 * 8).set(src7);
    dataView(memory0).setInt32(ptr0 + 88, len7, true);
    dataView(memory0).setInt32(ptr0 + 84, ptr7, true);
  }
  const { name: v9_0, runtimeConfig: v9_1, asId: v9_2 } = arg1;
  const variant11 = v9_0;
  if (variant11 === null || variant11 === undefined) {
    dataView(memory0).setInt8(ptr0 + 96, 0, true);
  } else {
    const e = variant11;
    dataView(memory0).setInt8(ptr0 + 96, 1, true);
    const ptr10 = utf8Encode(e, realloc0, memory0);
    const len10 = utf8EncodedLen;
    dataView(memory0).setInt32(ptr0 + 104, len10, true);
    dataView(memory0).setInt32(ptr0 + 100, ptr10, true);
  }
  const variant16 = v9_1;
  if (variant16 === null || variant16 === undefined) {
    dataView(memory0).setInt8(ptr0 + 108, 0, true);
  } else {
    const e = variant16;
    dataView(memory0).setInt8(ptr0 + 108, 1, true);
    const vec15 = e;
    const len15 = vec15.length;
    const result15 = realloc0(0, 0, 4, len15 * 16);
    for (let i = 0; i < vec15.length; i++) {
      const e = vec15[i];
      const base = result15 + i * 16;
      const [tuple12_0, tuple12_1] = e;
      const ptr13 = utf8Encode(tuple12_0, realloc0, memory0);
      const len13 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len13, true);
      dataView(memory0).setInt32(base + 0, ptr13, true);
      const ptr14 = utf8Encode(tuple12_1, realloc0, memory0);
      const len14 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 12, len14, true);
      dataView(memory0).setInt32(base + 8, ptr14, true);
    }
    dataView(memory0).setInt32(ptr0 + 116, len15, true);
    dataView(memory0).setInt32(ptr0 + 112, result15, true);
  }
  dataView(memory0).setInt8(ptr0 + 120, v9_2 ? 1 : 0, true);
  const ret = exports1["metatype:typegraph/core#floatb"](ptr0);
  let variant18;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant18 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr17 = dataView(memory0).getInt32(ret + 4, true);
      const len17 = dataView(memory0).getInt32(ret + 8, true);
      const result17 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr17, len17)
      );
      variant18 = {
        tag: "err",
        val: result17,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn5(ret);
  if (variant18.tag === "err") {
    throw new ComponentError(variant18.val);
  }
  return variant18.val;
}

function booleanb(arg0) {
  const { name: v0_0, runtimeConfig: v0_1, asId: v0_2 } = arg0;
  const variant2 = v0_0;
  let variant2_0;
  let variant2_1;
  let variant2_2;
  if (variant2 === null || variant2 === undefined) {
    variant2_0 = 0;
    variant2_1 = 0;
    variant2_2 = 0;
  } else {
    const e = variant2;
    const ptr1 = utf8Encode(e, realloc0, memory0);
    const len1 = utf8EncodedLen;
    variant2_0 = 1;
    variant2_1 = ptr1;
    variant2_2 = len1;
  }
  const variant7 = v0_1;
  let variant7_0;
  let variant7_1;
  let variant7_2;
  if (variant7 === null || variant7 === undefined) {
    variant7_0 = 0;
    variant7_1 = 0;
    variant7_2 = 0;
  } else {
    const e = variant7;
    const vec6 = e;
    const len6 = vec6.length;
    const result6 = realloc0(0, 0, 4, len6 * 16);
    for (let i = 0; i < vec6.length; i++) {
      const e = vec6[i];
      const base = result6 + i * 16;
      const [tuple3_0, tuple3_1] = e;
      const ptr4 = utf8Encode(tuple3_0, realloc0, memory0);
      const len4 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len4, true);
      dataView(memory0).setInt32(base + 0, ptr4, true);
      const ptr5 = utf8Encode(tuple3_1, realloc0, memory0);
      const len5 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 12, len5, true);
      dataView(memory0).setInt32(base + 8, ptr5, true);
    }
    variant7_0 = 1;
    variant7_1 = result6;
    variant7_2 = len6;
  }
  const ret = exports1["metatype:typegraph/core#booleanb"](
    variant2_0,
    variant2_1,
    variant2_2,
    variant7_0,
    variant7_1,
    variant7_2,
    v0_2 ? 1 : 0
  );
  let variant9;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant9 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr8 = dataView(memory0).getInt32(ret + 4, true);
      const len8 = dataView(memory0).getInt32(ret + 8, true);
      const result8 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr8, len8)
      );
      variant9 = {
        tag: "err",
        val: result8,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn6(ret);
  if (variant9.tag === "err") {
    throw new ComponentError(variant9.val);
  }
  return variant9.val;
}

function stringb(arg0, arg1) {
  const ptr0 = realloc0(0, 0, 4, 80);
  const {
    min: v1_0,
    max: v1_1,
    format: v1_2,
    pattern: v1_3,
    enumeration: v1_4,
  } = arg0;
  const variant2 = v1_0;
  if (variant2 === null || variant2 === undefined) {
    dataView(memory0).setInt8(ptr0 + 0, 0, true);
  } else {
    const e = variant2;
    dataView(memory0).setInt8(ptr0 + 0, 1, true);
    dataView(memory0).setInt32(ptr0 + 4, toUint32(e), true);
  }
  const variant3 = v1_1;
  if (variant3 === null || variant3 === undefined) {
    dataView(memory0).setInt8(ptr0 + 8, 0, true);
  } else {
    const e = variant3;
    dataView(memory0).setInt8(ptr0 + 8, 1, true);
    dataView(memory0).setInt32(ptr0 + 12, toUint32(e), true);
  }
  const variant5 = v1_2;
  if (variant5 === null || variant5 === undefined) {
    dataView(memory0).setInt8(ptr0 + 16, 0, true);
  } else {
    const e = variant5;
    dataView(memory0).setInt8(ptr0 + 16, 1, true);
    const ptr4 = utf8Encode(e, realloc0, memory0);
    const len4 = utf8EncodedLen;
    dataView(memory0).setInt32(ptr0 + 24, len4, true);
    dataView(memory0).setInt32(ptr0 + 20, ptr4, true);
  }
  const variant7 = v1_3;
  if (variant7 === null || variant7 === undefined) {
    dataView(memory0).setInt8(ptr0 + 28, 0, true);
  } else {
    const e = variant7;
    dataView(memory0).setInt8(ptr0 + 28, 1, true);
    const ptr6 = utf8Encode(e, realloc0, memory0);
    const len6 = utf8EncodedLen;
    dataView(memory0).setInt32(ptr0 + 36, len6, true);
    dataView(memory0).setInt32(ptr0 + 32, ptr6, true);
  }
  const variant10 = v1_4;
  if (variant10 === null || variant10 === undefined) {
    dataView(memory0).setInt8(ptr0 + 40, 0, true);
  } else {
    const e = variant10;
    dataView(memory0).setInt8(ptr0 + 40, 1, true);
    const vec9 = e;
    const len9 = vec9.length;
    const result9 = realloc0(0, 0, 4, len9 * 8);
    for (let i = 0; i < vec9.length; i++) {
      const e = vec9[i];
      const base = result9 + i * 8;
      const ptr8 = utf8Encode(e, realloc0, memory0);
      const len8 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len8, true);
      dataView(memory0).setInt32(base + 0, ptr8, true);
    }
    dataView(memory0).setInt32(ptr0 + 48, len9, true);
    dataView(memory0).setInt32(ptr0 + 44, result9, true);
  }
  const { name: v11_0, runtimeConfig: v11_1, asId: v11_2 } = arg1;
  const variant13 = v11_0;
  if (variant13 === null || variant13 === undefined) {
    dataView(memory0).setInt8(ptr0 + 52, 0, true);
  } else {
    const e = variant13;
    dataView(memory0).setInt8(ptr0 + 52, 1, true);
    const ptr12 = utf8Encode(e, realloc0, memory0);
    const len12 = utf8EncodedLen;
    dataView(memory0).setInt32(ptr0 + 60, len12, true);
    dataView(memory0).setInt32(ptr0 + 56, ptr12, true);
  }
  const variant18 = v11_1;
  if (variant18 === null || variant18 === undefined) {
    dataView(memory0).setInt8(ptr0 + 64, 0, true);
  } else {
    const e = variant18;
    dataView(memory0).setInt8(ptr0 + 64, 1, true);
    const vec17 = e;
    const len17 = vec17.length;
    const result17 = realloc0(0, 0, 4, len17 * 16);
    for (let i = 0; i < vec17.length; i++) {
      const e = vec17[i];
      const base = result17 + i * 16;
      const [tuple14_0, tuple14_1] = e;
      const ptr15 = utf8Encode(tuple14_0, realloc0, memory0);
      const len15 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len15, true);
      dataView(memory0).setInt32(base + 0, ptr15, true);
      const ptr16 = utf8Encode(tuple14_1, realloc0, memory0);
      const len16 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 12, len16, true);
      dataView(memory0).setInt32(base + 8, ptr16, true);
    }
    dataView(memory0).setInt32(ptr0 + 72, len17, true);
    dataView(memory0).setInt32(ptr0 + 68, result17, true);
  }
  dataView(memory0).setInt8(ptr0 + 76, v11_2 ? 1 : 0, true);
  const ret = exports1["metatype:typegraph/core#stringb"](ptr0);
  let variant20;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant20 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr19 = dataView(memory0).getInt32(ret + 4, true);
      const len19 = dataView(memory0).getInt32(ret + 8, true);
      const result19 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr19, len19)
      );
      variant20 = {
        tag: "err",
        val: result19,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn7(ret);
  if (variant20.tag === "err") {
    throw new ComponentError(variant20.val);
  }
  return variant20.val;
}

function arrayb(arg0, arg1) {
  const { of: v0_0, min: v0_1, max: v0_2, uniqueItems: v0_3 } = arg0;
  const variant1 = v0_1;
  let variant1_0;
  let variant1_1;
  if (variant1 === null || variant1 === undefined) {
    variant1_0 = 0;
    variant1_1 = 0;
  } else {
    const e = variant1;
    variant1_0 = 1;
    variant1_1 = toUint32(e);
  }
  const variant2 = v0_2;
  let variant2_0;
  let variant2_1;
  if (variant2 === null || variant2 === undefined) {
    variant2_0 = 0;
    variant2_1 = 0;
  } else {
    const e = variant2;
    variant2_0 = 1;
    variant2_1 = toUint32(e);
  }
  const variant3 = v0_3;
  let variant3_0;
  let variant3_1;
  if (variant3 === null || variant3 === undefined) {
    variant3_0 = 0;
    variant3_1 = 0;
  } else {
    const e = variant3;
    variant3_0 = 1;
    variant3_1 = e ? 1 : 0;
  }
  const { name: v4_0, runtimeConfig: v4_1, asId: v4_2 } = arg1;
  const variant6 = v4_0;
  let variant6_0;
  let variant6_1;
  let variant6_2;
  if (variant6 === null || variant6 === undefined) {
    variant6_0 = 0;
    variant6_1 = 0;
    variant6_2 = 0;
  } else {
    const e = variant6;
    const ptr5 = utf8Encode(e, realloc0, memory0);
    const len5 = utf8EncodedLen;
    variant6_0 = 1;
    variant6_1 = ptr5;
    variant6_2 = len5;
  }
  const variant11 = v4_1;
  let variant11_0;
  let variant11_1;
  let variant11_2;
  if (variant11 === null || variant11 === undefined) {
    variant11_0 = 0;
    variant11_1 = 0;
    variant11_2 = 0;
  } else {
    const e = variant11;
    const vec10 = e;
    const len10 = vec10.length;
    const result10 = realloc0(0, 0, 4, len10 * 16);
    for (let i = 0; i < vec10.length; i++) {
      const e = vec10[i];
      const base = result10 + i * 16;
      const [tuple7_0, tuple7_1] = e;
      const ptr8 = utf8Encode(tuple7_0, realloc0, memory0);
      const len8 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len8, true);
      dataView(memory0).setInt32(base + 0, ptr8, true);
      const ptr9 = utf8Encode(tuple7_1, realloc0, memory0);
      const len9 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 12, len9, true);
      dataView(memory0).setInt32(base + 8, ptr9, true);
    }
    variant11_0 = 1;
    variant11_1 = result10;
    variant11_2 = len10;
  }
  const ret = exports1["metatype:typegraph/core#arrayb"](
    toUint32(v0_0),
    variant1_0,
    variant1_1,
    variant2_0,
    variant2_1,
    variant3_0,
    variant3_1,
    variant6_0,
    variant6_1,
    variant6_2,
    variant11_0,
    variant11_1,
    variant11_2,
    v4_2 ? 1 : 0
  );
  let variant13;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant13 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr12 = dataView(memory0).getInt32(ret + 4, true);
      const len12 = dataView(memory0).getInt32(ret + 8, true);
      const result12 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr12, len12)
      );
      variant13 = {
        tag: "err",
        val: result12,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn8(ret);
  if (variant13.tag === "err") {
    throw new ComponentError(variant13.val);
  }
  return variant13.val;
}

function optionalb(arg0, arg1) {
  const { of: v0_0, defaultItem: v0_1 } = arg0;
  const variant2 = v0_1;
  let variant2_0;
  let variant2_1;
  let variant2_2;
  if (variant2 === null || variant2 === undefined) {
    variant2_0 = 0;
    variant2_1 = 0;
    variant2_2 = 0;
  } else {
    const e = variant2;
    const ptr1 = utf8Encode(e, realloc0, memory0);
    const len1 = utf8EncodedLen;
    variant2_0 = 1;
    variant2_1 = ptr1;
    variant2_2 = len1;
  }
  const { name: v3_0, runtimeConfig: v3_1, asId: v3_2 } = arg1;
  const variant5 = v3_0;
  let variant5_0;
  let variant5_1;
  let variant5_2;
  if (variant5 === null || variant5 === undefined) {
    variant5_0 = 0;
    variant5_1 = 0;
    variant5_2 = 0;
  } else {
    const e = variant5;
    const ptr4 = utf8Encode(e, realloc0, memory0);
    const len4 = utf8EncodedLen;
    variant5_0 = 1;
    variant5_1 = ptr4;
    variant5_2 = len4;
  }
  const variant10 = v3_1;
  let variant10_0;
  let variant10_1;
  let variant10_2;
  if (variant10 === null || variant10 === undefined) {
    variant10_0 = 0;
    variant10_1 = 0;
    variant10_2 = 0;
  } else {
    const e = variant10;
    const vec9 = e;
    const len9 = vec9.length;
    const result9 = realloc0(0, 0, 4, len9 * 16);
    for (let i = 0; i < vec9.length; i++) {
      const e = vec9[i];
      const base = result9 + i * 16;
      const [tuple6_0, tuple6_1] = e;
      const ptr7 = utf8Encode(tuple6_0, realloc0, memory0);
      const len7 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len7, true);
      dataView(memory0).setInt32(base + 0, ptr7, true);
      const ptr8 = utf8Encode(tuple6_1, realloc0, memory0);
      const len8 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 12, len8, true);
      dataView(memory0).setInt32(base + 8, ptr8, true);
    }
    variant10_0 = 1;
    variant10_1 = result9;
    variant10_2 = len9;
  }
  const ret = exports1["metatype:typegraph/core#optionalb"](
    toUint32(v0_0),
    variant2_0,
    variant2_1,
    variant2_2,
    variant5_0,
    variant5_1,
    variant5_2,
    variant10_0,
    variant10_1,
    variant10_2,
    v3_2 ? 1 : 0
  );
  let variant12;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant12 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr11 = dataView(memory0).getInt32(ret + 4, true);
      const len11 = dataView(memory0).getInt32(ret + 8, true);
      const result11 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr11, len11)
      );
      variant12 = {
        tag: "err",
        val: result11,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn9(ret);
  if (variant12.tag === "err") {
    throw new ComponentError(variant12.val);
  }
  return variant12.val;
}

function unionb(arg0, arg1) {
  const { variants: v0_0 } = arg0;
  const val1 = v0_0;
  const len1 = val1.length;
  const ptr1 = realloc0(0, 0, 4, len1 * 4);
  const src1 = new Uint8Array(val1.buffer, val1.byteOffset, len1 * 4);
  new Uint8Array(memory0.buffer, ptr1, len1 * 4).set(src1);
  const { name: v2_0, runtimeConfig: v2_1, asId: v2_2 } = arg1;
  const variant4 = v2_0;
  let variant4_0;
  let variant4_1;
  let variant4_2;
  if (variant4 === null || variant4 === undefined) {
    variant4_0 = 0;
    variant4_1 = 0;
    variant4_2 = 0;
  } else {
    const e = variant4;
    const ptr3 = utf8Encode(e, realloc0, memory0);
    const len3 = utf8EncodedLen;
    variant4_0 = 1;
    variant4_1 = ptr3;
    variant4_2 = len3;
  }
  const variant9 = v2_1;
  let variant9_0;
  let variant9_1;
  let variant9_2;
  if (variant9 === null || variant9 === undefined) {
    variant9_0 = 0;
    variant9_1 = 0;
    variant9_2 = 0;
  } else {
    const e = variant9;
    const vec8 = e;
    const len8 = vec8.length;
    const result8 = realloc0(0, 0, 4, len8 * 16);
    for (let i = 0; i < vec8.length; i++) {
      const e = vec8[i];
      const base = result8 + i * 16;
      const [tuple5_0, tuple5_1] = e;
      const ptr6 = utf8Encode(tuple5_0, realloc0, memory0);
      const len6 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len6, true);
      dataView(memory0).setInt32(base + 0, ptr6, true);
      const ptr7 = utf8Encode(tuple5_1, realloc0, memory0);
      const len7 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 12, len7, true);
      dataView(memory0).setInt32(base + 8, ptr7, true);
    }
    variant9_0 = 1;
    variant9_1 = result8;
    variant9_2 = len8;
  }
  const ret = exports1["metatype:typegraph/core#unionb"](
    ptr1,
    len1,
    variant4_0,
    variant4_1,
    variant4_2,
    variant9_0,
    variant9_1,
    variant9_2,
    v2_2 ? 1 : 0
  );
  let variant11;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant11 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr10 = dataView(memory0).getInt32(ret + 4, true);
      const len10 = dataView(memory0).getInt32(ret + 8, true);
      const result10 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr10, len10)
      );
      variant11 = {
        tag: "err",
        val: result10,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn10(ret);
  if (variant11.tag === "err") {
    throw new ComponentError(variant11.val);
  }
  return variant11.val;
}

function eitherb(arg0, arg1) {
  const { variants: v0_0 } = arg0;
  const val1 = v0_0;
  const len1 = val1.length;
  const ptr1 = realloc0(0, 0, 4, len1 * 4);
  const src1 = new Uint8Array(val1.buffer, val1.byteOffset, len1 * 4);
  new Uint8Array(memory0.buffer, ptr1, len1 * 4).set(src1);
  const { name: v2_0, runtimeConfig: v2_1, asId: v2_2 } = arg1;
  const variant4 = v2_0;
  let variant4_0;
  let variant4_1;
  let variant4_2;
  if (variant4 === null || variant4 === undefined) {
    variant4_0 = 0;
    variant4_1 = 0;
    variant4_2 = 0;
  } else {
    const e = variant4;
    const ptr3 = utf8Encode(e, realloc0, memory0);
    const len3 = utf8EncodedLen;
    variant4_0 = 1;
    variant4_1 = ptr3;
    variant4_2 = len3;
  }
  const variant9 = v2_1;
  let variant9_0;
  let variant9_1;
  let variant9_2;
  if (variant9 === null || variant9 === undefined) {
    variant9_0 = 0;
    variant9_1 = 0;
    variant9_2 = 0;
  } else {
    const e = variant9;
    const vec8 = e;
    const len8 = vec8.length;
    const result8 = realloc0(0, 0, 4, len8 * 16);
    for (let i = 0; i < vec8.length; i++) {
      const e = vec8[i];
      const base = result8 + i * 16;
      const [tuple5_0, tuple5_1] = e;
      const ptr6 = utf8Encode(tuple5_0, realloc0, memory0);
      const len6 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len6, true);
      dataView(memory0).setInt32(base + 0, ptr6, true);
      const ptr7 = utf8Encode(tuple5_1, realloc0, memory0);
      const len7 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 12, len7, true);
      dataView(memory0).setInt32(base + 8, ptr7, true);
    }
    variant9_0 = 1;
    variant9_1 = result8;
    variant9_2 = len8;
  }
  const ret = exports1["metatype:typegraph/core#eitherb"](
    ptr1,
    len1,
    variant4_0,
    variant4_1,
    variant4_2,
    variant9_0,
    variant9_1,
    variant9_2,
    v2_2 ? 1 : 0
  );
  let variant11;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant11 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr10 = dataView(memory0).getInt32(ret + 4, true);
      const len10 = dataView(memory0).getInt32(ret + 8, true);
      const result10 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr10, len10)
      );
      variant11 = {
        tag: "err",
        val: result10,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn11(ret);
  if (variant11.tag === "err") {
    throw new ComponentError(variant11.val);
  }
  return variant11.val;
}

function structb(arg0, arg1) {
  const { props: v0_0, additionalProps: v0_1, min: v0_2, max: v0_3 } = arg0;
  const vec3 = v0_0;
  const len3 = vec3.length;
  const result3 = realloc0(0, 0, 4, len3 * 12);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 12;
    const [tuple1_0, tuple1_1] = e;
    const ptr2 = utf8Encode(tuple1_0, realloc0, memory0);
    const len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len2, true);
    dataView(memory0).setInt32(base + 0, ptr2, true);
    dataView(memory0).setInt32(base + 8, toUint32(tuple1_1), true);
  }
  const variant4 = v0_2;
  let variant4_0;
  let variant4_1;
  if (variant4 === null || variant4 === undefined) {
    variant4_0 = 0;
    variant4_1 = 0;
  } else {
    const e = variant4;
    variant4_0 = 1;
    variant4_1 = toUint32(e);
  }
  const variant5 = v0_3;
  let variant5_0;
  let variant5_1;
  if (variant5 === null || variant5 === undefined) {
    variant5_0 = 0;
    variant5_1 = 0;
  } else {
    const e = variant5;
    variant5_0 = 1;
    variant5_1 = toUint32(e);
  }
  const { name: v6_0, runtimeConfig: v6_1, asId: v6_2 } = arg1;
  const variant8 = v6_0;
  let variant8_0;
  let variant8_1;
  let variant8_2;
  if (variant8 === null || variant8 === undefined) {
    variant8_0 = 0;
    variant8_1 = 0;
    variant8_2 = 0;
  } else {
    const e = variant8;
    const ptr7 = utf8Encode(e, realloc0, memory0);
    const len7 = utf8EncodedLen;
    variant8_0 = 1;
    variant8_1 = ptr7;
    variant8_2 = len7;
  }
  const variant13 = v6_1;
  let variant13_0;
  let variant13_1;
  let variant13_2;
  if (variant13 === null || variant13 === undefined) {
    variant13_0 = 0;
    variant13_1 = 0;
    variant13_2 = 0;
  } else {
    const e = variant13;
    const vec12 = e;
    const len12 = vec12.length;
    const result12 = realloc0(0, 0, 4, len12 * 16);
    for (let i = 0; i < vec12.length; i++) {
      const e = vec12[i];
      const base = result12 + i * 16;
      const [tuple9_0, tuple9_1] = e;
      const ptr10 = utf8Encode(tuple9_0, realloc0, memory0);
      const len10 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len10, true);
      dataView(memory0).setInt32(base + 0, ptr10, true);
      const ptr11 = utf8Encode(tuple9_1, realloc0, memory0);
      const len11 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 12, len11, true);
      dataView(memory0).setInt32(base + 8, ptr11, true);
    }
    variant13_0 = 1;
    variant13_1 = result12;
    variant13_2 = len12;
  }
  const ret = exports1["metatype:typegraph/core#structb"](
    result3,
    len3,
    v0_1 ? 1 : 0,
    variant4_0,
    variant4_1,
    variant5_0,
    variant5_1,
    variant8_0,
    variant8_1,
    variant8_2,
    variant13_0,
    variant13_1,
    variant13_2,
    v6_2 ? 1 : 0
  );
  let variant15;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant15 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr14 = dataView(memory0).getInt32(ret + 4, true);
      const len14 = dataView(memory0).getInt32(ret + 8, true);
      const result14 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr14, len14)
      );
      variant15 = {
        tag: "err",
        val: result14,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn12(ret);
  if (variant15.tag === "err") {
    throw new ComponentError(variant15.val);
  }
  return variant15.val;
}

function getTypeRepr(arg0) {
  const ret = exports1["metatype:typegraph/core#get-type-repr"](toUint32(arg0));
  let variant2;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      const ptr0 = dataView(memory0).getInt32(ret + 4, true);
      const len0 = dataView(memory0).getInt32(ret + 8, true);
      const result0 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr0, len0)
      );
      variant2 = {
        tag: "ok",
        val: result0,
      };
      break;
    }
    case 1: {
      const ptr1 = dataView(memory0).getInt32(ret + 4, true);
      const len1 = dataView(memory0).getInt32(ret + 8, true);
      const result1 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr1, len1)
      );
      variant2 = {
        tag: "err",
        val: result1,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn13(ret);
  if (variant2.tag === "err") {
    throw new ComponentError(variant2.val);
  }
  return variant2.val;
}

function funcb(arg0) {
  const { inp: v0_0, out: v0_1, mat: v0_2 } = arg0;
  const ret = exports1["metatype:typegraph/core#funcb"](
    toUint32(v0_0),
    toUint32(v0_1),
    toUint32(v0_2)
  );
  let variant2;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant2 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr1 = dataView(memory0).getInt32(ret + 4, true);
      const len1 = dataView(memory0).getInt32(ret + 8, true);
      const result1 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr1, len1)
      );
      variant2 = {
        tag: "err",
        val: result1,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn14(ret);
  if (variant2.tag === "err") {
    throw new ComponentError(variant2.val);
  }
  return variant2.val;
}

function registerPolicy(arg0) {
  const { name: v0_0, materializer: v0_1 } = arg0;
  const ptr1 = utf8Encode(v0_0, realloc0, memory0);
  const len1 = utf8EncodedLen;
  const ret = exports1["metatype:typegraph/core#register-policy"](
    ptr1,
    len1,
    toUint32(v0_1)
  );
  let variant3;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant3 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr2 = dataView(memory0).getInt32(ret + 4, true);
      const len2 = dataView(memory0).getInt32(ret + 8, true);
      const result2 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr2, len2)
      );
      variant3 = {
        tag: "err",
        val: result2,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn15(ret);
  if (variant3.tag === "err") {
    throw new ComponentError(variant3.val);
  }
  return variant3.val;
}

function withPolicy(arg0) {
  const { tpe: v0_0, chain: v0_1 } = arg0;
  const vec7 = v0_1;
  const len7 = vec7.length;
  const result7 = realloc0(0, 0, 4, len7 * 36);
  for (let i = 0; i < vec7.length; i++) {
    const e = vec7[i];
    const base = result7 + i * 36;
    const variant6 = e;
    switch (variant6.tag) {
      case "simple": {
        const e = variant6.val;
        dataView(memory0).setInt8(base + 0, 0, true);
        dataView(memory0).setInt32(base + 4, toUint32(e), true);
        break;
      }
      case "per-effect": {
        const e = variant6.val;
        dataView(memory0).setInt8(base + 0, 1, true);
        const { none: v1_0, create: v1_1, update: v1_2, delete: v1_3 } = e;
        const variant2 = v1_0;
        if (variant2 === null || variant2 === undefined) {
          dataView(memory0).setInt8(base + 4, 0, true);
        } else {
          const e = variant2;
          dataView(memory0).setInt8(base + 4, 1, true);
          dataView(memory0).setInt32(base + 8, toUint32(e), true);
        }
        const variant3 = v1_1;
        if (variant3 === null || variant3 === undefined) {
          dataView(memory0).setInt8(base + 12, 0, true);
        } else {
          const e = variant3;
          dataView(memory0).setInt8(base + 12, 1, true);
          dataView(memory0).setInt32(base + 16, toUint32(e), true);
        }
        const variant4 = v1_2;
        if (variant4 === null || variant4 === undefined) {
          dataView(memory0).setInt8(base + 20, 0, true);
        } else {
          const e = variant4;
          dataView(memory0).setInt8(base + 20, 1, true);
          dataView(memory0).setInt32(base + 24, toUint32(e), true);
        }
        const variant5 = v1_3;
        if (variant5 === null || variant5 === undefined) {
          dataView(memory0).setInt8(base + 28, 0, true);
        } else {
          const e = variant5;
          dataView(memory0).setInt8(base + 28, 1, true);
          dataView(memory0).setInt32(base + 32, toUint32(e), true);
        }
        break;
      }
      default: {
        throw new TypeError("invalid variant specified for PolicySpec");
      }
    }
  }
  const ret = exports1["metatype:typegraph/core#with-policy"](
    toUint32(v0_0),
    result7,
    len7
  );
  let variant9;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant9 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr8 = dataView(memory0).getInt32(ret + 4, true);
      const len8 = dataView(memory0).getInt32(ret + 8, true);
      const result8 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr8, len8)
      );
      variant9 = {
        tag: "err",
        val: result8,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn16(ret);
  if (variant9.tag === "err") {
    throw new ComponentError(variant9.val);
  }
  return variant9.val;
}

function registerContextPolicy(arg0, arg1) {
  const ptr0 = utf8Encode(arg0, realloc0, memory0);
  const len0 = utf8EncodedLen;
  const variant3 = arg1;
  let variant3_0;
  let variant3_1;
  let variant3_2;
  switch (variant3.tag) {
    case "value": {
      const e = variant3.val;
      const ptr1 = utf8Encode(e, realloc0, memory0);
      const len1 = utf8EncodedLen;
      variant3_0 = 0;
      variant3_1 = ptr1;
      variant3_2 = len1;
      break;
    }
    case "pattern": {
      const e = variant3.val;
      const ptr2 = utf8Encode(e, realloc0, memory0);
      const len2 = utf8EncodedLen;
      variant3_0 = 1;
      variant3_1 = ptr2;
      variant3_2 = len2;
      break;
    }
    default: {
      throw new TypeError("invalid variant specified for ContextCheck");
    }
  }
  const ret = exports1["metatype:typegraph/core#register-context-policy"](
    ptr0,
    len0,
    variant3_0,
    variant3_1,
    variant3_2
  );
  let variant6;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      const ptr4 = dataView(memory0).getInt32(ret + 8, true);
      const len4 = dataView(memory0).getInt32(ret + 12, true);
      const result4 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr4, len4)
      );
      variant6 = {
        tag: "ok",
        val: [dataView(memory0).getInt32(ret + 4, true) >>> 0, result4],
      };
      break;
    }
    case 1: {
      const ptr5 = dataView(memory0).getInt32(ret + 4, true);
      const len5 = dataView(memory0).getInt32(ret + 8, true);
      const result5 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr5, len5)
      );
      variant6 = {
        tag: "err",
        val: result5,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn17(ret);
  if (variant6.tag === "err") {
    throw new ComponentError(variant6.val);
  }
  return variant6.val;
}

function expose(arg0, arg1, arg2) {
  const vec2 = arg0;
  const len2 = vec2.length;
  const result2 = realloc0(0, 0, 4, len2 * 12);
  for (let i = 0; i < vec2.length; i++) {
    const e = vec2[i];
    const base = result2 + i * 12;
    const [tuple0_0, tuple0_1] = e;
    const ptr1 = utf8Encode(tuple0_0, realloc0, memory0);
    const len1 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len1, true);
    dataView(memory0).setInt32(base + 0, ptr1, true);
    dataView(memory0).setInt32(base + 8, toUint32(tuple0_1), true);
  }
  const vec4 = arg1;
  const len4 = vec4.length;
  const result4 = realloc0(0, 0, 4, len4 * 8);
  for (let i = 0; i < vec4.length; i++) {
    const e = vec4[i];
    const base = result4 + i * 8;
    const ptr3 = utf8Encode(e, realloc0, memory0);
    const len3 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len3, true);
    dataView(memory0).setInt32(base + 0, ptr3, true);
  }
  const variant12 = arg2;
  let variant12_0;
  let variant12_1;
  let variant12_2;
  if (variant12 === null || variant12 === undefined) {
    variant12_0 = 0;
    variant12_1 = 0;
    variant12_2 = 0;
  } else {
    const e = variant12;
    const vec11 = e;
    const len11 = vec11.length;
    const result11 = realloc0(0, 0, 4, len11 * 36);
    for (let i = 0; i < vec11.length; i++) {
      const e = vec11[i];
      const base = result11 + i * 36;
      const variant10 = e;
      switch (variant10.tag) {
        case "simple": {
          const e = variant10.val;
          dataView(memory0).setInt8(base + 0, 0, true);
          dataView(memory0).setInt32(base + 4, toUint32(e), true);
          break;
        }
        case "per-effect": {
          const e = variant10.val;
          dataView(memory0).setInt8(base + 0, 1, true);
          const { none: v5_0, create: v5_1, update: v5_2, delete: v5_3 } = e;
          const variant6 = v5_0;
          if (variant6 === null || variant6 === undefined) {
            dataView(memory0).setInt8(base + 4, 0, true);
          } else {
            const e = variant6;
            dataView(memory0).setInt8(base + 4, 1, true);
            dataView(memory0).setInt32(base + 8, toUint32(e), true);
          }
          const variant7 = v5_1;
          if (variant7 === null || variant7 === undefined) {
            dataView(memory0).setInt8(base + 12, 0, true);
          } else {
            const e = variant7;
            dataView(memory0).setInt8(base + 12, 1, true);
            dataView(memory0).setInt32(base + 16, toUint32(e), true);
          }
          const variant8 = v5_2;
          if (variant8 === null || variant8 === undefined) {
            dataView(memory0).setInt8(base + 20, 0, true);
          } else {
            const e = variant8;
            dataView(memory0).setInt8(base + 20, 1, true);
            dataView(memory0).setInt32(base + 24, toUint32(e), true);
          }
          const variant9 = v5_3;
          if (variant9 === null || variant9 === undefined) {
            dataView(memory0).setInt8(base + 28, 0, true);
          } else {
            const e = variant9;
            dataView(memory0).setInt8(base + 28, 1, true);
            dataView(memory0).setInt32(base + 32, toUint32(e), true);
          }
          break;
        }
        default: {
          throw new TypeError("invalid variant specified for PolicySpec");
        }
      }
    }
    variant12_0 = 1;
    variant12_1 = result11;
    variant12_2 = len11;
  }
  const ret = exports1["metatype:typegraph/core#expose"](
    result2,
    len2,
    result4,
    len4,
    variant12_0,
    variant12_1,
    variant12_2
  );
  let variant14;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant14 = {
        tag: "ok",
        val: undefined,
      };
      break;
    }
    case 1: {
      const ptr13 = dataView(memory0).getInt32(ret + 4, true);
      const len13 = dataView(memory0).getInt32(ret + 8, true);
      const result13 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr13, len13)
      );
      variant14 = {
        tag: "err",
        val: result13,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn18(ret);
  if (variant14.tag === "err") {
    throw new ComponentError(variant14.val);
  }
  return variant14.val;
}

function getDenoRuntime() {
  const ret = exports1["metatype:typegraph/runtimes#get-deno-runtime"]();
  return ret >>> 0;
}

function registerDenoFunc(arg0, arg1) {
  const { code: v0_0, secrets: v0_1 } = arg0;
  const ptr1 = utf8Encode(v0_0, realloc0, memory0);
  const len1 = utf8EncodedLen;
  const vec3 = v0_1;
  const len3 = vec3.length;
  const result3 = realloc0(0, 0, 4, len3 * 8);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 8;
    const ptr2 = utf8Encode(e, realloc0, memory0);
    const len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len2, true);
    dataView(memory0).setInt32(base + 0, ptr2, true);
  }
  const variant4 = arg1;
  let variant4_0;
  let variant4_1;
  switch (variant4.tag) {
    case "none": {
      variant4_0 = 0;
      variant4_1 = 0;
      break;
    }
    case "create": {
      const e = variant4.val;
      variant4_0 = 1;
      variant4_1 = e ? 1 : 0;
      break;
    }
    case "update": {
      const e = variant4.val;
      variant4_0 = 2;
      variant4_1 = e ? 1 : 0;
      break;
    }
    case "delete": {
      const e = variant4.val;
      variant4_0 = 3;
      variant4_1 = e ? 1 : 0;
      break;
    }
    default: {
      throw new TypeError("invalid variant specified for Effect");
    }
  }
  const ret = exports1["metatype:typegraph/runtimes#register-deno-func"](
    ptr1,
    len1,
    result3,
    len3,
    variant4_0,
    variant4_1
  );
  let variant6;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant6 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr5 = dataView(memory0).getInt32(ret + 4, true);
      const len5 = dataView(memory0).getInt32(ret + 8, true);
      const result5 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr5, len5)
      );
      variant6 = {
        tag: "err",
        val: result5,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn19(ret);
  if (variant6.tag === "err") {
    throw new ComponentError(variant6.val);
  }
  return variant6.val;
}

function getPredefinedDenoFunc(arg0) {
  const { name: v0_0 } = arg0;
  const ptr1 = utf8Encode(v0_0, realloc0, memory0);
  const len1 = utf8EncodedLen;
  const ret = exports1["metatype:typegraph/runtimes#get-predefined-deno-func"](
    ptr1,
    len1
  );
  let variant3;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant3 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr2 = dataView(memory0).getInt32(ret + 4, true);
      const len2 = dataView(memory0).getInt32(ret + 8, true);
      const result2 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr2, len2)
      );
      variant3 = {
        tag: "err",
        val: result2,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn20(ret);
  if (variant3.tag === "err") {
    throw new ComponentError(variant3.val);
  }
  return variant3.val;
}

function importDenoFunction(arg0, arg1) {
  const { funcName: v0_0, module: v0_1, secrets: v0_2 } = arg0;
  const ptr1 = utf8Encode(v0_0, realloc0, memory0);
  const len1 = utf8EncodedLen;
  const ptr2 = utf8Encode(v0_1, realloc0, memory0);
  const len2 = utf8EncodedLen;
  const vec4 = v0_2;
  const len4 = vec4.length;
  const result4 = realloc0(0, 0, 4, len4 * 8);
  for (let i = 0; i < vec4.length; i++) {
    const e = vec4[i];
    const base = result4 + i * 8;
    const ptr3 = utf8Encode(e, realloc0, memory0);
    const len3 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len3, true);
    dataView(memory0).setInt32(base + 0, ptr3, true);
  }
  const variant5 = arg1;
  let variant5_0;
  let variant5_1;
  switch (variant5.tag) {
    case "none": {
      variant5_0 = 0;
      variant5_1 = 0;
      break;
    }
    case "create": {
      const e = variant5.val;
      variant5_0 = 1;
      variant5_1 = e ? 1 : 0;
      break;
    }
    case "update": {
      const e = variant5.val;
      variant5_0 = 2;
      variant5_1 = e ? 1 : 0;
      break;
    }
    case "delete": {
      const e = variant5.val;
      variant5_0 = 3;
      variant5_1 = e ? 1 : 0;
      break;
    }
    default: {
      throw new TypeError("invalid variant specified for Effect");
    }
  }
  const ret = exports1["metatype:typegraph/runtimes#import-deno-function"](
    ptr1,
    len1,
    ptr2,
    len2,
    result4,
    len4,
    variant5_0,
    variant5_1
  );
  let variant7;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant7 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr6 = dataView(memory0).getInt32(ret + 4, true);
      const len6 = dataView(memory0).getInt32(ret + 8, true);
      const result6 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr6, len6)
      );
      variant7 = {
        tag: "err",
        val: result6,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn21(ret);
  if (variant7.tag === "err") {
    throw new ComponentError(variant7.val);
  }
  return variant7.val;
}

function registerGraphqlRuntime(arg0) {
  const { endpoint: v0_0 } = arg0;
  const ptr1 = utf8Encode(v0_0, realloc0, memory0);
  const len1 = utf8EncodedLen;
  const ret = exports1["metatype:typegraph/runtimes#register-graphql-runtime"](
    ptr1,
    len1
  );
  let variant3;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant3 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr2 = dataView(memory0).getInt32(ret + 4, true);
      const len2 = dataView(memory0).getInt32(ret + 8, true);
      const result2 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr2, len2)
      );
      variant3 = {
        tag: "err",
        val: result2,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn22(ret);
  if (variant3.tag === "err") {
    throw new ComponentError(variant3.val);
  }
  return variant3.val;
}

function graphqlQuery(arg0, arg1) {
  const { runtime: v0_0, effect: v0_1 } = arg0;
  const variant1 = v0_1;
  let variant1_0;
  let variant1_1;
  switch (variant1.tag) {
    case "none": {
      variant1_0 = 0;
      variant1_1 = 0;
      break;
    }
    case "create": {
      const e = variant1.val;
      variant1_0 = 1;
      variant1_1 = e ? 1 : 0;
      break;
    }
    case "update": {
      const e = variant1.val;
      variant1_0 = 2;
      variant1_1 = e ? 1 : 0;
      break;
    }
    case "delete": {
      const e = variant1.val;
      variant1_0 = 3;
      variant1_1 = e ? 1 : 0;
      break;
    }
    default: {
      throw new TypeError("invalid variant specified for Effect");
    }
  }
  const { path: v2_0 } = arg1;
  const variant5 = v2_0;
  let variant5_0;
  let variant5_1;
  let variant5_2;
  if (variant5 === null || variant5 === undefined) {
    variant5_0 = 0;
    variant5_1 = 0;
    variant5_2 = 0;
  } else {
    const e = variant5;
    const vec4 = e;
    const len4 = vec4.length;
    const result4 = realloc0(0, 0, 4, len4 * 8);
    for (let i = 0; i < vec4.length; i++) {
      const e = vec4[i];
      const base = result4 + i * 8;
      const ptr3 = utf8Encode(e, realloc0, memory0);
      const len3 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len3, true);
      dataView(memory0).setInt32(base + 0, ptr3, true);
    }
    variant5_0 = 1;
    variant5_1 = result4;
    variant5_2 = len4;
  }
  const ret = exports1["metatype:typegraph/runtimes#graphql-query"](
    toUint32(v0_0),
    variant1_0,
    variant1_1,
    variant5_0,
    variant5_1,
    variant5_2
  );
  let variant7;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant7 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr6 = dataView(memory0).getInt32(ret + 4, true);
      const len6 = dataView(memory0).getInt32(ret + 8, true);
      const result6 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr6, len6)
      );
      variant7 = {
        tag: "err",
        val: result6,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn23(ret);
  if (variant7.tag === "err") {
    throw new ComponentError(variant7.val);
  }
  return variant7.val;
}

function graphqlMutation(arg0, arg1) {
  const { runtime: v0_0, effect: v0_1 } = arg0;
  const variant1 = v0_1;
  let variant1_0;
  let variant1_1;
  switch (variant1.tag) {
    case "none": {
      variant1_0 = 0;
      variant1_1 = 0;
      break;
    }
    case "create": {
      const e = variant1.val;
      variant1_0 = 1;
      variant1_1 = e ? 1 : 0;
      break;
    }
    case "update": {
      const e = variant1.val;
      variant1_0 = 2;
      variant1_1 = e ? 1 : 0;
      break;
    }
    case "delete": {
      const e = variant1.val;
      variant1_0 = 3;
      variant1_1 = e ? 1 : 0;
      break;
    }
    default: {
      throw new TypeError("invalid variant specified for Effect");
    }
  }
  const { path: v2_0 } = arg1;
  const variant5 = v2_0;
  let variant5_0;
  let variant5_1;
  let variant5_2;
  if (variant5 === null || variant5 === undefined) {
    variant5_0 = 0;
    variant5_1 = 0;
    variant5_2 = 0;
  } else {
    const e = variant5;
    const vec4 = e;
    const len4 = vec4.length;
    const result4 = realloc0(0, 0, 4, len4 * 8);
    for (let i = 0; i < vec4.length; i++) {
      const e = vec4[i];
      const base = result4 + i * 8;
      const ptr3 = utf8Encode(e, realloc0, memory0);
      const len3 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len3, true);
      dataView(memory0).setInt32(base + 0, ptr3, true);
    }
    variant5_0 = 1;
    variant5_1 = result4;
    variant5_2 = len4;
  }
  const ret = exports1["metatype:typegraph/runtimes#graphql-mutation"](
    toUint32(v0_0),
    variant1_0,
    variant1_1,
    variant5_0,
    variant5_1,
    variant5_2
  );
  let variant7;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant7 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr6 = dataView(memory0).getInt32(ret + 4, true);
      const len6 = dataView(memory0).getInt32(ret + 8, true);
      const result6 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr6, len6)
      );
      variant7 = {
        tag: "err",
        val: result6,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn24(ret);
  if (variant7.tag === "err") {
    throw new ComponentError(variant7.val);
  }
  return variant7.val;
}

function registerHttpRuntime(arg0) {
  const { endpoint: v0_0, certSecret: v0_1, basicAuthSecret: v0_2 } = arg0;
  const ptr1 = utf8Encode(v0_0, realloc0, memory0);
  const len1 = utf8EncodedLen;
  const variant3 = v0_1;
  let variant3_0;
  let variant3_1;
  let variant3_2;
  if (variant3 === null || variant3 === undefined) {
    variant3_0 = 0;
    variant3_1 = 0;
    variant3_2 = 0;
  } else {
    const e = variant3;
    const ptr2 = utf8Encode(e, realloc0, memory0);
    const len2 = utf8EncodedLen;
    variant3_0 = 1;
    variant3_1 = ptr2;
    variant3_2 = len2;
  }
  const variant5 = v0_2;
  let variant5_0;
  let variant5_1;
  let variant5_2;
  if (variant5 === null || variant5 === undefined) {
    variant5_0 = 0;
    variant5_1 = 0;
    variant5_2 = 0;
  } else {
    const e = variant5;
    const ptr4 = utf8Encode(e, realloc0, memory0);
    const len4 = utf8EncodedLen;
    variant5_0 = 1;
    variant5_1 = ptr4;
    variant5_2 = len4;
  }
  const ret = exports1["metatype:typegraph/runtimes#register-http-runtime"](
    ptr1,
    len1,
    variant3_0,
    variant3_1,
    variant3_2,
    variant5_0,
    variant5_1,
    variant5_2
  );
  let variant7;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant7 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr6 = dataView(memory0).getInt32(ret + 4, true);
      const len6 = dataView(memory0).getInt32(ret + 8, true);
      const result6 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr6, len6)
      );
      variant7 = {
        tag: "err",
        val: result6,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn25(ret);
  if (variant7.tag === "err") {
    throw new ComponentError(variant7.val);
  }
  return variant7.val;
}

function httpRequest(arg0, arg1) {
  const ptr0 = realloc0(0, 0, 4, 92);
  const { runtime: v1_0, effect: v1_1 } = arg0;
  dataView(memory0).setInt32(ptr0 + 0, toUint32(v1_0), true);
  const variant2 = v1_1;
  switch (variant2.tag) {
    case "none": {
      dataView(memory0).setInt8(ptr0 + 4, 0, true);
      break;
    }
    case "create": {
      const e = variant2.val;
      dataView(memory0).setInt8(ptr0 + 4, 1, true);
      dataView(memory0).setInt8(ptr0 + 5, e ? 1 : 0, true);
      break;
    }
    case "update": {
      const e = variant2.val;
      dataView(memory0).setInt8(ptr0 + 4, 2, true);
      dataView(memory0).setInt8(ptr0 + 5, e ? 1 : 0, true);
      break;
    }
    case "delete": {
      const e = variant2.val;
      dataView(memory0).setInt8(ptr0 + 4, 3, true);
      dataView(memory0).setInt8(ptr0 + 5, e ? 1 : 0, true);
      break;
    }
    default: {
      throw new TypeError("invalid variant specified for Effect");
    }
  }
  const {
    method: v3_0,
    path: v3_1,
    contentType: v3_2,
    headerPrefix: v3_3,
    queryFields: v3_4,
    renameFields: v3_5,
    bodyFields: v3_6,
    authTokenField: v3_7,
  } = arg1;
  const val4 = v3_0;
  let enum4;
  switch (val4) {
    case "get": {
      enum4 = 0;
      break;
    }
    case "post": {
      enum4 = 1;
      break;
    }
    case "put": {
      enum4 = 2;
      break;
    }
    case "patch": {
      enum4 = 3;
      break;
    }
    case "delete": {
      enum4 = 4;
      break;
    }
    default: {
      if (v3_0 instanceof Error) {
        console.error(v3_0);
      }

      throw new TypeError(`"${val4}" is not one of the cases of http-method`);
    }
  }
  dataView(memory0).setInt8(ptr0 + 8, enum4, true);
  const ptr5 = utf8Encode(v3_1, realloc0, memory0);
  const len5 = utf8EncodedLen;
  dataView(memory0).setInt32(ptr0 + 16, len5, true);
  dataView(memory0).setInt32(ptr0 + 12, ptr5, true);
  const variant7 = v3_2;
  if (variant7 === null || variant7 === undefined) {
    dataView(memory0).setInt8(ptr0 + 20, 0, true);
  } else {
    const e = variant7;
    dataView(memory0).setInt8(ptr0 + 20, 1, true);
    const ptr6 = utf8Encode(e, realloc0, memory0);
    const len6 = utf8EncodedLen;
    dataView(memory0).setInt32(ptr0 + 28, len6, true);
    dataView(memory0).setInt32(ptr0 + 24, ptr6, true);
  }
  const variant9 = v3_3;
  if (variant9 === null || variant9 === undefined) {
    dataView(memory0).setInt8(ptr0 + 32, 0, true);
  } else {
    const e = variant9;
    dataView(memory0).setInt8(ptr0 + 32, 1, true);
    const ptr8 = utf8Encode(e, realloc0, memory0);
    const len8 = utf8EncodedLen;
    dataView(memory0).setInt32(ptr0 + 40, len8, true);
    dataView(memory0).setInt32(ptr0 + 36, ptr8, true);
  }
  const variant12 = v3_4;
  if (variant12 === null || variant12 === undefined) {
    dataView(memory0).setInt8(ptr0 + 44, 0, true);
  } else {
    const e = variant12;
    dataView(memory0).setInt8(ptr0 + 44, 1, true);
    const vec11 = e;
    const len11 = vec11.length;
    const result11 = realloc0(0, 0, 4, len11 * 8);
    for (let i = 0; i < vec11.length; i++) {
      const e = vec11[i];
      const base = result11 + i * 8;
      const ptr10 = utf8Encode(e, realloc0, memory0);
      const len10 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len10, true);
      dataView(memory0).setInt32(base + 0, ptr10, true);
    }
    dataView(memory0).setInt32(ptr0 + 52, len11, true);
    dataView(memory0).setInt32(ptr0 + 48, result11, true);
  }
  const variant17 = v3_5;
  if (variant17 === null || variant17 === undefined) {
    dataView(memory0).setInt8(ptr0 + 56, 0, true);
  } else {
    const e = variant17;
    dataView(memory0).setInt8(ptr0 + 56, 1, true);
    const vec16 = e;
    const len16 = vec16.length;
    const result16 = realloc0(0, 0, 4, len16 * 16);
    for (let i = 0; i < vec16.length; i++) {
      const e = vec16[i];
      const base = result16 + i * 16;
      const [tuple13_0, tuple13_1] = e;
      const ptr14 = utf8Encode(tuple13_0, realloc0, memory0);
      const len14 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len14, true);
      dataView(memory0).setInt32(base + 0, ptr14, true);
      const ptr15 = utf8Encode(tuple13_1, realloc0, memory0);
      const len15 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 12, len15, true);
      dataView(memory0).setInt32(base + 8, ptr15, true);
    }
    dataView(memory0).setInt32(ptr0 + 64, len16, true);
    dataView(memory0).setInt32(ptr0 + 60, result16, true);
  }
  const variant20 = v3_6;
  if (variant20 === null || variant20 === undefined) {
    dataView(memory0).setInt8(ptr0 + 68, 0, true);
  } else {
    const e = variant20;
    dataView(memory0).setInt8(ptr0 + 68, 1, true);
    const vec19 = e;
    const len19 = vec19.length;
    const result19 = realloc0(0, 0, 4, len19 * 8);
    for (let i = 0; i < vec19.length; i++) {
      const e = vec19[i];
      const base = result19 + i * 8;
      const ptr18 = utf8Encode(e, realloc0, memory0);
      const len18 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len18, true);
      dataView(memory0).setInt32(base + 0, ptr18, true);
    }
    dataView(memory0).setInt32(ptr0 + 76, len19, true);
    dataView(memory0).setInt32(ptr0 + 72, result19, true);
  }
  const variant22 = v3_7;
  if (variant22 === null || variant22 === undefined) {
    dataView(memory0).setInt8(ptr0 + 80, 0, true);
  } else {
    const e = variant22;
    dataView(memory0).setInt8(ptr0 + 80, 1, true);
    const ptr21 = utf8Encode(e, realloc0, memory0);
    const len21 = utf8EncodedLen;
    dataView(memory0).setInt32(ptr0 + 88, len21, true);
    dataView(memory0).setInt32(ptr0 + 84, ptr21, true);
  }
  const ret = exports1["metatype:typegraph/runtimes#http-request"](ptr0);
  let variant24;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant24 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr23 = dataView(memory0).getInt32(ret + 4, true);
      const len23 = dataView(memory0).getInt32(ret + 8, true);
      const result23 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr23, len23)
      );
      variant24 = {
        tag: "err",
        val: result23,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn26(ret);
  if (variant24.tag === "err") {
    throw new ComponentError(variant24.val);
  }
  return variant24.val;
}

function registerPythonRuntime() {
  const ret = exports1["metatype:typegraph/runtimes#register-python-runtime"]();
  let variant1;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant1 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr0 = dataView(memory0).getInt32(ret + 4, true);
      const len0 = dataView(memory0).getInt32(ret + 8, true);
      const result0 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr0, len0)
      );
      variant1 = {
        tag: "err",
        val: result0,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn27(ret);
  if (variant1.tag === "err") {
    throw new ComponentError(variant1.val);
  }
  return variant1.val;
}

function fromPythonLambda(arg0, arg1) {
  const { runtime: v0_0, effect: v0_1 } = arg0;
  const variant1 = v0_1;
  let variant1_0;
  let variant1_1;
  switch (variant1.tag) {
    case "none": {
      variant1_0 = 0;
      variant1_1 = 0;
      break;
    }
    case "create": {
      const e = variant1.val;
      variant1_0 = 1;
      variant1_1 = e ? 1 : 0;
      break;
    }
    case "update": {
      const e = variant1.val;
      variant1_0 = 2;
      variant1_1 = e ? 1 : 0;
      break;
    }
    case "delete": {
      const e = variant1.val;
      variant1_0 = 3;
      variant1_1 = e ? 1 : 0;
      break;
    }
    default: {
      throw new TypeError("invalid variant specified for Effect");
    }
  }
  const { runtime: v2_0, fn: v2_1 } = arg1;
  const ptr3 = utf8Encode(v2_1, realloc0, memory0);
  const len3 = utf8EncodedLen;
  const ret = exports1["metatype:typegraph/runtimes#from-python-lambda"](
    toUint32(v0_0),
    variant1_0,
    variant1_1,
    toUint32(v2_0),
    ptr3,
    len3
  );
  let variant5;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant5 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr4 = dataView(memory0).getInt32(ret + 4, true);
      const len4 = dataView(memory0).getInt32(ret + 8, true);
      const result4 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr4, len4)
      );
      variant5 = {
        tag: "err",
        val: result4,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn28(ret);
  if (variant5.tag === "err") {
    throw new ComponentError(variant5.val);
  }
  return variant5.val;
}

function fromPythonDef(arg0, arg1) {
  const { runtime: v0_0, effect: v0_1 } = arg0;
  const variant1 = v0_1;
  let variant1_0;
  let variant1_1;
  switch (variant1.tag) {
    case "none": {
      variant1_0 = 0;
      variant1_1 = 0;
      break;
    }
    case "create": {
      const e = variant1.val;
      variant1_0 = 1;
      variant1_1 = e ? 1 : 0;
      break;
    }
    case "update": {
      const e = variant1.val;
      variant1_0 = 2;
      variant1_1 = e ? 1 : 0;
      break;
    }
    case "delete": {
      const e = variant1.val;
      variant1_0 = 3;
      variant1_1 = e ? 1 : 0;
      break;
    }
    default: {
      throw new TypeError("invalid variant specified for Effect");
    }
  }
  const { runtime: v2_0, name: v2_1, fn: v2_2 } = arg1;
  const ptr3 = utf8Encode(v2_1, realloc0, memory0);
  const len3 = utf8EncodedLen;
  const ptr4 = utf8Encode(v2_2, realloc0, memory0);
  const len4 = utf8EncodedLen;
  const ret = exports1["metatype:typegraph/runtimes#from-python-def"](
    toUint32(v0_0),
    variant1_0,
    variant1_1,
    toUint32(v2_0),
    ptr3,
    len3,
    ptr4,
    len4
  );
  let variant6;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant6 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr5 = dataView(memory0).getInt32(ret + 4, true);
      const len5 = dataView(memory0).getInt32(ret + 8, true);
      const result5 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr5, len5)
      );
      variant6 = {
        tag: "err",
        val: result5,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn29(ret);
  if (variant6.tag === "err") {
    throw new ComponentError(variant6.val);
  }
  return variant6.val;
}

function fromPythonModule(arg0, arg1) {
  const { runtime: v0_0, effect: v0_1 } = arg0;
  const variant1 = v0_1;
  let variant1_0;
  let variant1_1;
  switch (variant1.tag) {
    case "none": {
      variant1_0 = 0;
      variant1_1 = 0;
      break;
    }
    case "create": {
      const e = variant1.val;
      variant1_0 = 1;
      variant1_1 = e ? 1 : 0;
      break;
    }
    case "update": {
      const e = variant1.val;
      variant1_0 = 2;
      variant1_1 = e ? 1 : 0;
      break;
    }
    case "delete": {
      const e = variant1.val;
      variant1_0 = 3;
      variant1_1 = e ? 1 : 0;
      break;
    }
    default: {
      throw new TypeError("invalid variant specified for Effect");
    }
  }
  const { runtime: v2_0, file: v2_1 } = arg1;
  const ptr3 = utf8Encode(v2_1, realloc0, memory0);
  const len3 = utf8EncodedLen;
  const ret = exports1["metatype:typegraph/runtimes#from-python-module"](
    toUint32(v0_0),
    variant1_0,
    variant1_1,
    toUint32(v2_0),
    ptr3,
    len3
  );
  let variant5;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant5 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr4 = dataView(memory0).getInt32(ret + 4, true);
      const len4 = dataView(memory0).getInt32(ret + 8, true);
      const result4 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr4, len4)
      );
      variant5 = {
        tag: "err",
        val: result4,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn30(ret);
  if (variant5.tag === "err") {
    throw new ComponentError(variant5.val);
  }
  return variant5.val;
}

function fromPythonImport(arg0, arg1) {
  const { runtime: v0_0, effect: v0_1 } = arg0;
  const variant1 = v0_1;
  let variant1_0;
  let variant1_1;
  switch (variant1.tag) {
    case "none": {
      variant1_0 = 0;
      variant1_1 = 0;
      break;
    }
    case "create": {
      const e = variant1.val;
      variant1_0 = 1;
      variant1_1 = e ? 1 : 0;
      break;
    }
    case "update": {
      const e = variant1.val;
      variant1_0 = 2;
      variant1_1 = e ? 1 : 0;
      break;
    }
    case "delete": {
      const e = variant1.val;
      variant1_0 = 3;
      variant1_1 = e ? 1 : 0;
      break;
    }
    default: {
      throw new TypeError("invalid variant specified for Effect");
    }
  }
  const { module: v2_0, funcName: v2_1, secrets: v2_2 } = arg1;
  const ptr3 = utf8Encode(v2_1, realloc0, memory0);
  const len3 = utf8EncodedLen;
  const vec5 = v2_2;
  const len5 = vec5.length;
  const result5 = realloc0(0, 0, 4, len5 * 8);
  for (let i = 0; i < vec5.length; i++) {
    const e = vec5[i];
    const base = result5 + i * 8;
    const ptr4 = utf8Encode(e, realloc0, memory0);
    const len4 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len4, true);
    dataView(memory0).setInt32(base + 0, ptr4, true);
  }
  const ret = exports1["metatype:typegraph/runtimes#from-python-import"](
    toUint32(v0_0),
    variant1_0,
    variant1_1,
    toUint32(v2_0),
    ptr3,
    len3,
    result5,
    len5
  );
  let variant7;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant7 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr6 = dataView(memory0).getInt32(ret + 4, true);
      const len6 = dataView(memory0).getInt32(ret + 8, true);
      const result6 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr6, len6)
      );
      variant7 = {
        tag: "err",
        val: result6,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn31(ret);
  if (variant7.tag === "err") {
    throw new ComponentError(variant7.val);
  }
  return variant7.val;
}

function registerRandomRuntime(arg0) {
  const { seed: v0_0, reset: v0_1 } = arg0;
  const variant2 = v0_1;
  let variant2_0;
  let variant2_1;
  let variant2_2;
  if (variant2 === null || variant2 === undefined) {
    variant2_0 = 0;
    variant2_1 = 0;
    variant2_2 = 0;
  } else {
    const e = variant2;
    const ptr1 = utf8Encode(e, realloc0, memory0);
    const len1 = utf8EncodedLen;
    variant2_0 = 1;
    variant2_1 = ptr1;
    variant2_2 = len1;
  }
  const ret = exports1["metatype:typegraph/runtimes#register-random-runtime"](
    toUint32(v0_0),
    variant2_0,
    variant2_1,
    variant2_2
  );
  let variant4;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant4 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr3 = dataView(memory0).getInt32(ret + 4, true);
      const len3 = dataView(memory0).getInt32(ret + 8, true);
      const result3 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr3, len3)
      );
      variant4 = {
        tag: "err",
        val: result3,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn32(ret);
  if (variant4.tag === "err") {
    throw new ComponentError(variant4.val);
  }
  return variant4.val;
}

function createRandomMat(arg0, arg1) {
  const { runtime: v0_0, effect: v0_1 } = arg0;
  const variant1 = v0_1;
  let variant1_0;
  let variant1_1;
  switch (variant1.tag) {
    case "none": {
      variant1_0 = 0;
      variant1_1 = 0;
      break;
    }
    case "create": {
      const e = variant1.val;
      variant1_0 = 1;
      variant1_1 = e ? 1 : 0;
      break;
    }
    case "update": {
      const e = variant1.val;
      variant1_0 = 2;
      variant1_1 = e ? 1 : 0;
      break;
    }
    case "delete": {
      const e = variant1.val;
      variant1_0 = 3;
      variant1_1 = e ? 1 : 0;
      break;
    }
    default: {
      throw new TypeError("invalid variant specified for Effect");
    }
  }
  const { runtime: v2_0 } = arg1;
  const ret = exports1["metatype:typegraph/runtimes#create-random-mat"](
    toUint32(v0_0),
    variant1_0,
    variant1_1,
    toUint32(v2_0)
  );
  let variant4;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant4 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr3 = dataView(memory0).getInt32(ret + 4, true);
      const len3 = dataView(memory0).getInt32(ret + 8, true);
      const result3 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr3, len3)
      );
      variant4 = {
        tag: "err",
        val: result3,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn33(ret);
  if (variant4.tag === "err") {
    throw new ComponentError(variant4.val);
  }
  return variant4.val;
}

function registerWasmedgeRuntime() {
  const ret =
    exports1["metatype:typegraph/runtimes#register-wasmedge-runtime"]();
  let variant1;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant1 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr0 = dataView(memory0).getInt32(ret + 4, true);
      const len0 = dataView(memory0).getInt32(ret + 8, true);
      const result0 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr0, len0)
      );
      variant1 = {
        tag: "err",
        val: result0,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn34(ret);
  if (variant1.tag === "err") {
    throw new ComponentError(variant1.val);
  }
  return variant1.val;
}

function fromWasiModule(arg0, arg1) {
  const { runtime: v0_0, effect: v0_1 } = arg0;
  const variant1 = v0_1;
  let variant1_0;
  let variant1_1;
  switch (variant1.tag) {
    case "none": {
      variant1_0 = 0;
      variant1_1 = 0;
      break;
    }
    case "create": {
      const e = variant1.val;
      variant1_0 = 1;
      variant1_1 = e ? 1 : 0;
      break;
    }
    case "update": {
      const e = variant1.val;
      variant1_0 = 2;
      variant1_1 = e ? 1 : 0;
      break;
    }
    case "delete": {
      const e = variant1.val;
      variant1_0 = 3;
      variant1_1 = e ? 1 : 0;
      break;
    }
    default: {
      throw new TypeError("invalid variant specified for Effect");
    }
  }
  const { funcName: v2_0, module: v2_1 } = arg1;
  const ptr3 = utf8Encode(v2_0, realloc0, memory0);
  const len3 = utf8EncodedLen;
  const ptr4 = utf8Encode(v2_1, realloc0, memory0);
  const len4 = utf8EncodedLen;
  const ret = exports1["metatype:typegraph/runtimes#from-wasi-module"](
    toUint32(v0_0),
    variant1_0,
    variant1_1,
    ptr3,
    len3,
    ptr4,
    len4
  );
  let variant6;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant6 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr5 = dataView(memory0).getInt32(ret + 4, true);
      const len5 = dataView(memory0).getInt32(ret + 8, true);
      const result5 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr5, len5)
      );
      variant6 = {
        tag: "err",
        val: result5,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn35(ret);
  if (variant6.tag === "err") {
    throw new ComponentError(variant6.val);
  }
  return variant6.val;
}

function registerPrismaRuntime(arg0) {
  const { name: v0_0, connectionStringSecret: v0_1 } = arg0;
  const ptr1 = utf8Encode(v0_0, realloc0, memory0);
  const len1 = utf8EncodedLen;
  const ptr2 = utf8Encode(v0_1, realloc0, memory0);
  const len2 = utf8EncodedLen;
  const ret = exports1["metatype:typegraph/runtimes#register-prisma-runtime"](
    ptr1,
    len1,
    ptr2,
    len2
  );
  let variant4;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant4 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr3 = dataView(memory0).getInt32(ret + 4, true);
      const len3 = dataView(memory0).getInt32(ret + 8, true);
      const result3 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr3, len3)
      );
      variant4 = {
        tag: "err",
        val: result3,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn36(ret);
  if (variant4.tag === "err") {
    throw new ComponentError(variant4.val);
  }
  return variant4.val;
}

function prismaFindUnique(arg0, arg1) {
  const ret = exports1["metatype:typegraph/runtimes#prisma-find-unique"](
    toUint32(arg0),
    toUint32(arg1)
  );
  let variant1;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant1 = {
        tag: "ok",
        val: {
          inp: dataView(memory0).getInt32(ret + 4, true) >>> 0,
          out: dataView(memory0).getInt32(ret + 8, true) >>> 0,
          mat: dataView(memory0).getInt32(ret + 12, true) >>> 0,
        },
      };
      break;
    }
    case 1: {
      const ptr0 = dataView(memory0).getInt32(ret + 4, true);
      const len0 = dataView(memory0).getInt32(ret + 8, true);
      const result0 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr0, len0)
      );
      variant1 = {
        tag: "err",
        val: result0,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn37(ret);
  if (variant1.tag === "err") {
    throw new ComponentError(variant1.val);
  }
  return variant1.val;
}

function prismaFindMany(arg0, arg1) {
  const ret = exports1["metatype:typegraph/runtimes#prisma-find-many"](
    toUint32(arg0),
    toUint32(arg1)
  );
  let variant1;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant1 = {
        tag: "ok",
        val: {
          inp: dataView(memory0).getInt32(ret + 4, true) >>> 0,
          out: dataView(memory0).getInt32(ret + 8, true) >>> 0,
          mat: dataView(memory0).getInt32(ret + 12, true) >>> 0,
        },
      };
      break;
    }
    case 1: {
      const ptr0 = dataView(memory0).getInt32(ret + 4, true);
      const len0 = dataView(memory0).getInt32(ret + 8, true);
      const result0 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr0, len0)
      );
      variant1 = {
        tag: "err",
        val: result0,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn38(ret);
  if (variant1.tag === "err") {
    throw new ComponentError(variant1.val);
  }
  return variant1.val;
}

function prismaFindFirst(arg0, arg1) {
  const ret = exports1["metatype:typegraph/runtimes#prisma-find-first"](
    toUint32(arg0),
    toUint32(arg1)
  );
  let variant1;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant1 = {
        tag: "ok",
        val: {
          inp: dataView(memory0).getInt32(ret + 4, true) >>> 0,
          out: dataView(memory0).getInt32(ret + 8, true) >>> 0,
          mat: dataView(memory0).getInt32(ret + 12, true) >>> 0,
        },
      };
      break;
    }
    case 1: {
      const ptr0 = dataView(memory0).getInt32(ret + 4, true);
      const len0 = dataView(memory0).getInt32(ret + 8, true);
      const result0 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr0, len0)
      );
      variant1 = {
        tag: "err",
        val: result0,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn39(ret);
  if (variant1.tag === "err") {
    throw new ComponentError(variant1.val);
  }
  return variant1.val;
}

function prismaAggregate(arg0, arg1) {
  const ret = exports1["metatype:typegraph/runtimes#prisma-aggregate"](
    toUint32(arg0),
    toUint32(arg1)
  );
  let variant1;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant1 = {
        tag: "ok",
        val: {
          inp: dataView(memory0).getInt32(ret + 4, true) >>> 0,
          out: dataView(memory0).getInt32(ret + 8, true) >>> 0,
          mat: dataView(memory0).getInt32(ret + 12, true) >>> 0,
        },
      };
      break;
    }
    case 1: {
      const ptr0 = dataView(memory0).getInt32(ret + 4, true);
      const len0 = dataView(memory0).getInt32(ret + 8, true);
      const result0 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr0, len0)
      );
      variant1 = {
        tag: "err",
        val: result0,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn40(ret);
  if (variant1.tag === "err") {
    throw new ComponentError(variant1.val);
  }
  return variant1.val;
}

function prismaCount(arg0, arg1) {
  const ret = exports1["metatype:typegraph/runtimes#prisma-count"](
    toUint32(arg0),
    toUint32(arg1)
  );
  let variant1;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant1 = {
        tag: "ok",
        val: {
          inp: dataView(memory0).getInt32(ret + 4, true) >>> 0,
          out: dataView(memory0).getInt32(ret + 8, true) >>> 0,
          mat: dataView(memory0).getInt32(ret + 12, true) >>> 0,
        },
      };
      break;
    }
    case 1: {
      const ptr0 = dataView(memory0).getInt32(ret + 4, true);
      const len0 = dataView(memory0).getInt32(ret + 8, true);
      const result0 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr0, len0)
      );
      variant1 = {
        tag: "err",
        val: result0,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn41(ret);
  if (variant1.tag === "err") {
    throw new ComponentError(variant1.val);
  }
  return variant1.val;
}

function prismaGroupBy(arg0, arg1) {
  const ret = exports1["metatype:typegraph/runtimes#prisma-group-by"](
    toUint32(arg0),
    toUint32(arg1)
  );
  let variant1;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant1 = {
        tag: "ok",
        val: {
          inp: dataView(memory0).getInt32(ret + 4, true) >>> 0,
          out: dataView(memory0).getInt32(ret + 8, true) >>> 0,
          mat: dataView(memory0).getInt32(ret + 12, true) >>> 0,
        },
      };
      break;
    }
    case 1: {
      const ptr0 = dataView(memory0).getInt32(ret + 4, true);
      const len0 = dataView(memory0).getInt32(ret + 8, true);
      const result0 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr0, len0)
      );
      variant1 = {
        tag: "err",
        val: result0,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn42(ret);
  if (variant1.tag === "err") {
    throw new ComponentError(variant1.val);
  }
  return variant1.val;
}

function prismaCreateOne(arg0, arg1) {
  const ret = exports1["metatype:typegraph/runtimes#prisma-create-one"](
    toUint32(arg0),
    toUint32(arg1)
  );
  let variant1;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant1 = {
        tag: "ok",
        val: {
          inp: dataView(memory0).getInt32(ret + 4, true) >>> 0,
          out: dataView(memory0).getInt32(ret + 8, true) >>> 0,
          mat: dataView(memory0).getInt32(ret + 12, true) >>> 0,
        },
      };
      break;
    }
    case 1: {
      const ptr0 = dataView(memory0).getInt32(ret + 4, true);
      const len0 = dataView(memory0).getInt32(ret + 8, true);
      const result0 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr0, len0)
      );
      variant1 = {
        tag: "err",
        val: result0,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn43(ret);
  if (variant1.tag === "err") {
    throw new ComponentError(variant1.val);
  }
  return variant1.val;
}

function prismaCreateMany(arg0, arg1) {
  const ret = exports1["metatype:typegraph/runtimes#prisma-create-many"](
    toUint32(arg0),
    toUint32(arg1)
  );
  let variant1;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant1 = {
        tag: "ok",
        val: {
          inp: dataView(memory0).getInt32(ret + 4, true) >>> 0,
          out: dataView(memory0).getInt32(ret + 8, true) >>> 0,
          mat: dataView(memory0).getInt32(ret + 12, true) >>> 0,
        },
      };
      break;
    }
    case 1: {
      const ptr0 = dataView(memory0).getInt32(ret + 4, true);
      const len0 = dataView(memory0).getInt32(ret + 8, true);
      const result0 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr0, len0)
      );
      variant1 = {
        tag: "err",
        val: result0,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn44(ret);
  if (variant1.tag === "err") {
    throw new ComponentError(variant1.val);
  }
  return variant1.val;
}

function prismaUpdateOne(arg0, arg1) {
  const ret = exports1["metatype:typegraph/runtimes#prisma-update-one"](
    toUint32(arg0),
    toUint32(arg1)
  );
  let variant1;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant1 = {
        tag: "ok",
        val: {
          inp: dataView(memory0).getInt32(ret + 4, true) >>> 0,
          out: dataView(memory0).getInt32(ret + 8, true) >>> 0,
          mat: dataView(memory0).getInt32(ret + 12, true) >>> 0,
        },
      };
      break;
    }
    case 1: {
      const ptr0 = dataView(memory0).getInt32(ret + 4, true);
      const len0 = dataView(memory0).getInt32(ret + 8, true);
      const result0 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr0, len0)
      );
      variant1 = {
        tag: "err",
        val: result0,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn45(ret);
  if (variant1.tag === "err") {
    throw new ComponentError(variant1.val);
  }
  return variant1.val;
}

function prismaUpdateMany(arg0, arg1) {
  const ret = exports1["metatype:typegraph/runtimes#prisma-update-many"](
    toUint32(arg0),
    toUint32(arg1)
  );
  let variant1;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant1 = {
        tag: "ok",
        val: {
          inp: dataView(memory0).getInt32(ret + 4, true) >>> 0,
          out: dataView(memory0).getInt32(ret + 8, true) >>> 0,
          mat: dataView(memory0).getInt32(ret + 12, true) >>> 0,
        },
      };
      break;
    }
    case 1: {
      const ptr0 = dataView(memory0).getInt32(ret + 4, true);
      const len0 = dataView(memory0).getInt32(ret + 8, true);
      const result0 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr0, len0)
      );
      variant1 = {
        tag: "err",
        val: result0,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn46(ret);
  if (variant1.tag === "err") {
    throw new ComponentError(variant1.val);
  }
  return variant1.val;
}

function prismaUpsertOne(arg0, arg1) {
  const ret = exports1["metatype:typegraph/runtimes#prisma-upsert-one"](
    toUint32(arg0),
    toUint32(arg1)
  );
  let variant1;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant1 = {
        tag: "ok",
        val: {
          inp: dataView(memory0).getInt32(ret + 4, true) >>> 0,
          out: dataView(memory0).getInt32(ret + 8, true) >>> 0,
          mat: dataView(memory0).getInt32(ret + 12, true) >>> 0,
        },
      };
      break;
    }
    case 1: {
      const ptr0 = dataView(memory0).getInt32(ret + 4, true);
      const len0 = dataView(memory0).getInt32(ret + 8, true);
      const result0 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr0, len0)
      );
      variant1 = {
        tag: "err",
        val: result0,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn47(ret);
  if (variant1.tag === "err") {
    throw new ComponentError(variant1.val);
  }
  return variant1.val;
}

function prismaDeleteOne(arg0, arg1) {
  const ret = exports1["metatype:typegraph/runtimes#prisma-delete-one"](
    toUint32(arg0),
    toUint32(arg1)
  );
  let variant1;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant1 = {
        tag: "ok",
        val: {
          inp: dataView(memory0).getInt32(ret + 4, true) >>> 0,
          out: dataView(memory0).getInt32(ret + 8, true) >>> 0,
          mat: dataView(memory0).getInt32(ret + 12, true) >>> 0,
        },
      };
      break;
    }
    case 1: {
      const ptr0 = dataView(memory0).getInt32(ret + 4, true);
      const len0 = dataView(memory0).getInt32(ret + 8, true);
      const result0 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr0, len0)
      );
      variant1 = {
        tag: "err",
        val: result0,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn48(ret);
  if (variant1.tag === "err") {
    throw new ComponentError(variant1.val);
  }
  return variant1.val;
}

function prismaDeleteMany(arg0, arg1) {
  const ret = exports1["metatype:typegraph/runtimes#prisma-delete-many"](
    toUint32(arg0),
    toUint32(arg1)
  );
  let variant1;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant1 = {
        tag: "ok",
        val: {
          inp: dataView(memory0).getInt32(ret + 4, true) >>> 0,
          out: dataView(memory0).getInt32(ret + 8, true) >>> 0,
          mat: dataView(memory0).getInt32(ret + 12, true) >>> 0,
        },
      };
      break;
    }
    case 1: {
      const ptr0 = dataView(memory0).getInt32(ret + 4, true);
      const len0 = dataView(memory0).getInt32(ret + 8, true);
      const result0 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr0, len0)
      );
      variant1 = {
        tag: "err",
        val: result0,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn49(ret);
  if (variant1.tag === "err") {
    throw new ComponentError(variant1.val);
  }
  return variant1.val;
}

function prismaLink(arg0) {
  const {
    targetType: v0_0,
    relationshipName: v0_1,
    foreignKey: v0_2,
    targetField: v0_3,
    unique: v0_4,
  } = arg0;
  const variant2 = v0_1;
  let variant2_0;
  let variant2_1;
  let variant2_2;
  if (variant2 === null || variant2 === undefined) {
    variant2_0 = 0;
    variant2_1 = 0;
    variant2_2 = 0;
  } else {
    const e = variant2;
    const ptr1 = utf8Encode(e, realloc0, memory0);
    const len1 = utf8EncodedLen;
    variant2_0 = 1;
    variant2_1 = ptr1;
    variant2_2 = len1;
  }
  const variant3 = v0_2;
  let variant3_0;
  let variant3_1;
  if (variant3 === null || variant3 === undefined) {
    variant3_0 = 0;
    variant3_1 = 0;
  } else {
    const e = variant3;
    variant3_0 = 1;
    variant3_1 = e ? 1 : 0;
  }
  const variant5 = v0_3;
  let variant5_0;
  let variant5_1;
  let variant5_2;
  if (variant5 === null || variant5 === undefined) {
    variant5_0 = 0;
    variant5_1 = 0;
    variant5_2 = 0;
  } else {
    const e = variant5;
    const ptr4 = utf8Encode(e, realloc0, memory0);
    const len4 = utf8EncodedLen;
    variant5_0 = 1;
    variant5_1 = ptr4;
    variant5_2 = len4;
  }
  const variant6 = v0_4;
  let variant6_0;
  let variant6_1;
  if (variant6 === null || variant6 === undefined) {
    variant6_0 = 0;
    variant6_1 = 0;
  } else {
    const e = variant6;
    variant6_0 = 1;
    variant6_1 = e ? 1 : 0;
  }
  const ret = exports1["metatype:typegraph/runtimes#prisma-link"](
    toUint32(v0_0),
    variant2_0,
    variant2_1,
    variant2_2,
    variant3_0,
    variant3_1,
    variant5_0,
    variant5_1,
    variant5_2,
    variant6_0,
    variant6_1
  );
  let variant8;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant8 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr7 = dataView(memory0).getInt32(ret + 4, true);
      const len7 = dataView(memory0).getInt32(ret + 8, true);
      const result7 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr7, len7)
      );
      variant8 = {
        tag: "err",
        val: result7,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn50(ret);
  if (variant8.tag === "err") {
    throw new ComponentError(variant8.val);
  }
  return variant8.val;
}

function registerTemporalRuntime(arg0) {
  const { name: v0_0, host: v0_1 } = arg0;
  const ptr1 = utf8Encode(v0_0, realloc0, memory0);
  const len1 = utf8EncodedLen;
  const ptr2 = utf8Encode(v0_1, realloc0, memory0);
  const len2 = utf8EncodedLen;
  const ret = exports1["metatype:typegraph/runtimes#register-temporal-runtime"](
    ptr1,
    len1,
    ptr2,
    len2
  );
  let variant4;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant4 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr3 = dataView(memory0).getInt32(ret + 4, true);
      const len3 = dataView(memory0).getInt32(ret + 8, true);
      const result3 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr3, len3)
      );
      variant4 = {
        tag: "err",
        val: result3,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn51(ret);
  if (variant4.tag === "err") {
    throw new ComponentError(variant4.val);
  }
  return variant4.val;
}

function generateTemporalOperation(arg0, arg1) {
  const { matArg: v0_0, funcArg: v0_1, operation: v0_2 } = arg1;
  const variant2 = v0_0;
  let variant2_0;
  let variant2_1;
  let variant2_2;
  if (variant2 === null || variant2 === undefined) {
    variant2_0 = 0;
    variant2_1 = 0;
    variant2_2 = 0;
  } else {
    const e = variant2;
    const ptr1 = utf8Encode(e, realloc0, memory0);
    const len1 = utf8EncodedLen;
    variant2_0 = 1;
    variant2_1 = ptr1;
    variant2_2 = len1;
  }
  const variant3 = v0_1;
  let variant3_0;
  let variant3_1;
  if (variant3 === null || variant3 === undefined) {
    variant3_0 = 0;
    variant3_1 = 0;
  } else {
    const e = variant3;
    variant3_0 = 1;
    variant3_1 = toUint32(e);
  }
  const variant4 = v0_2;
  let variant4_0;
  switch (variant4.tag) {
    case "start-workflow": {
      variant4_0 = 0;
      break;
    }
    case "signal-workflow": {
      variant4_0 = 1;
      break;
    }
    case "query-workflow": {
      variant4_0 = 2;
      break;
    }
    case "describe-workflow": {
      variant4_0 = 3;
      break;
    }
    default: {
      throw new TypeError(
        "invalid variant specified for TemporalOperationType"
      );
    }
  }
  const ret = exports1[
    "metatype:typegraph/runtimes#generate-temporal-operation"
  ](
    toUint32(arg0),
    variant2_0,
    variant2_1,
    variant2_2,
    variant3_0,
    variant3_1,
    variant4_0
  );
  let variant6;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant6 = {
        tag: "ok",
        val: {
          inp: dataView(memory0).getInt32(ret + 4, true) >>> 0,
          out: dataView(memory0).getInt32(ret + 8, true) >>> 0,
          mat: dataView(memory0).getInt32(ret + 12, true) >>> 0,
        },
      };
      break;
    }
    case 1: {
      const ptr5 = dataView(memory0).getInt32(ret + 4, true);
      const len5 = dataView(memory0).getInt32(ret + 8, true);
      const result5 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr5, len5)
      );
      variant6 = {
        tag: "err",
        val: result5,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn52(ret);
  if (variant6.tag === "err") {
    throw new ComponentError(variant6.val);
  }
  return variant6.val;
}

function genApplyb(arg0, arg1) {
  const { paths: v0_0 } = arg1;
  const vec7 = v0_0;
  const len7 = vec7.length;
  const result7 = realloc0(0, 0, 4, len7 * 24);
  for (let i = 0; i < vec7.length; i++) {
    const e = vec7[i];
    const base = result7 + i * 24;
    const { path: v1_0, value: v1_1 } = e;
    const vec3 = v1_0;
    const len3 = vec3.length;
    const result3 = realloc0(0, 0, 4, len3 * 8);
    for (let i = 0; i < vec3.length; i++) {
      const e = vec3[i];
      const base = result3 + i * 8;
      const ptr2 = utf8Encode(e, realloc0, memory0);
      const len2 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len2, true);
      dataView(memory0).setInt32(base + 0, ptr2, true);
    }
    dataView(memory0).setInt32(base + 4, len3, true);
    dataView(memory0).setInt32(base + 0, result3, true);
    const { inherit: v4_0, payload: v4_1 } = v1_1;
    dataView(memory0).setInt8(base + 8, v4_0 ? 1 : 0, true);
    const variant6 = v4_1;
    if (variant6 === null || variant6 === undefined) {
      dataView(memory0).setInt8(base + 12, 0, true);
    } else {
      const e = variant6;
      dataView(memory0).setInt8(base + 12, 1, true);
      const ptr5 = utf8Encode(e, realloc0, memory0);
      const len5 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 20, len5, true);
      dataView(memory0).setInt32(base + 16, ptr5, true);
    }
  }
  const ret = exports1["metatype:typegraph/utils#gen-applyb"](
    toUint32(arg0),
    result7,
    len7
  );
  let variant9;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      variant9 = {
        tag: "ok",
        val: dataView(memory0).getInt32(ret + 4, true) >>> 0,
      };
      break;
    }
    case 1: {
      const ptr8 = dataView(memory0).getInt32(ret + 4, true);
      const len8 = dataView(memory0).getInt32(ret + 8, true);
      const result8 = utf8Decoder.decode(
        new Uint8Array(memory0.buffer, ptr8, len8)
      );
      variant9 = {
        tag: "err",
        val: result8,
      };
      break;
    }
    default: {
      throw new TypeError("invalid variant discriminant for expected");
    }
  }
  postReturn53(ret);
  if (variant9.tag === "err") {
    throw new ComponentError(variant9.val);
  }
  return variant9.val;
}

const $init = (async () => {
  const module0 = fetchCompile(
    new URL("./typegraph_core.core.wasm", import.meta.url)
  );
  const module1 = base64Compile(
    "AGFzbQEAAAABDwJgBX9/f39/AGADf39/AAMDAgABBAUBcAECAgcUAwEwAAABMQABCCRpbXBvcnRzAQAKIQIRACAAIAEgAiADIARBABEAAAsNACAAIAEgAkEBEQEACwAuCXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AQ13aXQtY29tcG9uZW50BjAuMTMuMABuBG5hbWUAExJ3aXQtY29tcG9uZW50OnNoaW0BUgIAJGluZGlyZWN0LW1ldGF0eXBlOnR5cGVncmFwaC9hYmktZ2xvYgEpaW5kaXJlY3QtbWV0YXR5cGU6dHlwZWdyYXBoL2FiaS1yZWFkLWZpbGU"
  );
  const module2 = base64Compile(
    "AGFzbQEAAAABDwJgBX9/f39/AGADf39/AAIaAwABMAAAAAExAAEACCRpbXBvcnRzAXABAgIJCAEAQQALAgABAC4JcHJvZHVjZXJzAQxwcm9jZXNzZWQtYnkBDXdpdC1jb21wb25lbnQGMC4xMy4wABwEbmFtZQAVFHdpdC1jb21wb25lbnQ6Zml4dXBz"
  );
  Promise.all([module0, module1, module2]).catch(() => {});
  ({ exports: exports0 } = await instantiateCore(await module1));
  ({ exports: exports1 } = await instantiateCore(await module0, {
    "metatype:typegraph/abi": {
      glob: exports0["0"],
      "read-file": exports0["1"],
    },
  }));
  memory0 = exports1.memory;
  realloc0 = exports1.cabi_realloc;
  ({ exports: exports2 } = await instantiateCore(await module2, {
    "": {
      $imports: exports0.$imports,
      0: lowering0,
      1: lowering1,
    },
  }));
  postReturn0 = exports1["cabi_post_metatype:typegraph/core#init-typegraph"];
  postReturn1 =
    exports1["cabi_post_metatype:typegraph/core#finalize-typegraph"];
  postReturn2 = exports1["cabi_post_metatype:typegraph/core#with-injection"];
  postReturn3 = exports1["cabi_post_metatype:typegraph/core#proxyb"];
  postReturn4 = exports1["cabi_post_metatype:typegraph/core#integerb"];
  postReturn5 = exports1["cabi_post_metatype:typegraph/core#floatb"];
  postReturn6 = exports1["cabi_post_metatype:typegraph/core#booleanb"];
  postReturn7 = exports1["cabi_post_metatype:typegraph/core#stringb"];
  postReturn8 = exports1["cabi_post_metatype:typegraph/core#arrayb"];
  postReturn9 = exports1["cabi_post_metatype:typegraph/core#optionalb"];
  postReturn10 = exports1["cabi_post_metatype:typegraph/core#unionb"];
  postReturn11 = exports1["cabi_post_metatype:typegraph/core#eitherb"];
  postReturn12 = exports1["cabi_post_metatype:typegraph/core#structb"];
  postReturn13 = exports1["cabi_post_metatype:typegraph/core#get-type-repr"];
  postReturn14 = exports1["cabi_post_metatype:typegraph/core#funcb"];
  postReturn15 = exports1["cabi_post_metatype:typegraph/core#register-policy"];
  postReturn16 = exports1["cabi_post_metatype:typegraph/core#with-policy"];
  postReturn17 =
    exports1["cabi_post_metatype:typegraph/core#register-context-policy"];
  postReturn18 = exports1["cabi_post_metatype:typegraph/core#expose"];
  postReturn19 =
    exports1["cabi_post_metatype:typegraph/runtimes#register-deno-func"];
  postReturn20 =
    exports1["cabi_post_metatype:typegraph/runtimes#get-predefined-deno-func"];
  postReturn21 =
    exports1["cabi_post_metatype:typegraph/runtimes#import-deno-function"];
  postReturn22 =
    exports1["cabi_post_metatype:typegraph/runtimes#register-graphql-runtime"];
  postReturn23 =
    exports1["cabi_post_metatype:typegraph/runtimes#graphql-query"];
  postReturn24 =
    exports1["cabi_post_metatype:typegraph/runtimes#graphql-mutation"];
  postReturn25 =
    exports1["cabi_post_metatype:typegraph/runtimes#register-http-runtime"];
  postReturn26 = exports1["cabi_post_metatype:typegraph/runtimes#http-request"];
  postReturn27 =
    exports1["cabi_post_metatype:typegraph/runtimes#register-python-runtime"];
  postReturn28 =
    exports1["cabi_post_metatype:typegraph/runtimes#from-python-lambda"];
  postReturn29 =
    exports1["cabi_post_metatype:typegraph/runtimes#from-python-def"];
  postReturn30 =
    exports1["cabi_post_metatype:typegraph/runtimes#from-python-module"];
  postReturn31 =
    exports1["cabi_post_metatype:typegraph/runtimes#from-python-import"];
  postReturn32 =
    exports1["cabi_post_metatype:typegraph/runtimes#register-random-runtime"];
  postReturn33 =
    exports1["cabi_post_metatype:typegraph/runtimes#create-random-mat"];
  postReturn34 =
    exports1["cabi_post_metatype:typegraph/runtimes#register-wasmedge-runtime"];
  postReturn35 =
    exports1["cabi_post_metatype:typegraph/runtimes#from-wasi-module"];
  postReturn36 =
    exports1["cabi_post_metatype:typegraph/runtimes#register-prisma-runtime"];
  postReturn37 =
    exports1["cabi_post_metatype:typegraph/runtimes#prisma-find-unique"];
  postReturn38 =
    exports1["cabi_post_metatype:typegraph/runtimes#prisma-find-many"];
  postReturn39 =
    exports1["cabi_post_metatype:typegraph/runtimes#prisma-find-first"];
  postReturn40 =
    exports1["cabi_post_metatype:typegraph/runtimes#prisma-aggregate"];
  postReturn41 = exports1["cabi_post_metatype:typegraph/runtimes#prisma-count"];
  postReturn42 =
    exports1["cabi_post_metatype:typegraph/runtimes#prisma-group-by"];
  postReturn43 =
    exports1["cabi_post_metatype:typegraph/runtimes#prisma-create-one"];
  postReturn44 =
    exports1["cabi_post_metatype:typegraph/runtimes#prisma-create-many"];
  postReturn45 =
    exports1["cabi_post_metatype:typegraph/runtimes#prisma-update-one"];
  postReturn46 =
    exports1["cabi_post_metatype:typegraph/runtimes#prisma-update-many"];
  postReturn47 =
    exports1["cabi_post_metatype:typegraph/runtimes#prisma-upsert-one"];
  postReturn48 =
    exports1["cabi_post_metatype:typegraph/runtimes#prisma-delete-one"];
  postReturn49 =
    exports1["cabi_post_metatype:typegraph/runtimes#prisma-delete-many"];
  postReturn50 = exports1["cabi_post_metatype:typegraph/runtimes#prisma-link"];
  postReturn51 =
    exports1["cabi_post_metatype:typegraph/runtimes#register-temporal-runtime"];
  postReturn52 =
    exports1[
      "cabi_post_metatype:typegraph/runtimes#generate-temporal-operation"
    ];
  postReturn53 = exports1["cabi_post_metatype:typegraph/utils#gen-applyb"];
})();

await $init;
const core = {
  arrayb: arrayb,
  booleanb: booleanb,
  eitherb: eitherb,
  expose: expose,
  finalizeTypegraph: finalizeTypegraph,
  floatb: floatb,
  funcb: funcb,
  getTypeRepr: getTypeRepr,
  initTypegraph: initTypegraph,
  integerb: integerb,
  optionalb: optionalb,
  proxyb: proxyb,
  registerContextPolicy: registerContextPolicy,
  registerPolicy: registerPolicy,
  stringb: stringb,
  structb: structb,
  unionb: unionb,
  withInjection: withInjection,
  withPolicy: withPolicy,
};
const runtimes = {
  createRandomMat: createRandomMat,
  fromPythonDef: fromPythonDef,
  fromPythonImport: fromPythonImport,
  fromPythonLambda: fromPythonLambda,
  fromPythonModule: fromPythonModule,
  fromWasiModule: fromWasiModule,
  generateTemporalOperation: generateTemporalOperation,
  getDenoRuntime: getDenoRuntime,
  getPredefinedDenoFunc: getPredefinedDenoFunc,
  graphqlMutation: graphqlMutation,
  graphqlQuery: graphqlQuery,
  httpRequest: httpRequest,
  importDenoFunction: importDenoFunction,
  prismaAggregate: prismaAggregate,
  prismaCount: prismaCount,
  prismaCreateMany: prismaCreateMany,
  prismaCreateOne: prismaCreateOne,
  prismaDeleteMany: prismaDeleteMany,
  prismaDeleteOne: prismaDeleteOne,
  prismaFindFirst: prismaFindFirst,
  prismaFindMany: prismaFindMany,
  prismaFindUnique: prismaFindUnique,
  prismaGroupBy: prismaGroupBy,
  prismaLink: prismaLink,
  prismaUpdateMany: prismaUpdateMany,
  prismaUpdateOne: prismaUpdateOne,
  prismaUpsertOne: prismaUpsertOne,
  registerDenoFunc: registerDenoFunc,
  registerGraphqlRuntime: registerGraphqlRuntime,
  registerHttpRuntime: registerHttpRuntime,
  registerPrismaRuntime: registerPrismaRuntime,
  registerPythonRuntime: registerPythonRuntime,
  registerRandomRuntime: registerRandomRuntime,
  registerTemporalRuntime: registerTemporalRuntime,
  registerWasmedgeRuntime: registerWasmedgeRuntime,
};
const utils = {
  genApplyb: genApplyb,
};

export {
  core,
  runtimes,
  utils,
  core as "metatype:typegraph/core",
  runtimes as "metatype:typegraph/runtimes",
  utils as "metatype:typegraph/utils",
};
