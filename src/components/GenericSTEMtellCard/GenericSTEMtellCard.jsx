import { Avatar, Card, Grid } from '@material-ui/core';
import React from 'react';
import './GenericSTEMtellCard.css';

function GenericSTEMtellCard({ stemtell }) {

    const unixTimestamp = (timestamp) => {
        const dateObject = new Date((timestamp * 1000));
        return (
           dateObject.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})
        );
    };

    return (
            <Card className="StemCard">
                <h6 id="stemDate">{unixTimestamp (stemtell.unix)}</h6>
                <Avatar className="Avatar" src={stemtell.profile_picture_url} />
                <section
                    className="UserName"
                    onClick={() => onUserProfile(stemtell.author_id)}
                >
                    {stemtell.username}
                </section>
                <div className="UserName" id="userClass">
                    {stemtell.class_name}
                </div>

                <h3
                    id="stemTitle"
                    onClick={() => toStemtellDetail(stemtell.stem_id)}
                >
                    {" "}
                    {stemtell.title}
                </h3>

                <img
                    id="stemtellImage"
                    src={stemtell.media_url}
                    onClick={() => toStemtellDetail(stemtell.stem_id)}
                />
                <section id="cardReactions">{stemtell.reaction_name}</section>

                <section
                    id="stemDescription"
                    onClick={() => toStemtellDetail(stemtell.stem_id)}
                >
                    {stemtell.body_text}
                </section>
            </Card>
    );
}

export default GenericSTEMtellCard;