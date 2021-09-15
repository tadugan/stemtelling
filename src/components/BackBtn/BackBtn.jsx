import React from 'react';
import { useHistory } from 'react-router-dom';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { Button } from '@material-ui/core';
import './BackBtn.css';


function BackBtn() {
   const history= useHistory();
   return (
      <Button size='large' onClick={()=> history.goBack()} className="back-btn-body" startIcon={<ArrowBackRoundedIcon />}>
         back
      </Button>
   );
};


export default BackBtn;