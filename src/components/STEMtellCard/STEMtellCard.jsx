import React, { useEffect } from "react";
import { Avatar, Card, Grid } from "@material-ui/core";
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
    <Grid>
      {stemtells.map((stemtell) => {
        return (
      <Grid item >
        <Card className="StemCard">
          <Avatar className="Avatar" />
          <section className="UserName">{stemtell.username}</section>
          <div className="UserName" id="userClass">
            {stemtell.class_name}
          </div>
          <h3> {stemtell.title}</h3>
          <img src={stemtell.media_url} />
          <section id="cardReactions">{stemtell.reaction_name}</section>

          <section id="stemDescription">{stemtell.body_text}</section>
        </Card>
      </Grid>
        );
        })};
    </Grid>
    
)
};

export default StemtellCard;
