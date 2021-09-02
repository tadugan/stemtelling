import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Comment.css';
import {Container, Card, TextField, Box, Avatar, Button} from '@material-ui/core';



function Comment() {
    const [leaveComment, setComment] = useState('');
    const dispatch= useDispatch();
    const comments = useSelector((store) => store.commentList);

useEffect(() =>{
    dispatch({ type: 'GET_COMMENTLIST'});
}, []);
    const submitComment = () =>{
        
    }

    return(
        <Container className='GeneralCommentContainer'>
            <h4 className='CommentCardHeader'> 
                Comments 
            </h4> 
            <Box id='GeneralCommentInput'>
             <TextField 
            fullWidth= 'true'
            placeholder='Comment...'
            multiline
            rows={3}/>
            <section className='BtnsforCommenting'>
            <Button className='CancelCommentBtn'>Cancel</Button>
            <Button className='CommentBtn'> Comment </Button>
            
            </section>
            
            </Box>
             
            {/* mapping thru comments to show all individual comments */}
            {comments.map((comment) => {
                return (
                 <Card 
                 className='GeneralCommentCard'
                 variant= 'outlined'
                 key= {comment.id}>

                

                <section 
                className='GeneralCommentSection'>
           
                <div 
                className='CommentProfilePicAndName'>
                <Avatar
                id='GeneralCommentAvatar'
                src={comment.profile_picture_url}>

                </Avatar> 

                <span className='CommentUserName'>
                <h5 id='commenterName'> {comment.username} </h5>
                </span>
                <span className='CommentDate'> 
                <p> {comment.date_published} </p>
                </span>
            
                </div>
            

                <p 
                className='CommentText'> 
                {comment.comment} 
                </p>
                </section>

                </Card>   
            
            );
            
        })}
            
        </Container>
    )
}


export default Comment;