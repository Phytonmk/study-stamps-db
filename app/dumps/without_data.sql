/*
 Navicat PostgreSQL Data Transfer

 Source Server         : 35.228.157.176
 Source Server Type    : PostgreSQL
 Source Server Version : 120004
 Source Host           : 35.228.157.176:5432
 Source Catalog        : postgres
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 120004
 File Encoding         : 65001

 Date: 20/12/2020 15:27:31
*/


-- ----------------------------
-- Sequence structure for collections_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."collections_id_seq";
CREATE SEQUENCE "public"."collections_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."collections_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for colors_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."colors_id_seq";
CREATE SEQUENCE "public"."colors_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."colors_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for countries_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."countries_id_seq";
CREATE SEQUENCE "public"."countries_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."countries_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for locations_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."locations_id_seq";
CREATE SEQUENCE "public"."locations_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."locations_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for sections_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sections_id_seq";
CREATE SEQUENCE "public"."sections_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."sections_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for series_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."series_id_seq";
CREATE SEQUENCE "public"."series_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."series_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for sizes_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."sizes_id_seq";
CREATE SEQUENCE "public"."sizes_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."sizes_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for stamps_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."stamps_id_seq";
CREATE SEQUENCE "public"."stamps_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."stamps_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for themes_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."themes_id_seq";
CREATE SEQUENCE "public"."themes_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."themes_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Sequence structure for volumes_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."volumes_id_seq";
CREATE SEQUENCE "public"."volumes_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 9223372036854775807
START 1
CACHE 1;
ALTER SEQUENCE "public"."volumes_id_seq" OWNER TO "postgres";

-- ----------------------------
-- Table structure for collections
-- ----------------------------
DROP TABLE IF EXISTS "public"."collections";
CREATE TABLE "public"."collections" (
  "id" int8 NOT NULL DEFAULT nextval('collections_id_seq'::regclass),
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "theme" int8 NOT NULL,
  "country" int8 NOT NULL,
  "section" int8 NOT NULL
)
;
ALTER TABLE "public"."collections" OWNER TO "postgres";

