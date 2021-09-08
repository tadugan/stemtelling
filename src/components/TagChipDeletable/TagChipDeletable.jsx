import { Chip } from '@material-ui/core';
import React from 'react';
import {useDispatch } from 'react-redux';


function TagChipDeletable( {tagInfo} ) {
   const dispatch = useDispatch();
   const handleDelete = () => {dispatch({ type: 'REMOVE_TAG_FROM_STEMTELL', payload: tagInfo });};

   return (
      <div>
         <Chip label={tagInfo.name} onDelete={handleDelete} />
      </div>
   );
};


export default TagChipDeletable;