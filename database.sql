-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- Update your database name in pool.js to stemtelling_database
-- Then run these queries in order

-- <== DROP ALL TABLES ==> --
DROP TABLE "user" CASCADE;
DROP TABLE "class" CASCADE;
DROP TABLE "stemtell" CASCADE;
DROP TABLE "user_class" CASCADE;
DROP TABLE "notification" CASCADE;
DROP TABLE "comment" CASCADE;
DROP TABLE "reaction" CASCADE;
DROP TABLE "reaction_stemtell" CASCADE;
DROP TABLE "tag" CASCADE;
DROP TABLE "user_tag" CASCADE;
DROP TABLE "stemtell_tag" CASCADE;
DROP TABLE "reset_password" CASCADE;

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
	"archived" BOOLEAN DEFAULT 'false'
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

-- <== TEST DATA SETUP ==> --

-- Step 1: While the application is running, register the following users IN ORDER
-- 1st
	-- username: student1@email.com
-- 2nd 
	-- username: student2@email.com
-- 3rd
	-- username: teacherA@email.com
-- 4th
	-- username: teacherB@email.com	

-- Step 2: Create 2 classes with the following queries
INSERT INTO "class" ("code", "name")
	VALUES ('0001', 'DEMOS'), -- id 1
	('0002', 'CHEM 101'), -- id 2
	('0003', 'BIO 101'), -- id 3
	('0004', 'MATH 101'); -- id 4

SELECT * FROM "user";
-- Step 3: add personal Data
UPDATE "user"
SET "name" = 'Student 1', "profile_picture_url" = 'https://image.shutterstock.com/image-photo/laughing-turkish-female-student-desk-260nw-1766762942.jpg', "authority" = 'student'
WHERE "id" = 1;

UPDATE "user"
SET "name" = 'Student 2', "profile_picture_url" = 'https://www.fmjfee.com/i901fee/img/home/learn/learn_1.jpg', "authority" = 'student'
WHERE "id" = 2;

UPDATE "user"
SET "name" = 'Teacher 1', "profile_picture_url" = 'https://www.nea.org/sites/default/files/legacy/2020/04/new_teacher.jpeg', "authority" = 'teacher'
WHERE "id" = 3;

UPDATE "user"
SET "name" = 'Teacher 2', "profile_picture_url" = 'https://uconn-today-universityofconn.netdna-ssl.com/wp-content/uploads/2014/05/MaleMathTeacher.jpg', "authority" = 'teacher'
WHERE "id" = 4;


-- Step 4: run the following queries to add the users to user_class table
INSERT INTO "user_class" ("role", "user_id", "class_code")
	VALUES ('student', '1', '1'),
	('student', '1','2'),
	('student', '1', '4'),
	('student', '2', '1'),
	('student', '2', '3'),
	('student', '2', '4'),
	('teacher', '3', '1'),
	('teacher', '3', '2'),
	('teacher', '3', '3'),
	('teacher', '3', '4'),
	('teacher', '4', '1'),
	('teacher', '4', '2'),
	('teacher', '4', '3'),
	('teacher', '4', '4');
	

-- Step 5: run the following queries to create data for the tag table
INSERT INTO "tag" ("type", "name", "stem_field")
	VALUES ('stem', 'zoology', 'science'), -- 1
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

	

