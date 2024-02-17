import { useEffect, useState } from 'react';
import './App.css';
import GroupListPane from './containers/groupListPane/grouplistPane';
import ChatPane from './containers/chatPane';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout, login } from './states/reducers/authReducer';
import CreateGroup from './containers/createGroup';
import { CheckAuthentication } from '../ReuestsToServer/User';
import { GetMineGroupApi } from '../ReuestsToServer/Members';
import Dashboard from './containers/dashboard';

function App() {
  const [group, setGroup] = useState({});
  const [groups, setGroups] = useState([]);
  const [authChecking, setAuthChecking] = useState(true);
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [refereshList, setRefereshList] = useState(false);
  const auth = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();

  useEffect(function () {
    if (auth.isloggedIn) {
      setAuthChecking(false);
      GetMineGroupApi().then(groups => {
        setGroups(groups);
      }).catch(err => {
        console.log(err);
      });
    }
    else {
      checkIsLoggedIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isloggedIn, creatingGroup,refereshList]);

  async function checkIsLoggedIn() {
    try {
      const token = JSON.parse(window.sessionStorage.getItem("user")).token;
      if (token) {
        const result = await CheckAuthentication(token);
        if (result) {
          dispatch(login());
          dispatch(setUser(JSON.parse(window.sessionStorage.getItem("user"))));
        }
        else {
          window.sessionStorage.removeItem("user");
          dispatch(logout());
        }
      }
      setAuthChecking(false);
    }
    catch {
      dispatch(logout());
      setAuthChecking(false);
    }
  }

  function openChat(group) {
    return () => {
      if (creatingGroup) {
        setCreatingGroup(!creatingGroup);
      }
      setGroup(group);
    }
  }

  function groupCreation() {
    setCreatingGroup(!creatingGroup);
  }

  function gotoDashBoard() {
    setCreatingGroup(false);
    setGroup("");
  }

  function removeFromGroupList(groupID) {
    // console.log(groupID);
    setGroups(groups.filter(v => {
      console.log(80, v);
      return v.groupID._id != groupID;
    }));
  }

  function refereshGroupList() {
    setRefereshList(!refereshList);
  }

  return (
    <>
      {
        authChecking ? <div>loading..</div> :
          auth.isloggedIn ?
            <div className='App'>
              <GroupListPane refereshGroupList={refereshGroupList} createGroup={groupCreation} groups={groups} openChat={openChat} />
              {
                creatingGroup ? <CreateGroup groupCreated={groupCreation} /> : group?._id ? <ChatPane group={group} goBack={gotoDashBoard} groupLeft={removeFromGroupList} /> : <Dashboard />
              }
            </div>
            :
            <Navigate to={"/login"} />
      }
    </>
  )
}

export default App
