-- AlterTable
ALTER TABLE "Bank" ADD COLUMN     "digit" TEXT;
UPDATE "Bank" SET "digit" = '' WHERE "digit" IS NULL;