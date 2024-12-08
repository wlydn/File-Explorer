import React, { useEffect, useState } from 'react';
import { getFolders, createFolder } from '../services/api';

function FolderPanel({ onSelectFolder }) {
  const [folders, setFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState('');

  useEffect(() => {
    getFolders().then((data) => setFolders(data));
  }, []);

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return alert('Folder name is required');
    const folder = await createFolder(newFolderName);
    setFolders([...folders, folder]);
    setNewFolderName('');
  };

  return (
    <div>
      <h3>Folders</h3>
      <ul>
        {folders.map((folder) => (
          <li key={folder.id}>
            <button onClick={() => onSelectFolder(folder.id)}>{folder.name}</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="New folder name"
        />
        <button onClick={handleCreateFolder}>Create Folder</button>
      </div>
    </div>
  );
}

export default FolderPanel;