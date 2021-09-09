import { Button } from '@material-ui/core';
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
      <div>
            <input type="file" name="image" onChange={handleFileInputChange} value={fileInputState} className="image-uploader-form-input" />
         {previewSource && (
            <img src={previewSource} alt="upload" className="image-uploader-preview" />
         )}
      </div>
   );
};


export default ImageUploader;