import React from "react";
import { Avatar, Card, Grid } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core";
import "./STEMTellCard.css";

function StemtellCard() {


  return (
    <Grid>
      <Grid item>
        <Card className="StemCard">
          <Avatar className="Avatar" />
          <section className="UserName">User's Name</section>
          <div className="UserName" id="userClass">
            User Class
          </div>
          <h3> STEMTell Title</h3>
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/High_School_Earth_Science_Cover.jpg" />
          <section id="cardReactions">emojis go here</section>

          <section id="stemDescription">This is where descriptions go</section>
        </Card>
      </Grid>
    </Grid>
  );
}

export default StemtellCard;
