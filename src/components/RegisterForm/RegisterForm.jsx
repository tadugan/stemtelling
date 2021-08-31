import React, { useState } from 'react';
import { put, takeLatest } from 'redux-saga/effects';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
   const [password, setPassword] = useState('');
   const [confirmedPassword, setConfirmedPassword] = useState('');
   const [email, setEmail] = useState('');
   const [name, setName] = useState('');
   const [classCode, setClassCode] = useState('');
   const [profilePictureURL, setProfilePictureURL] = useState('');
   const [authority, setAuthority] = useState('student');
   const errors = useSelector((store) => store.errors);
   const dispatch = useDispatch();

   const registerUser = (event) => {
      event.preventDefault();
      if (password != confirmedPassword) {
         dispatch({type: 'MISMATCHED_PASSWORDS'});
         setPassword('');
         setConfirmedPassword('');
         return false;
    };

    dispatch({
      type: 'REGISTER',
      payload: {
        email: email.toLowerCase(),
        password: password,
        authority: authority,
        name: name,
        profilePictureURL: profilePictureURL,
      },
    });
  }; // end registerUser

   return (
      <form className="formPanel" onSubmit={registerUser}>
         <h2>Create An Account</h2>
         {errors.registrationMessage && (
            <h3 className="alert" role="alert">
               {errors.registrationMessage}
            </h3>
         )}
         <br /><br /><br /><br /><br />
         <div>
            <label for="role">Choose a role: </label>
            <select name="role" id="role" onChange={(event) => (setAuthority(event.target.value))}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            </select>
         </div>
         <div>
         <label htmlFor="name">
            Name:
            <input
               type="text"
               name="name"
               value={name}
               placeholder="required"
               required
               onChange={(event) => setName(event.target.value)}
            />
         </label>
         </div>
         <div>
         <label htmlFor="Class Code">
            Class Code:
            <input
               type="text"
               name="Class Code"
               value={classCode}
               placeholder="optional"
               onChange={(event) => setClassCode(event.target.value)}
            />
         </label>
         </div>
         <div>
         <label htmlFor="email">
            Email:
            <input
               type="email"
               name="email"
               value={email}
               placeholder="required"
               required
               onChange={(event) => setEmail(event.target.value)}
            />
         </label>
         </div>
         <div>
         <label htmlFor="password">
            Password:
            <input
               type="password"
               name="password"
               value={password}
               placeholder="required"
               required
               onChange={(event) => setPassword(event.target.value)}
            />
         </label>
         </div>
         <div>
         <label htmlFor="Confirm Password">
            Confirm Password:
            <input
               type="password"
               name="Confirm Password"
               value={confirmedPassword}
               placeholder="required"
               required
               onChange={(event) => setConfirmedPassword(event.target.value)}
            />
         </label>
         </div>
         <div>
         <label htmlFor="profile picture">
            Profile Picture (optional):
            <input
               type="file"
               name="profile picture"  
               accept="image/*"
               placeholder="optional"
               onChange={(event) => setProfilePicture(event.target.value)}
            />
         </label>
         </div>
         <div>
            <input className="btn" type="submit" name="submit" value="Create Account" />
         </div>
    </form>
  );
}

export default RegisterForm;
