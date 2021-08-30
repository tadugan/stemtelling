
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- Update your database name in pool.js to stemtelling_database
-- Then run these queries in order

-- Create "user" Table
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" TEXT UNIQUE NOT NULL,
	"password" TEXT NOT NULL,
	"name" TEXT NOT NULL,
	"authority" INT DEFAULT 0,
	"profile_picture_url" TEXT
);


-- Create "class" table
CREATE TABLE "class" (
	"id" SERIAL PRIMARY KEY,
	"code" INT UNIQUE NOT NULL,
	"name" TEXT NOT NULL,
	"archived" BOOLEAN DEFAULT 'false'
);


-- Create "stemtell" table
CREATE TABLE "stemtell" (
	"id" SERIAL PRIMARY KEY,
	"class_id" INT REFERENCES "class"("id"),
	"user_id" INT REFERENCES "user"("id"),
	"title" TEXT NOT NULL,
	"body_text" TEXT NOT NULL,
	"media_url" TEXT,
	"date_published" TIMESTAMP NOT NULL,
	"approved" BOOLEAN DEFAULT 'false',
	"needs_revision" BOOLEAN DEFAULT 'false'
);

-- Create "user_class" table
CREATE TABLE "user_class" (
	"id" SERIAL PRIMARY KEY,
	"role" TEXT,
	"class_id" INT REFERENCES "class"("id"),
	"user_id" INT REFERENCES "user"("id")
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
	"date_published" TIMESTAMP,
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

