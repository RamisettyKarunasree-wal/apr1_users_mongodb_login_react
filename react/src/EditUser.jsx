import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EditUser() {
  const loggedUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  const [login, setLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [msg,setMsg]=useState('');
  useEffect(() => {
    if (!token) {
      setLogin(false);
      console.log(token);
      console.log(login);
    } else {
      setLogin(true);
      console.log(token);
      console.log(loggedUser);
      axios
        .get(`/users/${loggedUser}`, { headers: { token } })
        .then((res) => {
          setName(res.data.data.name);
          setDob(res.data.data.dob);
          setPassword(res.data.data.password);
          setEmail(res.data.data.email);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const editUser = (e) => {
    e.preventDefault();
    const userOb = {
      name,
      email,
      dob,
      password,
    };
    console.log(userOb);
    axios
      .put(`users/${loggedUser}`, userOb, {
        headers: {
          token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMsg(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="fluid-container border border-primary w-25 mx-auto mt-3 p-3">
      {login ? (
        <div className="file-form">
          <h1>Edit Details</h1>
          <form onSubmit={editUser}>
            <div className="form-label">
              <b>Enter Email:</b>
            </div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              value={email}
              className="w-100 p-2 mb-2"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            <div className="form-label">
              <b>Enter Username:</b>
            </div>
            <input
              type="text"
              placeholder="Username"
              name="name"
              required
              value={name}
              className="w-100 p-2 mb-2"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />
            <div className="form-label">
              <b>Enter Password:</b>
            </div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              className="w-100 p-2 mb-2"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <div className="form-label">
              <b>Enter Date of Birth:</b>
            </div>
            <input
              type="date"
              placeholder="date of birth"
              name="dob"
              required
              value={dob}
              className="w-100 p-2 mb-2"
              onChange={(e) => {
                setDob(e.target.value);
              }}
            />
            <br />
            <button
              type="submit"
              className="btn btn-primary btn-lg m-2 mx-auto w-100"
            >
              Save
            </button>
          </form>
          <p className="msg">{msg}</p>
        </div>
      ) : (
        <p>Please Login</p>
      )}
    </div>
  );
}
