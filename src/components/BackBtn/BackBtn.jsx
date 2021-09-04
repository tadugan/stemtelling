import React from 'react';
import { useHistory } from 'react-router-dom';
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