import React, { useState } from 'react';
import axios from 'axios';

export default function CreateFile() {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const addFile = (event) => {
    event.preventDefault();
    const file = {
      filename: event.target.filename.value,
      fileContent: event.target.fileContent.value,
    };
    axios
      .post('/file/createFile', file)
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 'EISDIR') {
          setMessage('');
          setError(
            `${file.filename} is a Directory,unable to write to directory`
          );
        } else {
          setError('');
          setMessage(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="file-form">
      <h1>Create File</h1>
      <p className="error">{error}</p>
      <form onSubmit={addFile}>
        <div>
          <b>Enter File Name:</b>
        </div>
        <input type="text" placeholder="Filename" name="filename" required />
        <br />
        <div>
          <b>Enter File Contents</b>
        </div>
        <textarea placeholder="File Content" name="fileContent" />
        <br />
        <button type="submit">Create</button>
      </form>
      <p className="msg">{message}</p>
    </div>
  );
}
