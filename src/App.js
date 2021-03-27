import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Book from './components/Book/Book';
import Header from './components/Header/Header';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Shipment from './components/Shipment/Shipment';


export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
      <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
        <Router>
          <p>Name: {loggedInUser.name}</p>
            <Header/>
            <Switch>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/book/:bedType">
                <Book />
              </PrivateRoute>
              <PrivateRoute path="/shipment">
                <Shipment/>
              </PrivateRoute>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
        </Router>
      </UserContext.Provider>
  );
}

export default App;
