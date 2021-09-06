import { Card, Container } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ClassCard.css";

function ClassCard() {
  const dispatch = useDispatch();
  const classes = useSelector((store) => store.classes);

  useEffect(() => {
    dispatch({ type: 'FETCH_CLASSES'});
  }, []);

  return (
    <Container>
      {classes.map((classList) => {
        return(
    <Card className="classCard" key={classList.id}>
      <h2 id="classCardTitle">{classList.name}</h2>
      <section className="classDetail"> status: Active {classList.archived}
      </section>
      <section className="classDetail">code: {classList.code}</section>
    </Card>
      )})}
    </Container>
  );
}
export default ClassCard;
