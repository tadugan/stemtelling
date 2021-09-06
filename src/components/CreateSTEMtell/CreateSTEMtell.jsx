import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddTagDialog from '../AddTagDialog/AddTagDialog';
import TagChipDeletable from '../TagChipDeletable/TagChipDeletable';
import "./CreateSTEMtell.css";
import { useHistory } from 'react-router';

function CreateSTEMtell() {

    const dispatch = useDispatch();
    const history = useHistory();
    const [ classId, setClassId ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ imageUrl, setImageUrl] = useState('');
    const [ description, setDescription ] = useState('');
    const [ alertMessage, setAlertMessage ] = useState('');

    const selectedTags = useSelector(store => store.selectedTags);
    const classList = useSelector(store => store.classes);

    const handleSubmit = () => {
        event.preventDefault();

        // validate class input
        if (invalidInputs()) {
            return;
        }

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
        setClassId(0);
        setTitle('');
        setImageUrl('');
        setDescription('');
        dispatch({ type: 'CLEAR_TAGS_FROM_STEMTELL'});

        // Return user to previous view
        // TODO:
    }

    const handleCancel = () => {
      history.goBack();
    }

    const getClassList = () => {
        dispatch({ type: 'FETCH_CLASSES'});
    }

    const invalidInputs = () => {
        if (classId === 0) {
            setAlertMessage('class');
            return true;
        } 
        else if (title === '') {
            setAlertMessage('title');
            return true;
        }
        else if (description === '') {
            setAlertMessage('description');
            return true;
        }
        else if (selectedTags.length === 0) {
            setAlertMessage('tag');
            return true;
        }
        else {
            setAlertMessage('');
            return false;
        }
    }

    const conditionalInputAlert = (alertType) => {
        switch (alertType) {
            case 'class':
                return (
                    <Grid item xs={12}>
                        <h4 className="create-stemtell-input-alert" >*Please Select a Class to your STEMtell</h4>
                    </Grid>
                );
            case 'title':
                return (
                    <Grid item xs={12}>
                        <h4 className="create-stemtell-input-alert" >*Please Add a Title to your STEMtell</h4>
                    </Grid>
                );
            case 'description':
            return (
                <Grid item xs={12}>
                    <h4 className="create-stemtell-input-alert" >*Please add text to your STEMtell</h4>
                </Grid>
            );
            case 'tag':
                return (
                    <Grid item xs={12}>
                        <h4 className="create-stemtell-input-alert" >*Please some tags to your STEMtell</h4>
                    </Grid>
                );
            default:
                return;
        }
    }

    useEffect(() => {
        getClassList();
        dispatch({ type: 'CLEAR_TAGS_FROM_STEMTELL' });
    }, []);

  return (
    <div className="create-stemtell-body">
        <form>
            <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                {/* BackButton Goes here */}
                <Grid
                    item
                >
                    <h2>Create a STEMtell</h2>
                </Grid>
                <Grid
                    item
                >
                    <FormControl variant="outlined">
                        <InputLabel id="demo-simple-select-outlined-label">Class</InputLabel>
                        <Select
                        variant="outlined"
                        labelId="demo-simple-select-outlined-label"
                        value={classId}
                        onChange={(event) => setClassId(event.target.value)}
                        label="Age"
                        className="create-stemtell-class-select"
                        >
                        <MenuItem value={0}>
                            <em>Choose a Class</em>
                        </MenuItem>
                        {classList.map(classItem => {
                            return (
                                <MenuItem key={classItem.id} value={classItem.class_id}>
                                    {classItem.name}
                                </MenuItem>
                            );
                        })}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    item
                >
                    <TextField
                        label="Title"
                        variant="outlined"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        className="create-stemtell-title"
                    />
                </Grid>
                <Grid
                    item
                >
                    <TextField
                        label="Image URL"
                        variant="outlined"
                        value={imageUrl}
                        onChange={(event) => setImageUrl(event.target.value)}
                        className="create-stemtell-image-url"
                    />
                </Grid>
                <Grid
                    item
                >
                    <TextField
                        aria-label="STEMtell textarea"
                        placeholder="Add text"
                        minRows={3}
                        maxRows={3}
                        variant="outlined"
                        multiline
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        className="create-stemtell-description"
                    />
                </Grid>
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
                    {conditionalInputAlert(alertMessage)}
                </Grid>
            </Grid>
        </form>
    </div>
  );
}

export default CreateSTEMtell;