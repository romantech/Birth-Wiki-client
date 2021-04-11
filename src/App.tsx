import React from 'react';
import styled from 'styled-components';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LaunchPage from './components/LaunchPage';
import Nav from './components/Nav';
import SidebarLogin from './components/SidebarLogin';
import CardList from './components/CardList';
import Weather from './components/Weather';
import FavoritePage from './pages/FavoritePage';

function App(): JSX.Element {
  return (
    <div>
      <Router>
        {/* <Nav />
        <LaunchPage />
        <Weather /> */}
        <FavoritePage />
      </Router>
    </div>
  );
}

export default App;
