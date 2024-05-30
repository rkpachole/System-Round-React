import React, { useState } from 'react';
import data from '../fileSystemData.json';
import FileTree from './FileTree';
import FileContent from './FileContent';
import FileOperations from './FileOperations';

const FileExplorer = () => {
  const [fileSystem, setFileSystem] = useState(data);
  const [selectedFile, setSelectedFile] = useState(null);

  const selectFile = (file) => {
    setSelectedFile(file);
  };

  const updateFileSystem = (newFileSystem) => {
    setFileSystem(newFileSystem);
  };

  const handleCreate = (path, type) => {
    const newFileSystem = { ...fileSystem };
    const parts = path.split('/');
    let current = newFileSystem.root;

    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        if (type === 'folder') {
          current.children[part] = { type: 'folder', children: {} };
        } else if (type === 'file') {
          current.children[part] = { type: 'file' };
        }
      } else {
        current = current.children[part];
      }
    });

    updateFileSystem(newFileSystem);
  };

  const handleRename = (oldPath, newName) => {
    const newFileSystem = { ...fileSystem };
    const parts = oldPath.split('/');
    let current = newFileSystem.root;

    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        const item = current.children[part];
        delete current.children[part];
        current.children[newName] = item;
      } else {
        current = current.children[part];
      }
    });

    updateFileSystem(newFileSystem);
  };

  const handleDelete = (path) => {
    const newFileSystem = { ...fileSystem };
    const parts = path.split('/');
    let current = newFileSystem.root;

    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        delete current.children[part];
      } else {
        current = current.children[part];
      }
    });

    updateFileSystem(newFileSystem);
  };

  return (
    <div className="file-explorer">
      <FileTree fileSystem={fileSystem} selectFile={selectFile} />
      <div className="file-content-operations">
        <FileContent file={selectedFile} />
        <FileOperations
          selectedFile={selectedFile}
          onCreate={handleCreate}
          onRename={handleRename}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default FileExplorer;
