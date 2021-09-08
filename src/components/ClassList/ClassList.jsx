import React from "react";
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
   );
};


export default ClassList;