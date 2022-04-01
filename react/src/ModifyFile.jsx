import React, { useState } from 'react';
import axios from 'axios';

export default function ModifyFile() {
  const [message, setMessage] = useState('');
  const [edit, setEdit] = useState(false);
  const [filename, setFile] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [error, setError] = useState('');
  const saveFile = () => {
    const file = {
      filename,
      fileContent,
    };
    axios
      .post('/file/createFile', file)
      .then((res) => {
        setMessage('File Contents are modified');
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const editFile = () => {
    setMessage('');
    axios
      .get(`/file/readFile/${filename}`)
      .then((res) => {
        console.log(res);
        if (res.data.status === 0) {
          setEdit(false);
          setError(res.data.data);
        } else {
          setEdit(true);
          setError('');
          setFileContent(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="file-form">
      <div>
        <p className="error">{error}</p>
        <div>
          <b>Enter File Name:</b>
        </div>
        <input
          type="text"
          placeholder="Filename"
          name="filename"
          onChange={(event) => {
            setFile(event.target.value);
          }}
          required
        />
        <br />
        <button type="button" onClick={editFile}>
          Modify
        </button>
      </div>
      {edit ? (
        <div>
          <div>
            <b>Modify File Contents</b>
          </div>
          <textarea
            placeholder={fileContent}
            value={fileContent}
            name="fileContent"
            onChange={(event) => {
              setFileContent(event.target.value);
            }}
          />
          <button type="button" className="btn" onClick={saveFile}>
            Save
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setEdit(false);
            }}
          >
            cancel
          </button>
          <p className="msg">{message}</p>
        </div>
      ) : null}
    </div>
  );
}
