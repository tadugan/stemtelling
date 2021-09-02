import React, { useEffect } from "react";
import { Avatar, Card, Container, Grid } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core";
import "./STEMtellCard.css";

import { useDispatch, useSelector } from "react-redux";


function StemtellCard() {

  useEffect(() => {
    dispatch({ type: "FETCH_STEMTELLS"});
  }, []);

  const dispatch = useDispatch();
  const stemtells = useSelector((store) => store.stemtells);

  console.log(stemtells, "THIS IS THE STEMTELL STORE*****");

  return (
    <Container>
    <Grid>
      {stemtells.map((stemtell) => {
        return (
      <Grid item key={stemtell.id}>
        <Card className="StemCard">
        <h6 id="stemDate">{stemtell.date_published}</h6>
          <Avatar className="Avatar"
          src={stemtell.profile_picture_url} />
          <section className="UserName">{stemtell.username}</section>
          <div className="UserName" id="userClass">
            {stemtell.class_name}
          </div>
        
          <h3 id="stemTitle"> {stemtell.title}</h3>
          
          <img src={stemtell.media_url} />
          <section id="cardReactions">{stemtell.reaction_name}</section>

          <section id="stemDescription">{stemtell.body_text}</section>
        </Card>
      </Grid>
        )
        })}
    </Grid>
    </Container>
    
)
};

export default StemtellCard;
