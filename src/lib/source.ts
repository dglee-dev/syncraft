import fs from "fs/promises";
import path from "path";

export async function getSourceList() {
  const rootDir = process.cwd();
  const sourceDir = path.join(rootDir, "/src/data/source/markdown");

  const files = await fs.readdir(sourceDir);

  console.log(files);

  return files;
}
