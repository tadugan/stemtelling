import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
   modal: 
      {
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
      },
   paper:
      {
         backgroundColor: theme.palette.background.paper,
         border: '2px solid #000',
         boxShadow: theme.shadows[5],
         padding: theme.spacing(2, 4, 3),
      },
}));


function ResetPasswordPage() {
   const dispatch = useDispatch();
   const history = useHistory();
   const errors = useSelector((store) => store.errors);
   const classes = useStyles();
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => {setOpen(true)};
   const handleClose = () => {setOpen(false)};
   const [newPassword, setNewPassword] = useState('');
   const [confirmedNewPassword, setConfirmedNewPassword] = useState('');
   const [isDisabled, setIsDisabled] = useState('');
   const getSearchQueryByFullURL = (url) => {return url.split('?confirmation=')};

   useEffect(() => {
      dispatch({
         type: 'GET_UUID',
         payload: {
            uuid: getSearchQueryByFullURL(window.location.href)[1],
         },
      });
      if (errors.resetMessage == "Invalid Link") {
         setIsDisabled(true);
      };
   });

   const resetPassword = () => {
      if (newPassword.length < 8 || confirmedNewPassword.length < 8) {
         alert("Password is too short. Please enter at least 8 characters");
         setNewPassword('');
         setConfirmedNewPassword('');
         return false;
      }
      if (newPassword != confirmedNewPassword) {
         alert("Passwords do not match");
         setNewPassword('');
         setConfirmedNewPassword('');
         return false;
      }
      else {
         dispatch({
            type: 'CHANGE_PASSWORD',
            payload: {
               newPassword: newPassword,
               uuid: getSearchQueryByFullURL(window.location.href)[1],
            },
         });
         handleOpen();
      };
   };

   return (
      <div className="formPanel">
         <div>
            {errors.resetMessage && (
               <h3 className="alert" role="alert">
                  {errors.resetMessage}
               </h3>
            )}
            <label htmlFor="Enter New Password">
               Enter New Password:
               <input
                  type="password"
                  name="Enter New Password"
                  required
                  disabled={isDisabled}
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
               />
            </label>
         </div>
         <div>
            <label htmlFor="Confirm New Password">
               Confirm Password:
            <input
               type="password"
               name="Confirm New Password"
               required
               disabled={isDisabled}
               value={confirmedNewPassword}
               onChange={(event) => setConfirmedNewPassword(event.target.value)}
            />
            </label>
         </div>
         <div>
            <button className="btn" onClick={resetPassword} disabled={isDisabled}>Set Password</button>
         </div>
         <Modal
            aria-labelledby="email confirmation modal"
            aria-describedby="email confirmation modal"
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
               <p id="email-confirmation-modal-description">
               Your password has been reset!
               </p>
               <button className="btn" onClick={() => {history.push('/')}}>Return Home</button>
               </div>
            </Fade>
         </Modal>
      </div>
   );
};


export default ResetPasswordPage;