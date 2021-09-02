import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import TagChip from '../TagChip/TagChip';

function GeneralTagMap() {

    const allTags = useSelector(store => store.tags);
    const selectedTags = useSelector(store => store.selectedTags)

    return (
            <Grid
                item
                container
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
            {allTags.map((tag, index) => {
                return (
                    <Grid item key={index}>
                        <TagChip tagInfo={tag} selectedTags={selectedTags} />
                    </Grid>
                );
            })}
            </Grid>
    );
}

export default GeneralTagMap;
