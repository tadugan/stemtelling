-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- Then run these queries in order

-- <== DROP ALL TABLES ==> --
-- DROP TABLE "user" CASCADE;
-- DROP TABLE "class" CASCADE;
-- DROP TABLE "stemtell" CASCADE;
-- DROP TABLE "user_class" CASCADE;
-- DROP TABLE "notification" CASCADE;
-- DROP TABLE "comment" CASCADE;
-- DROP TABLE "reaction" CASCADE;
-- DROP TABLE "reaction_stemtell" CASCADE;
-- DROP TABLE "tag" CASCADE;
-- DROP TABLE "user_tag" CASCADE;
-- DROP TABLE "stemtell_tag" CASCADE;
-- DROP TABLE "reset_password" CASCADE;

-- Run these queries in order


-- < CREATE DATABASE TABLES > --
-- extension required for generating UUIDs in postgresql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- Create "user" Table
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"email" TEXT UNIQUE NOT NULL,
	"password" TEXT NOT NULL,
	"name" TEXT,
	"authority" TEXT NOT NULL,
	"profile_picture_url" TEXT
);


-- this table needs to be periodically cleansed via a cron (e.g. https://github.com/citusdata/pg_cron), ideally at inactive times of day, in order to prevent buildup.
CREATE TABLE "reset_password" ( 
	"id" INTEGER PRIMARY KEY UNIQUE,
	"uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
	"email" TEXT UNIQUE NOT NULL
);


-- Create "class" table
CREATE TABLE "class" (
	"id" SERIAL PRIMARY KEY,
	"code" INT UNIQUE NOT NULL,
	"name" TEXT NOT NULL,
	"archived" TEXT DEFAULT 'Active'
);


-- Create "stemtell" table
CREATE TABLE "stemtell" (
	"id" SERIAL PRIMARY KEY,
	"class_code" INT REFERENCES "class"("code"),
	"user_id" INT REFERENCES "user"("id"),
	"title" TEXT NOT NULL,
	"body_text" TEXT NOT NULL,
	"media_url" TEXT,
	"unix" BIGINT NOT NULL,
	"approved" BOOLEAN DEFAULT 'false',
	"needs_revision" BOOLEAN DEFAULT 'false'
);


-- Create "user_class" table
CREATE TABLE "user_class" (
	"id" SERIAL PRIMARY KEY,
	"role" TEXT,
	"user_id" INT REFERENCES "user"("id"),
	"class_code" INT REFERENCES "class"("code")
);


-- Create "notification" table
CREATE TABLE "notification" (
	"id" SERIAL PRIMARY KEY,
	"stemtell_id" INT REFERENCES "stemtell"("id"),
	"user_id" INT REFERENCES "user"("id"),
	"body" TEXT NOT NULL,
	"type" TEXT NOT NULL,
	"viewed" BOOLEAN DEFAULT 'false'
);


-- Create "comment" table
CREATE TABLE "comment" (
	"id" SERIAL PRIMARY KEY,
	"stemtell_id" INT REFERENCES "stemtell"("id"),
	"user_id" INT REFERENCES "user"("id"),
	"comment" TEXT NOT NULL,
	"unix" BIGINT,
	"teacher_feedback" BOOLEAN
);


-- Create "reaction" table
CREATE TABLE "reaction" (
	"id" SERIAL PRIMARY KEY,
	"media_url" TEXT NOT NULL,
	"name" TEXT NOT NULL
);


-- Create "reaction_stemtell" table
CREATE TABLE "reaction_stemtell" (
	"id" SERIAL PRIMARY KEY,
	"stemtell_id" INT REFERENCES "stemtell"("id"),
	"user_id" INT REFERENCES "user"("id"),
	"reaction_id" INT REFERENCES "reaction"("id")
);


-- Create "tag" table
CREATE TABLE "tag" (
	"id" SERIAL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"type" TEXT NOT NULL, --STEM or general
	"stem_field" TEXT
);


-- Create "user_tag" table
CREATE TABLE "user_tag" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user"("id"),
	"tag_id" INT REFERENCES "tag"("id")
);


-- Create "stemtell_tag" table
	CREATE TABLE "stemtell_tag" (
	"id" SERIAL PRIMARY KEY,
	"tag_id" INT REFERENCES "tag"("id"),
	"stemtell_id" INT REFERENCES "stemtell"("id")
);


