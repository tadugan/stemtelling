import { Button, Avatar, Card, Grid } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './GenericSTEMtellCard.css';
import styled from 'styled-components';
import { makeStyles } from "@material-ui/core";

const StyledBlueButton = styled(Button)`
   display: inline-block;
   padding: 10px 20px;
   border-radius: 4px;
   background-color: #79D0F1;
   color: #f8f8f8;   
   font-size: 1.1rem;
   outline: 0;
   cursor: pointer;
   &:hover {
      background-color: rgba(121, 208, 241, 0.6);
      text-decoration: none;
   }
`;


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
      fontSize: "20px",
      alignItems: "center",
      justifyContent: "center",
      textAlign:"center"
   },
 }));

function GenericSTEMtellCard({ stemtell, reviewMode }) {
   const cardStyles = useCardStyles();
    const history = useHistory();

    const unixTimestamp = (timestamp) => {
        const dateObject = new Date((timestamp * 1000));
        return (
           dateObject.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})
        );
    };

    const handleReviewClick = () => {
        history.push(`/comment/feedback/${stemtell.stem_id}`);
    }

    const conditionalReviewButton = () => {
        if (reviewMode) {
            return (
                <StyledBlueButton 
                    variant="contained"
                    color="primary"
                    onClick={handleReviewClick}
                >
                    Review
                </StyledBlueButton>
            );
        }
        else {
            return;
        }
    }

    return (
         <Card className={cardStyles.root}>
               <h6 className={cardStyles.stemdate}>{unixTimestamp (stemtell.unix)}</h6>
               <Avatar className={cardStyles.avatar} src={stemtell.profile_picture_url} />
               <section className={cardStyles.username}>
                  {stemtell.username}
               </section>
               <div className={cardStyles.username} id="userClass">
                  {stemtell.class_name}
               </div>
               <h5 className={cardStyles.stemtitle}>
               {" "}{stemtell.title}
               </h5>
               <img id="stemtellImage" src={stemtell.media_url} />
               <section id="cardReactions">{stemtell.reaction_name}</section>
               {conditionalReviewButton()}
         </Card>
    );
}

export default GenericSTEMtellCard;