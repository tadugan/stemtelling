import {
   Card,
   Container,
   TextField,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
   Button,
   Radio,
   RadioGroup, 
   FormControl,
   FormLabel,
   FormControlLabel,
 } from "@material-ui/core";
 import { useEffect, useState } from "react";
 import { useDispatch, useSelector } from "react-redux";
 import "./ClassCard.css";
 import { useHistory } from "react-router-dom";
 import EditIcon from "@material-ui/icons/Edit";
 
 function ClassCard() {
   const dispatch = useDispatch();
   const history = useHistory();
   const classes = useSelector((store) => store.classes);
   const toClassDetail = (class_id) => {
     history.push(`classlist/details/${class_id}`);
   };
   const [classTitle, setClassTitle] = useState("");
   const [editClassID, setEditClassID] = useState("");
   const [classStatus, setClassStatus] = useState(false);
   const [anchorEl, setAnchorEl] = useState(null);
   const [open, setOpen] = useState(false);
 
   //Start of handling menu and dialog views
   const handleClick = (classList) => {
     setAnchorEl(event.currentTarget);
     setClassTitle(classList.name);
     setEditClassID(classList.class_id);
     setClassStatus(classList.archived)
     handleEditOpen();
   };
   const handleClose = () => {
     setAnchorEl(null);
     handleEditClose();
   };
 
   const handleEditOpen = () => {
     setOpen(true);
   };
 
   const handleEditClose = () => {
     setOpen(false);
     setClassTitle("");
     setEditClassID("");
   };
   //   End
   
   
   const handleSave = () => {
   
     dispatch({
       type: "EDIT_CLASS",
       payload: {
         name: classTitle,
         archived: classStatus,
         id: editClassID,
       },
     });
     setClassTitle("");
     setEditClassID("");
     setClassStatus(!classStatus);
     handleClose();
     dispatch({ type: "FETCH_CLASSES" });
   };
 
   useEffect(() => {
     dispatch({ type: "FETCH_CLASSES" });
   }, []);
 
   return (
     <Container className="classCardContainer">
       {classes.map((classList) => {
         if (classList.archived === false) {
           return (
             <Card className="classCard" key={classList.id}>
               <EditIcon
                 id="editIconClassCard"
                 onClick={() => handleClick(classList)}
               />
               <h2
                 id="classCardTitle"
                 onClick={() => toClassDetail(classList.class_id)}
               >
                 {classList.name}
               </h2>
               <section className="classDetail" id="classStatus">
                 Status: Active
               </section>
               <section className="classDetail" id="classCode">
                 Code: {classList.code}
               </section>
             </Card>
           );
         } else if (classList.archived === true) {
           return (
             <Card className="classCard" key={classList.id}>
                <EditIcon
                 id="editIconClassCard"
                 onClick={() => handleClick(classList)}
               />
               <h2
                 id="classCardTitle"
                 onClick={() => toClassDetail(classList.class_id)}
               >
                 {classList.name}
               </h2>
               <section className="classDetail" id="classStatus">
                 Status: Archived
               </section>
               <section className="classDetail" id="classCode">
                 Code: {classList.code}
               </section>
             </Card>
           );
         }
       })}
       <Dialog
         open={open}
         onClose={handleEditClose}
         aria-labelledby="form-dialog-edit-class"
       >
         <DialogTitle id="form-dialog-title">Edit Class Information</DialogTitle>
         <DialogContent>
           <DialogContentText>Update Class Information below.</DialogContentText>
           <TextField
             autoFocus
             margin="dense"
             className="class-edit-form"
             label="Class Title"
             type="text"
             fullWidth
             onChange={(event) => setClassTitle(event.target.value)}
           />
           <FormControl className='radio-class-status' component="fieldset">
             <FormLabel component="legend">Change Class Status:</FormLabel>
             <RadioGroup aria-label="status" name="status-of-class" value={classStatus} onChange={(event) => setClassStatus(event.target.value)}>
                <FormControlLabel value='false' control={<Radio />} label="Active" />
                <FormControlLabel value='true' control={<Radio />} label="Archive" />
             </RadioGroup>
             </FormControl>
         </DialogContent>
         <DialogActions>
           <Button id="edit-cancel-btn" onClick={handleEditClose}>
             Cancel
           </Button>
           <Button id="edit-save-btn" onClick={handleSave}>
             Save
           </Button>
         </DialogActions>
       </Dialog>
     </Container>
   );
 }
 
 export default ClassCard;
 
