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

-- <== TEST DATA SETUP ==> --

-- Step 1: While the application is running, register the following users IN ORDER
-- 1st
	-- username/email: Chloe.Piper@email.edu
-- 2nd 
	-- username/email: Sue.Baker@email.edu
-- 3rd
	-- username/email: Brian.Hart@email.edu
-- 4th
	-- username/email: Toby.Blake@email.edu
-- 5th
	-- username/email: Madeleine.White@email.com
-- 6th
	-- username/email: Anna.Clarkson@email.com
-- 7th
	-- username/email: Adam.Jones@email.com
-- 8th
	-- username/email: Luke.Skinner@email.com
-- 9th
	-- username/email: Jane.Slatere@email.com
-- 10th
	-- username/email: Warren.Berry@email.com
-- 11th
	-- username/email: Fiona.Manning@email.com
-- 12th
	-- username/email: Ryan.Allan@email.com
-- 13th
	-- username/email: Dorothy.Hughes@email.com
-- 14th
	-- username/email: Michael.Carr@email.com
-- 15th
	-- username/email: Robert.Marshall@email.com
-- 16th
	-- username/email: Lily.Hill@email.com
-- 17th
	-- username/email: Kirby.Russell@email.com

-- All usernames are changed in a later query

-- Step 2: Create 2 classes with the following queries
INSERT INTO "class" ("code", "name")
	VALUES
	('839464', 'Chemistry'),
	('601214', 'Physics'),
	('376130', 'AP Biology'),
	('74165', 'Intro to Visual Basic Programming'),
	('689723', 'AP Computer Science'),
	('393019', 'Autodesk CAD I'),
	('107508', 'Algebra I'),
	('7562', 'AP Statistics'),
	('570650', 'Pre-Calculus');


SELECT * FROM "user";
-- Step 3: add personal Data
UPDATE "user"
SET "name" = 'Chloe	Piper', "profile_picture_url" = 'https://previews.123rf.com/images/michaeljung/michaeljung0906/michaeljung090600304/5126547-happy-female-teacher.jpg', "authority" = 'teacher'
WHERE "id" = 1;

UPDATE "user"
SET "name" = 'Sue Baker', "profile_picture_url" = 'https://media.istockphoto.com/photos/teacher-teaching-math-on-whiteboard-picture-id950609434?k=20&m=950609434&s=612x612&w=0&h=X9sy5kwILtALnlYBOrOnnGOjyglRdb-WiYSO-QtBDW4=', "authority" = 'teacher'
WHERE "id" = 2;

UPDATE "user"
SET "name" = 'Brian Hart', "profile_picture_url" = 'https://st3.depositphotos.com/12982378/17888/i/1600/depositphotos_178884984-stock-photo-teacher.jpg', "authority" = 'teacher'
WHERE "id" = 3;

UPDATE "user"
SET "name" = 'Tony Blake', "profile_picture_url" = 'https://c8.alamy.com/comp/BJDCA2/high-school-principal-BJDCA2.jpg', "authority" = 'teacher'
WHERE "id" = 4;

UPDATE "user"
SET "name" = 'Madeleine	White', "profile_picture_url" = 'https://image.shutterstock.com/image-photo/portrait-pretty-young-woman-smiling-260nw-194815718.jpg', "authority" = 'student'
WHERE "id" = 5;

UPDATE "user"
SET "name" = 'Anna Clarkson', "profile_picture_url" = 'https://www.photocase.com/photos/3642014-cute-teenager-girl-in-a-park-hair-nature-cover-face-young-photocase-stock-photo-large.jpeg', "authority" = 'student'
WHERE "id" = 6;

UPDATE "user"
SET "name" = 'Adam Jones', "profile_picture_url" = 'https://st4.depositphotos.com/4278641/21249/i/1600/depositphotos_212490950-stock-photo-cute-teenager-white-background.jpg', "authority" = 'student'
WHERE "id" = 7;

UPDATE "user"
SET "name" = 'Luke Skinner', "profile_picture_url" = 'https://media.gettyimages.com/photos/headshot-of-a-teenage-boy-picture-id1158014305?s=612x612', "authority" = 'student'
WHERE "id" = 8;

UPDATE "user"
SET "name" = 'Jane Slater', "profile_picture_url" = 'https://image.shutterstock.com/image-photo/nice-cute-model-girl-teenage-260nw-685699741.jpg', "authority" = 'student'
WHERE "id" = 9;

UPDATE "user"
SET "name" = 'Warren Berry', "profile_picture_url" = 'https://www.photocase.com/photos/2635074-attractive-teenager-guy-in-a-park-lifestyle-style-happy-photocase-stock-photo-large.jpeg', "authority" = 'student'
WHERE "id" = 10;

