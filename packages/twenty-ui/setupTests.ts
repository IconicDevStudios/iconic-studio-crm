import '@testing-library/jest-dom';
import {
  TextDecoder as NodeTextDecoder,
  TextEncoder as NodeTextEncoder,
} from 'node:util';

const globalWithWebEncoding = globalThis as Record<string, unknown>;

if (globalWithWebEncoding.TextEncoder === undefined) {
  globalWithWebEncoding.TextEncoder = NodeTextEncoder;
}

if (globalWithWebEncoding.TextDecoder === undefined) {
  globalWithWebEncoding.TextDecoder = NodeTextDecoder;
}
