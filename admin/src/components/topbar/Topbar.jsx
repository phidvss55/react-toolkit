import React, { useEffect } from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings, ExitToApp } from "@material-ui/icons";
import { logout } from "../../redux/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'

export default function Topbar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.currentUser)

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [history, user])

  const onLogout = () => {
    logout(dispatch)
    history.push('/login');
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Admin Management</span>
        </div>
        <div className="topRight">
          <div className="topIconContainer" onClick={() => onLogout()}>
            <ExitToApp />
          </div>
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
