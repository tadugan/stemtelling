import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import STEMtellCard from '../STEMtellCard/STEMtellCard';

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


function UserPage() {
   const classes = useStyles();
   const user = useSelector((store) => store.user);
   return (
      <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={3}> 
        {/* user profile information */}
          <Paper className={classes.paper}>
            <h2>Welcome, {user.name}!</h2> 
            <p>Your ID is: {user.id}</p>
           <LogOutButton className="btn" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={9}>
           {/* user stemtells */}
          <Paper className={classes.paper}>User Profile Feed</Paper>
          <STEMtellCard />
        </Grid>
      </Grid>
    </div>
  );
}


export default UserPage;
