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
      <Container className='classCardContainer'>
         {classes.map((classList) => {
            if (classList.archived === false){
            return(
               <Card className="classCard" key={classList.id}>
                  <h2 id='classCardTitle' onClick= {() => toClassDetail(classList.class_id)}>{classList.name}</h2>
                  <section className="classDetail"> status: Active </section>
                  <section className="classDetail">code: {classList.code}</section>
               </Card>
            )
         } else if (classList.archived === true) {
            return(
               <Card className="classCard" key={classList.id}>
                  <h2 id='classCardTitle' onClick= {() => toClassDetail(classList.class_id)}>{classList.name}</h2>
                  <section className="classDetail"> status: Archived </section>
                  <section className="classDetail">code: {classList.code}</section>
               </Card>
            )
         }
         })}
      </Container>
   );
};


export default ClassCard;