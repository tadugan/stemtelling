import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TagChip from '../TagChip/TagChip';


function GeneralTagMap( {type, stemField} ) {
   const allTags = useSelector(store => store.tags);
   const selectedTags = useSelector(store => store.selectedTags)
   const [ filteredTagsArray, setFilteredTagsArray ] = useState([]);

   const filterTagsByType = (filterType, filterStemField) => {
      const tagArray = [];
      for (const tag of allTags) {
         if (tag.type === filterType && tag.stem_field === filterStemField) {
            tagArray.push(tag);
         };
      };
      setFilteredTagsArray(tagArray);
   };

   useEffect(() => {
      filterTagsByType(type, stemField);
   }, []);

   return (
      <Grid item container spacing={1} direction="row" justifyContent="center" alignItems="center">
         {filteredTagsArray.map((tag, index) => {
            return (
               <Grid item key={index}>
                  <TagChip tagInfo={tag} selectedTags={selectedTags} />
               </Grid>
            );
         })}
      </Grid>
   );
};


export default GeneralTagMap;