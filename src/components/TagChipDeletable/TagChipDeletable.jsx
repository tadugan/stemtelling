import { Button, Chip } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './TagChipDeletable.css';

function TagChipDeletable( {tagInfo} ) {

    const dispatch = useDispatch();

    const handleDelete = () => {
            dispatch({ type: 'REMOVE_TAG_FROM_STEMTELL', payload: tagInfo });
    };

    return (
        <div>
            <Chip 
                label={tagInfo.name}
                onDelete={handleDelete} 
            />
        </div>
    );
}

export default TagChipDeletable;
