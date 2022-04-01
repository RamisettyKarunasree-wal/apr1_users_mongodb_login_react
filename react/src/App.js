import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Members from './Members';
import EditUser from './EditUser';
import Logout from './Logout';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  });
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <BrowserRouter>
      <div className="nav fluid-container bg-dark">
        {login ? (
          <div className="row w-100 p-2 m-2">
            <div className="col">
              <NavLink activeClassName="active" className="links" to="/members">
                Members
              </NavLink>
            </div>
            <div className="col">
              <NavLink activeClassName="active" className="links" to="/edit">
                Edit User
              </NavLink>
            </div>
            <div className="col-10 text-end">
              <NavLink activeClassName="active" className="links" to="/logout">
                logout
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="row w-100 p-2 m-2">
            <div className="col-1">
              <NavLink
                activeClassName="active"
                className="links"
                to="/register"
              >
                Register
              </NavLink>
            </div>
            <div className="col-1">
              <NavLink activeClassName="active" className="links" to="/login">
                Login
              </NavLink>
            </div>
          </div>
        )}
      </div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/members" element={<Members />} />
        <Route path="/edit" element={<EditUser />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
