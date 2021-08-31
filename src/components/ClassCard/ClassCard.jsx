import { Avatar, Card, Grid } from "@material-ui/core";
import "./ClassCard.css";

function ClassCard() {
  return (
    <Card className="classCard">
      <h2>Class title</h2>
      <section className="classDetail">class status</section>
      <section className="classDetail">class code</section>
    </Card>
  );
}
export default ClassCard;
