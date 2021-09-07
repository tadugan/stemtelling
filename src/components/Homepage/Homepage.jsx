import { Container, Grid } from "@material-ui/core";
import StemtellCard from "../STEMtellCard/STEMtellCard";
import './Homepage.css'


function Homepage(){

return(
<Container>
<Grid container>
    <Grid item xs={12} sm={3}>
        <h1 id="HomepageTitle">My STEMtell Feed </h1>
    </Grid>
    
    <StemtellCard/>
    
</Grid>
</Container>
)
}

export default Homepage;