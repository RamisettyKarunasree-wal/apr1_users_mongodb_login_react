import React, { useState } from 'react';
import axios from 'axios';

export default function CreateFolder() {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const addFolder = (event) => {
    event.preventDefault();
    axios
      .post(`/file/createDirectory/${event.target.foldername.value}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 'EEXIST') {
          setError('folder already exists');
          setMessage('');
        } else {
          setError('');
          setMessage(res.data);
        }
      })
      .catch((err) => {
        setError('');
        setMessage('');
        console.log(err);
      });
  };
  return (
    <div className="file-form">
      <h1>Create Folder</h1>
      <p className="error">{error}</p>
      <form onSubmit={addFolder}>
        <div>
          <b>Enter Folder Name:</b>
        </div>
        <input
          type="text"
          placeholder="Foldername"
          name="foldername"
          required
        />
        <br />
        <button type="submit">Create</button>
      </form>
      <p className="msg">{message}</p>
    </div>
  );
}
