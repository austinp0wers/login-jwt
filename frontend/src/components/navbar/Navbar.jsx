import './navbar.css';
import AuthVerify from "../../common/AuthVerify";
import React, {useEffect, useCallback} from 'react'
import { clearMessage } from "../../store/actions/message";
import { history } from "../../helpers/history";
import { logout } from "../../store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import {Link } from "react-router-dom";
export default function Navbar() {
  
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <div><nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Home
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {currentUser.accessToken && (
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Profile
                </Link>
              </li>
            )}
          </div>

          {currentUser.accessToken ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
    </nav>
      <AuthVerify logOut={logOut} />
    </div>
  )
}
