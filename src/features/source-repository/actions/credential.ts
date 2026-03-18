"use server";

import { PrismaClient } from "@/generated/prisma";
import { encrypt, decrypt } from "@/lib/encryption";
import { fetchS3Files } from "./fetch-s3-files";

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

type S3Settings = {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucket: string;
  prefix: string;
};

export async function saveS3Credential(settings: S3Settings): Promise<string[]> {
  await prisma.s3Credential.upsert({
    where: { id: 1 },
    update: {
      bucket: settings.bucket,
      region: settings.region,
      prefix: settings.prefix,
      accessKeyId: encrypt(settings.accessKeyId),
      secretAccessKey: encrypt(settings.secretAccessKey),
    },
    create: {
      id: 1,
      bucket: settings.bucket,
      region: settings.region,
      prefix: settings.prefix,
      accessKeyId: encrypt(settings.accessKeyId),
      secretAccessKey: encrypt(settings.secretAccessKey),
    },
  });

  return fetchS3Files(settings);
}

export async function loadS3Credential(): Promise<S3Settings | null> {
  const record = await prisma.s3Credential.findUnique({ where: { id: 1 } });
  if (!record) return null;

  return {
    bucket: record.bucket,
    region: record.region,
    prefix: record.prefix,
    accessKeyId: decrypt(record.accessKeyId),
    secretAccessKey: decrypt(record.secretAccessKey),
  };
}