-- < POPULATE THE TAG AND REACTIONS TABLES > --
-- Run the following queries to create data for the tag table
INSERT INTO "tag" ("type", "name", "stem_field")
	VALUES
	('stem', 'zoology', 'science'), -- 1
	('stem', 'botany', 'science'), -- 2
	('stem', 'veterinary', 'science'), --3
	('stem', 'chemistry', 'science'), --4
	('stem', 'orgamic chemistry', 'science'), --5
	('stem', 'biochemistry', 'science'), --6
	('stem', 'mycology', 'science'), --7
	('stem', 'physics', 'science'), --8
	('stem', 'astronomy', 'science'), --9
	('stem', 'geology', 'science'), --10
	('stem', 'environmental science', 'science'), --11
	('stem', 'geochemistry', 'science'), --12
	('stem', 'histology', 'science'), --13
	('stem', 'farming', 'science'), --14
	('stem', 'paleontology', 'science'), --15
	('stem', 'evolutionary biology', 'science'), --16
	('stem', 'microbiology', 'science'), --17
	('stem', 'molecular biology', 'science'), --18
	('stem', 'oceanography', 'science'), --19
	('stem', 'earth science', 'science'), --20
	('stem', 'climate science', 'science'), --21
	('stem', 'conservation', 'science'), --22
	('stem', 'ecology', 'science'), --23
	('stem', 'medicine', 'science'), --24
	('stem', 'life science', 'science'), --25
	('stem', 'science art', 'science'), --26
	('stem', 'cosmology', 'science'), --27
	('stem', 'agriculture', 'science'), --28
	('stem', 'entymology', 'science'), --29
	('stem', 'research', 'science'), --30
	('stem', 'coding', 'technology'), --31
	('stem', 'web developing', 'technology'), --32
	('stem', 'computer science', 'technology'), --33
	('stem', 'programming', 'technology'), --34
	('stem', 'information technology', 'technology'), --35
	('stem', 'database administration', 'technology'), --36
	('stem', 'artificial intellignece', 'technology'), --37
	('stem', 'network systems administration', 'technology'), --38
	('stem', 'color technician', 'technology'), --39
	('stem', 'software engineering', 'technology'), --40
	('stem', 'web analytics', 'technology'), --41
	('stem', 'animation', 'technology'), --42
	('stem', 'robotics', 'technology'), --43
	('stem', 'aerospace', 'engineering'), --44
	('stem', 'mechanics', 'engineering'), --45
	('stem', 'electrical engineering', 'engineering'), --46
	('stem', 'construction', 'engineering'), --47
	('stem', 'sound engineering', 'engineering'), --48
	('stem', 'marine engineering', 'engineering'), --49
	('stem', 'environmental engineering', 'engineering'), --50
	('stem', 'accoustical engineering', 'engineering'), --51
	('stem', 'bioengineering', 'engineering'), --52
	('stem', 'plumbing', 'engineering'), --53
	('stem', 'statistics', 'mathematics'), --54
	('stem', 'algebra', 'mathematics'), --55
	('stem', 'geometry', 'mathematics'), --56
	('stem', 'trigonometry', 'mathematics'), --57
	('stem', 'finance', 'mathematics'), --58
	('stem', 'cryptography', 'mathematics'), --59
	('stem', 'calculus', 'mathematics'), --60
	('stem', 'economics', 'mathematics'), --61
	('stem', 'banking', 'mathematics'), --62
	('general', 'food', null), --63
	('general', 'animals', null), --64
	('general', 'movies & tv', null), --65
	('general', 'sports', null), --66
	('general', 'performance', null), --67
	('general', 'travel', null), --68
	('general', 'nature', null), --69
	('general', 'family', null), --70
	('general', 'dance', null), --71
	('general', 'beauty', null), --72
	('general', 'art & design', null), --73
	('general', 'shopping', null), --74
	('general', 'fashion', null), --75
	('general', 'photography & video', null), --76
	('general', 'gaming', null), --77
	('general', 'music', null), --78
	('general', 'cars', null), --79
	('general', 'reading', null), --80
	('general', 'science', null), --81
	('general', 'technology', null), --82
	('general', 'engineering', null), --83
	('general', 'math', null); --84

-- Run the following queries to add reactions to the reaction table
INSERT INTO "reaction" ("media_url", "name")
	VALUES 
	('https://svgshare.com/i/a1L.svg', 'beaker'),
	('https://svgshare.com/i/a23.svg', 'cool'),
	('https://svgshare.com/i/a1u.svg', 'heart'),
	('https://svgshare.com/i/a1V.svg', 'smile');

