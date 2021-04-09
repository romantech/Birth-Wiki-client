import React from 'react';
import styled from 'styled-components';
import './App.css';
import LaunchPage from './components/LaunchPage';
import Nav from './components/Nav';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SidebarLogin from './components/SidebarLogin';
import CardList from './components/CardList';
import Weather from './components/Weather';

function App() {
  return (
    <div>
      <Weather />
      {/* <Router>
        <Nav />
        <LaunchPage />
      </Router> */}
    </div>
  );
}

export default App;
