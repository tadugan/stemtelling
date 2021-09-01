import { Chip } from '@material-ui/core';
import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import './TagChip.css';

function TagChip( {tagInfo} ) {

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    return (
        <Chip label={tagInfo.name} onClick={handleClick} />
    );
}

export default TagChip;
