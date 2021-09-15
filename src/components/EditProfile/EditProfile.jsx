import { Button, Backdrop, Grid, Paper, Modal, Fade, TextField, Chip, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import PublishIcon from '@material-ui/icons/Publish';
import styled from 'styled-components';
import ImageUploader from '../ImageUploader/ImageUploader';

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

const StyledRedButton = styled(Button)`
   display: inline-block;
   padding: 10px 20px;
   border-color: #014041;
   border-width: 1px 1px 3px;
   border-radius: 4px;
   background-color: #DD2E44;
   color: #f8f8f8;   
   font-size: 1.1rem;
   outline: 0;
   cursor: pointer;
   &:hover {
      background-color: rgba(221, 46, 68, 0.6);
      text-decoration: none;
   }
`;

const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
   },
   paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
   },
}));

const useModalStyles = makeStyles((theme) => ({
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


function EditProfile() {
   const dispatch = useDispatch();
   const history = useHistory();
   const params = useParams();
   const modalClasses = useModalStyles();
   const classes = useStyles(); 
   const user = useSelector(store => store.user);
   const myClasses = useSelector((store) => store.classes);
   const [classOpen, setClassOpen] = React.useState(false);
   const handleClassOpen = () => { setClassOpen(true) };
   const handleClassClose = () => { setClassOpen(false) };
   const [addClassCode, setAddClassCode] = useState('');
   const [ classCode, setClassCode ] = useState(1);
   const profilePic = useSelector(store => store.profileImage);
   const [ authority, setAuthority ] = useState('');
   const errors = useSelector((store) => store.errors);
   const [email, setEmail] = useState('');
   const [name, setName] = useState('');
   
   useEffect(() => {
      dispatch({type: 'GET_USER', payload: {userId: params}});
      dispatch({type: 'GET_USER_CLASSES', payload: user.id});
      dispatch({type: 'SET_PROFILE_IMAGE_REDUCER', payload: user.profile_picture_url});
      setEmail(user.email);
      setName(user.name);
   }, []);


    const saveUserInfo = () => {
      dispatch({
         type: "UPDATE_USER",
         payload: {
            name: name,
            email: email,
            picture: profilePic,
            history: history,
         }
      });
      dispatch({type: 'FETCH_USER'});
      history.push('/close');
   };

   const joinClass = () => {
      console.log(addClassCode)
      if (addClassCode == "") {
         alert('Please provide class code.');
         return false;
      };
      dispatch({
         type:"JOIN_CLASS",
         payload: {
            authority: authority,
            class_code: addClassCode,
            user_id: user.id,
         }
      });
      setAddClassCode('');
      handleClassClose();
      dispatch({type: 'GET_USER_CLASSES', payload: user.id});
   };

   const leaveClass = (classInfo) => {
      if (confirm(`Are you sure you want to leave ${classInfo.name}?`) === false) {
         return false;
      };
      dispatch({
         type: "LEAVE_CLASS",
         payload: classInfo
      });
      dispatch({type: 'GET_USER_CLASSES', payload: user.id});
   };

   return (
      <div>
         <center>
         <Grid item xs={12} sm={3} direction="row" justifyContent="center" alignItems="center"> 
            <Paper className={classes.paper}>
               <h2>Profile Picture</h2>
               {profilePic ? <img src={profilePic} /> : <img src={user.profile_picture_url} />}
               <br />
               <ImageUploader mode={"profile"} />
            </Paper>
         </Grid>
         <Grid item xs={12} sm={3} direction="row" justifyContent="center" alignItems="center"> 
            <Paper className={classes.paper}>
               <h2>Name</h2>
               <TextField type   ="text" label="Name" variant="outlined" value={name} onChange={(event) => setName(event.target.value)}/>
            </Paper>
         </Grid>
         <Grid item xs={12} sm={3} direction="row" justifyContent="center" alignItems="center">
            <Paper className={classes.paper}>
               <h2>Email</h2>
               <TextField type="email" label="Email" variant="outlined" value={email} onChange={(event) => setEmail(event.target.value)}/>
            </Paper>
         </Grid>
         <Grid item xs={12} sm={3} direction="row" justifyContent="center" alignItems="center">
            <Paper className={classes.paper}>
               <h2>Classes</h2>
               {errors.joinClassMessage && (
                  <h3 className="alert" role="alert">
                     {errors.joinClassMessage}
                  </h3>
               )}
               <Button variant="contained" onClick={handleClassOpen}>Add New Class</Button>
               <br /><br />
               {myClasses.map((userClass) => {
                  return (
                     <div>
                        <Chip label={userClass.name} key={userClass.code} onDelete={() => {leaveClass(userClass)}} />
                     </div>
                  );
               })}
            </Paper>
         </Grid>
         <Modal aria-labelledby="Add CLass Modal" align="center" aria-describedby="Upload a class" className={modalClasses.modal} open={classOpen} onClose={handleClassClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{timeout: 500}}>
            <Fade in={classOpen}>
               <div className={modalClasses.paper} style={{width: '550px'}}>
                  <TextField type="number" id="ClassCode" label="Class Code" variant="outlined" style={{width: "100%"}} value={addClassCode} onChange={(event) => setAddClassCode(event.target.value)}/>
                  <br /><br />
                  <Button variant="contained" color="primary" startIcon={<CloseIcon />} onClick={handleClassClose}>Close</Button>
                  &nbsp;
                  <Button variant="contained" color="primary" endIcon={<PublishIcon />} onClick={joinClass}>Join Class</Button> 
               </div>
            </Fade>
         </Modal>
         <br />
         <StyledRedButton onClick={() => {history.goBack()}}>
            Discard Changes
         </StyledRedButton>     
         <StyledButton onClick={() => {saveUserInfo()}}>
            Save Changes
         </StyledButton>
         </center>
      </div>
   );
};


export default EditProfile;