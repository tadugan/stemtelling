import { AppBar, Button, ButtonGroup, Dialog, Divider, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import './AddTagDialog.css';
import TagChip from '../TagChip/TagChip';
import GeneralTagMap from '../GeneralTagMap/GeneralTagMap';

function AddTagDialog() {

    const dispatch = useDispatch();
    const allTags = useSelector(store => store.tags);
    const selectedTags = useSelector(store => store.selectedTags)

    const [ open, setOpen ] = useState(false);
    const [ tagDisplay, setTagDisplay ] = useState('stem');

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

    const changeTagDisplay = (mode) => {
        setTagDisplay(mode);
    };

    const conditionalTagDisplay = () => {
        if (tagDisplay === 'stem') {
            return (
                <>
                    <Grid
                        item
                        xs={12}
                    >
                        <h3>Science</h3>
                    </Grid>
                    <GeneralTagMap type="stem" stemField="science"/>
                    <Grid
                        item
                        xs={12}
                    >
                        <h3>Technology</h3>
                    </Grid>
                    <GeneralTagMap type="stem" stemField="technology"/>
                    <Grid
                        item
                        xs={12}
                    >
                        <h3>Engineering</h3>
                    </Grid>
                    <GeneralTagMap type="stem" stemField="engineering"/>
                    <Grid
                        item
                        xs={12}
                    >
                        <h3>Math</h3>
                    </Grid>
                    <GeneralTagMap type="stem" stemField="mathematics"/>
                </>
            );
        }
        else if (tagDisplay === 'general') {
            return (
                <GeneralTagMap type="general" stemField={null}/>
            );
        }
    }

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
                        Tags
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                    add tags
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
                                    <Button onClick={() => changeTagDisplay('stem')}>STEM</Button>
                                    <Button onClick={() => changeTagDisplay('general')}>General</Button>
                                </ButtonGroup>
                                </Grid>
                            </Grid>
                            {/* <Grid
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
                                            <TagChip tagInfo={tag} selectedTags={selectedTags} />
                                        </Grid>
                                    );
                                })}
                                {conditionalTagDisplay()}
                            </Grid> */}
                            {conditionalTagDisplay()}
                        </Grid>
                    </div>
            </Dialog>
        </div>
    );
}

export default AddTagDialog;
