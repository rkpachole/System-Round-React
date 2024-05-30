import React, { useState } from 'react';

const FileOperations = ({ selectedFile, onCreate, onRename, onDelete }) => {
  const [newName, setNewName] = useState('');
  const [newFilePath, setNewFilePath] = useState('');
  const [newFileType, setNewFileType] = useState('file');

  const handleCreate = () => {
    if (newFilePath) {
      onCreate(newFilePath, newFileType);
      setNewFilePath('');
    }
  };

  const handleRename = () => {
    if (selectedFile && newName) {
      onRename(selectedFile.path, newName);
      setNewName('');
    }
  };

  const handleDelete = () => {
    if (selectedFile) {
      onDelete(selectedFile.path);
    }
  };

  return (
    <div className="file-operations">
      <div>
        <input
          type="text"
          value={newFilePath}
          onChange={(e) => setNewFilePath(e.target.value)}
          placeholder="New file/folder path"
        />
        <select
          value={newFileType}
          onChange={(e) => setNewFileType(e.target.value)}
        >
          <option value="file">File</option>
          <option value="folder">Folder</option>
        </select>
        <button onClick={handleCreate}>Create</button>
      </div>
      <div>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New name"
        />
        <button onClick={handleRename}>Rename</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default FileOperations;
