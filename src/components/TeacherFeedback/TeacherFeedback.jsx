import {
  Card,
  TextField,
  Avatar,
  Button,
  Box,
  Container,
} from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./TeacherFeedback.css";

function TeacherFeedback() {
    const dispatch= useDispatch();
    const feedback = useSelector((store) => store.feedback);
    console.log(feedback, "THIS IS TEACHER FEEDBACK****");

useEffect(() => {
    dispatch({ type: 'GET_FEEDBACK'});
}, []);
  return (
    
      <Container className="TeacherFeedbackContainer">
        <Box id="TeacherFeedbackInput">
          <label id="feedbackLabel">
            <div className="feedbackLabel">Teacher Feedback</div>
            <div className="feedbackLabel">
              <TextField
                id="feedbackText"
                placeholder="Feedback..."
                multiline
                rows={3}
              >
            </TextField>
               <div id="feedbackBtns">
                  <Button>Cancel</Button>
                  <Button>Submit</Button>
                  </div>
              
            </div>
          </label>
        </Box>
     
    {feedback.map((fb) => {
        return(
      <Card 
      key= {fb.id}
      className="FeedbackCard">
        <h6 id="teacherFeedbackHeading">
          <svg
          id="feedbackNotification"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.7 13.5H4.6V7.65C4.6 5.4 6.4 3.6 8.65 3.6C10.9 3.6 12.7 5.4 12.7 7.65V13.5ZM14.5 12.6V7.65C14.5 4.887 12.574 2.574 10 1.962V1.35C10 0.604416 9.39558 0 8.65 0C7.90442 0 7.3 0.604416 7.3 1.35V1.962C4.717 2.574 2.8 4.887 2.8 7.65V12.6L1 14.4V15.3H16.3V14.4L14.5 12.6ZM8.65 18C9.64411 18 10.45 17.1941 10.45 16.2H6.85C6.85 17.1941 7.65589 18 8.65 18Z"
              fill="#1E1F20"
            />
            <mask
              id="mask0"
              mask-type="alpha"
              maskUnits="userSpaceOnUse"
              x="1"
              y="0"
              width="16"
              height="18"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.7 13.5H4.6V7.65C4.6 5.4 6.4 3.6 8.65 3.6C10.9 3.6 12.7 5.4 12.7 7.65V13.5ZM14.5 12.6V7.65C14.5 4.887 12.574 2.574 10 1.962V1.35C10 0.604416 9.39558 0 8.65 0C7.90442 0 7.3 0.604416 7.3 1.35V1.962C4.717 2.574 2.8 4.887 2.8 7.65V12.6L1 14.4V15.3H16.3V14.4L14.5 12.6ZM8.65 18C9.64411 18 10.45 17.1941 10.45 16.2H6.85C6.85 17.1941 7.65589 18 8.65 18Z"
                fill="white"
              />
            </mask>
            <g mask="url(#mask0)"></g>
          </svg>
          Teacher Feedback
        </h6>

        <section className="FeedbackSection">
          <div className="FeedbackProfilePicAndName">
            <Avatar id="FeedbackAvatar" src={fb.profile_picture_url}></Avatar>
            <span className="FeedbackUserName">
              <h5> {fb.username} </h5>
            </span>
            <span className="FeedbackDate">
              {fb.date_published}
            </span>
          </div>

          <p className="FeedbackText">{fb.comment}</p>
        </section>
      </Card>
    )})}
      </Container>
   
  );
}

export default TeacherFeedback;
