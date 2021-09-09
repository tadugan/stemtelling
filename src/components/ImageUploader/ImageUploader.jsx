import { Button, Grid, Container } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './ImageUploader.css';
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



function ImageUploader() {

   const dispatch = useDispatch();

   const [ previewSource, setPreviewSource ] = useState();
   const [ fileInputState, setFileInputState ] = useState('');

   const handleFileInputChange = (e) => {
         const file = e.target.files[0];
         previewFile(file);
   }

   const previewFile = (file) => {
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.onloadend = () => {
            dispatch({ type: 'SET_IMAGE_REDUCER', payload: reader.result });
            setPreviewSource(reader.result);
         }
   }

   return (
      <div>
         <Grid item>
            <StyledBlueButton component="label">
               Add an Image
               <input hidden type="file" accept="image/*,.jpg,.png" name="image" onChange={handleFileInputChange} value={fileInputState} className="image-uploader-form-input" />
            </StyledBlueButton>
         </Grid>
         <br />
         <Grid item>
            <center>
            <div className="image-uploader-preview-window">
               {previewSource &&
               (<img src={previewSource} alt="upload" className="image-uploader-preview" />)}
            </div>
            </center>
         </Grid>
      </div>
   );
};


export default ImageUploader;