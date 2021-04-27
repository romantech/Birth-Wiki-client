import React, { useState } from 'react';
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
import SaveModal from './components/saveModal';
import Footer from './components/Footer';
import LoadingModal from './components/LoadingModal';

function App(): JSX.Element {
  const isSignup = useSelector((state: RootState) => state.signupReducer.isSignup);
  const isEdit = useSelector((state: RootState) => state.signupReducer.isEdit);
  const isGuestModal = useSelector((state: RootState) => state.guestReducer.isGuestModal);
  const isReject = useSelector((state: RootState) => state.guestReducer.isReject);
  const isSave = useSelector((state: RootState) => state.saveReducer.isSave);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Router>
      <Nav />
      {isSignup ? <SidebarSignUp /> : null}
      {isEdit ? <SidebarEdit /> : null}
      {!isSignup && !isEdit ? (
        <Switch>
          <Route exact path='/' render={() => <LaunchPage setIsLoading={setIsLoading} />} />
          <Route exact path='/main/:date' render={() => <Main setIsLoading={setIsLoading} />} />
          <Route exact path='/myFavorite' component={FavoritePage} />
        </Switch>
      ) : null}
      {isGuestModal ? <GuestModal /> : null}
      {isReject ? <GuestReject /> : null}
      {isSave ? <SaveModal /> : null}
      {isLoading ? <LoadingModal /> : null}
      <Footer />
    </Router>
  );
}

export default App;
