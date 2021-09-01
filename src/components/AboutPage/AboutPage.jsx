import React from 'react';
import ClassCard from '../ClassCard/ClassCard';
import Comment from '../Comment/Comment'
import StudentCard from '../StudentCard/StudentCard';
import BackBtn from '../BackBtn/BackBtn';
import TeacherFeedback from '../TeacherFeedback/TeacherFeedback';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

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
