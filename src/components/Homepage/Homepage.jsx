import { Container, Grid } from "@material-ui/core";
import StemtellCard from "../STEMtellCard/STEMtellCard";
import './Homepage.css'


function Homepage(){

return(
<Container>
<Grid>
<Grid item>
<h1 id="HomepageTitle">My STEMtell Feed </h1>


<StemtellCard/>

</Grid>
</Grid>
</Container>
)
}

export default Homepage;