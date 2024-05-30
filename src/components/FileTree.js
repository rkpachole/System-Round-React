import React from 'react';
import FileTreeItem from './FileTreeItem';

const FileTree = ({ fileSystem, selectFile }) => {
  return (
    <div className="file-tree">
      <FileTreeItem node={fileSystem.root} path="root" selectFile={selectFile} />
    </div>
  );
};

export default FileTree;
