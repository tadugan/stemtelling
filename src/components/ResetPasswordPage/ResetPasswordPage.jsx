import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
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

function ResetPasswordPage() {
   const history = useHistory();
   const [email, setEmail] = useState('');
   const errors = useSelector(store => store.errors);
   const dispatch = useDispatch();
   const classes = useStyles();
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => {setOpen(true)};
   const handleClose = () => {setOpen(false); setEmail(''); setInputCode(''); setResetCode('');};

   const resetPassword = () => { // main handler for password resetting, collects data from email input and dispatches it
      if (email == null || email == undefined || email == '' || email == ' ') {
         alert('Invalid Email');
         setEmail('');  
         return false;
      };
      dispatch({
         type: 'FORGOT_PASSWORD',
         payload: {
            email: email,
         },
      });
      handleOpen();
   };
   // end resetPassword handler

   const checkCode = () => {
      if (resetCode != inputCode) {
         alert('Invalid code');
         return false;
      }
      else if (resetCode == inputCode) {
         let newPassword = prompt("Please enter a new password");
         dispatch({
            type: "CHANGE_PASSWORD",
            payload: {
               email: email,
               password: newPassword,
            }
         });
      }
      else {
         alert('An unknown error has occurred.');
         setInputCode('');
         return false;
      };
   };

   
  return (
     <div className="formPanel">
      <div>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            name="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
      </div>
      <div>
         <button className="btn" onClick={resetPassword}>Reset Password</button>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Enter Confirmation Code</h2>
            <label htmlFor="code">
               Code:
               <input
                  type="text"
                  name="code"
                  required
                  value={inputCode}
                  onChange={(event) => setInputCode(event.target.value)}
               />
            </label>
            <br />
            <button className="btn" onClick={checkCode}>Confirm</button>
          </div>
        </Fade>
      </Modal>
   </div>
  );
};

export default ResetPasswordPage;