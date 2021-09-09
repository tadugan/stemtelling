import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import './ImageUploader.css';


function ImageUploader( {tagInfo} ) {

   const [ previewSource, setPreviewSource ] = useState();
   const [ fileInputState, setFileInputState ] = useState('');
   const [ selectedFile, setSelectedFile ] = useState('');
   const handleFileInputChange = (e) => {
         const file = e.target.files[0];
         previewFile(file);
   }

   const previewFile = (file) => {
         const reader = new FileReader();
         reader.readAsDataURL(file);
         reader.onloadend = () => {
            setPreviewSource(reader.result);
         }
   }

   const handleSubmitFile = (e) => {
         e.preventDefault();
         if(!previewSource) {
            return;
         }
         const reader = new FileReader();
         uploadImage(previewSource);
   }

   const uploadImage = async (base64EncodedImage) => {
         console.log(base64EncodedImage);
         try {
               await fetch('/api/upload', {
                     method: 'POST',
                     body: JSON.stringify({data: base64EncodedImage}),
                     headers: {'Content-type': 'application/json'}
               })
         } catch (error) {
               console.log('Error:', error)
         }
   }

   return (
      <div>
         <h3>Image Uploader</h3>
         <form onSubmit={handleSubmitFile}>
            <input type="file" name="image" onChange={handleFileInputChange} value={fileInputState} className="image-uploader-form-input" />
            <Button className="image-uploader-button" type="submit" variant="contained" color="primary">Submit</Button>
         </form>
         {previewSource && (
            <img src={previewSource} alt="upload" className="image-uploader-preview" />
         )}
      </div>
   );
};


export default ImageUploader;