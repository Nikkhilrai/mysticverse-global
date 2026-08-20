-- CreateTable
CREATE TABLE "EmailSend" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sequence" TEXT NOT NULL,
    "step" INTEGER NOT NULL,
    "leadId" TEXT NOT NULL,
    "leadType" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ok" BOOLEAN NOT NULL DEFAULT true,
    "error" TEXT,

    CONSTRAINT "EmailSend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailUnsubscribe" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailUnsubscribe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EmailSend_email_idx" ON "EmailSend"("email");

-- CreateIndex
CREATE INDEX "EmailSend_sentAt_idx" ON "EmailSend"("sentAt");

-- CreateIndex
CREATE UNIQUE INDEX "EmailSend_leadId_sequence_step_key" ON "EmailSend"("leadId", "sequence", "step");

-- CreateIndex
CREATE UNIQUE INDEX "EmailUnsubscribe_email_key" ON "EmailUnsubscribe"("email");
