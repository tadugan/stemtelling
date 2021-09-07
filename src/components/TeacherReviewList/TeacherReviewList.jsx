import { Grid } from '@material-ui/core';
import React from 'react';
import GenericSTEMtellCard from '../GenericSTEMtellCard/GenericSTEMtellCard';

function TeacherReviewList() {

    const stemtell = { // test STEMtell
        author_id: 1,
        body_text: "I Love Chemistry!!",
        class_name: "CHEM 101",
        media_url: "https://www.sciencecompany.com/Assets/ProductImages/nc0071n-lg.jpg",
        profile_picture_url: "https://image.shutterstock.com/image-photo/laughing-turkish-female-student-desk-260nw-1766762942.jpg",
        stem_id: 1,
        title: "CHEMISTRY STEMTELL",
        unix: "1631042273",
        username: "Student 1"
    }

    return (
        <div>
            <p>Teacher STEMtell Review List</p>
            <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <GenericSTEMtellCard stemtell={stemtell}/>
            </Grid>
        </div>
    );
}

export default TeacherReviewList;