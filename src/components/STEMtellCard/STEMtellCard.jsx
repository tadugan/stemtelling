import { Avatar, Card, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./STEMtellCard.css";

function StemtellCard() {
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
    <Grid item container aria-labelledby="homepage stemtell container" direction="row" justifyContent="center" alignItems="flex-start">
      {stemtells.map((stemtell) => {
        return (
          <Grid item key={stemtell.id} aria-labelledby="homepage stemtell item">
            <Card className="StemCard">
              <h6 id="stemDate">{unixTimestamp(stemtell.unix)}</h6>
              <Avatar className="Avatar" src={stemtell.profile_picture_url} />
              <section
                className="UserName"
                onClick={() => onUserProfile(stemtell.author_id)}
              >
                {stemtell.username}
              </section>
              <div className="UserName" id="userClass">
                {stemtell.class_name}
              </div>

              <h3
                id="stemTitle"
                onClick={() => toStemtellDetail(stemtell.stem_id)}
              >
                {" "}
                {stemtell.title}
              </h3>

              <img
                id="stemtellImage"
                src={stemtell.media_url}
                onClick={() => toStemtellDetail(stemtell.stem_id)}
              />
              <section id="cardReactions">{stemtell.reaction_name}</section>

              <section
                id="stemDescription"
                onClick={() => toStemtellDetail(stemtell.stem_id)}
              >
                {stemtell.body_text}
              </section>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}



export default StemtellCard;