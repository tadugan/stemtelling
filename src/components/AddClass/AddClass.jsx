import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Container, TextField, Button, Box} from '@material-ui/core';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import './AddClass.css';

function AddClass() {
    const [ newClass, setNewClass ] = useState('');
    const dispatch = useDispatch();
    // const btnRef= React.useRef(null);
    // const onHoverAdd = () =>{

    // }
    const handleAddClass = () => {
        event.preventDefault();
        if (newClass == "") {
            alert('Please provide class name.');
            return false;
        };  
        dispatch({
            type:"CREATE_CLASS",
            payload: {name: newClass}
        });
        setNewClass('');
    }


    return(
        <>
        <Container className='AddClassContainer'>

        <form className='AddClassForm'>
        <TextField
        className='AddClassInput'
        label= 'Add Class'
        placeholder='Class Title'
        variant= 'filled'
        value= {newClass}
        onChange={(event) => setNewClass(event.target.value)}
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