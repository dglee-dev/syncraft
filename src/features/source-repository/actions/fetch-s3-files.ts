"use server";

import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

type S3Settings = {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucket: string;
  prefix: string;
};

export async function fetchS3Files(settings: S3Settings): Promise<string[]> {
  const client = new S3Client({
    region: settings.region,
    credentials: {
      accessKeyId: settings.accessKeyId,
      secretAccessKey: settings.secretAccessKey,
    },
  });

  const response = await client.send(
    new ListObjectsV2Command({
      Bucket: settings.bucket,
      Prefix: settings.prefix,
    })
  );

  return (response.Contents ?? [])
    .map((obj) => obj.Key ?? "")
    .filter(Boolean);
}
