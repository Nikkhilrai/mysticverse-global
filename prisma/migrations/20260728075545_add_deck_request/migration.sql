-- CreateTable
CREATE TABLE "DeckRequest" (
    "id" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "deckName" TEXT NOT NULL,
    "tierName" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "organisation" TEXT,
    "role" TEXT,
    "country" TEXT,
    "note" TEXT,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'NEW',
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeckRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DeckRequest_deckId_idx" ON "DeckRequest"("deckId");

-- CreateIndex
CREATE INDEX "DeckRequest_status_idx" ON "DeckRequest"("status");

-- CreateIndex
CREATE INDEX "DeckRequest_createdAt_idx" ON "DeckRequest"("createdAt");
