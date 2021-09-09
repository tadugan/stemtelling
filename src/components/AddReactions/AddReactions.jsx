import { Button } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import './AddReaction.css'


function AddReaction({stemtellId}){

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch({type:'GET_STEMTELL_REACTIONS', stemtellId });
    }, []);
const reactions = useSelector((store) => store.stemtellReactions.stemtellReactions);
    return(
        <>
       <Button><img className="reaction-img" src="https://svgshare.com/i/a1L.svg"/></Button> 
       <Button><img className="reaction-img" src="https://svgshare.com/i/a23.svg"/></Button>
       <Button> <img className="reaction-img" src="https://svgshare.com/i/a1u.svg"/></Button>
       <Button><img className="reaction-img" src="https://svgshare.com/i/a1V.svg"/></Button>
       <Button><img className="reaction-img" src="https://svgshare.com/i/a2N.svg"/></Button>


        {/* {reactions.map((reaction)=> )} */}
        {/* <img src={stemtellId.media_url}></img><p></p> */}
        <section>{stemtellId}</section>
        <Button>add reaction<AddCircleIcon/></Button>
        </>
    )
}

export default AddReaction;