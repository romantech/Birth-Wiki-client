import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import { useSelector } from 'react-redux';
import Main from './pages/Main';
import Nav from './components/Nav';
import SidebarLogin from './components/SidebarLogin';
import Weather from './components/Weather';
import { RootState } from './store/index';
import SidebarSignUp from './components/SidebarSignUp';
import FavoritePage from './pages/FavoritePage';

function App(): JSX.Element {
  const isLogin = useSelector((state: RootState) => state.loginReducer.isLogin);

  return (
    <Router>
      <Nav isLogin={isLogin} />
      {/* <Weather />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/signup" component={SidebarSignUp} />
      </Switch> */}
      <FavoritePage />
    </Router>
  );
}

export default App;
