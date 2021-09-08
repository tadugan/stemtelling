import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import GenericSTEMtellCard from '../GenericSTEMtellCard/GenericSTEMtellCard';
import { useDispatch, useSelector } from 'react-redux';
import './TeacherReviewList.css';

function TeacherReviewList() {

    const stemtell = { // test STEMtell TODO: remove this
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

    const dispatch = useDispatch();

    const reviewStemtells = useSelector(store => store.teacherReviewList);

    const getReviewStemtells = () => {
        dispatch({ type: 'GET_REVIEW_STEMTELLS'});
    }

    useEffect(() => {
        getReviewStemtells();
    }, []);

    return (
        <div>
            <h3 className="teacher-review-list-header">Teacher STEMtell Review List</h3>
            <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={12}>
                    <GenericSTEMtellCard stemtell={stemtell}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default TeacherReviewList;