import {
  describe,
  it,
  expect,
  beforeAll,
} from "vitest";
import { encrypt, decrypt } from "./encryption";

beforeAll(() => {
  process.env.ENCRYPTION_KEY =
    "2bff2e8409e674f7cf94e811c74b54dfc6ae9028b56cec8e96525ad5e6329d7e";
});

describe("encrypt / decrypt", () => {
  it("복호화하면 원본 문자열이 나온다", () => {
    const original = "AKIAIOSFODNN7EXAMPLE";
    expect(decrypt(encrypt(original))).toBe(
      original,
    );
  });

  it("같은 값을 두 번 암호화해도 결과가 다르다 (IV가 매번 다름)", () => {
    const value = "secret";
    expect(encrypt(value)).not.toBe(
      encrypt(value),
    );
  });

  it("암호화된 문자열은 iv:authTag:data 형식이다", () => {
    const encrypted = encrypt("test");
    console.log("Encrypted value: ", encrypted);
    expect(encrypted.split(":")).toHaveLength(3);
  });
});
