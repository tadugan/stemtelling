import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
      <div className="formPanel">
         <div>
            <label htmlFor="email">
               Email:
               <input type="text" name="email" required value={email} onChange={(event) => setEmail(event.target.value)}/>
            </label>
         </div>
         <div>
            <button className="btn" onClick={resetPassword}>Reset Password</button>
         </div>
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