-- Step 6: run the following queries to create student stemtells
INSERT INTO "stemtell" ("class_code", "user_id", "title", "body_text", "media_url", "approved", "unix")
	VALUES ('2', '1', 'CHEMISTRY STEMTELL', 'I Love Chemistry!!', 'https://www.sciencecompany.com/Assets/ProductImages/nc0071n-lg.jpg', true, extract(epoch from now())),
	('2', '1', 'OCHEM STEMTELL', 'Organic chemistry is the study of the structure, properties, composition, reactions, and preparation of carbon-containing compounds. Most organic compounds contain carbon and hydrogen, but they may also include any number of other elements (e.g., nitrogen, oxygen, halogens, phosphorus, silicon, sulfur).
		Originally limited to the study of compounds produced by living organisms, organic chemistry has been broadened to include human-made substances (e.g., plastics).', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Corey_oseltamivir_synthesis.png/390px-Corey_oseltamivir_synthesis.png', false, extract(epoch from now())),
	('4', '1', 'GEOMETRY STEMTELL', 'I Love Geometry!!', 'https://i.ytimg.com/vi/302eJ3TzJQU/maxresdefault.jpg', false, extract(epoch from now())),
	('4', '1', 'ALGEBRA STEMTELL', 'I Love Algebra!!', 'https://d138zd1ktt9iqe.cloudfront.net/media/seo_landing_files/algebric-expression-image-3-1615010733.png', false, extract(epoch from now())),
	('3', '2', 'BIOLOGY STEMTELL', 'I Love Biology!!', 'https://medlineplus.gov/images/Anatomy.jpg', false, extract(epoch from now())),
	('3', '2', 'MOLECULAR BIOLOGY STEMTELL', 'The field of molecular biology studies macromolecules and the macromolecular mechanisms found in living things, such as the molecular nature of the gene and its mechanisms of gene replication, mutation, and expression. Given the fundamental importance of these macromolecular mechanisms throughout the history of molecular biology, a philosophical focus on the concept of a mechanism generates the clearest picture of molecular biology’s history, concepts, and case studies utilized by philosophers of science.', 'https://ocw.mit.edu/courses/biology/7-01sc-fundamentals-of-biology-fall-2011/molecular-biology/Molec_Bio_Unit_image.jpg', false, extract(epoch from now())), 
	('4', '2', 'STATISTICS STEMTELL', 'I Love Statistics!!', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Standard_Normal_Distribution.png/290px-Standard_Normal_Distribution.png', true, extract(epoch from now())),
	('4', '2', 'CALCULUS STEMTELL', 'Calculus is one of the most important branches of mathematics, that deals with continuous change. Calculus is also referred to as infinitesimal calculus or “the calculus of infinitesimals”. Infinitesimal numbers are the quantities that have value nearly equal to zero, but not exactly zero. Generally, classical calculus is the study of continuous change of functions. The two major concepts that calculus is based on are derivatives and integrals.
		The derivative of a function is the measure of the rate of change of a function, while integral is the measure of the area under the curve of the function. The derivative gives the explanation of the function at a specific point whereas the integral accumulates the discrete values of a function over a range of values.', 'https://online-learning.harvard.edu/sites/default/files/styles/header/public/course/asset-v1_HarvardX%2BCalcAPL1x%2B2T2017%2Btype%40asset%2Bblock%40TITLE-Calculus-Applied-2120x1192-NO-SPOTLIGHT%202.png?itok=crWwjmVi', false, extract(epoch from now())),
	('1', '3', 'SCIENCE STEMTELL', 'I Love Science!!', 'https://image.freepik.com/free-vector/hand-drawn-science-education-background_23-2148499325.jpg', true, extract(epoch from now())),
	('1', '3', 'TECHNOLOGY STEMTELL', 'I Love Technology!!', 'https://www.investopedia.com/thmb/ooWnJKzULBikIcMgNqZdiRvHHBY=/2121x1414/filters:fill(auto,1)/GettyImages-964033964-ca3290057ccc4024b57e755423572264.jpg', true, extract(epoch from now())),
	('1', '4', 'ENGINEERING STEMTELL', 'I Love Biology!!', 'https://upload.wikimedia.org/wikipedia/commons/3/3d/PIA19664-MarsInSightLander-Assembly-20150430.jpg', true, extract(epoch from now())),
	('1', '4', 'MATH STEMTELL', 'I Love Math!!', 'https://miro.medium.com/max/6000/1*L76A5gL6176UbMgn7q4Ybg.jpeg', true, extract(epoch from now()));

	
-- Step 7: run the following queries to add tags to the stemtells via the stemtell_tag table
INSERT INTO "stemtell_tag" ("tag_id", "stemtell_id")
	VALUES ('4', '1'),
	('81', '1'),
	('5', '2'),
	('81', '2'),
	('56', '3'),
	('84', '3'),
	('55', '4'),
	('84', '4'),
	('16', '5'),
	('81', '5'),
	('18', '6'),
	('81', '6'),
	('54', '7'),
	('84', '7'),
	('60', '8'),
	('84', '8'),
	('81', '9'),
	('82', '10'),
	('83', '11'),
	('84', '12');
	

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
	VALUES ('https://svgshare.com/i/a1t.svg', 'art'),
	('https://svgshare.com/i/a1K.svg', 'basketball'),
	('https://svgshare.com/i/a1L.svg', 'beaker'),
	('https://svgshare.com/i/a2W.svg', 'camera'),
	('https://svgshare.com/i/a2h.svg', 'car'),
	('https://svgshare.com/i/a2i.svg', 'cog'),
	('https://svgshare.com/i/a2X.svg', 'compass'),
	('https://svgshare.com/i/a22.svg', 'computer'),
	('https://svgshare.com/i/a23.svg', 'cool'),
	('https://svgshare.com/i/a2u.svg', 'crane'),
	('https://svgshare.com/i/a2Y.svg', 'dinnerplate'),
	('https://svgshare.com/i/a19.svg', 'DNA'),
	('https://svgshare.com/i/a10.svg', 'drama'),
	('https://svgshare.com/i/a1u.svg', 'heart'),
	('https://svgshare.com/i/a1v.svg', 'leaf'),
	('https://svgshare.com/i/a32.svg', 'lightbulb'),
	('https://svgshare.com/i/a3D.svg', 'lipstick'),
	('https://svgshare.com/i/a24.svg', 'lungs'),
	('https://svgshare.com/i/a3E.svg', 'math'),
	('https://svgshare.com/i/a3F.svg', 'microscope'),
	('https://svgshare.com/i/a3Q.svg', 'music'),
	('https://svgshare.com/i/a2A.svg', 'neucleus'),
	('https://svgshare.com/i/a3R.svg', 'openbook'),
	('https://svgshare.com/i/a2v.svg', 'pawprint'),
	('https://svgshare.com/i/a1A.svg', 'people'),
	('https://svgshare.com/i/a33.svg', 'projector'),
	('https://svgshare.com/i/a2j.svg', 'recycle'),
	('https://svgshare.com/i/a2B.svg', 'robot'),
	('https://svgshare.com/i/a3T.svg', 'shoppingcart'),
	('https://svgshare.com/i/a1V.svg', 'smile'),
	('https://svgshare.com/i/a2Z.svg', 'stars'),
	('https://svgshare.com/i/a2m.svg', 'tech'),
	('https://svgshare.com/i/a2_.svg', 'telescope'),
	('https://svgshare.com/i/a2N.svg', 'thumbsup'),
	('https://svgshare.com/i/a34.svg', 'videogames'),
	('https://svgshare.com/i/a1B.svg', 'worldmap');


-- Step 10: run the following queries to add comments to the comment table
INSERT INTO "comment" ("user_id", "stemtell_id", "comment", "unix", "teacher_feedback")
	VALUES ('2', '1', 'This is a great Chemistry STEMtell!', extract(epoch from now()), 'false'),
	('1', '2', 'This is a great Biology STEMtell!', extract(epoch from now()), 'false'),	
	('3', '1', 'Needs more Chemistry stuff', extract(epoch from now()), 'true'),
	('4', '2', 'Needs more Biology stuff', extract(epoch from now()), 'true');


-- Step 11: existing stemtell reactions
INSERT INTO "reaction_stemtell" ("stemtell_id", "user_id", "reaction_id")
	VALUES ('1', '2', '1'),
	('2', '1', '2');
