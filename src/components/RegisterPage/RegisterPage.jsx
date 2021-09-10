import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import styled from 'styled-components';

const StyledButton = styled(Button)`
   display: inline-block;
   padding: 10px 20px;
   border-color: #014041;
   border-width: 1px 1px 3px;
   border-radius: 4px;
   background-color: #979797;
   color: #f8f8f8;
   font-size: 1.1rem;
   outline: 0;
   cursor: pointer;
   &:hover {
      background-color: rgba(151, 151, 151, 0.6);
      text-decoration: none;
   }
`;

function RegisterPage() {
   const [password, setPassword] = useState('');
   const [confirmedPassword, setConfirmedPassword] = useState('');
   const [teacherCode, setTeacherCode] = useState('');
   const [email, setEmail] = useState('');
   const [name, setName] = useState('');
   const [classCode, setClassCode] = useState('');
   const [profilePictureURL, setProfilePictureURL] = useState('');
   const [authority, setAuthority] = useState('student');
   const errors = useSelector((store) => store.errors);
   const dispatch = useDispatch();
   const history = useHistory();

   const registerUser = (event) => {
      event.preventDefault();
      if (password != confirmedPassword) {
         dispatch({type: 'MISMATCHED_PASSWORDS'});
         setPassword('');
         setConfirmedPassword('');
         return false;
      };
      if (password.length < 8 || confirmedPassword.length < 8) {
         dispatch({type: 'PASSWORD_TOO_SHORT'});
         setPassword('');
         setConfirmedPassword('');
         return false;
      };
      dispatch({
         type: 'REGISTER',
         payload: {
            email: email.toLowerCase(),
            password: password,
            teacherCode: teacherCode,
            authority: authority,
            name: name,
            profilePictureURL: profilePictureURL,
         },
      });
   };

   // const test = () => { // TODO:
   //    console.log(`${process.env.TEACHER_CODE}`)
   // }

   return (
      <form className="LoginForm" onSubmit={registerUser}>
         <center>
            <h2>Create An Account</h2>
            {errors.registrationMessage && (
               <h3 className="alert" role="alert">
                  {errors.registrationMessage}
               </h3>
            )}
            <Typography>
               I am a
            </Typography>
            <Select className="AuthoritySelect" name="role" id="role" variant="outlined" value={authority} onChange={(event) => setAuthority(event.target.value)}>
               <MenuItem value="student">
                     Student
               </MenuItem>
               <MenuItem value="teacher">
                  Teacher
               </MenuItem>
            </Select>
            <br /><br />
            <TextField type="text" label="Name" variant="outlined" required value={name} onChange={(event) => setName(event.target.value)}/>
            <br /><br />
            <TextField type="text" label="Class Code (optional)" variant="outlined" value={classCode} onChange={(event) => setClassCode(event.target.value)}/>
            {(authority == 'teacher') ?
            <>
            <br /><br />
            <TextField type="text" label="Teacher Code" variant="outlined" required value={teacherCode} onChange={(event) => setTeacherCode(event.target.value)}/>
            </>
            :
            <></>
            }
            <br /><br />
            <TextField type="email" label="Email" variant="outlined" required value={email} onChange={(event) => setEmail(event.target.value)}/>
            <br /><br />
            <TextField type="password" label="Password" variant="outlined" required value={password} onChange={(event) => setPassword(event.target.value)}/>
            <br /><br />
            <TextField type="password" label="Confirm Password" variant="outlined" required value={confirmedPassword} onChange={(event) => setConfirmedPassword(event.target.value)}/>
            <br /><br />
            <div>
               <StyledButton type="submit" name="submit">Create Account</StyledButton>
            </div>
            <Button onClick={() => {history.push('/login')}}>
               Already Have an Account?
               <br />
               Log In
            </Button>
         </center>
      </form>
   );
};


export default RegisterPage;