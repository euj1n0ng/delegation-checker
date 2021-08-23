import React, { useState } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import UserContext from './UserContext';
import { PrivateRoute, PublicRoute } from './components/Routes';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [user, setUser] = useState({
    loginToken: window.sessionStorage.getItem('loginToken'),
  });

  return (
    <UserContext.Provider value={{ user, setUser: (e) => setUser({ ...user, ...e }) }}>
      <Router>
        <Switch>
          <PublicRoute path='/login'>
            <Login />
          </PublicRoute>

          <PublicRoute path='/signup'>
            <Login isSignup />
          </PublicRoute>

          <PrivateRoute path='/'>
            <Home />
          </PrivateRoute>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
