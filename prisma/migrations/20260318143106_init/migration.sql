-- CreateTable
CREATE TABLE "s3_credential" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "bucket" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "accessKeyId" TEXT NOT NULL,
    "secretAccessKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "s3_credential_pkey" PRIMARY KEY ("id")
);
