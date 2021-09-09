import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Container, TextField, Button, Box} from '@material-ui/core';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import './AddClass.css';

function AddClass() {
    


    return(
        <>
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

        <span> 
        <Box className='AddClassBtnBox'>
        <AddCircleOutlineRoundedIcon
        id='AddClassBtn'
        color='primary'
        fontSize='large'
         /> 
         </Box>
         </span>        

        </Container>
        </>
    )

}

export default AddClass;