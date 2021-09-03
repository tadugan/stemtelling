import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AddTagDialog from '../AddTagDialog/AddTagDialog';
import TagChipDeletable from '../TagChipDeletable/TagChipDeletable';

function EditSTEMtell() {
    const dispatch = useDispatch();
    const history= useHistory();
    const [ classId, setClassId ] = useState(1);
    const [ title, setTitle ] = useState('');
    const [ imageUrl, setImageUrl] = useState('');
    const [ description, setDescription ] = useState('');
    const selectedTags = useSelector(store => store.selectedTags);
    const getSearchQueryByFullURL = (url) => {return url.split('/')};
    const stemtell = useSelector((store) => store.stemtells);

    useEffect(() => {
         // dispatch({ type: "GET_STEMTELL", payload: (getSearchQueryByFullURL(window.location.href)[getSearchQueryByFullURL(window.location.href).length-1])});
         // setDescription(stemtell.body_text);
         console.log(stemtell);  
         // setTitle(stemtell[0].title);
         // setImageUrl(stemtell[0].media_url);
         // setClassId(stemtell[0].class_id)
    }, []);

    const handleCancel = () => {
       history.goBack()
    }

    const test = (itemInfo) => {
       console.log(itemInfo)
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
                            onClick={test}
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