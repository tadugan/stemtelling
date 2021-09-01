import { AppBar, Button, ButtonGroup, Dialog, Divider, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import './AddTagDialog.css';
import TagChip from '../TagChip/TagChip';

function AddTagDialog() {

    const dispatch = useDispatch();
    const allTags = useSelector(store => store.tags);

    const [open, setOpen] = useState(false);

    // GETs an array that contains all the tags from the database
    const getAllTags = () => {
        dispatch({ type: 'GET_ALL_TAGS'});
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getAllTags();
    }, []);

    return (
        <div className="add-tag-dialog-body">
            <Button variant="outlined" color="primary" onClick={handleClickOpen} className="add-tag-dialog-button">
            Add Tags
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose}>
                <AppBar className="add-tag-dialog-appbar">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className="add-tag-dialog-title">
                        Add Tags
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                    confirm tags
                    </Button>
                </Toolbar>
                </AppBar>
                    <div className="add-tag-dialog-tag-container">
                        <Grid
                            container
                            spacing={3}
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid
                                item
                                container
                                spacing={1}
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid
                                    item
                                    xs={12}
                                >
                                <ButtonGroup
                                    variant="contained"
                                    color="primary"
                                    aria-label="contained primary button group"
                                >
                                    <Button>STEM</Button>
                                    <Button>General</Button>
                                </ButtonGroup>
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                container
                                spacing={1}
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                {allTags.map((tag, index) => {
                                    return (
                                        <Grid item key={index}>
                                            <TagChip tagInfo={tag} />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Grid>
                    </div>
            </Dialog>
        </div>
    );
}

export default AddTagDialog;
