import React, { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import './StudentCard.css';
import {Container, Card, Box, Avatar, Button} from '@material-ui/core';
import { useParams } from 'react-router';

function StudentCard() {
    const params = useParams();
    const classId= params.id;
    const dispatch = useDispatch();
    const students =  useSelector((store) => store.studentList);


    useEffect(() => {
        dispatch({type: 'GET_STUDENTLIST', payload: classId})
    }, []);

    //deletes student from specific class
    const handleDelete = (deleteStudent) => {
        dispatch({ type: "DELETE_STUDENT", payload: {
            deleteStudent,
            classId
        } });
       
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
