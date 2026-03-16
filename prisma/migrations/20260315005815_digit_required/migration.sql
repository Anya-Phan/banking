/*
  Warnings:

  - Made the column `digit` on table `Bank` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Bank" ALTER COLUMN "digit" SET NOT NULL;
