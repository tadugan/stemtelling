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

  useEffect(() => {
    dispatch({ type: "FETCH_STEMTELL_DETAILS", payload: stemtell.id });
  }, []);

  const stemtell = useSelector((store) => store.stemtells);
  const onUserProfile = (author_id) => {
    //  TODO: If this is working, remove console.log()
     console.log("Clicked profile with author_id:", author_id);
     history.push(`/profile/${author_id}`);
   }
  return (
    <>
      <BackBtn />

      {stemtell.map((stemdetail) => {
        <Grid item key={stemdetail.id}>
          <Card className="StemCard">
            <h6 id="stemDate">{stemdetail.date_published}</h6>
            <Avatar className="Avatar" src={stemdetail.profile_picture_url} />
            <section
              className="UserName"
              onClick={() => onUserProfile(stemdetail.user_id)}
            >
              {stemdetail.username}
            </section>
            <div className="UserName" id="userClass">
              {stemdetail.class_name}
            </div>

            <h3
              id="stemTitle"
            >
              {stemdetail.title}
            </h3>

            <img src={stemdetail.media_url} />
            <section id="cardReactions">{stemdetail.reaction_name}</section>

            <section id="stemDescription">{stemdetail.body_text}</section>
          </Card>
        </Grid>;
      })}

      <Comment />
    </>
  );
}

export default StemtellDetails;
