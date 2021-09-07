import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Container, TextField, Button} from '@material-ui/core';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

function AddClass() {
    // const btnRef= React.useRef(null);
    // const onHoverAdd = () =>{

    // }
    const handleAddClass = () => {


    }


    return(
        <Container className='AddClassContainer'>

        <form className='AddClassForm'>
        <TextField
        className='AddClassInput'
        label= 'Add Class'
        placeholder='Class Title'
        variant= 'filled'
        >
        </TextField>
        </form>

        <span> <AddCircleOutlineRoundedIcon onMouseLeave/> </span>
        </Container>
    )

}

export default AddClass;