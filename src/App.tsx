import React from 'react';
import styled from 'styled-components';
import './App.css';
import Main from './pages/Main';
import Nav from './components/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SidebarLogin from './components/SidebarLogin';
import Weather from './components/Weather';
import { RootState } from './store/index';
import { useSelector } from 'react-redux';
import SidebarSignUp from './components/SidebarSignUp';

function App() {
  const isLogin = useSelector((state: RootState) => state.loginReducer.isLogin);

  return (
    <Router>
      <Nav isLogin={isLogin} />
      <Weather />
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/signup' component={SidebarSignUp} />
      </Switch>
    </Router>
  );
}

export default App;
