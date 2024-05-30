import React, { useState } from 'react';
import data from '../fileSystemData.json';
import FileTree from './FileTree';
import FileContent from './FileContent';

const FileExplorer = () => {
  const [fileSystem, setFileSystem] = useState(data);
  const [selectedFile, setSelectedFile] = useState(null);

  const selectFile = (file) => {
    setSelectedFile(file);
  };

  const updateFileSystem = (newFileSystem) => {
    setFileSystem(newFileSystem);
  };

  return (
    <div className="file-explorer">
      <FileTree fileSystem={fileSystem} selectFile={selectFile} />
      <FileContent file={selectedFile} />
    </div>
  );
};

export default FileExplorer;
