/*
  Warnings:

  - A unique constraint covering the columns `[supabase_userId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `supabase_userId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "supabase_userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_supabase_userId_key" ON "public"."User"("supabase_userId");
