import { AppBar, Button, Dialog, Divider, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import './AddTagDialog.css';

function AddTagDialog() {

    const dispatch = useDispatch();

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
                {/* Display tags here */}
                <p>All the tags go here</p>
                <p>All the tags go here</p>
                <p>All the tags go here</p>
                <p>All the tags go here</p>
                <p>All the tags go here</p>
                <p>All the tags go here</p>
                <p>All the tags go here</p>
            </Dialog>
        </div>
    );
}

export default AddTagDialog;
