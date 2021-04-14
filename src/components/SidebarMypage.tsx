import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { setIsLogin, setUserInfo, setisSidbar } from '../actions/index';

const MypageContainer = styled.div`
  color: #fff;
  font-size: 30px;
  height: 100%;
  width: 300px;
  margin: 10px;
  top: 60px;
  position: fixed;
`;

const MyProfileContainer = styled.div`
  font-size: 20px;
  border: #fff 1px solid;
  border-radius: 20px;
  margin: 5px 0;
  padding: 10px;
  color: #fff;
`;

const MyProfile = styled.div`
  font-size: 20px;
  padding: 5px;
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  border-radius: 20px;
`;

const UserPoto = styled.img`
  font-size: 60px;
  height: 100px;
  width: 100px;
  color: #fff;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const UserInfoContainer = styled.div`
  font-size: 15px;
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 10px;
  width: 100%;
  overflow: auto;
`;

const UserInfoEdit = styled(Link)`
  border-radius: 50px;
  background: rgba(6, 11, 38, 0.8);
  white-space: nowrap;
  padding: 10px 35px;
  margin: 10px 10px 0 20px;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: rgba(255, 255, 255, 0.8);
    color: #000;
  }
`;

const LogOut = styled.button`
  border-radius: 50px;
  background: rgba(6, 11, 38, 0.8);
  white-space: nowrap;
  width: 100px;
  padding: 10px 0;
  margin: 10px 10px 0 20px;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: rgba(255, 255, 255, 0.8);
    color: #000;
  }
`;

const MyStoryContainer = styled.div`
  font-size: 20px;
  border: #fff 1px solid;
  border-radius: 20px;
  height: 30%;
  margin: 5px 0;
  padding: 10px;
  color: #fff;
`;

const MyStoryList = styled.button`
  font-size: 20px;
  border: #fff 1px solid;
  border-radius: 20px;
  margin: 5px 0;
  padding: 10px;
  color: #fff;

  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;

  .active,
  &:hover {
    background-color: #ccc;
  }
`;

const MyStory = styled.div`
  display: flex;
`;

const MyBookMarkList = styled.div`
  font-size: 20px;
  border: #fff 1px solid;
  border-radius: 20px;
  margin: 5px 0;
  padding: 10px;
  color: #fff;

  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;

  .active,
  &:hover {
    background-color: #ccc;
  }
`;

const MyBookMark = styled.div`
  display: flex;
`;

function SidebarMypage() {
  const userInfo = useSelector((state: RootState) => state.userInfoReducer.userInfo);
  const sidebar = useSelector((state: RootState) => state.sidebarReducer.isSidebar);
  const dispatch = useDispatch();
  console.log('userInfo', userInfo);
  const [storyclicked, setStoryClicked] = useState(false);
  const [markclicked, setMarkClicked] = useState(false);
  const logoutHandler = () => {
    dispatch(setIsLogin(false));
    dispatch(setisSidbar(false));
  };
  const editHandler = () => {
    dispatch(setisSidbar(!sidebar));
    <Link to='/edit' />;
  };
  const clickedStoryHandler = () => {
    setStoryClicked(!storyclicked);
  };

  const clickMarkHandler = () => {
    setMarkClicked(!markclicked);
  };
  return (
    <MypageContainer>
      Mypage
      <MyProfileContainer>
        <MyProfile>
          <UserPoto src={userInfo.profileImage}></UserPoto>
          <UserInfoContainer>
            <UserInfo>{userInfo.userNickName}</UserInfo>
            <UserInfo>{userInfo.userEmail}</UserInfo>
          </UserInfoContainer>
        </MyProfile>
        <UserInfoEdit to='/edit' onClick={editHandler}>
          Edit
        </UserInfoEdit>
        <LogOut type='submit' onClick={logoutHandler}>
          Logout
        </LogOut>
      </MyProfileContainer>
      <MyStoryContainer>
        <MyStoryList onClick={clickedStoryHandler}>
          나만의 기록리스트
          {storyclicked ? <MyStory>{userInfo.recordCard}</MyStory> : ''}
        </MyStoryList>

        <MyBookMarkList onClick={clickMarkHandler}>
          나의 찜 리스트
          {markclicked ? <MyBookMark>{userInfo.likeCard}</MyBookMark> : ''}
        </MyBookMarkList>
      </MyStoryContainer>
    </MypageContainer>
  );
}

export default SidebarMypage;
