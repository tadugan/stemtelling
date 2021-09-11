import { Grid, Container } from "@material-ui/core";
import STEMtellCard from "../STEMtellCard/STEMtellCard";
import './Homepage.css'


function Homepage(){
   return (
      <Container maxWidth={false}>
         <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={3}>
            <h1 id="HomepageTitle">My STEMtell Feed</h1>
            <STEMtellCard/>
         </Grid>
      </Container>
   );
};


export default Homepage;