import React from "react";
import BackBtn from '../BackBtn/BackBtn';
import ClassCard from '../ClassCard/ClassCard';
import AddClass from "../AddClass/AddClass";
import './ClassList.css';



function ClassList() {
   return(
      <>
         <BackBtn />
         <container className='ClassListHeaderContainer'>
         <h1 className='ClassListHeader'> Your Classes </h1> 
         </container>
         <AddClass />
         <ClassCard />
     </>
   );
};


export default ClassList;