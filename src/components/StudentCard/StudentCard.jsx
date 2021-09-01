import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './StudentCard.css';
import {Container, Card, TextField, Box, Avatar, Button} from '@material-ui/core';

function StudentCard() {

    return(
        <Container className='StudentCardContainer'>
            <Card className='StudentDetailsCard'
            variant='outlined'>
                <Box className='StudentProfilePicAndName'>
                <Avatar id='StudentCardAvatar'></Avatar> <span> <h4 id='StudentDetailsName'>Student's name</h4> </span>
                </Box>
                
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
