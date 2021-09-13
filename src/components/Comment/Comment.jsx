import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './Comment.css';
import {Container, Card, TextField, Box, Avatar, Button} from '@material-ui/core';


function Comment() {
   const params = useParams();
   const stemtellId = params.id;
   const [leaveComment, setComment] = useState('');
   const [feedback, setFeedback]= useState(false);
   const dispatch = useDispatch();
   const comments = useSelector((store) => store.stemtellComments);

   useEffect(() =>{
      dispatch({ type: 'GET_STEMTELL_COMMENTS', payload: stemtellId});
   }, []);

   const handleSubmit = () =>{
      dispatch({
         type:'ADD_COMMENT',
         payload: {
            stemtell_id: stemtellId,
            comment: leaveComment ,
            teacher_feedback: feedback
         }
      });
      setComment('');
      setFeedback(false);
   };
 
   const handleComment = (event) => {
      event.preventDefault();
      setComment(event.target.value);
   };

   const unixTimestamp = (timestamp) => {
      const dateObject = new Date((timestamp * 1000));
      return (
         dateObject.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})
      );
   };

   return(
      <Container className='GeneralCommentContainer'>
         <h4 className='CommentCardHeader'> 
            Comments 
         </h4> 
         <Box className='GeneralCommentInputBox'>
            <form>
               <TextField className='GeneralCommentInput' placeholder='Comment...' multiline rows={3} value={leaveComment}  onChange={handleComment}/>
            </form>
            <section className='BtnsforCommenting'>
               <Button className='CancelCommentBtn' >Cancel</Button>
               <Button className='CommentBtn' onClick={handleSubmit}> Comment </Button>
            </section>
         </Box>
         {comments.map((comment) => {
            return (
               <Card className="GeneralCommentCard" variant="outlined" key={comment.id}>
                  <section className="GeneralCommentSection">
                     <article className="CommentProfilePicAndName">
                        <Avatar id="GeneralCommentAvatar" src={comment.profile_picture_url} />
                        <span className="CommentUserName">
                           <h5 id="commenterName"> {comment.username} </h5>
                        </span>
                        <span className="CommentDate">
                           <p> {unixTimestamp(comment.unix)} </p>
                        </span>
                     </article>
                     <p className="CommentText">{comment.comment}</p>
                  </section>
               </Card>
            );
         })}
      </Container>
   );
};


export default Comment;