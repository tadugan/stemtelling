import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
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


function LoginPage() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const errors = useSelector(store => store.errors);
   const dispatch = useDispatch();
   const history = useHistory();

   const login = (event) => {
      event.preventDefault();
      if (email && password) {
         dispatch({
            type: 'LOGIN',
            payload: {
               email: email.toLowerCase(),
               password: password,
            },
         });
         history.push('/');
      }
      else {
         dispatch({ type: 'LOGIN_INPUT_ERROR' });
      };
   };

   const teacherLogin = () => {
      setEmail('chloe.piper@email.edu');
      setPassword('password');
   }

   return (
      <form className="LoginForm" onSubmit={login}>
         <center>
            <h2>Login</h2>
            {errors.loginMessage && (
               <h3 className="alert" role="alert">
                  {errors.loginMessage}
               </h3>
            )}
            <Button onClick = {teacherLogin}/>
            <TextField type="email" label="Email" variant="outlined" required value={email} onChange={(event) => setEmail(event.target.value)}/>
            <br /><br />
            <TextField type="password" label="Password" variant="outlined" required value={password} onChange={(event) => setPassword(event.target.value)}/>
            <br /><br />
            <div>
               <StyledButton className="btn" type="submit" name="submit" value="Log In">Log In</StyledButton>
            </div>
            <Button onClick={() => {history.push('/registration')}}>
               Register
            </Button>
            <br />
            <Button onClick={() => {history.push('/forgotpassword')}}>
               Forgot Password?
            </Button>
         </center>
      </form>
   );
};


export default LoginPage;