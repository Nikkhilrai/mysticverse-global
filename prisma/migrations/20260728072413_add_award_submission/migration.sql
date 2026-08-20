-- CreateEnum
CREATE TYPE "AwardSubmissionKind" AS ENUM ('NOMINATION', 'JURY_PARTNER');

-- CreateTable
CREATE TABLE "AwardSubmission" (
    "id" TEXT NOT NULL,
    "kind" "AwardSubmissionKind" NOT NULL DEFAULT 'NOMINATION',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "organisation" TEXT,
    "role" TEXT,
    "country" TEXT,
    "category" TEXT,
    "nomineeName" TEXT,
    "nomineeOrg" TEXT,
    "nomineeWebsite" TEXT,
    "relationship" TEXT,
    "statement" TEXT,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'NEW',
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AwardSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AwardSubmission_kind_idx" ON "AwardSubmission"("kind");

-- CreateIndex
CREATE INDEX "AwardSubmission_status_idx" ON "AwardSubmission"("status");

-- CreateIndex
CREATE INDEX "AwardSubmission_createdAt_idx" ON "AwardSubmission"("createdAt");
