import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register() {
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const addUser = (event) => {
    event.preventDefault();
    const user = {
      name: event.target.name.value,
      password: event.target.password.value,
      email: event.target.email.value,
      dob: event.target.dob.value,
    };
    axios
      .post('/users/', user)
      .then((res) => {
        if (res.data.status === 0) {
          setError(res.data.data);
          setMsg('');
        } else {
          setMsg(res.data.data);
          setError('');
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="fluid-container border border-primary w-25 mx-auto mt-3 p-3">
      <h1>Register Here</h1>
      <p className="error">{error}</p>
      <form onSubmit={addUser}>
        <div className="form-label">
          <b>Enter Email:</b>
        </div>
        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          className="w-100 p-2 mb-2"
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
          className="w-100 p-2 mb-2"
        />
        <br />
        <div className="form-label ">
          <b>Enter Password:</b>
        </div>
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          className="w-100 p-2 mb-2"
        />
        <br />
        <div className="form-label">
          <b>Enter Date of Birth:</b>
        </div>
        <input
          type="date"
          placeholder="dob"
          name="dob"
          required
          className="w-100 p-2 mb-2"
        />
        <br />
        <button
          type="submit"
          className="btn btn-primary btn-lg m-2 mx-auto w-100"
        >
          Register
        </button>
      </form>
      <p className="msg">{msg}</p>
    </div>
  );
}
