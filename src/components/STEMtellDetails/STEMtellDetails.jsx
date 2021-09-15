import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Card, Avatar, Grid, Chip, makeStyles } from "@material-ui/core";
import Comment from "../Comment/Comment";
import BackBtn from "../BackBtn/BackBtn";
import AddReaction from "../AddReactions/AddReactions";
import './STEMtellDetails.css';

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


function STEMtellDetails() {
   const cardStyles = useCardStyles();
   const params = useParams();
   const history = useHistory();
   const stemtellId = params.id;
   const dispatch = useDispatch();
   const stemtell = useSelector((store) => store.stemtellDetails);
   const selectedTags = useSelector(store => store.selectedTags);
   const getExistingTags = (stemtellId) => {dispatch({ type: 'GET_EXISTING_TAGS', payload: stemtellId })};
  
   useEffect(() => {
      dispatch({ type: "FETCH_STEMTELL_DETAILS", payload: stemtellId });
      getExistingTags(stemtellId);
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
                  <Card className={cardStyles.root}>
                     <h6 className={cardStyles.stemdate}>{unixTimestamp(stemtell.unix)}</h6>
                     <Avatar className={cardStyles.avatar} src={stemtell.profile_picture_url}/>
                     <section className={cardStyles.username} onClick={() => onUserProfile(stemtell.author_id)}>
                        {stemtell.name}
                     </section>
                     <div className={cardStyles.username} id="userClass">
                        {stemtell.class_name}
                     </div>
                     <br /><br />
                     <img id="StemDetailsImage" src={stemtell.media_url} />
                     <h3 className={cardStyles.stemtitle}>{stemtell.title}</h3>
                     <section id="cardReactions">{stemtell.reaction_name}</section>
                     <section id="StemDetailsDescription">{stemtell.body_text}</section>
                     <div>
                        {selectedTags.map((tag) => {
                           return (
                              <Chip label={tag.name}/>
                           );
                        })}
                     </div>
                     <AddReaction stemtellId={stemtell.id}/>
                  </Card>
               </Grid>
            </center>
         <Comment />
      </>
   );
};


export default STEMtellDetails;