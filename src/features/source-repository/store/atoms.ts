import { atom } from "jotai";

type S3Connection = {
  bucket: string;
  region: string;
  prefix: string;
};

export const s3ConnectionAtom = atom<S3Connection | null>(null);
export const s3FileListAtom = atom<string[] | null>(null);
