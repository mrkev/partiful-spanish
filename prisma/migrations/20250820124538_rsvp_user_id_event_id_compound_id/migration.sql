/*
  Warnings:

  - The primary key for the `RSVP` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `RSVP` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."RSVP_userId_eventId_key";

-- AlterTable
ALTER TABLE "public"."RSVP" DROP CONSTRAINT "RSVP_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "RSVP_pkey" PRIMARY KEY ("userId", "eventId");
