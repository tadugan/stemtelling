
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {Card, Avatar, Grid} from "@material-ui/core";
import BackBtn from "../BackBtn/BackBtn";
import ClassCard from '../ClassCard/ClassCard';
import AddClass from "../AddClass/AddClass";

function ClassList() {

    return(
        <>
        <BackBtn />
        <h1 className='ClassListHeader'> Your Classes </h1>
        <AddClass />
        
        <ClassCard />
        </>
    )
}

export default ClassList;