import React, { useState } from 'react';
import FolderPanel from './components/FolderPanel';
import SubDirectoryPanel from './components/SubDirectoryPanel';
import './index.css';

function App() {
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  return (
    <div className="container">
      <div className="panel panel-left">
        <FolderPanel onSelectFolder={(id) => setSelectedFolderId(id)} />
      </div>
      <div className="panel panel-right">
        <SubDirectoryPanel folderId={selectedFolderId} />
      </div>
    </div>
  );
}

export default App;