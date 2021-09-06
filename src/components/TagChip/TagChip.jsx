import { Chip, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {useDispatch } from 'react-redux';
import './TagChip.css';

// The CSS file was being overridden by the default styling, so component jsx styling was used
const useStyles = makeStyles({
    selected: {
        backgroundColor: "green",
        color: "white",
    },
    unselected: {
    },
});

function TagChip( {tagInfo, selectedTags} ) {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [ isSelected, setIsSelected ] = useState(false);

    const conditionalClass = () => {
        if (isSelected) {
            return (
                classes.selected
            );
        }
        else {
            return (
                classes.unselected
            );
        }
    }

    const handleClick = () => {
        if (isSelected) {
            setIsSelected(false)
            dispatch({ type: 'REMOVE_TAG_FROM_STEMTELL', payload: tagInfo });
        }
        else {
            setIsSelected(true)
            dispatch({ type: 'ADD_TAG_TO_STEMTELL', payload: tagInfo });
        }
        
    };

    const compareReducer = () => {
        if (selectedTags.includes(tagInfo)) {
            setIsSelected(true);
        }
    }

    useEffect(() => {
        compareReducer();
    }, []);

    return (
        <div onClick={handleClick}>
            <Chip 
            label={tagInfo.name} 
            className={conditionalClass()} 
            />
        </div>
    );
}

export default TagChip;