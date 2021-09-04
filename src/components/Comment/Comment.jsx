import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Comment.css';
import {
  Container,
  Card,
  TextField,
  Box,
  Avatar,
  Button,
} from '@material-ui/core';

function Comment() {
    const [leaveComment, setComment] = useState('');
    const [stemtellId, setStemtellID] = useState('');
    const [feedback, setFeedback]= useState(false);
    const dispatch= useDispatch();
    const comments = useSelector((store) => store.commentList);


    useEffect(() =>{
    dispatch({ type: 'GET_COMMENTLIST'});
    }, []);

    const handleSubmit = (event) =>{
         event.preventDefault();
        dispatch({type:'ADD_COMMENT', payload: {
          stemtell_id: stemtellId,
          comment: leaveComment ,
          teacher_feedback: feedback
          }
        });
        setComment('');
        setStemtellID();
        setFeedback(false);
    }
 
    const handleComment = (event) => {
        event.preventDefault();
        setComment(event.target.value);
    }
    


    return(
        <Container className='GeneralCommentContainer'>
            <h4 className='CommentCardHeader'> 
                Comments 
            </h4> 
            <Box id='GeneralCommentInput'>
             <TextField
             name= 'addComment' 
            fullWidth= 'true'
            placeholder='Comment...'
            multiline
            rows={3}
            value={leaveComment}
            onChange={handleComment}/>
            <section className='BtnsforCommenting'>
            <Button className='CancelCommentBtn' >Cancel</Button>
            <Button className='CommentBtn' onClick= {handleSubmit}> Comment </Button>
            
            </section>
            
            </Box>
            
      {/* mapping thru comments to show all individual comments */}
      {comments.map((comment) => {
        return (
          <Card
            className="GeneralCommentCard"
            variant="outlined"
            key={comment.id}
          >
            <section className="GeneralCommentSection">
               
              <article className="CommentProfilePicAndName">
                <Avatar
                  id="GeneralCommentAvatar"
                  src={comment.profile_picture_url}
                ></Avatar>

                <span className="CommentUserName">
                  <h5 id="commenterName"> {comment.username} </h5>
                </span>
                <span className="CommentDate">
                  <p> {comment.date_published} </p>
                </span>
              </article>

              <p className="CommentText">{comment.comment}</p>
            </section>
          </Card>
        );
      })}
    </Container>
  );
}

export default Comment;