UPDATE "user"
SET "name" = 'Fiona	Manning', "profile_picture_url" = 'https://static6.depositphotos.com/1008303/565/i/600/depositphotos_5655781-stock-photo-mixed-race-college-student.jpg', "authority" = 'student'
WHERE "id" = 11;

UPDATE "user"
SET "name" = 'Ryan Allan', "profile_picture_url" = 'https://www.photocase.com/photos/2635044-attractive-teenager-guy-in-a-park-lifestyle-style-happy-photocase-stock-photo-large.jpeg', "authority" = 'student'
WHERE "id" = 12;

UPDATE "user"
SET "name" = 'Dorothy Hughes', "profile_picture_url" = 'https://st.focusedcollection.com/16485780/i/650/focused_199366404-stock-photo-teenage-girl-digital-tablet-doing.jpg', "authority" = 'student'
WHERE "id" = 13;

UPDATE "user"
SET "name" = 'Michael Carr', "profile_picture_url" = 'https://static8.depositphotos.com/1192060/856/i/950/depositphotos_8569487-stock-photo-teenager-posing.jpg', "authority" = 'student'
WHERE "id" = 14;

UPDATE "user"
SET "name" = 'Robert Marshall', "profile_picture_url" = 'https://image.shutterstock.com/image-photo/portrait-pretty-teenager-against-brick-260nw-752257942.jpg', "authority" = 'student'
WHERE "id" = 15;

UPDATE "user"
SET "name" = 'Lily Hill', "profile_picture_url" = 'https://thumbs.dreamstime.com/b/pretty-teenager-girl-beautiful-blond-hair-60293767.jpg', "authority" = 'student'
WHERE "id" = 16;

UPDATE "user"
SET "name" = 'Kirby Russel', "profile_picture_url" = 'https://alis.alberta.ca/media/698005/youth-holding-books-library.jpg?crop=0,0,0,0.001650165016501764&cropmode=percentage&width=606&height=440&rnd=132367123460000000', "authority" = 'student'
WHERE "id" = 17;


