
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- Update your database name in pool.js to stemtelling_database
-- Then run these queries in order

-- <== DROP ALL TABLES ==> --
--DROP TABLE "user" CASCADE;
--DROP TABLE "class" CASCADE;
--DROP TABLE "stemtell" CASCADE;
--DROP TABLE "user_class" CASCADE;
--DROP TABLE "notification" CASCADE;
--DROP TABLE "comment" CASCADE;
--DROP TABLE "reaction" CASCADE;
--DROP TABLE "reaction_stemtell" CASCADE;
--DROP TABLE "tag" CASCADE;
--DROP TABLE "user_tag" CASCADE;
--DROP TABLE "stemtell_tag" CASCADE;

-- Create "user" Table
CREATE TABLE "user" (
	"id" SERIAL PRIMARY KEY,
	"username" TEXT UNIQUE NOT NULL,
   "email" TEXT UNIQUE NOT NULL,
	"password" TEXT NOT NULL,
	"name" TEXT,
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


-- <== TEST DATA SETUP ==> --

-- Step 1: Create 2 classes with the following queries
INSERT INTO "class" ("code", "name")
	VALUES ('0001', 'CHEM 101'), -- id 1
	('0002', 'BIO 101'); -- id 2
	


-- Step 2: While the application is running, register the following users IN ORDER
-- 1st
	-- username: student1@email.com
-- 2nd 
	-- username: student2@email.com
-- 3rd
	-- username: teacherA@email.com
-- 4th
	-- username: teacherB@email.com	

-- Step 3: add personal Data
UPDATE "user"
SET "name" = 'Student1', "profile_picture_url" = 'https://image.shutterstock.com/image-photo/laughing-turkish-female-student-desk-260nw-1766762942.jpg'
WHERE "id" = 1;

UPDATE "user"
SET "name" = 'Student2', "profile_picture_url" = 'https://www.fmjfee.com/i901fee/img/home/learn/learn_1.jpg'
WHERE "id" = 2;

UPDATE "user"
SET "name" = 'Teacher1', "profile_picture_url" = 'https://www.nea.org/sites/default/files/legacy/2020/04/new_teacher.jpeg'
WHERE "id" = 3;

UPDATE "user"
SET "name" = 'Teacher2', "profile_picture_url" = 'https://uconn-today-universityofconn.netdna-ssl.com/wp-content/uploads/2014/05/MaleMathTeacher.jpg'
WHERE "id" = 4;

-- Step 4: run the following queries to add the users to user_class table
INSERT INTO "user_class" ("role", "user_id", "class_id")
	VALUES ('student', '1', '1'),
	('student', '2', '2'),
	('teacher', '3', '1'),
	('teacher', '4', '2');
	
-- Step 5: run the following queries to create data for the tag table
INSERT INTO "tag" ("type", "name", "stem_field")
	VALUES ('stem', 'chemistry', 'science'), -- id 1
	('stem', 'biology', 'science'), -- id 2
	('stem', 'robotics', 'technology'), -- id 3
	('stem', 'computer science', 'technology'), -- id 4
	('stem', 'aerospace', 'engineering'), -- id 5
	('stem', 'mechanics', 'engineering'), -- id 6
	('stem', 'geometry', 'mathematics'), -- id 7
	('stem', 'economics', 'mathematics'), -- id 8
	( 'general', 'gaming', null), -- id 9
	( 'general', 'nature', null), -- id  10
	( 'general', 'animals', null), -- id 11
	( 'general', 'cars', null), -- id 12
	( 'general', 'photography', null), -- id 13
	( 'general', 'music', null); -- id 14
	
-- Step 6: run the following queries to create student stemtells
INSERT INTO "stemtell" ("class_id", "user_id", "title", "body_text", "media_url", "date_published")
	VALUES ('1', '1', 'CHEMISTRY STEMTELL', 'I Love Chemistry!!', 'https://www.sciencecompany.com/Assets/ProductImages/nc0071n-lg.jpg', NOW()),
	('2', '2', 'BIOLOGY STEMTELL', 'I Love Biology!!', 'https://medlineplus.gov/images/Anatomy.jpg', NOW());
	
-- Step 7: run the following queries to add tags to the stemtells via the stemtell_tag table
INSERT INTO "stemtell_tag" ("tag_id", "stemtell_id")
	VALUES ('1', '1'),
	('2', '2');
	
-- Step 8: run the following queries to add tags to the users via the user_tag table
INSERT INTO "user_tag" ("user_id", "tag_id")
	VALUES ('1', '1'),
	('1', '12'),
	('2', '2'),
	('2', '10'),
	('3', '1'),
	('4', '2');
	
-- Step 9: run the following queries to add reactions to the reaction table
INSERT INTO "reaction" ("media_url", "name")
	VALUES ('https://www.nicepng.com/png/detail/376-3762215_how-to-set-use-blue-thumbs-up-icon.png', 'like'),
	('https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png', 'love');

-- COMING SOON
-- Step 10: comments
-- Step 11: existing stemtell reactions

