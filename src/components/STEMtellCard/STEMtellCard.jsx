import { Avatar, Card, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import "./STEMtellCard.css";

function StemtellCard(){

const useStyles = makeStyles((theme) => ({
    StemCard: {
        margin: 20,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        justify: 'center',
        flexGrow: 1,
        width: "300px",
        height: "400px",
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary, 
    },

    UserName: {
        marginTop: '2px',
        textAlign: 'left',
        marginLeft:'60px'
        // float:'left',
        // display: 'flex',
        // flexDirection: 'row',
        
    },

    Avatar: {
        // margin:'10px',
        textAlign: 'left',
        float:'left',
        display: 'flex',
        flexDirection: 'row',

    }


}));

const classes = useStyles();

return (
    <Grid>
    <Grid item>
    <Card className={classes.StemCard}>
        <Avatar className={classes.Avatar}/>
        <section className={classes.UserName} >User's Name</section><div className={classes.UserName} id="userClass">User Class</div>
        <h3> STEMTell Title</h3>
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/High_School_Earth_Science_Cover.jpg" />
        <section id="cardReactions">emojis go here</section>

        <section id="stemDescription">This is where descriptions go</section>
    </Card>
    </Grid>
    </Grid>
)
}

export default StemtellCard;