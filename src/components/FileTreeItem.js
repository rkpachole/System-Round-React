import React, { useState } from 'react';
import { FaFolder, FaFile } from 'react-icons/fa';

const FileTreeItem = ({ node, path, selectFile }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleClick = () => {
    if (node.type === 'file') {
      selectFile({ ...node, path });
    } else {
      handleExpand();
    }
  };

  return (
    <div className="file-tree-item">
      <div onClick={handleClick}>
        {node.type === 'folder' ? <FaFolder /> : <FaFile />} {path.split('/').pop()}
      </div>
      {node.type === 'folder' && expanded && (
        <div className="file-tree-children">
          {Object.keys(node.children).map((child) => (
            <FileTreeItem key={child} node={node.children[child]} path={`${path}/${child}`} selectFile={selectFile} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FileTreeItem;
