import { Card, Container,
    Menu, MenuItem, 
    TextField, Dialog, 
    DialogActions, DialogContent, 
    DialogueContentText, DialogTitle } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ClassCard.css";
import { useHistory } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';



function ClassCard() {
   const [anchorEl, setAnchorEl] = useState(null);
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    
   const dispatch = useDispatch();
   const history= useHistory();
   const classes = useSelector((store) => store.classes);
   const toClassDetail = (class_id) => {history.push(`classlist/details/${class_id}`)};
   
   useEffect(() => {
      dispatch({ type: 'FETCH_CLASSES'});
   }, []);


   return (
      <Container className='classCardContainer'>
         {classes.map((classList) => {
            if (classList.archived === false){
            return(
               <Card className="classCard" key={classList.id}> 
                  <MoreVertIcon id='editClassCard' onClick={handleClick} />
                  <Menu
                  id="editClass-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose} >
                  <MenuItem onClick={handleClose}>Edit</MenuItem>
                  <MenuItem onClick={handleClose}>Archive</MenuItem>
                   </Menu>
                  <h2 id='classCardTitle' onClick= {() => toClassDetail(classList.class_id)}>{classList.name}</h2>
                  <section className="classDetail" id='classStatus'> Status: Active </section>
                  <section className="classDetail" id='classCode'> Code: {classList.code}</section>
               </Card>
            )
         } else if (classList.archived === true) {
            return(
               <Card className="classCard" key={classList.id}>
                  <MoreVertIcon id='editClassCard' />
                  <Menu
                  id="editClass-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose} >
                  <MenuItem onClick={handleClose}>Edit</MenuItem>
                  <MenuItem onClick={handleClose}>Archive</MenuItem>
                   </Menu>
                  <h2 id='classCardTitle' onClick= {() => toClassDetail(classList.class_id)}>{classList.name}</h2>
                  <section className="classDetail" id='classStatus'> Status: Archived </section>
                  <section className="classDetail" id='classCode'> Code: {classList.code}</section>
               </Card>
            )
         }
         })}
      </Container>
   );
};


export default ClassCard;