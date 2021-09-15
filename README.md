## About
STEMtelling is a Full Stack high school classroom learning application. STEMtelling shows students the relevance of STEM in their lives and helps them share stories called “STEMtells” that connect their STEM interests with their unique backgrounds. STEMtell promotes students to be more active and participate with teachers and classmates. STEMtell can help a teacher develop particular cirriculum to suit a student's needs depending on how they veiw the class subject.  


### Screen Shot


### System Requirements
![Screen Shot]()


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
