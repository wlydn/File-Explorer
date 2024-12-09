import React, { useEffect, useState } from "react";
import { getSubDirectories, uploadFile } from "../services/api";

function SubDirectoryPanel({ folderId }) {
  const [subDirectories, setSubDirectories] = useState([]);
  const [file, setFile] = useState(null);
  console.log("folderId", folderId);

  useEffect(() => {
    if (folderId) {
      getSubDirectories(folderId).then((data) => {
        console.log(data);
        setSubDirectories(data);
      });
    }
  }, [folderId]);

  const handleUploadFile = async () => {
    if (!file) return alert("Please select a file");
    await uploadFile(file, folderId);
    alert("File uploaded successfully");
    setFile(null);
  };

  const [newFolderName, setNewFolderName] = useState("");

  const handleCreateFolder = async () => {  
    if (!newFolderName.trim()) return alert('Folder name is required');
    const folder = await createFolder(newFolderName, folderId);
    setSubDirectories([...subDirectories, folder]);
    setNewFolderName("");
  };

  const createFolder = async (name, parent_id = null) => {
    const response = await fetch(`${BASE_URL}/create-folder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, parent_id }),
    });
    if (!response.ok) {
      throw new Error("Failed to create folder");
    }
    return response.json();
  }

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
      <div><input
          type="text"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          placeholder="New folder name"
        />
        <button onClick={handleCreateFolder}>Create Folder</button>
      </div>
      <h3>Upload File</h3>
      <div>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default SubDirectoryPanel;
