import { AppBar, Button, ButtonGroup, Backdrop, Dialog, Grid, IconButton, Toolbar, Typography, Avatar, Card, Paper, Modal, Fade, TextField } from '@material-ui/core';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import PublishIcon from '@material-ui/icons/Publish';
import AddTagDialog from '../AddTagDialog/AddTagDialog';
import TagChipDeletable from '../TagChipDeletable/TagChipDeletable';
import './CreateProfile.css'

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


function CreateProfile() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const modalClasses = useModalStyles();
    const classes = useStyles();
    const profile = useSelector((store) => store.profile);
    const user = useSelector(store => store.user);
    const newClass = useSelector((store) => store.classes);
    const tags = useSelector((store) => store.tag);
    const [classOpen, setClassOpen] = React.useState(false);
    const handleClassOpen = () => { setClassOpen(true) };
    const handleClassClose = () => { setClassOpen(false) };
    const [addClassCode, setAddClassCode] = useState('');
    const selectedTags = useSelector(store => store.selectedTags);
    const [ classId, setClassId ] = useState(1);
    const [ title, setTitle ] = useState('');
    const [ imageUrl, setImageUrl] = useState('');
    const [ description, setDescription ] = useState('');
    const [ authority, setAuthority ] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    
    // Uploads user info on load of page
    useEffect(() => {
        dispatch({type: 'GET_USER', payload: {userId: params}})
        setEmail(user.email);
        setName(user.name);
    }, []);

    const saveChanges = () => {
        if (addClassCode == "") {
            alert('Please provide class code.');
            return false;
        };  
        dispatch({
            type:"JOIN_CLASS",
            payload: {authority: authority, class_id: classId}
        });
        setAddClassCode('');

        handleClassClose();
    };

    const handleSubmit = () => {
        event.preventDefault();

        // array to store tag ids
        const tagIds = [];

        // add ids to tagIds array
        for (const tag of selectedTags) {
            tagIds.push(tag.id);
        }

        // Dispatch captured inputs to SAGA
        dispatch({ type: 'SUBMIT_NEW_PROFILE_TAGS', payload: {
            title: title,
            body_text: description,
            media_url: imageUrl,
            class_id: classId,
            tag_ids: tagIds
            }
        });

        // Clear Input Fields
        setClassId(1);
        setTitle('');
        setImageUrl('');
        setDescription('');
        dispatch({ type: 'CLEAR_TAGS_FROM_STEMTELL'});

        // Return user to previous view
        // TODO:
    }

   const handleCancel = () => {
      history.goBack();
   };

   return (
      <div>
         <center>
         <Grid item xs={12} sm={3} direction="row" justifyContent="center" alignItems="center"> 
            <Paper className={classes.paper}>
               <img src={profile.profile_picture_url} />
               <h2>Name</h2>
               <TextField type="text" label="Name" variant="outlined" value={name} onChange={(event) => setName(event.target.value)}/>
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
               <Button variant="contained" onClick={handleClassOpen}>Add New Class</Button>
               {/* WILL SHOW CLASS LIST HERE */}
               <h3>{newClass.name}</h3>
            </Paper>
         </Grid>
         <Modal aria-labelledby="Add CLass Modal" align="center" aria-describedby="Upload a class" className={modalClasses.modal} open={classOpen} onClose={handleClassClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{timeout: 500}}>
            <Fade in={classOpen}>
               <div className={modalClasses.paper} style={{width: '550px'}}>
                  <TextField id="ClassCode" label="Class" variant="outlined" style={{width: "100%"}} value={addClassCode} onChange={(event) => setAddClassCode(event.target.value)}/><br /><br />
                  <Button variant="contained" color="primary" startIcon={<CloseIcon />} onClick={handleClassClose}>Close</Button>
                  &nbsp;
                  <Button variant="contained" color="primary" endIcon={<PublishIcon />} onClick={saveChanges}>Save Class</Button> 
               </div>
            </Fade>
         </Modal>
         <br />
         <Grid item container spacing={2} direction="row" justifyContent="center" alignItems="center" >
            {selectedTags.map((tag) => {
               return (
                  <Grid item key={tag.id}>
                     <TagChipDeletable tagInfo={tag}/>
                  </Grid>
               );
            })}
         </Grid>
         <Grid item>
            <AddTagDialog />
         </Grid>
         <Grid item container spacing={2} xs={12} direction="row" justifyContent="center" alignItems="center">
            <Grid item>
               <Button variant="contained" color="secondary" onClick={handleCancel}>
                  Cancel
               </Button>
            </Grid>
            <Grid item>
               <Button variant="contained" color="primary" onClick={handleSubmit} type="submit">
                  Save Tags
               </Button>
            </Grid>
         </Grid>
         </center>
      </div>
   )
}

export default CreateProfile;