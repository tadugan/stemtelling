import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import './StudentCard.css';
import {Container, Card, TextField, Box, Avatar, Button} from '@material-ui/core';

function StudentCard() {
    const dispatch = useDispatch();
    const students =  useSelector((store) => store.studentList);


    useEffect(() => {
        dispatch({type: 'GET_STUDENTLIST'})
    }, []);

    //deletes student from specific class
    const handleDelete = (deleteStudent) => {

        //SWEETALERT CODE
        // swal({
        //   title: "Post Deleted!",
        //   text: "Post Successfully Deleted!",
        //   icon: "success",
        //   button: "Okay",
        // });
        
        dispatch({ type: "DELETE_STUDENT", payload: deleteStudent });
       
      };
    
    return(
        <Container className='StudentCardContainer'>
            <h2 id='StudentListHeader'> Students </h2> 

            {students.map((student) => {
                return(
                <Card className='StudentDetailsCard'
                variant='outlined' key={student.id}>
                <Box className='StudentProfilePicAndName'>
                <Avatar id='StudentCardAvatar' src={student.profile_picture_url}></Avatar> <span> 
                    <h4 id='StudentDetailsName'> {student.username}</h4> </span>
                </Box>
                
                <section id='StudentDeleteBtnContainer'>
                <Button 
                className='StudentCardDeleteBtn'
                variant= 'contained'
                color='secondary'
                onClick= {() => handleDelete(student.user_id)}
                > 
                Remove </Button>
                </section>  
                   
                </Card>
                
                );
            })}

        </Container>

    )
}

export default StudentCard;
