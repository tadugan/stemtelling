import { Avatar, Card, Grid } from '@material-ui/core';
import React from 'react';
import './GenericSTEMtellCard.css';

function GenericSTEMtellCard({ stemtell }) {

    return (
            <Card
                className="generic-stemtell-card-container"
            >
                <Grid
                    item
                    container
                    spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className="generic-stemtell-card-grid"
                >
                    <Grid
                        item
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="flex-start"
                        xs={12}
                    >
                        <Grid item xs={4}>
                            <Avatar src={stemtell.profile_picture_url} />
                        </Grid>
                        <Grid 
                            item
                            container
                            spacing={0}
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            xs={4}
                        >
                            <Grid item>
                                <p>{stemtell.username}</p>
                            </Grid>
                            <Grid>
                                <p>{stemtell.class_name}</p>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}>
                            <p>date</p>
                        </Grid>
                    </Grid>   
                </Grid>
            </Card>
    );
}

export default GenericSTEMtellCard;