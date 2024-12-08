import React, { useEffect, useState } from 'react';
import { getSubDirectories, uploadFile } from '../services/api';

function SubDirectoryPanel({ folderId }) {
  const [subDirectories, setSubDirectories] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (folderId) {
      getSubDirectories(folderId).then((data) => setSubDirectories(data));
    }
  }, [folderId]);

  const handleUploadFile = async () => {
    if (!file) return alert('Please select a file');
    await uploadFile(file, folderId);
    alert('File uploaded successfully');
    setFile(null);
  };

  if (!folderId) {
    return <p>Please select a folder to view its subdirectories.</p>;
  }

  return (
    <div>
      <h3>Subdirectories</h3>
      <ul>
        {subDirectories.map((subDir) => (
          <li key={subDir.id}>{subDir.name}</li>
        ))}
      </ul>
      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default SubDirectoryPanel;