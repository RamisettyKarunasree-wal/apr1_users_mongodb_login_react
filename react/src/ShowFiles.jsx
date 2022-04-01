import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ShowFiles() {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [list, setList] = useState([]);
  const getFiles = () => {
    axios
      .get('/file/readDirectory')
      .then((res) => {
        console.log(res.data);
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getFiles();
  }, []);
  const deleteFile = (file) => {
    axios
      .delete(`/file/deleteFile/${file}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 0) {
          setMessage('');
          setError(res.data.data);
        } else {
          setError('');
          setMessage(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    getFiles();
  };
  return (
    <div className="file-form">
      <h1>Files List</h1>
      <p className="error">{error}</p>
      <table>
        <tr>
          <th>File Name</th>
          <th>delete</th>
        </tr>
        {list.map((file) => (
          <tr>
            <td>{file}</td>
            <td>
              <button
                type="button"
                onClick={() => {
                  deleteFile(file);
                }}
              >
                Remove File
              </button>
            </td>
          </tr>
        ))}
      </table>

      <p className="msg">{message}</p>
    </div>
  );
}
