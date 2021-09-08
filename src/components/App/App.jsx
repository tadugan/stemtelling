import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import InfoPage from '../InfoPage/InfoPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import ForgotPasswordPage from '../ForgotPasswordPage/ForgotPasswordPage';
import STEMtellCard from '../STEMtellCard/STEMtellCard';
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

          <Route exact path="/about">
            <AboutPage />
            <STEMtellCard />
          </Route>

          <Route exact path="/forgotpassword" >
            <ForgotPasswordPage />
          </Route>

          <Route path ="/resetpassword/">
             <ResetPasswordPage />
          </Route>

          <ProtectedRoute exact path="/profile/:id">
            <ProfilePage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/homepage">
            <Homepage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/info">
            <InfoPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/myprofile">
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/create">
            <CreateSTEMtell />
          </ProtectedRoute>

          <ProtectedRoute exact path="/classlist">
            <ClassCard />
         </ProtectedRoute>

         <ProtectedRoute exact path="/stemtell/:id">
            <STEMtellDetails />
          </ProtectedRoute>

          <ProtectedRoute exact path="/classlist">
            <ClassList />
          </ProtectedRoute>

          <ProtectedRoute exact path="/classlist/details/:id">
            <ClassDetails />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ?
              <Redirect to="/myprofile" />
              :
              <LoginPage />
            }
          </Route>

          <Route exact path="/registration">
            {user.id ?
              <Redirect to="/myprofile" />
              :
              <RegisterPage />
            }
          </Route>

          <Route exact path="/home">
            {user.id ?
              <Redirect to="/myprofile" />
              :
              <Homepage />
            }
          </Route>

          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};


export default App;