import React from 'react';

const FileContent = ({ file }) => {
  return (
    <div className="file-content">
      {file ? (
        <div>
          <h3>{file.path.split('/').pop()}</h3>
          <p>Content of the file...</p>
        </div>
      ) : (
        <p>Select a file to view its content</p>
      )}
    </div>
  );
};

export default FileContent;
