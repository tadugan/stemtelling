import React from 'react';
import ClassCard from '../ClassCard/ClassCard';
import Comment from '../Comment/Comment'
import StudentCard from '../StudentCard/StudentCard';
import BackBtn from '../BackBtn/BackBtn';
import TeacherFeedback from '../TeacherFeedback/TeacherFeedback';

function AboutPage() {
  return (
    <div className="container">
      <BackBtn/>
      <div>
        <p>This about page is for anyone to read!</p>
        <ClassCard/>
      </div>
      <Comment />
      <StudentCard/>
      <TeacherFeedback/>
    </div>
  );
}

export default AboutPage;
