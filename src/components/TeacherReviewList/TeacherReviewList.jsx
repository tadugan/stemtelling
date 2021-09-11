import { Grid, Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import GenericSTEMtellCard from '../GenericSTEMtellCard/GenericSTEMtellCard';
import { useDispatch, useSelector } from 'react-redux';
import './TeacherReviewList.css';

function TeacherReviewList() {

    const dispatch = useDispatch();

    const reviewStemtells = useSelector(store => store.teacherReviewList);

    const getReviewStemtells = () => {
        dispatch({ type: 'GET_REVIEW_STEMTELLS'});
    }

    useEffect(() => {
        getReviewStemtells();
    }, []);

    return (
        <Container maxWidth="xl">
            <h3 className="teacher-review-list-header">Teacher STEMtell Review List</h3>
            <Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={3}>
                {reviewStemtells.map(stemtell => {
                    return (
                        <Grid item key={stemtell.stem_id}>
                            <GenericSTEMtellCard stemtell={stemtell} reviewMode={true}/>
                        </Grid>
                    );
                })} 
            </Grid>
        </Container>
    );
}

export default TeacherReviewList;