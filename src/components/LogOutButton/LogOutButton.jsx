import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import styled from 'styled-components';

const StyledButton = styled(Button)`
   display: inline-block;
   padding: 10px 20px;
   border-color: #014041;
   border-width: 1px 1px 3px;
   border-radius: 4px;
   background-color: #979797;
   color: #f8f8f8;
   font-size: 1.1rem;
   outline: 0;
   cursor: pointer;
   &:hover {
      background-color: rgba(151, 151, 151, 0.6);
      text-decoration: none;
   }
`;


function LogOutButton(props) {
   const dispatch = useDispatch();
   return (
      <StyledButton className={props.className} onClick={() => dispatch({ type: 'LOGOUT' })}>
         Log Out
      </StyledButton>
   );
};


export default LogOutButton;