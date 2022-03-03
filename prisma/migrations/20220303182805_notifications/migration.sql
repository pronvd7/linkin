-- CreateTable
CREATE TABLE "notificationsdata" (
    "id" SERIAL NOT NULL,
    "pagedataid" INTEGER,
    "notiTitle" VARCHAR,
    "notiMessage" VARCHAR,
    "notiType" VARCHAR,
    "timeInterval" VARCHAR,
    "active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "orderIndex" SERIAL NOT NULL,

    CONSTRAINT "notificationsdata_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notificationsdata" ADD CONSTRAINT "notificationsdata_pagedataid_fkey" FOREIGN KEY ("pagedataid") REFERENCES "pagedata"("id") ON DELETE SET NULL ON UPDATE CASCADE;
