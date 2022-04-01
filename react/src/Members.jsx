import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Members() {
  const token = localStorage.getItem('token');
  const [login, setLogin] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (!token) {
      setLogin(false);
      console.log(token);
    } else {
      setLogin(true);
      console.log(token);
      axios
        .get(`/users/list`, { headers: { token } })
        .then((res) => {
          console.log(res.data);
          setUsers(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <div>
      {login ? (
        <div className="file-form">
          <h1>Users Details</h1>
          <div className="w-75 mx-auto mt-4">
            <div className="row w-100 border border-info p-2 ">
              <div className="col h5">Email</div>
              <div className="col h5">Name</div>
              <div className="col h5">Date of birth</div>
            </div>
            {users.map((user) => (
              <div className="row w-100 border border-info p-2 ">
                <div className="col">{user.email}</div>
                <div className="col">{user.name}</div>
                <div className="col">{user.dob}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Please Login</p>
      )}
    </div>
  );
}
