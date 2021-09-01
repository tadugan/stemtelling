import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useDispatch, useSelector } from 'react-redux';

function RegisterPage() {
   const history = useHistory();
   const dispatch = useDispatch();


   return (
      <div>
         <RegisterForm />
         <center>
            <button
               type="button"
               className="btn btn_asLink"
               onClick={() => {
                  history.push('/login');
               }}
            >
               Login
            </button>
         </center>
      </div>
   );
};

export default RegisterPage;