import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';

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


function ProfilePage() {
   const cardStyles = useCardStyles();
   const classes = useStyles();
   const history = useHistory();
   const profile = useSelector((store) => store.profile);
   const dispatch = useDispatch();
   const stemtells = useSelector((store) => store.stemtells);
   const getSearchQueryByFullURL = (url) => {return url.split('/')};
   const toStemtellDetail = (stem_id) => {history.push(`/stemtell/${stem_id}`)};

   useEffect(() => {
      dispatch({ type: "FETCH_USER_STEMTELLS", payload: (getSearchQueryByFullURL(window.location.href)[getSearchQueryByFullURL(window.location.href).length-1])});
      dispatch({ type: 'FETCH_PROFILE', payload: (getSearchQueryByFullURL(window.location.href)[getSearchQueryByFullURL(window.location.href).length-1])});
    }, []);

   return (
      <div className={classes.root}>
         <Grid container>
            <Grid item xs={12} sm={3}> 
               <Paper className={classes.paper}>
                  <img src={profile.profile_picture_url}></img>
                  <h2>{profile.name}</h2> 
               </Paper>
            </Grid>
            <Grid item xs={12} sm={9}>
               <Paper className={classes.paper}>{profile.name}'s STEMtells</Paper>
               <br />
               <Container maxWidth="xl">
               <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={3}>
                  {stemtells.map((stemtell) => {
                     return (
                        <Grid item key={stemtell.id}>
                           <Card className={cardStyles.root} onClick={() => toStemtellDetail(stemtell.id)} >
                                 <section className={cardStyles.username}>{stemtell.username}</section>
                                 <div className={cardStyles.username} id="userClass">
                                    {stemtell.class_name}
                                 </div>
                                 <h3>{stemtell.title}</h3>
                                 <img src={stemtell.media_url} />
                                 <section id="cardReactions">{stemtell.reaction_name}</section>
                                 <section id="stemDescription">{stemtell.body_text}</section>
                           </Card>
                        </Grid>
                     )
                  })}
               </Grid>
               </Container>
            </Grid>
         </Grid>
      </div>
   );
};


export default ProfilePage;