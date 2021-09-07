
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {Card, Avatar, Grid} from "@material-ui/core";
import BackBtn from "../BackBtn/BackBtn";
import StudentCard from '../StudentCard/StudentCard';

function ClassDetails() {
    
    return(
        <>
        <BackBtn />
        <StudentCard />
        </>
    )
}

export default ClassDetails;