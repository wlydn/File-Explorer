const BASE_URL = 'http://localhost:4000/api';

export const getFolders = async () => {
  const response = await fetch(`${BASE_URL}/folders`);
  if (!response.ok) {
    throw new Error('Failed to fetch folders');
  }
  return response.json();
};

export const getSubDirectories = async (folderId) => {
  const response = await fetch(`${BASE_URL}/sub-directories/${folderId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch subdirectories');
  }
  return response.json();
};

export const createFolder = async (name, parent_id = null) => {
  const response = await fetch(`${BASE_URL}/create-folder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, parent_id }),
  });
  if (!response.ok) {
    throw new Error('Failed to create folder');
  }
  return response.json();
};

export const uploadFile = async (file, folder_id = null) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder_id', folder_id);

  const response = await fetch(`${BASE_URL}/upload-file`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Failed to upload file');
  }
  return response.json();
};