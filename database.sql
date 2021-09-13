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
	SET "name" = 'Ms. Piper', "profile_picture_url" = 'https://images.unsplash.com/flagged/photo-1574110906643-8311b0ce29d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80', "authority" = 'teacher'
	WHERE "id" = 1;
UPDATE "user"
	SET "name" = 'Ms. Baker', "profile_picture_url" = 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', "authority" = 'teacher'
	WHERE "id" = 2;
UPDATE "user"
	SET "name" = 'Mr. Hart', "profile_picture_url" = 'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80', "authority" = 'teacher'
	WHERE "id" = 3;
UPDATE "user"
	SET "name" = 'Mr. Blake', "profile_picture_url" = 'https://c8.alamy.com/comp/BJDCA2/high-school-principal-BJDCA2.jpg', "authority" = 'teacher'
	WHERE "id" = 4;
UPDATE "user"
	SET "name" = 'Madeline White', "profile_picture_url" = 'https://images.unsplash.com/photo-1607578477812-e2e2672a1250?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=668&q=80', "authority" = 'student'
	WHERE "id" = 5;
UPDATE "user"
	SET "name" = 'Anna Clarkson', "profile_picture_url" = 'https://images.unsplash.com/photo-1596495578066-1aac1b785b3b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1359&q=80', "authority" = 'student'
	WHERE "id" = 6;
UPDATE "user"
	SET "name" = 'Adam Jones', "profile_picture_url" = 'https://images.unsplash.com/photo-1528567339718-6ee254d88c4b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2500&q=80', "authority" = 'student'
	WHERE "id" = 7;
UPDATE "user"
	SET "name" = 'Luke Skinner', "profile_picture_url" = 'https://images.unsplash.com/photo-1507537509458-b8312d35a233?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80', "authority" = 'student'
	WHERE "id" = 8;
UPDATE "user"
	SET "name" = 'Jane Slater', "profile_picture_url" = 'https://image.shutterstock.com/image-photo/nice-cute-model-girl-teenage-260nw-685699741.jpg', "authority" = 'student'
	WHERE "id" = 9;
UPDATE "user"
	SET "name" = 'Warren Berry', "profile_picture_url" = 'https://www.photocase.com/photos/2635074-attractive-teenager-guy-in-a-park-lifestyle-style-happy-photocase-stock-photo-large.jpeg', "authority" = 'student'
	WHERE "id" = 10;
UPDATE "user"
	SET "name" = 'Fiona Manning', "profile_picture_url" = 'https://static6.depositphotos.com/1008303/565/i/600/depositphotos_5655781-stock-photo-mixed-race-college-student.jpg', "authority" = 'student'
	WHERE "id" = 11;
UPDATE "user"
	SET "name" = 'Ryan Allan', "profile_picture_url" = 'https://www.photocase.com/photos/2635044-attractive-teenager-guy-in-a-park-lifestyle-style-happy-photocase-stock-photo-large.jpeg', "authority" = 'student'
	WHERE "id" = 12;
UPDATE "user"
	SET "name" = 'Dorothy Hughes', "profile_picture_url" = 'https://st.focusedcollection.com/16485780/i/650/focused_199366404-stock-photo-teenage-girl-digital-tablet-doing.jpg', "authority" = 'student'
	WHERE "id" = 13;
UPDATE "user"
	SET "name" = 'Michael Carr', "profile_picture_url" = 'https://images.unsplash.com/photo-1567168539593-59673ababaae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80', "authority" = 'student'
	WHERE "id" = 14;
UPDATE "user"
	SET "name" = 'Robert Marshall', "profile_picture_url" = 'https://image.shutterstock.com/image-photo/portrait-pretty-teenager-against-brick-260nw-752257942.jpg', "authority" = 'student'
	WHERE "id" = 15;
UPDATE "user"
	SET "name" = 'Lily Hill', "profile_picture_url" = 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=666&q=80', "authority" = 'student'
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

	

