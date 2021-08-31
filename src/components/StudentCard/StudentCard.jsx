import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './StudentCard.css';
import {Container, Card, TextField, Box, Avatar, Button} from '@material-ui/core';

function StudentCard() {

    return(
        <Container className='StudentCardContainer'>
            <Card className='StudentDetailsCard'>
                <Avatar></Avatar>
                <h4>Student's name</h4>
                <Button 
                className='StudentCardDeleteBtn'
                variant= 'outlined'
                > 
                Delete </Button>

            </Card>

        </Container>

    )
}

export default StudentCard;
