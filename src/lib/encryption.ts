import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
} from "crypto";

const ALGORITHM = "aes-256-gcm";

function getKey() {
  return Buffer.from(
    process.env.ENCRYPTION_KEY!,
    "hex",
  );
}

export function encrypt(text: string): string {
  const iv = randomBytes(12); // initialization vector

  const cipher = createCipheriv(
    ALGORITHM,
    getKey(),
    iv,
  );

  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return [
    iv.toString("base64"),
    authTag.toString("base64"),
    encrypted.toString("base64"),
  ].join(":");
}

export function decrypt(
  encrypted: string,
): string {
  const [ivB64, authTagB64, dataB64] =
    encrypted.split(":");

  const iv = Buffer.from(ivB64, "base64");
  const authTag = Buffer.from(
    authTagB64,
    "base64",
  );
  const data = Buffer.from(dataB64, "base64");

  const decipher = createDecipheriv(
    ALGORITHM,
    getKey(),
    iv,
  );
  decipher.setAuthTag(authTag);

  return (
    decipher.update(data) + decipher.final("utf8")
  );
}
