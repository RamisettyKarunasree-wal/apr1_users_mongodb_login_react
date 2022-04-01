import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import CreateFile from './CreateFile';
import CreateFolder from './CreateFolder';
import ShowFiles from './ShowFiles';
import ModifyFile from './ModifyFile';

export default function FileManager() {
  return (
    <div>
      <BrowserRouter>
        <div className="nav">
          <NavLink activeClassName="active" className="links" to="/createFile">
            createFile
          </NavLink>
          <NavLink
            activeClassName="active"
            className="links"
            to="/createFolder"
          >
            createFolder
          </NavLink>
          <NavLink activeClassName="active" className="links" to="/showFiles">
            Files List
          </NavLink>
          <NavLink activeClassName="active" className="links" to="/modifyFile">
            Modify Files
          </NavLink>
        </div>
        <Routes>
          <Route path="/createFile" element={<CreateFile />} />
          <Route path="/createFolder" element={<CreateFolder />} />
          <Route path="/showFiles" element={<ShowFiles />} />
          <Route path="/modifyFile" element={<ModifyFile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
