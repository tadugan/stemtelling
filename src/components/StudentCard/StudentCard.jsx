import React, { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Container, Card, Box, Avatar, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom'
import './StudentCard.css';


function StudentCard() {
   function getSearchQueryByFullURL(url) {return url.split('/').pop()};
   const classCode = getSearchQueryByFullURL(window.location.href);
   const dispatch = useDispatch();
   const students =  useSelector((store) => store.studentList);
   const history = useHistory();
    
   useEffect(() => {
      dispatch({type: 'GET_STUDENTLIST', payload: classCode});

   }, []);

   const onUserProfile = (author_id) => {
      history.push(`/profile/${author_id}`);
   };
   
   const handleDelete = (deleteStudent) => {
      if (confirm(`Are you sure you want to remove ${deleteStudent.username}?`) === false) {
         return false;
     };
      dispatch({
         type: "DELETE_STUDENT",
         payload: {
            deleteStudent: deleteStudent.id,
            classCode
         }
      });
      dispatch({type: 'GET_STUDENTLIST', payload: classCode});
   };
    
   return(
      <Container className='StudentCardContainer'>
         <h2 id='StudentListHeader'> Students </h2> 
         {students.map((student) => {
            return (
               <Card className='StudentDetailsCard' variant='outlined' key={student.id}>
                  <Box className='StudentProfilePicAndName'>
                     <Avatar id='StudentCardAvatar' src={student.profile_picture_url} onClick={() => onUserProfile(student.id)}/>
                        <span    onClick={() => onUserProfile(student.id)}> 
                           <h4 id='StudentDetailsName' > {student.username}</h4>
                        </span>
                  </Box>
                  <section id='StudentDeleteBtnContainer'>
                     <Button  className='StudentCardDeleteBtn' variant= 'contained' color='secondary' onClick= {() => handleDelete(student)}> 
                        Remove
                     </Button>
                  </section>  
               </Card>
            );
         })}
      </Container>
   );
};


export default StudentCard;