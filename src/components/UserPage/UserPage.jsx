import React, { useEffect, useState } from "react";
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Grid, Card, Paper, Modal, Backdrop, Fade, Button, Container, Chip, makeStyles } from '@material-ui/core';
import EditSTEMtell from "../EditSTEMtell/EditSTEMtell";
import styled from 'styled-components';
import './UserPage.css';

const useCardStyles = makeStyles(() => ({
   root: {
      paddingBottom: "15px",
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
   unapproved: {
      paddingBottom: "15px",
      alignItems: "center",
      border: "5px solid #FF4E4E",
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
      textAlign: "left",
      marginLeft: "60px",
      display: "flex",
      flexDirection: "row",
      color: "#727272",
   },
   stemdate: {
      float: "right",
      fontSize: '14px',
      paddingRight: "5px",
   },
   stemtitle: {
      display: "flex",
      alignItems: "center",
      marginLeft: "40%",
      justifyContent: "center",
   },
 }));

const StyledButton = styled(Button)`
   display: inline-block;
   padding: 10px 20px;
   border-color: #014041;
   border-width: 1px 1px 3px;
   border-radius: 4px;
   background-color: #979797;
   color: #f8f8f8;
   font-size: 1.1rem;
   outline: 0;
   cursor: pointer;
   &:hover {
      background-color: rgba(151, 151, 151, 0.6);
      text-decoration: none;
   }
`;

const StyledRedButton = styled(Button)`
   display: inline-block;
   padding: 10px 20px;
   border-color: #014041;
   border-width: 1px 1px 3px;
   border-radius: 4px;
   background-color: #DD2E44;
   color: #f8f8f8;   
   font-size: 1.1rem;
   outline: 0;
   cursor: pointer;
   &:hover {
      background-color: rgba(221, 46, 68, 0.6);
      text-decoration: none;
   }
`;

const useStyles = makeStyles((theme) => ({
   root: {
      flexGrow: 1,
   },
   paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
   },
}));

const modalStyles = makeStyles((theme) => ({
   modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
   },
 }));


function UserPage() {
   const cardStyles = useCardStyles();
   const classes = useStyles();
   const modalClasses = modalStyles();
   const user = useSelector((store) => store.user);
   const history = useHistory();
   const dispatch = useDispatch();
   const [stemtellData, setStemtellData] = useState('');
   const stemtells = useSelector((store) => store.stemtells);
   const [open, setOpen] = React.useState(false);
   const handleClose = () => {setOpen(false)};
   const toStemtellDetail = (stem_id) => {history.push(`stemtell/${stem_id}`)};
   const myClasses = useSelector((store) => store.classes);

   const handleOpen = (stemtell) => {
      setOpen(true); 
      setStemtellData(stemtell);
   };

   const handleDelete = (stemtell) => {
      if (confirm(`Are you sure you want to delete ${stemtell.title}?`) === false) {
         return false;
     };
      dispatch({
         type: "DELETE_STEMTELL",
         payload: stemtell
      });
      dispatch({ type: "FETCH_MY_STEMTELLS", payload: user.id });
      history.push('/close');
   };
   
   useEffect(() => {
      dispatch({ type: 'GET_USER_CLASSES', payload: user.id });
      dispatch({ type: 'FETCH_USER' })
      dispatch({ type: "FETCH_MY_STEMTELLS", payload: user.id });
    }, []);

   return (
      <div className={classes.root}>
         <Grid container direction="row" justifyContent="center" alignItems="flex-start">
            <Grid item xs={12} sm={3}> 
               <Paper className={classes.paper}>
                  <img src={user.profile_picture_url}></img>
                  <h2>{user.name}</h2>
                  {myClasses.map((userClass, index) => {
                  return (
                     <Chip label={userClass.name} key={index}/>
                  );
               })}
               <br /><br />
                  <LogOutButton />
                  <StyledButton onClick={() => {history.push(`/editprofile`)}}>
                     Edit Profile
                  </StyledButton>
               </Paper>
            </Grid>
            <Grid item xs={12} sm={9}>
               <Paper className={classes.paper}>Your STEMtells</Paper>
               <br />
               <Container maxWidth="xl">
                  <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={3}>
                     {stemtells.map((stemtell, index) => {
                        return (
                           <Grid item key={index}>
                              <Card className={(stemtell.approved === true) ? cardStyles.root : cardStyles.unapproved}>
                                 <section className={cardStyles.username}>{stemtell.username}</section>
                                 <div className={cardStyles.username} id="userClass">
                                    {stemtell.class_name}
                                 </div>
                                 <h3 onClick={() => toStemtellDetail(stemtell.id)} >{stemtell.title}</h3>
                                 <img id="stemtellImage" src={stemtell.media_url}  onClick={() => toStemtellDetail(stemtell.id)} />
                                 <section id="cardReactions">{stemtell.reaction_name}</section>
                                 <section id="userStemtellDescription">{stemtell.body_text}</section>
                                 <StyledRedButton onClick={() => {handleDelete(stemtell)}}>
                                    Delete
                                 </StyledRedButton> 
                                 
                                 <StyledButton onClick={() => {handleOpen(stemtell)}}>
                                    Edit
                                 </StyledButton>
                              </Card>
                           </Grid>
                        )
                     })}
                  </Grid>
               </Container>
            </Grid>
            <Modal aria-labelledby="email confirmation modal" aria-describedby="email confirmation modal" className={modalClasses.modal} open={open} onClose={handleClose} closeAfterTransition BackdropComponent={Backdrop} BackdropProps={{timeout: 500}}>
               <Fade in={open}>
                  <EditSTEMtell stemtell={stemtellData} key={stemtellData.id}/>
               </Fade>
            </Modal>
         </Grid>
      </div>
   );
};


export default UserPage;