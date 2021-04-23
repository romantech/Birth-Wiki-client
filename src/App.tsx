import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import Nav from './components/Nav';
import Main from './pages/Main';
import { RootState } from './store/index';
import FavoritePage from './pages/FavoritePage';
import LaunchPage from './components/LaunchPage';
import SidebarSignUp from './components/SidebarSignUp';
import SidebarEdit from './components/SidebarEdit';
import GuestModal from './components/GuestModal';
import GuestReject from './components/GuestReject';

function App(): JSX.Element {
  const isSignup = useSelector((state: RootState) => state.signupReducer.isSignup);
  const isEdit = useSelector((state: RootState) => state.signupReducer.isEdit);
  const isGuestModal = useSelector((state: RootState) => state.guestReducer.isGuestModal);
  const isReject = useSelector((state: RootState) => state.guestReducer.isReject);

  return (
    <Router>
      <Nav />
      {isSignup ? <SidebarSignUp /> : null}
      {isEdit ? <SidebarEdit /> : null}
      {!isSignup && !isEdit ? (
        <Switch>
          <Route exact path='/' component={LaunchPage} />
          <Route exact path='/main/:date' component={Main} />
          <Route exact path='/myFavorite' component={FavoritePage} />
        </Switch>
      ) : null}
      {isGuestModal ? <GuestModal /> : null}
      {isReject ? <GuestReject /> : null}
    </Router>
  );
}

export default App;
