import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';

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
   const classes = useStyles();
   const profile = useSelector((store) => store.profile);
   const dispatch = useDispatch();
   const stemtells = useSelector((store) => store.stemtells);
   const getSearchQueryByFullURL = (url) => {return url.split('/')};

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
               <Grid container>
                  {stemtells.map((stemtell) => {
                     return (
                        <Grid item>
                           <Card className="StemCard">
                              <Avatar className="Avatar" />
                                 <section className="UserName">{stemtell.username}</section>
                                 <div className="UserName" id="userClass">
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
            </Grid>
         </Grid>
      </div>
   );
};


export default ProfilePage;