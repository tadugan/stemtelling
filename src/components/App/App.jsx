import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserPage from '../UserPage/UserPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ForgotPasswordPage from '../ForgotPasswordPage/ForgotPasswordPage';
import ResetPasswordPage from '../ResetPasswordPage/ResetPasswordPage';
import ClassCard from '../ClassCard/ClassCard';
import STEMtellDetails from '../STEMtellDetails/STEMtellDetails';
import Homepage from '../Homepage/Homepage';
import CreateSTEMtell from '../CreateSTEMtell/CreateSTEMtell';
import ClassList from '../ClassList/ClassList';
import ClassDetails from '../ClassDetails/ClassDetails';
import './App.css';

function App() {
   const dispatch = useDispatch();
   const user = useSelector(store => store.user);
   useEffect(() => {
      dispatch({ type: 'FETCH_USER' });
   }, [dispatch]);

   return (
      <Router>
         <div>
            <Nav />
            <Switch>
               <Redirect exact from="/" to="/homepage" />
               <Redirect exact from="/close" to="/myprofile" />
               <Route exact path="/forgotpassword" component={ForgotPasswordPage} />
               <Route path ="/resetpassword/" component={ResetPasswordPage} />
               <ProtectedRoute exact path="/profile/:id" component={ProfilePage} />
               <ProtectedRoute exact path="/homepage" component={Homepage} />
               <ProtectedRoute exact path="/myprofile" component={UserPage} />
               <ProtectedRoute exact path="/create" component={CreateSTEMtell} />
               <ProtectedRoute exact path="/classlist" component={ClassCard} />
               <ProtectedRoute exact path="/stemtell/:id" component={STEMtellDetails} />
               <ProtectedRoute exact path="/classlist" component={ClassList} />
               <ProtectedRoute exact path="/classlist/details/:id" component={ClassDetails} />
               <Route exact path="/login">{user.id ? <Redirect to="/myprofile" /> : <LoginPage />}</Route>
               <Route exact path="/registration">{user.id ? <Redirect to="/myprofile" /> : <RegisterPage />}</Route>
               <Route exact path="/home">{user.id ? <Redirect to="/myprofile" /> : <Homepage />}</Route>
               <Route><h1>404</h1></Route>
            </Switch>
            <Footer />
         </div>
      </Router>
   );
};


export default App;