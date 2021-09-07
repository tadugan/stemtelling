import React, { useEffect, useState } from "react";
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Card, Paper, Modal, Backdrop, Fade } from '@material-ui/core';
import EditSTEMtell from "../EditSTEMtell/EditSTEMtell";

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
   const classes = useStyles();
   const modalClasses = modalStyles();
   const user = useSelector((store) => store.user);
   const dispatch = useDispatch();
   const [stemtellData, setStemtellData] = useState('');
   const stemtells = useSelector((store) => store.stemtells);
   const [open, setOpen] = React.useState(false);
   const handleClose = () => {setOpen(false)};

   const handleOpen = (stemtell) => {
      setOpen(true); 
      setStemtellData(stemtell);
   };
   
   useEffect(() => {
      dispatch({ type: "FETCH_USER_STEMTELLS", payload: user.id });
    }, []);


   return (
      <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={3}> 
          <Paper className={classes.paper}>
            <img src={user.profile_picture_url}></img>
            <h2>{user.name}</h2> 
            <LogOutButton className="btn" />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Paper className={classes.paper}>Your STEMtells</Paper>
          <Grid container>
            {stemtells.map((stemtell) => {
               return (
                  <Grid item key={stemtell.id}>
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
                        {/* <button value={stemtell} className="btn" onClick={(event) => {handleOpen(event.target.value)}}>
                           Edit
                        </button> */}
                        <button className="btn" onClick={() => {handleOpen(stemtell)}}>
                           Edit
                        </button>
                     </Card>
                  </Grid>
               )
            })}
         </Grid>
        </Grid>
        <Modal
         aria-labelledby="email confirmation modal"
         aria-describedby="email confirmation modal"
         className={modalClasses.modal}
         open={open}
         onClose={handleClose}
         closeAfterTransition
         BackdropComponent={Backdrop}
         BackdropProps={{
            timeout: 500,
         }}
        >
         <Fade in={open}>
            <EditSTEMtell stemtell={stemtellData} key={stemtellData.id}/>
         </Fade>
      </Modal>
      </Grid>
    </div>
  );
}


export default UserPage;