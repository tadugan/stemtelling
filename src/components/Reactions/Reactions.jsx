import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Reactions.css"

function Reactions() {
  const params = useParams();
  const stemtellId = params.id;
  const dispatch = useDispatch();
  // const [leaveReaction, setReaction] = useState('');
  const reactions = useSelector((store) => store.stemtellReactions);
  useEffect(() => {
    dispatch({ type: "GET_STEMTELL_REACTIONS", payload: stemtellId });
  }, []);

  return (
    <>
    <section id="reactions">
    <img className="reaction-img" src="https://www.nicepng.com/png/detail/376-3762215_how-to-set-use-blue-thumbs-up-icon.png"/>
    <img className="reaction-img" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png" />
    </section>
      {/* {reactions.map((reaction) => {
        return <img src={reaction.media_url} />;
      })} */}
    </>
  );
}
export default Reactions;
