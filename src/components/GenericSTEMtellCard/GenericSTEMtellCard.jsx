import { Button, Avatar, Card, Grid } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './GenericSTEMtellCard.css';

function GenericSTEMtellCard({ stemtell, reviewMode }) {

    const history = useHistory();

    const unixTimestamp = (timestamp) => {
        const dateObject = new Date((timestamp * 1000));
        return (
           dateObject.toLocaleString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})
        );
    };

    const handleReviewClick = () => {
        history.push(`/teacher/feedback/${stemtell.stem_id}`);
    }

    const conditionalReviewButton = () => {
        if (reviewMode) {
            return (
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={handleReviewClick}
                >
                    Review
                </Button>
            );
        }
        else {
            return;
        }
    }

    return (
            <Card className="generic-stemtell-card-body">
                <h6 className="generic-stemtell-card-date">{unixTimestamp (stemtell.unix)}</h6>
                <Avatar className="generic-stemtell-card-avatar" src={stemtell.profile_picture_url} />
                <section
                    className="generic-stemtell-card-username"
                >
                    {stemtell.username}
                </section>
                <div className="generic-stemtell-card-username generic-stemtell-card-user-class">
                    {stemtell.class_name}
                </div>

                <h3
                    className="generic-stemtell-card-title"
                >
                    {stemtell.title}
                </h3>

                <img
                    className="generic-stemtell-card-image"
                    src={stemtell.media_url}
                />
                <section>{stemtell.reaction_name}</section>

                <section
                    className="generic-stemtell-card-description"
                >
                    {stemtell.body_text}
                </section>
                {conditionalReviewButton()}
            </Card>
    );
}

export default GenericSTEMtellCard;