-- Step 6: run the following queries to create student stemtells
INSERT INTO "stemtell" ("class_code", "user_id", "title", "body_text", "media_url", "approved", "unix")
	VALUES
	('839464', '5', 'What Is Chemistry?', 'Chemistry is the scientific study of the properties and behavior of matter. It is a natural science that covers the elements that make up matter to the compounds composed of atoms, molecules and ions: their composition, structure, properties, behavior and the changes they undergo during a reaction with other substances.  In the scope of its subject, chemistry occupies an intermediate position between physics and biology. It is sometimes called the central science because it provides a foundation for understanding both basic and applied scientific disciplines at a fundamental level.', 'https://images.unsplash.com/photo-1617155093730-a8bf47be792d?ixid=MnwxMjA3fDB8MHxwaG90[…]GVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80', true, extract(epoch from now())),
	('393019', '5', 'The First AutoCAD', 'AutoCAD has been available on the market since 1982, making it the first CAD system developed for PCs. This means that AutoCAD has been around longer than Adobe Photoshop or even Microsoft Windows! Before AutoCAD, commercial CAD programs in the 70s ran on mainframe computers or minicomputers, with each user working at a separate graphics terminal. If the designer didn’t have access to these, they’d go about drawing using an old-school drafting desk and a t-square. Creating new versions of drawings and performing calculations took days, even weeks. Imagine how much effort it would take to compute technical calculations with calculators and mathematical tables! What’s worse, the process was fraught with opportunities for error.', 'https://www.scan2cad.com/wp-content/uploads/2016/12/early-autocad-workstation-582x480.jpg', true, extract(epoch from now())),
	('107508', '6', 'Algebra I in My Life', 'Have you ever wondered how Algebra may be applied to solve real-life problems? We regularly see people using Algebra in many parts of everyday life; for instance, it is utilized in our morning schedule each day to measure the time you will spend in the shower, making breakfast, or driving to work.  The absence of "X" or "Y" does not imply that algebra is not around us; algebra’s actual occurrences are uncountable. This exact and compact numerical language works wonderfully with practically all different subjects and everyday life.', 'https://d138zd1ktt9iqe.cloudfront.net/media/seo_landing_files/file-a1-1603874439.png', true, extract(epoch from now())),
	('601214', '7', 'Why I Now Love Physics', 'Physics is the natural science that studies matter, its motion and behavior through space and time, and the related entities of energy and force. Physics is one of the most fundamental scientific disciplines, and its main goal is to understand how the universe behaves.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Stylised_atom_with_three_Bohr_model_orbits_and_stylised_nucleus.png/100px-Stylised_atom_with_three_Bohr_model_orbits_and_stylised_nucleus.png', true, extract(epoch from now())),
	-- ^^ add teacher comment 
	('107508', '7', 'The Origin Of Algebra', 'The roots of algebra can be traced to the ancient Babylonians, who developed an advanced arithmetical system with which they were able to do calculations in an algorithmic fashion. The Babylonians developed formulas to calculate solutions for problems typically solved today by using linear equations, quadratic equations, and indeterminate linear equations. By contrast, most Egyptians of this era, as well as Greek and Chinese mathematics in the 1st millennium BC, usually solved such equations by geometric methods, such as those described in the Rhind Mathematical Papyrus, Euclid''s Elements, and The Nine Chapters on the Mathematical Art. The geometric work of the Greeks, typified in the Elements, provided the framework for generalizing formulae beyond the solution of particular problems into more general systems of stating and solving equations, although this would not be realized until mathematics developed in medieval Islam.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Image-Al-Kit%C4%81b_al-mu%E1%B8%ABta%E1%B9%A3ar_f%C4%AB_%E1%B8%A5is%C4%81b_al-%C4%9Fabr_wa-l-muq%C4%81bala.jpg/180px-Image-Al-Kit%C4%81b_al-mu%E1%B8%ABta%E1%B9%A3ar_f%C4%AB_%E1%B8%A5is%C4%81b_al-%C4%9Fabr_wa-l-muq%C4%81bala.jpg', true, extract(epoch from now())),
	('601214', '8', 'Modern vs Classic Physics', 'Modern physics is a branch of physics either developed in the early 20th century and onward or branches greatly influenced by early 20th century physics. Notable branches of modern physics include quantum mechanics, special relativity and general relativity. Classical physics is typically concerned with everyday conditions: speeds are much lower than the speed of light, sizes are much greater than that of atoms, and energies are relatively small. Modern physics, however, is concerned with more extreme conditions, such as high velocities that are comparable to the speed of light (special relativity), small distances comparable to the atomic radius (quantum mechanics), and very high energies (relativity). In general, quantum and relativistic effects are believed to exist across all scales, although these effects may be very small at human scale. While quantum mechanics is compatible with special relativity, one of the unsolved problems in physics is the unification of quantum mechanics and general relativity, which the Standard Model of particle physics currently cannot account for.', 'https://images.unsplash.com/photo-1610024062303-e355e94c7a8c?ixid=MnwxMjA3fDB8MHxwaG90[…]fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80', true, extract(epoch from now())),
	('376130', '9', 'How Pandemics Begin', 'Biology is the study of living things and their vital processes. The field deals with all the physicochemical aspects of life. The modern tendency toward cross-disciplinary research and the unification of scientific knowledge and investigation from different fields has resulted in significant overlap of the field of biology with other scientific disciplines. Modern principles of other fields—chemistry, medicine, and physics, for example—are integrated with those of biology in areas such as biochemistry, biomedicine, and biophysics.', 'https://cdn.britannica.com/s:690x388,c:crop/85/78585-050-3B7B6E8E/cells-animal-plant-ways-nucleus-difference-organelles.jpg', true, extract(epoch from now())),
	-- ^^ add teacher comment
	('839464', '10', 'I Finally Understand Chemistry', 'Chemistry, the science that deals with the properties, composition, and structure of substances (defined as elements and compounds), the transformations they undergo, and the energy that is released or absorbed during these processes. Every substance, whether naturally occurring or artificially produced, consists of one or more of the hundred-odd species of atoms that have been identified as elements.', 'https://cdn.britannica.com/w:400,h:300,c:crop/86/193986-050-7B2DBB6A/ball-and-stick-model-structure-atoms.jpg', true, extract(epoch from now())),
	('7562', '10', 'Standard Deviation and the Bell Curve', 'Statistics is the discipline that concerns the collection, organization, analysis, interpretation, and presentation of data. In applying statistics to a scientific, industrial, or social problem, it is conventional to begin with a statistical population or a statistical model to be studied. Populations can be diverse groups of people or objects such as "all people living in a country" or "every atom composing a crystal". Statistics deals with every aspect of data, including the planning of data collection in terms of the design of surveys and experiments.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Standard_Normal_Distribution.png/290px-Standard_Normal_Distribution.png', true, extract(epoch from now())),
	('376130', '11', 'Molecular Biology', 'The field of molecular biology studies macromolecules and the macromolecular mechanisms found in living things, such as the molecular nature of the gene and its mechanisms of gene replication, mutation, and expression. Given the fundamental importance of these macromolecular mechanisms throughout the history of molecular biology, a philosophical focus on the concept of a mechanism generates the clearest picture of molecular biology’s history, concepts, and case studies utilized by philosophers of science.', 'https://ocw.mit.edu/courses/biology/7-01sc-fundamentals-of-biology-fall-2011/molecular-biology/Molec_Bio_Unit_image.jpg', true, extract(epoch from now())),
	-- ^^ add teacher comment
	('570650', '11', 'Leonhard Euler: the worst person ever', 'For students to succeed at finding the derivatives and antiderivatives of calculus, they will need facility with algebraic expressions, particularly in modification and transformation of such expressions. Leonhard Euler wrote the first precalculus book in 1748 called Introductio in analysin infinitorum (Latin: Introduction to the Analysis of the Infinite), which "was meant as a survey of concepts and methods in analysis and analytic geometry preliminary to the study of differential and integral calculus." He began with the fundamental concepts of variables and functions. His innovation is noted for its use of exponentiation to introduce the transcendental functions. The general logarithm, to an arbitrary positive base, Euler presents as the inverse of an exponential function.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Leonhard_Euler.jpg/220px-Leonhard_Euler.jpg', false, extract(epoch from now())),
	-- ^^ add teacher comment inapporpriate
	('570650', '12', 'How I Became an Expert at Precalculus', 'Pre calculus is the study of the mathematical prerequisites for calculus, including algebra, trigonometry and analytical geometry. The unusual thing about pre calculus topics is that they don’t directly involve calculus. Instead, they give students a strong foundation that will be used throughout their calculus studies.', 'https://study.com/cimages/course-image/precalculus-course_105189_large.jpg', true, extract(epoch from now())),
	-- ^^ both are just unapporved cause the teacher hasnt looked at them yet. no comments or anything.
	('393019', '14', 'What is Autodesk and CAD?', 'AutoCAD is a commercial computer-aided design (CAD) and drafting software application. Developed and marketed by Autodesk, AutoCAD was first released in December 1982 as a desktop app running on microcomputers with internal graphics controllers. Before AutoCAD was introduced, most commercial CAD programs ran on mainframe computers or minicomputers, with each CAD operator (user) working at a separate graphics terminal. AutoCAD is used in industry, by architects, project managers, engineers, graphic designers, city planners and other professionals. It was supported by 750 training centers worldwide in 1994.', 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/AutoCAD_2016_screenshot.png/300px-AutoCAD_2016_screenshot.png', true, extract(epoch from now())),
	('107508', '14', 'Al-Khwarizmi: The Father of Algebra', 'The word algebra comes from the Arabic: الجبر‎, romanized: al-jabr, lit. ''reunion of broken parts, bonesetting'' from the title of the early 9th century book cIlm al-jabr wa l-muqābala "The Science of Restoring and Balancing" by the Persian mathematician and astronomer al-Khwarizmi. In his work, the term al-jabr referred to the operation of moving a term from one side of an equation to the other, المقابلة al-muqābala "balancing" referred to adding equal terms to both sides. Shortened to just algeber or algebra in Latin, the word eventually entered the English language during the fifteenth century, from either Spanish, Italian, or Medieval Latin. It originally referred to the surgical procedure of setting broken or dislocated bones. The mathematical meaning was first recorded (in English) in the sixteenth century.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Mu%E1%B8%A5ammad_ibn_M%C5%ABs%C4%81_al-Khw%C4%81rizm%C4%AB.png/180px-Mu%E1%B8%A5ammad_ibn_M%C5%ABs%C4%81_al-Khw%C4%81rizm%C4%AB.png', true, extract(epoch from now())),
	('839464', '15', 'Ancient Chemistry', 'The history of chemistry represents a time span from ancient history to the present. By 1000 BC, civilizations used technologies that would eventually form the basis of the various branches of chemistry. ... However, by performing experiments and recording the results, alchemists set the stage for modern chemistry.', 'https://www.sciencehistory.org/sites/default/files/styles/rte_full_width/public/rte/podcast210_cropped.jpg?itok=vj9e5HqH', true, extract(epoch from now())),
	('601214', '16', 'Isaac Newton: The First Physicist', 'In Principia, Newton formulated the laws of motion and universal gravitation that formed the dominant scientific viewpoint until it was superseded by the theory of relativity. Newton used his mathematical description of gravity to derive Kepler''s laws of planetary motion, account for tides, the trajectories of comets, the precession of the equinoxes and other phenomena, eradicating doubt about the Solar System''s heliocentricity. He demonstrated that the motion of objects on Earth and celestial bodies could be accounted for by the same principles. Newton''s inference that the Earth is an oblate spheroid was later confirmed by the geodetic measurements of Maupertuis, La Condamine, and others, convincing most European scientists of the superiority of Newtonian mechanics over earlier systems.', 'https://web.physics.wustl.edu/alford/general/newton2.gif', false, extract(epoch from now())),
	('570650', '16', 'Past Precalculus: Calculus', 'Calculus, originally called infinitesimal calculus or "the calculus of infinitesimals", is the mathematical study of continuous change, in the same way that geometry is the study of shape and algebra is the study of generalizations of arithmetic operations. It has two major branches, differential calculus and integral calculus; the former concerns instantaneous rates of change, and the slopes of curves, while integral calculus concerns accumulation of quantities, and areas under or between curves. These two branches are related to each other by the fundamental theorem of calculus, and they make use of the fundamental notions of convergence of infinite sequences and infinite series to a well-defined limit.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Parabolic_segment_and_inscribed_triangle.svg/150px-Parabolic_segment_and_inscribed_triangle.svg.png', true, extract(epoch from now())),
	('839464', '11', 'Good Mold', 'People think mold is gross- but I love blue cheese! Those spores are the mold Penicillium- the same used in Penicillin! That''s some good mold.', 'https://images.unsplash.com/photo-1570917333569-eb1ad88fd4c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80', true, extract(epoch from now())),
	('601214', '7', 'Force and Skating', 'Teaching my little brother how physics relates to skating. You have to kick with the right force to get some air! Force = mass * acceleration! #ollie', 'https://images.unsplash.com/photo-1592597897149-1ad3fa8ad20a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80', true, extract(epoch from now())),
	('839464', '15', 'Baking and Chemistry', 'Wild how heat changes cookies state! I like to try it before I put it in the oven, too... for science.', 'https://images.unsplash.com/photo-1592173376801-185310a68dea?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80', true,  extract(epoch from now()));



----	CLASSES (code, name)	----
--	('839464', 'Chemistry'),
--	('601214', 'Physics'),
--	('376130', 'AP Biology'),
--	('74165', 'Intro to Visual Basic Programming'),
--	('689723', 'AP Computer Science'),
--	('393019', 'Autodesk CAD I'),
--	('107508', 'Algebra I'),
--	('7562', 'AP Statistics'),
--	('	', 'Pre-Calculus');
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
	VALUES
	('4', '1'), ('5', '1'), ('6', '1'), ('81', '1'),
	('31', '2'), ('33', '2'), ('34', '2'), ('38', '2'), ('40', '2'),
	('25', '3'), ('55', '3'), ('84', '3'),
	('8', '4'),
	('55', '5'), ('84', '5'),
	('8', '6'), ('25', '6'), ('81', '6'),
	('16', '7'), ('17', '7'), ('18', '7'),
	('4', '8'), ('5', '8'), ('6', '8'),
	('54', '9'), ('84', '9'),
	('18', '10'), ('81', '10'), 
	('25', '11'), ('55', '11'), 
	('60', '12'), ('84', '12'), 
	('31', '13'), ('33', '13'), ('34', '13'), ('38', '13'), ('40', '13'), 
	('25', '14'), ('55', '14'), ('84', '14'), 
	('25', '15'), ('8', '15'), ('81', '15'), 
	('25', '16'), ('8', '16'), ('81', '16'),
	('84', '17'), ('60', '17'),
	('66', '19'), ('8', '19'), ('25', '19'), ('81', '19');
	

-- Step 9: run the following queries to add reactions to the reaction table
INSERT INTO "reaction" ("media_url", "name")
	VALUES 
	('https://svgshare.com/i/a1L.svg', 'beaker'),
	('https://svgshare.com/i/a23.svg', 'cool'),
	('https://svgshare.com/i/a1u.svg', 'heart'),
	('https://svgshare.com/i/a1V.svg', 'smile');


-- Step 10: run the following queries to add comments to the comment table
INSERT INTO "comment" ("user_id", "stemtell_id", "comment", "unix", "teacher_feedback")
	VALUES
	('10', '1', 'This is a super technical explanation, but super awesome! Great job Maddy!', extract(epoch from now()), 'false'), ('13', '1', 'Wow, I always thought chemistry was just mixing stuff.', extract(epoch from now()), 'false'),
	('7', '2', '1982!? I didn''t even know computer existed back then...', extract(epoch from now()), 'false'), ('10', '2', 'Oh my gosh, it really is that old??? That''s crazy, it''s almost older than my parents!', extract(epoch from now()), 'false'), ('14', '2', 'I think it''s awesome how people went to do the same thing a simple piece of software does today.', extract(epoch from now()), 'false'),
	('11', '1', 'Highly inappropriate title. Please change it immediately.', extract(epoch from now()), 'true'), ('11', '3', 'Not okay', extract(epoch from now()), 'true'),
	('8', '19', 'My little brother also loves skateboarding. They should hang out sometime!',  extract(epoch from now()), 'false'), ('12', '19', 'Awesome! Can you teach me some tricks sometime?',  extract(epoch from now()), 'false'); 


-- Step 11: existing stemtell reactions
INSERT INTO "reaction_stemtell" ("stemtell_id", "user_id", "reaction_id")
	VALUES
	('1', '5', '1'), ('1', '10', '1'), ('1', '13', '3'), ('1', '15', '1'),
	('2', '5', '2'), ('2', '7', '2'), ('2', '14', '4'),
	('3', '5', '2'), ('3', '7', '4'), ('3', '14', '1'),
	('4', '16', '3'), ('4', '12', '2'), ('4', '7', '1'),
	('5', '5', '1'), ('5', '6', '3'), ('5', '7', '2'),
	('6', '7', '3'), ('6', '8', '1'), ('6', '12', '1'),
	('7', '6', '1'), ('7', '11', '2'), ('7', '14', '1'),
	('8', '5', '1'), ('8', '13', '1'),
	('9', '8', '2'), ('9', '9', '3'), ('9', '15', '1'),
	('10', '5', '2'), ('10', '14', '4'),
	('11', '11', '4'), ('11', '12', '2'), ('11', '13', '4'), ('11', '16', '2'),
	('12', '11', '1'), ('12', '13', '1'), ('12', '16', '4'),
	('13', '5', '2'), ('13', '10', '2'),
	('14', '5', '2'), ('14', '6', '2'), ('14', '7', '3'),
	('15', '5', '2'), ('15', '10', '3'), ('15', '13', '1'), ('15', '15', '3'),
	('16', '7', '1'), ('16', '8', '1'), ('16', '12', '4'), ('16', '16', '2'),
	('19', '7', '2'), ('19', '8', '2'), ('19', '12', '3'), ('19', '16', '4'),
	('17', '11', '2'), ('17', '12', '1'), ('17', '13', '4'), ('17', '16', '1');