import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Container, Card, TextField, Box, Avatar, Button} from '@material-ui/core';
import Comment from '../Comment/Comment';
import StemtellCard from '../STEMtellCard/STEMtellCard';
import BackBtn from '../BackBtn/BackBtn';

function StemtellDetails() {

    return(
        <>
        <BackBtn />
      
            <StemtellCard />
       
        
        <Comment />


        </>

    )
}

export default StemtellDetails;