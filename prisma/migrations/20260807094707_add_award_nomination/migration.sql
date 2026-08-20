-- CreateTable
CREATE TABLE "AwardNomination" (
    "id" TEXT NOT NULL,
    "nominatorName" TEXT NOT NULL,
    "nominatorTitle" TEXT,
    "nominatorOrganisation" TEXT,
    "nominatorEmail" TEXT NOT NULL,
    "nominatorPhone" TEXT,
    "nominatorCountry" TEXT,
    "nominationType" TEXT NOT NULL,
    "nomineeName" TEXT,
    "nomineeTitle" TEXT,
    "nomineeEmail" TEXT,
    "nomineePhone" TEXT,
    "nomineeWebsite" TEXT,
    "nomineeLinkedin" TEXT,
    "categories" TEXT[],
    "executiveSummary" TEXT NOT NULL,
    "keyAchievements" TEXT NOT NULL,
    "alignmentStatement" TEXT NOT NULL,
    "documents" JSONB NOT NULL DEFAULT '[]',
    "videoLinks" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "paymentMethodPreference" TEXT NOT NULL DEFAULT 'card',
    "billingName" TEXT,
    "billingAddressLine1" TEXT,
    "billingAddressLine2" TEXT,
    "billingCity" TEXT,
    "billingState" TEXT,
    "billingPostalCode" TEXT,
    "billingCountry" TEXT,
    "declarationAccepted" BOOLEAN NOT NULL DEFAULT false,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "razorpayOrderId" TEXT,
    "razorpayPaymentId" TEXT,
    "razorpaySignature" TEXT,
    "paidAt" TIMESTAMP(3),
    "status" "SubmissionStatus" NOT NULL DEFAULT 'NEW',
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AwardNomination_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AwardNomination_razorpayOrderId_key" ON "AwardNomination"("razorpayOrderId");

-- CreateIndex
CREATE INDEX "AwardNomination_paymentStatus_idx" ON "AwardNomination"("paymentStatus");

-- CreateIndex
CREATE INDEX "AwardNomination_status_idx" ON "AwardNomination"("status");

-- CreateIndex
CREATE INDEX "AwardNomination_createdAt_idx" ON "AwardNomination"("createdAt");
