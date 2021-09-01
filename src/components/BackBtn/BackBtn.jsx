import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Container, Card, TextField, Box, Avatar, Button} from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';

function BackBtn(){

    const history= useHistory();

    return(
    <ArrowBackRoundedIcon
    onClick={()=> history.goBack()}
    >
    
    </ArrowBackRoundedIcon>
    
    )
   
}
export default BackBtn;