-- ----------------------------
-- Table structure for colors
-- ----------------------------
DROP TABLE IF EXISTS "public"."colors";
CREATE TABLE "public"."colors" (
  "id" int8 NOT NULL DEFAULT nextval('colors_id_seq'::regclass),
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "public"."colors" OWNER TO "postgres";

-- ----------------------------
-- Table structure for countries
-- ----------------------------
DROP TABLE IF EXISTS "public"."countries";
CREATE TABLE "public"."countries" (
  "id" int8 NOT NULL DEFAULT nextval('countries_id_seq'::regclass),
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "public"."countries" OWNER TO "postgres";

-- ----------------------------
-- Table structure for locations
-- ----------------------------
DROP TABLE IF EXISTS "public"."locations";
CREATE TABLE "public"."locations" (
  "id" int8 NOT NULL DEFAULT nextval('locations_id_seq'::regclass),
  "volume" int8 NOT NULL,
  "page" int8 NOT NULL,
  "x" int8 NOT NULL,
  "y" int8 NOT NULL
)
;
ALTER TABLE "public"."locations" OWNER TO "postgres";

-- ----------------------------
-- Table structure for sections
-- ----------------------------
DROP TABLE IF EXISTS "public"."sections";
CREATE TABLE "public"."sections" (
  "id" int8 NOT NULL DEFAULT nextval('sections_id_seq'::regclass),
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "public"."sections" OWNER TO "postgres";

-- ----------------------------
-- Table structure for series
-- ----------------------------
DROP TABLE IF EXISTS "public"."series";
CREATE TABLE "public"."series" (
  "id" int8 NOT NULL DEFAULT nextval('series_id_seq'::regclass),
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "public"."series" OWNER TO "postgres";

-- ----------------------------
-- Table structure for sizes
-- ----------------------------
DROP TABLE IF EXISTS "public"."sizes";
CREATE TABLE "public"."sizes" (
  "id" int8 NOT NULL DEFAULT nextval('sizes_id_seq'::regclass),
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "public"."sizes" OWNER TO "postgres";

-- ----------------------------
-- Table structure for stamps
-- ----------------------------
DROP TABLE IF EXISTS "public"."stamps";
CREATE TABLE "public"."stamps" (
  "collection" int8 NOT NULL,
  "series" int8 NOT NULL,
  "year" int8 NOT NULL,
  "color" int8 NOT NULL,
  "size" int8 NOT NULL,
  "price" numeric NOT NULL,
  "location" int8 NOT NULL,
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "id" int8 NOT NULL DEFAULT nextval('stamps_id_seq'::regclass)
)
;
ALTER TABLE "public"."stamps" OWNER TO "postgres";

-- ----------------------------
-- Table structure for themes
-- ----------------------------
DROP TABLE IF EXISTS "public"."themes";
CREATE TABLE "public"."themes" (
  "id" int8 NOT NULL DEFAULT nextval('themes_id_seq'::regclass),
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "public"."themes" OWNER TO "postgres";

-- ----------------------------
-- Table structure for volumes
-- ----------------------------
DROP TABLE IF EXISTS "public"."volumes";
CREATE TABLE "public"."volumes" (
  "id" int8 NOT NULL DEFAULT nextval('volumes_id_seq'::regclass),
  "title" varchar(255) COLLATE "pg_catalog"."default" NOT NULL
)
;
ALTER TABLE "public"."volumes" OWNER TO "postgres";

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."collections_id_seq"
OWNED BY "public"."collections"."id";
SELECT setval('"public"."collections_id_seq"', 14, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."colors_id_seq"
OWNED BY "public"."colors"."id";
SELECT setval('"public"."colors_id_seq"', 22, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."countries_id_seq"
OWNED BY "public"."countries"."id";
SELECT setval('"public"."countries_id_seq"', 13, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."locations_id_seq"
OWNED BY "public"."locations"."id";
SELECT setval('"public"."locations_id_seq"', 14, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sections_id_seq"
OWNED BY "public"."sections"."id";
SELECT setval('"public"."sections_id_seq"', 2, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."series_id_seq"
OWNED BY "public"."series"."id";
SELECT setval('"public"."series_id_seq"', 13, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."sizes_id_seq"
OWNED BY "public"."sizes"."id";
SELECT setval('"public"."sizes_id_seq"', 13, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."stamps_id_seq"
OWNED BY "public"."stamps"."id";
SELECT setval('"public"."stamps_id_seq"', 12, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."themes_id_seq"
OWNED BY "public"."themes"."id";
SELECT setval('"public"."themes_id_seq"', 13, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."volumes_id_seq"
OWNED BY "public"."volumes"."id";
SELECT setval('"public"."volumes_id_seq"', 14, true);

-- ----------------------------
-- Uniques structure for table collections
-- ----------------------------
ALTER TABLE "public"."collections" ADD CONSTRAINT "collection_title" UNIQUE ("title");

-- ----------------------------
-- Primary Key structure for table collections
-- ----------------------------
ALTER TABLE "public"."collections" ADD CONSTRAINT "collections_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table colors
-- ----------------------------
ALTER TABLE "public"."colors" ADD CONSTRAINT "color_title" UNIQUE ("title");

-- ----------------------------
-- Primary Key structure for table colors
-- ----------------------------
ALTER TABLE "public"."colors" ADD CONSTRAINT "colors_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table countries
-- ----------------------------
ALTER TABLE "public"."countries" ADD CONSTRAINT "country_title" UNIQUE ("title");

-- ----------------------------
-- Primary Key structure for table countries
-- ----------------------------
ALTER TABLE "public"."countries" ADD CONSTRAINT "countries_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table locations
-- ----------------------------
ALTER TABLE "public"."locations" ADD CONSTRAINT "location" UNIQUE ("volume", "page", "x", "y");

-- ----------------------------
-- Primary Key structure for table locations
-- ----------------------------
ALTER TABLE "public"."locations" ADD CONSTRAINT "locations_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table sections
-- ----------------------------
ALTER TABLE "public"."sections" ADD CONSTRAINT "sections_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table series
-- ----------------------------
ALTER TABLE "public"."series" ADD CONSTRAINT "series_title" UNIQUE ("title");

-- ----------------------------
-- Primary Key structure for table series
-- ----------------------------
ALTER TABLE "public"."series" ADD CONSTRAINT "series_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table sizes
-- ----------------------------
ALTER TABLE "public"."sizes" ADD CONSTRAINT "size_title" UNIQUE ("title");

-- ----------------------------
-- Primary Key structure for table sizes
-- ----------------------------
ALTER TABLE "public"."sizes" ADD CONSTRAINT "sizes_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Indexes structure for table stamps
-- ----------------------------
CREATE INDEX "collection" ON "public"."stamps" USING btree (
  "collection" "pg_catalog"."int8_ops" ASC NULLS LAST
);

-- ----------------------------
-- Uniques structure for table stamps
-- ----------------------------
ALTER TABLE "public"."stamps" ADD CONSTRAINT "stamp_location" UNIQUE ("location");

-- ----------------------------
-- Primary Key structure for table stamps
-- ----------------------------
ALTER TABLE "public"."stamps" ADD CONSTRAINT "stamps_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table themes
-- ----------------------------
ALTER TABLE "public"."themes" ADD CONSTRAINT "themes_title" UNIQUE ("title");

-- ----------------------------
-- Primary Key structure for table themes
-- ----------------------------
ALTER TABLE "public"."themes" ADD CONSTRAINT "themes_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Uniques structure for table volumes
-- ----------------------------
ALTER TABLE "public"."volumes" ADD CONSTRAINT "volumes_title" UNIQUE ("title");

-- ----------------------------
-- Primary Key structure for table volumes
-- ----------------------------
ALTER TABLE "public"."volumes" ADD CONSTRAINT "volumes_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table collections
-- ----------------------------
ALTER TABLE "public"."collections" ADD CONSTRAINT "country" FOREIGN KEY ("country") REFERENCES "public"."countries" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."collections" ADD CONSTRAINT "section" FOREIGN KEY ("section") REFERENCES "public"."sections" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."collections" ADD CONSTRAINT "theme" FOREIGN KEY ("theme") REFERENCES "public"."themes" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ----------------------------
-- Foreign Keys structure for table locations
-- ----------------------------
ALTER TABLE "public"."locations" ADD CONSTRAINT "volume" FOREIGN KEY ("volume") REFERENCES "public"."volumes" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- ----------------------------
-- Foreign Keys structure for table stamps
-- ----------------------------
ALTER TABLE "public"."stamps" ADD CONSTRAINT "collection" FOREIGN KEY ("collection") REFERENCES "public"."collections" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."stamps" ADD CONSTRAINT "color" FOREIGN KEY ("color") REFERENCES "public"."colors" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."stamps" ADD CONSTRAINT "location" FOREIGN KEY ("location") REFERENCES "public"."locations" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."stamps" ADD CONSTRAINT "series" FOREIGN KEY ("series") REFERENCES "public"."series" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
ALTER TABLE "public"."stamps" ADD CONSTRAINT "size" FOREIGN KEY ("size") REFERENCES "public"."sizes" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
