import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddTagDialog from '../AddTagDialog/AddTagDialog';
import TagChipDeletable from '../TagChipDeletable/TagChipDeletable';

function EditSTEMtell() {

    const dispatch = useDispatch();

    const [ classId, setClassId ] = useState(1);
    const [ title, setTitle ] = useState('');
    const [ imageUrl, setImageUrl] = useState('');
    const [ description, setDescription ] = useState('');

    const selectedTags = useSelector(store => store.selectedTags);
    // TODO: Remove unused variables!
    // const allTags = useSelector(store => store.tags);

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
    }

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
                        <MenuItem value="">
                            <em>Choose a Class</em>
                        </MenuItem>
                        {/* This needs to be based on the classes the student is enrolled in */}
                        <MenuItem value={1}>CHEM</MenuItem>
                        <MenuItem value={2}>BIO</MenuItem>
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
                </Grid>
            </Grid>
        </form>
    </div>
  );
}

export default EditSTEMtell;
