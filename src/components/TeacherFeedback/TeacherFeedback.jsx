import { Card, TextField, Avatar, Button, Box, Container, Grid, FormControl, InputLabel, Select, MenuItem, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BackBtn from "../BackBtn/BackBtn";
import "./TeacherFeedback.css";

const useStyles = makeStyles((theme) => ({
   formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
   },
   selectEmpty: {
      marginTop: theme.spacing(2),
   },
}));

const useCardStyles = makeStyles(() => ({
   root: {
      alignItems: "center",
      border: "2px solid #1E1F20",
      borderRadius: "15px",
      justifyContent: "center",
      flexGrow: "1px",
      width: "50%",
      minWidth: "348px",
      height: "100%",
      textAlign: "center",
      color: "grey",
      padding: "12px",
   },
   avatar: {
      textAlign: "left",
      borderStyle: "solid",
      float: "left",
      display: "flex",
      flexDirection: "row",
      height: "50px",
      width: "50px",
   },
   username: {
      paddingTop: "5px",
      fontSize: '18px',
      fontWeight: 'bold',
      textAlign: "left",
      marginLeft: "60px",
      display: "flex",
      flexDirection: "row",
      color: "#727272",
   },
   stemdate: {
      float: "right",
      fontSize: '12px',
      paddingTop: "7px",
      paddingRight: "5px",
   },
   stemtitle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign:"center"
   },
}));
  

function TeacherFeedback() {
   const dispatch= useDispatch();
   const feedback = useSelector((store) => store.feedback);
   const cardStyles = useCardStyles();
   const params = useParams();
   const stemtellId = params.id;
   const [leaveFeedback, setFeedback]= useState('');
   const stemtell = useSelector((store) => store.stemtellDetails);
   const classes = useStyles();
   const [status, setStatus] = useState('');
   const handleChange = (event) => {
      setStatus(event.target.value);
   };
   useEffect(() => {
      dispatch({ type: "FETCH_STEMTELL_DETAILS", payload: stemtellId });
      dispatch({ type: 'GET_FEEDBACK', payload: stemtellId});
   }, []);

   const handleSubmit = () => {
      dispatch({
         type: 'ADD_COMMENT',
         payload: {
            stemtell_id: stemtellId,
            comment: leaveFeedback,
            teacher_feedback: true
         }
      });
      dispatch({
         type: 'UPDATE_STATUS',
         payload: {
            status: status,
            id: stemtellId
         }
      });
      dispatch({ type: 'GET_FEEDBACK', payload: stemtellId});
      setFeedback('');
   };

   const handleFeedback = (event) => {
      event.preventDefault();
      setFeedback(event.target.value);
   };

   const unixTimestamp = (timestamp) => {
      const dateObject = new Date((timestamp * 1000));
      return (
         dateObject.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})
      );
   };

   return (
      <>
         <BackBtn />
         <center>
            <Grid item key={stemtell.id}>
               <Card className={cardStyles.root}>
                  <h6 className={cardStyles.stemdate}>{unixTimestamp(stemtell.unix)}</h6>
                  <Avatar className={cardStyles.avatar} src={stemtell.profile_picture_url} />
                  <section className={cardStyles.username} onClick={() => onUserProfile(stemtell.user_id)}>
                     {stemtell.name}
                  </section>
                  <div className={cardStyles.username} id="userClass">
                     {stemtell.class_name}
                  </div>
                  <img id="StemDetailsImage" src={stemtell.media_url} />
                  <h3 className={cardStyles.stemtitle}>{stemtell.title}</h3>
                  <section id="cardReactions">{stemtell.reaction_name}</section>
                  <section id="StemDetailsDescription">{stemtell.body_text}</section>
               </Card>
            </Grid>
         </center>
         <Container className="TeacherFeedbackContainer">
            <Box id="TeacherFeedbackInput">
               <label id="feedbackLabel">
                  <div className="feedbackLabel">Teacher Feedback</div>
                  <div className="feedbackLabel">
                     <form>
                        <TextField id="feedbackText" placeholder="Feedback..." multiline rows={3} value={leaveFeedback} onChange={handleFeedback} />
                     </form>
                  </div>
               </label>
            </Box>
            <FormControl className={classes.formControl}>
               <InputLabel id="Approved">Status</InputLabel>
               <Select labelId="stemtell-status" id="stemtell-status" value={status} onChange={handleChange}>
                  <MenuItem value={true}>Approved</MenuItem>
                  <MenuItem value={false}>Needs Review</MenuItem>
               </Select>
            </FormControl>
            <div id="feedbackBtns">
               <Button>Cancel</Button>
               <Button onClick={handleSubmit}>Submit</Button>
            </div>
            {feedback.map((fb) => {
               return(
                  <Card key= {fb.id} className="FeedbackCard">
                     <h6 id="teacherFeedbackHeading">
                        <svg id="feedbackNotification" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7 13.5H4.6V7.65C4.6 5.4 6.4 3.6 8.65 3.6C10.9 3.6 12.7 5.4 12.7 7.65V13.5ZM14.5 12.6V7.65C14.5 4.887 12.574 2.574 10 1.962V1.35C10 0.604416 9.39558 0 8.65 0C7.90442 0 7.3 0.604416 7.3 1.35V1.962C4.717 2.574 2.8 4.887 2.8 7.65V12.6L1 14.4V15.3H16.3V14.4L14.5 12.6ZM8.65 18C9.64411 18 10.45 17.1941 10.45 16.2H6.85C6.85 17.1941 7.65589 18 8.65 18Z" fill="#1E1F20" />
                           <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="1" y="0" width="16" height="18">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7 13.5H4.6V7.65C4.6 5.4 6.4 3.6 8.65 3.6C10.9 3.6 12.7 5.4 12.7 7.65V13.5ZM14.5 12.6V7.65C14.5 4.887 12.574 2.574 10 1.962V1.35C10 0.604416 9.39558 0 8.65 0C7.90442 0 7.3 0.604416 7.3 1.35V1.962C4.717 2.574 2.8 4.887 2.8 7.65V12.6L1 14.4V15.3H16.3V14.4L14.5 12.6ZM8.65 18C9.64411 18 10.45 17.1941 10.45 16.2H6.85C6.85 17.1941 7.65589 18 8.65 18Z" fill="white" />
                           </mask>
                           <g mask="url(#mask0)" />
                        </svg>
                        Teacher 
                     </h6>
                     <section className="FeedbackSection">
                        <div className="FeedbackProfilePicAndName">
                           <Avatar id="FeedbackAvatar" src={fb.profile_picture_url} />
                           <span className="FeedbackUserName">
                              <h5> {fb.username} </h5>
                           </span>
                           <span className="FeedbackDate">
                              {unixTimestamp(fb.unix)}
                           </span>
                        </div>
                        <p className="FeedbackText">{fb.comment}</p>
                     </section>
                  </Card>
               );
            })}
         </Container>
      </>
   );
};


export default TeacherFeedback;