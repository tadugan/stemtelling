import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddTagDialog from '../AddTagDialog/AddTagDialog';
import TagChipDeletable from '../TagChipDeletable/TagChipDeletable';
import "./EditSTEMtell.css";
import { useHistory } from 'react-router';
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

const StyledBlueButton = styled(Button)`
   display: inline-block;
   padding: 10px 20px;
   border-color: #014041;
   border-width: 1px 1px 3px;
   border-radius: 4px;
   background-color: #79D0F1;
   color: #f8f8f8;   
   font-size: 1.1rem;
   outline: 0;
   cursor: pointer;
   &:hover {
      background-color: rgba(221, 46, 68, 0.6);
      text-decoration: none;
   }
`;


function EditSTEMtell(stemtell) {
   const user = useSelector((store) => store.user);
   const dispatch = useDispatch();
   const history = useHistory();
   const [ classId, setClassId ] = useState(0);
   const [ title, setTitle ] = useState('');
   const [ imageUrl, setImageUrl] = useState('');
   const [ description, setDescription ] = useState('');
   const [ alertMessage, setAlertMessage ] = useState('');
   const selectedTags = useSelector(store => store.selectedTags);
   const classList = useSelector(store => store.classes);
   const imageData = useSelector(store => store.image);
   const handleCancel = () => {history.push('/close')};
   const getClassList = () => {dispatch({ type: 'FETCH_CLASSES'})};
   const getExistingTags = (stemtellId) => {dispatch({ type: 'GET_EXISTING_TAGS', payload: stemtellId })};

   const handleSave = () => {
      const tagIds = [];
      event.preventDefault();
      if (invalidInputs()) {
         return;
      };
      for (const tag of selectedTags) {
         tagIds.push(tag.id);
      };
      dispatch({
         type: 'SAVE_EDITED_STEMTELL', 
         payload: {
            details: {
               id: stemtell.stemtell.id,
               title: title,
               body_text: description,
               // media_url: imageUrl,
               class_id: classId,
               tag_ids: tagIds
            },
            image_data: imageData
         }
      });
      setClassId(0);
      setTitle('');
      setImageUrl('');
      setDescription('');
      dispatch({ type: 'CLEAR_TAGS_FROM_STEMTELL'});
      dispatch({ type: "FETCH_USER_STEMTELLS", payload: user.id });
      history.push('/close');
   };

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
      };
   };

   const conditionalInputAlert = (alertType) => {
      switch (alertType) {
         case 'class':
            return (
               <Grid item xs={12}>
                  <h4 className="edit-stemtell-input-alert" >*Please Select a Class to your STEMtell</h4>
               </Grid>
            );
         case 'title':
            return (
               <Grid item xs={12}>
                  <h4 className="edit-stemtell-input-alert" >*Please Add a Title to your STEMtell</h4>
               </Grid>
            );
         case 'description':
            return (
                <Grid item xs={12}>
                    <h4 className="edit-stemtell-input-alert" >*Please add text to your STEMtell</h4>
                </Grid>
            );
         case 'tag':
            return (
               <Grid item xs={12}>
                  <h4 className="edit-stemtell-input-alert" >*Please some tags to your STEMtell</h4>
               </Grid>
            );
         default:
            return;
      };
   };

   useEffect(() => {
      getClassList();
      setDescription(stemtell.stemtell.body_text);
      setTitle(stemtell.stemtell.title);
      setImageUrl(stemtell.stemtell.media_url);
      setClassId(stemtell.stemtell.class_id);
      getExistingTags(stemtell.stemtell.id);
   }, []);

   return (
      <div className="edit-stemtell-body">
         <form>
            <Grid container spacing={2} direction="column" justifyContent="center"alignItems="center">
               <Grid item>
                  <h2>Edit</h2>
               </Grid>
               <Grid item>
                  <FormControl variant="outlined" className="edit-stemtell-class">
                     <InputLabel className="demo-simple-select-outlined-label">Class</InputLabel>
                     <Select variant="outlined" labelId="demo-simple-select-outlined-label" value={classId} onChange={(event) => setClassId(event.target.value)} label="Age" className="edit-stemtell-class-select">
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
            <Grid item className="edit-stemtell-title">
               <TextField label="Title" variant="outlined" value={title} onChange={(event) => setTitle(event.target.value)}/>
            </Grid>
            {/* <Grid item className="edit-stemtell-image-url">
               <TextField label="Image URL" variant="outlined" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)}/>
            </Grid> */}
            <Grid item>
               <ImageUploader />
            </Grid>
            <Grid item className="edit-stemtell-description">
               <TextField aria-label="STEMtell textarea" placeholder="Add text" minRows={3} maxRows={3} variant="outlined" multiline value={description} onChange={(event) => setDescription(event.target.value)}/>
            </Grid> 
            <Grid item container spacing={2} direction="row" justifyContent="center" alignItems="center">
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
                  <StyledRedButton className="edit-page-button" variant="contained" color="secondary" onClick={handleCancel}>
                     Cancel
                  </StyledRedButton>
               </Grid>
               <Grid item>
                  <StyledButton className="edit-page-button" variant="contained" color="primary" onClick={handleSave} type="submit">
                     Save
                  </StyledButton>
               </Grid>
               {conditionalInputAlert(alertMessage)}
               </Grid>
            </Grid>
         </form>
      </div>
   );
};


export default EditSTEMtell;