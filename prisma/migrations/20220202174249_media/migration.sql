-- AlterTable
ALTER TABLE "pagedata" ADD COLUMN     "youtubeUrl" VARCHAR;

-- CreateTable
CREATE TABLE "mediadata" (
    "id" SERIAL NOT NULL,
    "pagedataid" INTEGER,
    "imageUrl" VARCHAR,
    "imageCaption" VARCHAR,
    "imageDestinationUrl" VARCHAR,
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "orderIndex" SERIAL NOT NULL,
    "cloudinary_public_id" VARCHAR,

    CONSTRAINT "mediadata_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mediadata" ADD CONSTRAINT "mediadata_pagedataid_fkey" FOREIGN KEY ("pagedataid") REFERENCES "pagedata"("id") ON DELETE SET NULL ON UPDATE CASCADE;
