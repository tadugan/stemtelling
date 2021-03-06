import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './AddReaction.css'


function AddReaction({stemtellId}){
   let beakerReactions = [];
   let coolReactions= [];
   let heartReactions = [];
   let smileReactions = [];
   const dispatch = useDispatch();
   const user = useSelector((store) => store.user);
   const reactions = useSelector((store) => store.stemtellReactions);

   useEffect(()=> {
      dispatch({type:'GET_STEMTELL_REACTIONS', payload: stemtellId });
   }, []);

   const handleBeaker = () => {
      for (let item of reactions) {
         if (item.user_id == user.id) {
            return;
         };
      };
      dispatch({
         type: 'ADD_REACTION',
         payload: {
            stemtell_id: stemtellId,
            reaction_id: 1
         }
      });
   };
        
   const handleCool = () => {
      for (let item of reactions){
         if (item.user_id == user.id) {
            return;
         };
      };
      dispatch({
         type: 'ADD_REACTION',
         payload: {
            stemtell_id: stemtellId,
            reaction_id: 2
         }
      });
   };

   const handleHeart = () => {
      for (let item of reactions) {
         if (item.user_id == user.id) {
            return;
         };
      };
      dispatch({
         type: 'ADD_REACTION',
         payload: {
            stemtell_id: stemtellId,
            reaction_id: 3
         }
      });
   };

   const handleSmile = () => {
      for (let item of reactions){
         if (item.user_id == user.id) {
            return;  
         };
      };
      dispatch({
         type: 'ADD_REACTION',
         payload: {
            stemtell_id: stemtellId,
            reaction_id: 4
         }
      });
   };

   return (
      <>
         <p>
            {reactions.map((reaction) => {
               if (reaction.reaction_id == 1) {beakerReactions.push(reaction)}
               if (reaction.reaction_id == 2) {coolReactions.push(reaction)}
               if (reaction.reaction_id == 3) {heartReactions.push(reaction)}
               if (reaction.reaction_id == 4) {smileReactions.push(reaction)}
            })}
         </p>
         <Button onClick={handleBeaker}><p>{beakerReactions.length}</p><img className="reaction-img" src="https://svgshare.com/i/a1L.svg"/></Button> 
         <Button onClick={handleCool}><p>{coolReactions.length}</p><img className="reaction-img" src="https://svgshare.com/i/a23.svg"/></Button>
         <Button onClick={handleHeart}><p>{heartReactions.length}</p> <img className="reaction-img" src="https://svgshare.com/i/a1u.svg"/></Button>
         <Button onClick={handleSmile}><p>{smileReactions.length}</p><img className="reaction-img" src="https://svgshare.com/i/a1V.svg"/></Button>
      </>
   );
};


export default AddReaction;