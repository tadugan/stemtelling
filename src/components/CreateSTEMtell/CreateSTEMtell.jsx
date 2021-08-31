import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import "./CreateSTEMtell.css";

function CreateSTEMtell() {
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');

  return (
    <div>
      <h2>Create Stemtell Component</h2>
    </div>
  );
}

export default CreateSTEMtell;
