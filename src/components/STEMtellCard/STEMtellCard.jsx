import { Avatar, Card, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./STEMtellCard.css";

const useCardStyles = makeStyles(() => ({
   root: {
  
      alignItems: "center",
      border: "2px solid #1E1F20",
      borderRadius: "15px",
      justifyContent: "center",
      flexGrow: "1px",
      width: "300px",
      height: "410px",
      textAlign: "center",
      color: "grey",
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
      width: "200px",
      display: "flex",
      alignItems: "center",
      paddingLeft: "16.5%",
      justifyContent: "center",
   },
 }));

function StemtellCard() {
   const cardStyles = useCardStyles();
   const history = useHistory();
   const dispatch = useDispatch();
   const stemtells = useSelector((store) => store.stemtells);

   useEffect(() => {
      dispatch({ type: "FETCH_USER_FEED"});
   }, []);

   const onUserProfile = (author_id) => {
      history.push(`/profile/${author_id}`);
   };

   const toStemtellDetail = (stem_id) => {
      history.push(`stemtell/${stem_id}`);
   };

   const unixTimestamp = (timestamp) => {
      const dateObject = new Date((timestamp * 1000));
      return (
         dateObject.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})
      );
   };

   return (
      <>
         {stemtells.map((stemtell) => {
            return (
               <Grid item key={stemtell.stem_id}>
                  <Card className={cardStyles.root} >
                        <h6 className={cardStyles.stemdate}>{unixTimestamp(stemtell.unix)}</h6>
                        <Avatar className={cardStyles.avatar} src={stemtell.profile_picture_url} onClick={() => onUserProfile(stemtell.author_id)}/>
                        <section className={cardStyles.username} onClick={() => onUserProfile(stemtell.author_id)}>
                           {stemtell.username}
                        </section>
                        <div className={cardStyles.username} id="userClass">
                           {stemtell.class_name}
                        </div>
                     <h3 className={cardStyles.stemtitle} onClick={() => toStemtellDetail(stemtell.stem_id)}>
                        {" "}{stemtell.title}
                     </h3>
                     <img id="stemtellImage" src={stemtell.media_url} onClick={() => toStemtellDetail(stemtell.stem_id)} />
                     <section id="cardReactions">
                        {stemtell.reaction_name}
                     </section>
                  </Card>
               </Grid>
            );
         })}
      </>
   );
};


export default StemtellCard;