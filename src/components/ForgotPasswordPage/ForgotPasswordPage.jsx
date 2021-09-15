import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Backdrop, Fade, Modal, makeStyles } from '@material-ui/core';
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

const useStyles = makeStyles((theme) => ({
   modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
   },
}));


function ForgotPasswordPage() {
   const history = useHistory();
   const [email, setEmail] = useState('');
   const dispatch = useDispatch();
   const classes = useStyles();
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => {setOpen(true)};
   const handleClose = () => {setOpen(false)};

   const resetPassword = () => {
      if (email == null || email == undefined || email == '' || email == ' ') {
         alert('Invalid Email');
         setEmail('');  
         return false;
      }
      else {
         dispatch({
         type: 'FORGOT_PASSWORD',
         payload: {
            email: email,
         },
      });
      handleOpen();
   }};

   return (
      <div className="LoginForm">
         <center>
            <h2>Forgot Password</h2>
            <TextField type="email" label="Email" variant="outlined" required value={email} onChange={(event) => setEmail(event.target.value)}/>
            <br /><br />
            <div>
               <StyledButton onClick={resetPassword}>Reset Password</StyledButton>
            </div>
            <Button onClick={() => {history.push('/login')}}>
               Go Back
            </Button>
         </center>
         <Modal aria-labelledby="email confirmation modal" aria-describedby="email confirmation modal" className={classes.modal} open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{timeout: 500}}>
            <Fade in={open}>
               <div className={classes.paper}>
                  <p id="email-confirmation-modal-description">
                     An email has been sent. If you don't see it, check for previous emails, or check your spam/junk folder.
                  </p>
                  <button className="btn" onClick={() => {history.push('/')}}>Return Home</button>
               </div>
            </Fade>
         </Modal>
      </div>
   );
};


export default ForgotPasswordPage;