import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage';
import {useSelector} from 'react-redux';


// Wrapper for components that should require being logged in to view
// >>>NOT SECURITY<<<
// Security MUST be handled on server routes with "rejectUnauthenticated"
// Otherwise this can be breached by a malicious user
function ProtectedRoute({ component, children, ...props }) {
   const user = useSelector((store) => store.user);
   const ProtectedComponent = component || (() => children);
   return (
      <Route {...props}>
         {user.id ?
            <ProtectedComponent /> : <LoginPage />
         }
      </Route>
   );
};


export default ProtectedRoute;