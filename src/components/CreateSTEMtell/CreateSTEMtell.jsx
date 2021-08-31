import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { AddCircleOutlineRounded } from '@material-ui/icons';
import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import "./CreateSTEMtell.css";

function CreateSTEMtell() {

    const dispatch = useDispatch();

    const [ className, setClassName ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ imageUrl, setImageUrl] = useState('');
    const [ description, setDescription] = useState('');
    const [ tagsArray, setTagsArray] = useState([]);

    const handleAddTag = () => {
        console.log('ADD TAG');
    }

    const handleSubmit = () => {
        event.preventDefault();
        console.log('SUBMIT');
        console.log(`
        class: ${className}
        title: ${title}
        imageUrl: ${imageUrl}
        description: ${description}
        tags: ${tagsArray}
        `);
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
                        value={className}
                        onChange={(event) => setClassName(event.target.value)}
                        label="Age"
                        className="create-stemtell-class-select"
                        >
                        <MenuItem value="">
                            <em>Choose a Class</em>
                        </MenuItem>
                        {/* This needs to be based on the classes the student is enrolled in */}
                        <MenuItem value={'CHEM'}>CHEM</MenuItem>
                        <MenuItem value={'BIO'}>BIO</MenuItem>
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
                    />
                </Grid>
                <Grid
                    item
                    container
                    spacing={0}
                    xs={12}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
            
                >
                        <Grid
                            item
                            xs={2}
                        >
                            <p>Add Tags</p>
                        </Grid>
                        <Grid
                            item
                            xs={1}
                        >
                            <AddCircleOutlineRounded onClick={handleAddTag}/>
                        </Grid>
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

export default CreateSTEMtell;
