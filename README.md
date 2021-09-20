## About
STEMtelling is a Full Stack, high school classroom learning application. STEMtelling shows students the relevance of STEM in their lives and helps them share stories called “STEMtells” that connect their STEM interests with their unique backgrounds. STEMtelling encourages students to be more active in class and build connections with their teachers and fellow classmates. STEMtelling helps teachers adjust their curriculum to make it more relevant and appealing to their students.

STEMtelling was developed by a team of engineers consisting of Tim Dugan, Tate Feige, Kash Moua, Meghan Cleland, and Poua Yang, for our client Jenny Tilsen.


### Screen Shot
![Screen Shot](documentation/images/STEMtell-example.gif)

### System Requirements


Make sure you have the following software installed on your computer or server:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

### Creating database and tables

This app uses PostgreSQL for all of its database.
The core database is named `stemtelling_database`

```html
SQL code for the tables is in <database.sql>;
```

### Development Setup

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  NODEMAILER_USER=GmailLogin
  NODEMAILER_PASS=GmailPassword
  CLOUDINARY_NAME=stemtelling
  CLOUDINARY_API_KEY=773161645471824
  CLOUDINARY_API_SECRET=isRkBv2rO_wyjy93sX1Lq0b0PTc
  TEACHER_CODE=IAmATeacher
  ```
  In the `.env` file, replace `superDuperSecret` with a long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep the application secure. You can generate a string from [passwordsgenerator.net](https://passwordsgenerator.net/).
  `NODEMAILER_USER` and `NODEMAILER_PASS` are fields for an email username as password. This is where user password reset emails will come from
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

### Technologies Used
- React
- Redux
- Redux-Saga
- Node.js
- Express
- PostgreSQL
- Postico
- Material-UI
