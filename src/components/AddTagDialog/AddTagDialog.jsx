import { AppBar, Button, ButtonGroup, Dialog, Grid, IconButton, Toolbar, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import './AddTagDialog.css';
import GeneralTagMap from '../GeneralTagMap/GeneralTagMap';
import styled from 'styled-components';

const StyledBlueButton = styled(Button)`
   display: inline-block;
   padding: 10px 20px;
   border-radius: 4px;
   background-color: #79D0F1;
   color: #f8f8f8;   
   font-size: 1.1rem;
   outline: 0;
   cursor: pointer;
   &:hover {
      background-color: rgba(121, 208, 241   , 0.6);
      text-decoration: none;
   }
`;


function AddTagDialog() {
   const dispatch = useDispatch();
   const [open, setOpen] = useState(false);
   const [tagDisplay, setTagDisplay] = useState('stem');
   const getAllTags = () => {dispatch({ type: 'GET_ALL_TAGS' })};
   const handleClickOpen = () => {setOpen(true)};
   const handleClose = () => {setOpen(false)};
   const changeTagDisplay = (mode) => {setTagDisplay(mode)};

   const conditionalTagDisplay = () => {
      if (tagDisplay === 'stem') {
         return (
            <>
               <Grid item xs={12}>
                  <h3>Science</h3>
               </Grid>
               <GeneralTagMap type="stem" stemField="science" />
               <Grid item xs={12}>
                  <h3>Technology</h3>
               </Grid>
               <GeneralTagMap type="stem" stemField="technology" />
               <Grid item xs={12}>
                  <h3>Engineering</h3>
               </Grid>
               <GeneralTagMap type="stem" stemField="engineering" />
               <Grid item xs={12}>
                  <h3>Math</h3>
               </Grid>
               <GeneralTagMap type="stem" stemField="mathematics" />
            </>
         );
      }
      else if (tagDisplay === 'general') {
         return <GeneralTagMap type="general" stemField={null} />;
      };
   };

   useEffect(() => {
      getAllTags();
   }, []);

   return (
      <div className="add-tag-dialog-body">
         <StyledBlueButton variant="outlined" color="primary" onClick={handleClickOpen} className="add-tag-dialog-button">
            Add Tags
         </StyledBlueButton>
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
                     Add tags
                  </Button>
               </Toolbar>
            </AppBar>
            <div className="add-tag-dialog-tag-container">
               <Grid container spacing={3} direction="column" justifyContent="center" alignItems="center">
                  <Grid item container spacing={1} direction="column" justifyContent="center" alignItems="center">
                     <Grid item xs={12}>
                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                           <StyledBlueButton onClick={() => changeTagDisplay('stem')}>STEM</StyledBlueButton>
                           <StyledBlueButton onClick={() => changeTagDisplay('general')}>General</StyledBlueButton>
                        </ButtonGroup>
                     </Grid>
                  </Grid>
                  {conditionalTagDisplay()}
               </Grid>
            </div>
         </Dialog>
      </div>
   );
};


export default AddTagDialog;