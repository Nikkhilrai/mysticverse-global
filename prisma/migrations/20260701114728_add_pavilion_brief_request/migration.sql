-- CreateTable
CREATE TABLE "PavilionBriefRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "role" TEXT,
    "phone" TEXT,
    "country" TEXT,
    "tierInterest" TEXT,
    "message" TEXT,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'NEW',
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PavilionBriefRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PavilionBriefRequest_status_idx" ON "PavilionBriefRequest"("status");

-- CreateIndex
CREATE INDEX "PavilionBriefRequest_createdAt_idx" ON "PavilionBriefRequest"("createdAt");