-- Step 4: run the following queries to add the users to user_class table
INSERT INTO "user_class" ("role", "user_id", "class_code")
	VALUES
	('teacher', '1', '839464'), ('teacher', '1', '601214'), ('teacher', '1', '376130'), ('teacher', '1', '570650'), ('teacher', '1', '107508'),
	('teacher', '2', '74165'), ('teacher', '2', '689723'), ('teacher', '2', '393019'), ('teacher', '2', '7562'), ('teacher', '2', '376130'),
	('teacher', '3', '107508'), ('teacher', '3', '7562'), ('teacher', '3', '570650'), ('teacher', '3', '393019'), ('teacher', '3', '74165'),
	('teacher', '4', '839464'), ('teacher', '4', '601214'), ('teacher', '4', '376130'), ('teacher', '4', '74165'), ('teacher', '4', '689723'), ('teacher', '4', '393019'), ('teacher', '4', '107508'), ('teacher', '4', '7562'), ('teacher', '4', '570650'),
	('student', '5', '839464'), ('student', '5', '393019'), ('student', '5', '107508'),
	('student', '6', '376130'), ('student', '6', '689723'), ('student', '6', '107508'), 
	('student', '7', '601214'), ('student', '7', '393019'), ('student', '7', '107508'), 
	('student', '8', '601214'), ('student', '8', '689723'), ('student', '8', '7562'), 
	('student', '9', '376130'), ('student', '9', '74165'), ('student', '9', '7562'), 
	('student', '10', '839464'), ('student', '10', '393019'), ('student', '10', '7562'), 
	('student', '11', '376130'), ('student', '11', '689723'), ('student', '11', '570650'), 
	('student', '12', '601214'), ('student', '12', '74165'), ('student', '12', '570650'), 
	('student', '13', '839464'), ('student', '13', '74165'), ('student', '13', '570650'), 
	('student', '14', '376130'), ('student', '14', '393019'), ('student', '14', '107508'), 
	('student', '15', '839464'), ('student', '15', '689723'), ('student', '15', '7562'), 
	('student', '16', '601214'), ('student', '16', '74165'), ('student', '16', '570650'),
	('student', '17', '839464'), ('student', '17', '601214'), ('student', '17', '376130'), ('student', '17', '74165'), ('student', '17', '689723'), ('student', '17', '393019'), ('student', '17', '107508'), ('student', '17', '7562'), ('student', '17', '570650');
	

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
	VALUES ('839464', '5', 'CHEMISTRY STEMTELL', 'I Love Chemistry!!', 'https://www.sciencecompany.com/Assets/ProductImages/nc0071n-lg.jpg', true, extract(epoch from now())),
	('376130', '6', 'OCHEM STEMTELL', 'Organic chemistry is the study of the structure, properties, composition, reactions, and preparation of carbon-containing compounds. Most organic compounds contain carbon and hydrogen, but they may also include any number of other elements (e.g., nitrogen, oxygen, halogens, phosphorus, silicon, sulfur).
		Originally limited to the study of compounds produced by living organisms, organic chemistry has been broadened to include human-made substances (e.g., plastics).', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Corey_oseltamivir_synthesis.png/390px-Corey_oseltamivir_synthesis.png', false, extract(epoch from now())),
	('601214', '7', 'GEOMETRY STEMTELL', 'I Love Geometry!!', 'https://i.ytimg.com/vi/302eJ3TzJQU/maxresdefault.jpg', false, extract(epoch from now())),
	('689723', '8', 'ALGEBRA STEMTELL', 'I Love Algebra!!', 'https://d138zd1ktt9iqe.cloudfront.net/media/seo_landing_files/algebric-expression-image-3-1615010733.png', false, extract(epoch from now())),
	('7562', '9', 'BIOLOGY STEMTELL', 'I Love Biology!!', 'https://medlineplus.gov/images/Anatomy.jpg', false, extract(epoch from now())),
	('393019', '10', 'MOLECULAR BIOLOGY STEMTELL', 'The field of molecular biology studies macromolecules and the macromolecular mechanisms found in living things, such as the molecular nature of the gene and its mechanisms of gene replication, mutation, and expression. Given the fundamental importance of these macromolecular mechanisms throughout the history of molecular biology, a philosophical focus on the concept of a mechanism generates the clearest picture of molecular biology’s history, concepts, and case studies utilized by philosophers of science.', 'https://ocw.mit.edu/courses/biology/7-01sc-fundamentals-of-biology-fall-2011/molecular-biology/Molec_Bio_Unit_image.jpg', false, extract(epoch from now())), 
	('570650', '11', 'STATISTICS STEMTELL', 'I Love Statistics!!', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Standard_Normal_Distribution.png/290px-Standard_Normal_Distribution.png', true, extract(epoch from now())),
	('74165', '12', 'CALCULUS STEMTELL', 'Calculus is one of the most important branches of mathematics, that deals with continuous change. Calculus is also referred to as infinitesimal calculus or “the calculus of infinitesimals”. Infinitesimal numbers are the quantities that have value nearly equal to zero, but not exactly zero. Generally, classical calculus is the study of continuous change of functions. The two major concepts that calculus is based on are derivatives and integrals.
		The derivative of a function is the measure of the rate of change of a function, while integral is the measure of the area under the curve of the function. The derivative gives the explanation of the function at a specific point whereas the integral accumulates the discrete values of a function over a range of values.', 'https://online-learning.harvard.edu/sites/default/files/styles/header/public/course/asset-v1_HarvardX%2BCalcAPL1x%2B2T2017%2Btype%40asset%2Bblock%40TITLE-Calculus-Applied-2120x1192-NO-SPOTLIGHT%202.png?itok=crWwjmVi', false, extract(epoch from now()));

	
	
----	CLASSES (code, name)	----
--	('839464', 'Chemistry'),
--	('601214', 'Physics'),
--	('376130', 'AP Biology'),
--	('74165', 'Intro to Visual Basic Programming'),
--	('689723', 'AP Computer Science'),
--	('393019', 'Autodesk CAD I'),
--	('107508', 'Algebra I'),
--	('7562', 'AP Statistics'),
--	('570650', 'Pre-Calculus');
----	CLASSES		----
	
	
----	STUDENTS (id: class_codes)	----
--	5: 839464, 393019, 107508
--	6: 376130, 689723, 107508
--	7: 601214, 393019, 107508
-- 	8: 601214, 689723, 7562
--	9: 376130, 74165, 7562
--	10: 839464, 393019, 7562
--	11: 376130, 689723, 570650
--	12: 601214, 74165, 570650
--	13: 839464, 74165, 570650
--	14: 376130, 393019, 107508
--	15: 839464, 689723, 7562
--	16: 601214, 74165. 570650
--	17: ALL (super student)
----	STUDENTS	----


----	TEACHERS (id: class_codes)	----
--	1: 839464, 601214, 376130, 570650, 107508
--	2: 74165, 689723, 393019, 7562, 376130
--	3: 107508, 7562, 570650, 393019, 74165
--	4: ALL (super teacher)
----	TEACHERS	----


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
	('84', '8');
	

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
	VALUES 
	('https://svgshare.com/i/a1L.svg', 'beaker'),
	('https://svgshare.com/i/a23.svg', 'cool'),
	('https://svgshare.com/i/a1u.svg', 'heart'),
	('https://svgshare.com/i/a1V.svg', 'smile');


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