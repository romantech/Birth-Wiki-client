import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Nav from './components/Nav';
import Weather from './components/Weather';
import { RootState } from './store/index';
import FavoritePage from './pages/FavoritePage';
import LaunchPage from './components/LaunchPage';
import SidebarSignUp from './components/SidebarSignUp';
import SidebarEdit from './components/SidebarEdit';
import axios from 'axios';
import { setUserInfo } from './actions';

function App(): JSX.Element {
  const userInfo = useSelector((state: RootState) => state.userInfoReducer.userInfo);
  const isSignup = useSelector((state: RootState) => state.signupReducer.isSignup);
  const isEdit = useSelector((state: RootState) => state.signupReducer.isEdit);
  const [changeInfo, setChangeInfo] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (changeInfo) {
      axios({
        url: 'https://server.birthwiki.space/user/info',
        method: 'POST',
        data: {
          userEmail: userInfo.userEmail,
          accessToken: `Bearer ${userInfo.accessToken}`,
        },
      }).then((res) => {
        let newUserInfo = Object.assign({}, userInfo, {
          nickName: res.data.data.nickName,
          profileImage: res.data.data.profileImage,
        });
        dispatch(setUserInfo(newUserInfo));

        setChangeInfo(false);
      });
    }
  }, [changeInfo]);

  return (
    <Router>
      <Nav />
      {isSignup ? <SidebarSignUp /> : null}
      {isEdit ? <SidebarEdit setChangeInfo={setChangeInfo} /> : null}
      {!isSignup && !isEdit ? (
        <Switch>
          <Route exact path='/' component={LaunchPage} />
          <Route exact path='/main/:date' component={Weather} />
          <Route exact path='/myFavorite' component={FavoritePage} />
        </Switch>
      ) : null}
    </Router>
  );
}

export default App;
