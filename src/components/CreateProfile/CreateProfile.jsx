import {
    AppBar,
    Button,
    ButtonGroup,
    Backdrop,
    Dialog,
    Grid,
    IconButton,
    Toolbar,
    Typography,
    Avatar,
    Card,
    Paper,
    Modal,
    Fade,
    TextField,
  } from '@material-ui/core';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { CloseIcon} from '@material-ui/icons/Close';
import { PublishIcon } from '@material-ui/icons/Publish';
import AddTagDialog from '../AddTagDialog/AddTagDialog';
import TagChipDeletable from '../TagChipDeletable/TagChipDeletable';


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

const useModal = makeStyles((theme) => ({
    modal: {display: 'flex', alignItems: 'center', justifyContent: 'center', width:"1000px", margin: "auto"},
    editModal: {display: 'flex', alignItems: 'center', justifyContent: 'center', margin: "auto"},
    paper: {backgroundColor: theme.palette.background.paper, borderRadius:'10%', border: '2px solid #000', boxShadow: theme.shadows[5], padding: theme.spacing(2, 4, 3)}
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

import './CreateProfile.css'

function CreateProfile() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const modalClasses = useModalStyles();
    const classes = useStyles();
    const profile = useSelector((store) => store.profile);
    const [classOpen, setClassOpen] = React.useState(false);
    const handleClassOpen = () => { setClassOpen(true) };
    const handleClassClose = () => { setClassClose(false) };
    const [addClassCode, setAddClassCode] = useState('');
    const selectedTags = useSelector(store => store.selectedTags);
    

    const saveChanges = () => {
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
        dispatch({ type: 'SUBMIT_NEW_STEMTELL', payload: {
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
        console.log('CANCEL');
    };

    // Uploads user info on load of page
    useEffect(() => {
        dispatch({type: 'GET_USER', payload: {userId: params}})
    }, []);


    //May need to change a few things here to work with everything. Also need to see where we want to push after submitted
    // const handleSubmit = () => {
    // };

    return(
        <div>
            <Grid item xs={12} sm={3}> 
                <Paper className={classes.paper}>
                    <img src={profile.profile_picture_url}></img>
                    <h2>Name</h2>
                    <h3>{profile.name}</h3> 
                </Paper>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Paper className={classes.paper}>
                    <h2>Email</h2>
                    <h3>{profile.email}</h3>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={3}>
                <Paper className={classes.paper}>
                    <h2>Class</h2>
                    <Button variant="contained" onClick={handleClassOpen}>Add New Class</Button>
                    <h3>{}</h3>
                </Paper>
            </Grid>
            <Modal aria-labelledby="Add CLass Modal" align="center" aria-describedby="Upload a class" className={modalClasses.modal} open={classOpen} onClose={handleClassClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{timeout: 500}}>
                <Fade in={classOpen}>
                    <div className={modalClasses.paper} style={{width: '550px'}}>
                        <TextField id="ClassCode" label="Class" variant="outlined" style={{width: "100%"}} value={addClassCode} onChange={(event) => setAddClassCode(event.target.value)}/><br /><br />
                        <Button variant="contained" color="primary" startIcon={<CloseIcon />} onClick={() => {handleClassClose}}>Close</Button>
                        &nbsp;
                        <Button variant="contained" color="primary" endIcon={<PublishIcon />} onClick={() => {saveChanges}}>Save</Button> 
                    </div>
                </Fade>
            </Modal>
            <Grid
                    item
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    {selectedTags.map((tag) => {
                        return (
                            <Grid
                                item
                                key={tag.id}
                            >
                                <TagChipDeletable tagInfo={tag}/>
                            </Grid>
                        );
                    })}
                </Grid>
                <Grid
                    item
                >
                    <AddTagDialog />
                </Grid>
                <Grid
                    item
                >
                    <p>Selected Tags get display here</p>
                </Grid>
                <Grid
                    item
                    container
                    spacing={2}
                    xs={12}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid
                        item
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid
                        item
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
        </div>
    )
}

export default CreateProfile;

{/* <section>
            <form action="submit">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Create Profile</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                                Profile Picture
                                <td><img src={user.profile_picture_url} width="100"/></td>
                                Name
                                <td>{user.name}</td> 
                                Email
                                <td>{user.email}</td>
                            </tr>  
                    </tbody>
                </table>
            </form>
        </section> */}

