-- AlterTable
CREATE SEQUENCE "channel_id_seq";
ALTER TABLE "Channel" ALTER COLUMN "id" SET DEFAULT nextval('channel_id_seq');
ALTER SEQUENCE "channel_id_seq" OWNED BY "Channel"."id";
