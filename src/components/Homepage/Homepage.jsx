import { Grid } from "@material-ui/core";
import STEMtellCard from "../STEMtellCard/STEMtellCard";
import './Homepage.css'


function Homepage(){
   return (
      <Grid container direction="row" justifyContent="center" alignItems="flex-start">
         <h1 id="HomepageTitle">My STEMtell Feed </h1>
         <STEMtellCard/>
      </Grid>
   );
};


export default Homepage;