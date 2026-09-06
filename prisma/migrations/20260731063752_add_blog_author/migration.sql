-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "blogAuthorId" TEXT;

-- CreateTable
CREATE TABLE "BlogAuthor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT,
    "image" TEXT,
    "bio" TEXT,
    "email" TEXT,
    "linkedin" TEXT,
    "twitter" TEXT,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogAuthor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogAuthor_name_key" ON "BlogAuthor"("name");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_blogAuthorId_fkey" FOREIGN KEY ("blogAuthorId") REFERENCES "BlogAuthor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
