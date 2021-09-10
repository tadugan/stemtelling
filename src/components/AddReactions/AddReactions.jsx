import { Button } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './AddReaction.css'


function AddReaction({stemtellId}){
    console.log("stemtell ID in addReactions:", stemtellId)

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch({type:'GET_STEMTELL_REACTIONS', payload: stemtellId })
    }, []);
const reactions = useSelector((store) => store.stemtellReactions);
console.log(reactions, "These are the stemtell reactions")
//beaker, cool, heart, smile
let beakerReactions = [];
let coolReactions= [];
let heartReactions = [];
let smileReactions = [];

   
    return(
        <>
      
       {/* <Button><p>1</p><img className="reaction-img" src="https://svgshare.com/i/a2N.svg"/></Button> */}


        {/* {reactions.map((reaction)=> )} */}
        {/* <img src={stemtellId.media_url}></img><p></p> */}
        {/* <section>{stemtellId}</section>
        <Button>add reaction<AddCircleIcon/></Button> */}
        <p>
        {reactions.map((reaction)=> {
       
       console.log("in count reactions function");
       if(reaction.reaction_id == 1){
           beakerReactions.push(reaction)
       }
       if(reaction.reaction_id == 2){
           coolReactions.push(reaction)
       }
       if(reaction.reaction_id == 3){
           heartReactions.push(reaction)
       }
       if(reaction.reaction_id == 4){
           smileReactions.push(reaction)
       }
       return console.log("these are the arrays we get hopefully", beakerReactions, coolReactions, heartReactions, smileReactions)

   })}
   </p>
   <Button><p>{beakerReactions.length}</p><img className="reaction-img" src="https://svgshare.com/i/a1L.svg"/></Button> 
       <Button><p>{coolReactions.length}</p><img className="reaction-img" src="https://svgshare.com/i/a23.svg"/></Button>
       <Button><p>{heartReactions.length}</p> <img className="reaction-img" src="https://svgshare.com/i/a1u.svg"/></Button>
       <Button><p>{smileReactions.length}</p><img className="reaction-img" src="https://svgshare.com/i/a1V.svg"/></Button>

        </>
    )
}


export default AddReaction;