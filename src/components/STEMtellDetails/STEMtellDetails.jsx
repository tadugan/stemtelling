import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Avatar, Grid } from "@material-ui/core";
import Comment from "../Comment/Comment";
import BackBtn from "../BackBtn/BackBtn";
import './STEMtellDetails.css';
import Reactions from "../Reactions/Reactions";
import AddReaction from "../AddReactions/AddReactions";


function STEMtellDetails() {
   const params = useParams();
   const history = useHistory();
   const stemtellId = params.id;
   const dispatch = useDispatch();
   const stemtell = useSelector((store) => store.stemtellDetails);
  
   useEffect(() => {
      dispatch({ type: "FETCH_STEMTELL_DETAILS", payload: stemtellId });
   }, []);

   const onUserProfile = (author_id) => {
      history.push(`/profile/${author_id}`);
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
                  <Card className="StemDetailsCard">
                     <h6 id="stemDate">{unixTimestamp(stemtell.unix)}</h6>
                     <Avatar className="Avatar" src={stemtell.profile_picture_url}/>
                     <section className="UserName" onClick={() => onUserProfile(stemtell.author_id)}>
                        {stemtell.name}
                     </section>
                     <div className="UserName" id="userClass">
                        {stemtell.class_name}
                     </div>
                     <h3 id="stemTitle">{stemtell.title}</h3>
                     <img id="StemDetailsImage" src={stemtell.media_url} />
                     <section id="cardReactions">{stemtell.reaction_name}</section>
                     <section id="StemDetailsDescription">{stemtell.body_text}</section>
                     <AddReaction stemtellId={stemtell.id}/>
                  </Card>
               </Grid>
            </center>
         <Comment />
       
        
      </>
   );
};


export default STEMtellDetails;
