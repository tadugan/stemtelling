import {
  Card,
  Container,
  Menu,
  MenuItem,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ClassCard.css";
import { useHistory } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";

function ClassCard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useSelector((store) => store.classes);
  const toClassDetail = (class_id) => {
    history.push(`classlist/details/${class_id}`);
  };

  //Start of handling menu and dialog views
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditOpen = (classList) => {
    console.log("this is the card id:", classList.id);
    setOpen(true);
    setClassTitle(classList.name);
    setEditClassID(classList.id);
  };

  const handleEditClose = () => {
    setOpen(false);
    setClassTitle("");
    setEditClassID("");
  };
  //End

  const [classTitle, setClassTitle] = useState("");
  const [editClassID, setEditClassID] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  // const handleEdit= (classTitle) => {
  //    setClassTitle(classTitle.name);
  //    setEditClassID(editClassID.id);
  // }

  const handleSave = () => {
    event.preventDefault();
    dispatch({
      type: "EDIT_CLASS",
      payload: {
        name: classTitle,
        id: editClassID,
      },
    });
    setClassTitle("");
    setEditClassID("");
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
              <MoreVertIcon id="editClassCard" onClick={handleClick} />
              <Menu
                id="editClass-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem onClick={() => handleEditOpen(classList)}>
                  Edit
                </MenuItem>
                <Dialog
                  open={open}
                  onClose={handleEditClose}
                  aria-labelledby="form-dialog-edit-class">
                  <DialogTitle id="form-dialog-title">
                    Edit Class Information
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Update Class Information below.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      className="class-edit-form"
                      label="Class Title"
                      type="text"
                      fullWidth
                      onChange={(event) => setClassTitle(event.target.value)}
                    />
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
                <MenuItem onClick={handleClose}> Archive</MenuItem>
              </Menu>
              <h2 id="classCardTitle" onClick={() => toClassDetail(classList.class_id)}>
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
              <MoreVertIcon id="editClassCard" />
              <Menu
                id="editClass-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                <MenuItem onClick={handleClose}> Restore </MenuItem>
              </Menu>
              <h2 id="classCardTitle" onClick={() => toClassDetail(classList.class_id)}>
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
    </Container>
  );
}

export default ClassCard;
