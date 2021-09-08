import { Card, Container } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ClassCard.css";
import { useHistory } from 'react-router-dom';


function ClassCard() {
   const dispatch = useDispatch();
   const history= useHistory();
   const classes = useSelector((store) => store.classes);
   const toClassDetail = (class_id) => {history.push(`classlist/details/${class_id}`)};
   
   useEffect(() => {
      dispatch({ type: 'FETCH_CLASSES'});
   }, []);

   return (
      <Container>
         {classes.map((classList) => {
            return(
               <Card className="classCard">
                  <h2 id='classCardTitle' onClick= {() => toClassDetail(classList.class_id)}>{classList.name}</h2>
                  <section className="classDetail"> status: Active {classList.archived}</section>
                  <section className="classDetail">code: {classList.code}</section>
               </Card>
            )
         })}
      </Container>
   );
};


export default ClassCard;