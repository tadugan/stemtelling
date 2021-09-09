import { Button, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './ImageUploader.css';


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
      <div className="image-uploader-body">
            <Grid
               container 
               spacing={2} 
               direction="row" 
               justifyContent="center" 
               alignItems="center"
            >
               <Grid item xs={8}>
                  <Button variant="outlined" color="primary" component="label" className="image-uploader-button">
                     Add an Image
                     <input hidden type="file" name="image" onChange={handleFileInputChange} value={fileInputState} className="image-uploader-form-input" />
                  </Button>
               </Grid>
               <Grid item xs={4}>
                  <div className="image-uploader-preview-window">
                     {previewSource &&
                     (<img src={previewSource} alt="upload" className="image-uploader-preview" />)}
                  </div>
               </Grid>
            </Grid>
      </div>
   );
};


export default ImageUploader;