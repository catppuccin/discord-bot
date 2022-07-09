-- CreateTable
CREATE TABLE "Channel" (
    "id" INTEGER NOT NULL,
    "hthresh" INTEGER NOT NULL,
    "horni" BOOLEAN NOT NULL DEFAULT true,
    "autothread" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);
