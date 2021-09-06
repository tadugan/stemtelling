import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Card,
  TextField,
  Box,
  Avatar,
  Button,
  Grid,
} from "@material-ui/core";
import Comment from "../Comment/Comment";
import BackBtn from "../BackBtn/BackBtn";
import { Details } from "@material-ui/icons";

function StemtellDetails() {
  const dispatch = useDispatch();
  const getSearchQueryByFullURL = (url) => {return url.split('/')};

  useEffect(() => {
    dispatch({ type: "FETCH_STEMTELL_DETAILS", payload: (getSearchQueryByFullURL(window.location.href)[getSearchQueryByFullURL(window.location.href).length-1])});
  }, []);

  const stemtells = useSelector((store) => store.stemtells);
console.log('STEMDETAILS STORE:', stemtells)
  const onUserProfile = (author_id) => {
    //  TODO: If this is working, remove console.log()
     console.log("Clicked profile with author_id:", author_id);
     history.push(`/profile/${author_id}`);
   }
  return (
    <>
      <BackBtn />

      {stemtells.map((stemtell) => {
        <Grid item key={stemtell.id}>
          <Card className="StemCard">
            <h6 id="stemDate">{stemtell.date_published}</h6>
            <Avatar className="Avatar" src={stemtell.profile_picture_url} />
            <section
              className="UserName"
              onClick={() => onUserProfile(stemtell.user_id)}
            >
              {stemtell.username}
            </section>
            <div className="UserName" id="userClass">
              {stemtell.class_name}
            </div>

            <h3
              id="stemTitle"
            >
              {stemtell.title}
            </h3>

            <img src={stemtell.media_url} />
            <section id="cardReactions">{stemtell.reaction_name}</section>

            <section id="stemDescription">{stemtell.body_text}</section>
          </Card>
        </Grid>;
      })}

      <Comment />
    </>
  );
}

export default StemtellDetails;
