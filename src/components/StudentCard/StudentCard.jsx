import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import './StudentCard.css';
import {Container, Card, TextField, Box, Avatar, Button} from '@material-ui/core';

function StudentCard() {
    const dispatch = useDispatch();
    const students =  useSelector((store) => store.studentList);
    console.log(`store for student: ${students}`)

    useEffect(() => {
        dispatch({type: 'GET_STUDENTLIST'})
    }, []);

    // const handleDeleteFromClass = () =>{

    // }
    return(
        <>
        <h2 id='StudentListHeader'> Students </h2> 
        <Container className='StudentCardContainer'>
           

            {students.map((student) => {
                return(
                <Card className='StudentDetailsCard'
                variant='outlined' key={student.id}>
                <Box className='StudentProfilePicAndName'>
                <Avatar id='StudentCardAvatar' src={student.profile_picture_url}></Avatar> <span> 
                    <h4 id='StudentDetailsName'> {student.username}</h4> </span>
                </Box>
                
                <Button 
                className='StudentCardDeleteBtn'
                variant= 'outlined'
                color='secondary'
                > 
                Delete </Button>

                </Card>  
                );
            })}

        </Container>
        </>

    )
}

export default StudentCard;
