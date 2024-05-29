import React, { Children, useState } from 'react'
import "./FileExplorer.css";
import { useSelector, useDispatch } from 'react-redux';
import DirectoryTree from "./DirectoryTree";
import { toggleFolder, selectFile, createFile, deleteFile, renameFile } from "../redux/reducers/fileSystemReducer"


const FileExplorer = () => {
    const fileSystem = useSelector((state) => state.fileSystem.fileSystem);
    const expandedFolders= useSelector((state)=>state.fileSystem.expandedFolders)
    const selectedFile = useSelector((state) => state.fileSystem.selectedFile);
    const dispatch = useDispatch();
    const [currentPath, setCurrentPath] = useState('root');

    const handleFlieClick = (path) => {
        dispatch(selectFile(path));
    }
    const handleFolderClick = (path) => {
        setCurrentPath(path)
        dispatch(toggleFolder(path));

    }
    const handleCreateFile = (path, name, type) => {
        const newNode = { name, type, children: type === 'folder' ? [] : undefined };
        dispatch(createFile({ path, newNode }))
    }
    const handleDeleteFile = (path, name, type) => {
        dispatch(deleteFile(path));
    }
    const handleRenameFile = (path, newName) => {
        dispatch(renameFile({ path, newName }))
    }
    const renderTree = (node, path) => {
        if (node.type === 'folder') {
            return (
                <div key={path}>
                    <div onClick={() => handleFolderClick(path)}>{expandedFolders[path] ? '-' : '+'}{node.name}</div>
                    {expandedFolders[path] && node.children.map((child, index) => renderTree(child, `${path}/${child.name}`))}
                </div>);
        }

        else {
            return (
                <div key={path} onClick={() => handleFlieClick(path)}>{node.name}</div>
            )
        }
    }
    const renderCurrentFolderContents = (path) => {
        const parts = path.split('/').filter(part => part !== 'root');
        let current = fileSystem;
        for (let part of parts) {
            current = current.children.find(child => child.name === part);
        }
        if (current.type === 'folder') {
            return current.children.map((node) => {
                const newPath = `${path}/${node.name}`;
                if (node.type === 'folder') {
                    return (<div key={newPath} onClick={() => handleFolderClick(newPath)}>{node.name}</div>);
                }
                else {
                    return (<div key={newPath} onClick={handleFlieClick(newPath)}>{node.name}</div>);
                }

            });
        }
        return null;
    };
    return (
        <div className='"file-explorer'>
            <div className='directory-tree'>
                {renderTree(fileSystem, 'root')}
                <div className='folder-contents'>
                    {renderCurrentFolderContents(currentPath)}</div>
                <DirectoryTree
                    data={fileSystem}
                    onFlieClick={handleFlieClick}
                    onFolderClick={handleFolderClick}
                />
            </div>
            <div className='file-viewer'>

                {selectedFile ? (
                    <div><div>Selected File:{selectedFile}</div>
                        <button onClick={() => handleRenameFile(selectedFile, 'newName.txt')}>renameNode
                        </button>
                        <button onClick={() => handleDeleteFile(selectedFile, 'newName.txt')}>Delete
                        </button></div>
                ) : (
                    <div> select a file to view its content</div>
                )}
                <button onClick={() => handleCreateFile('root', 'New Folder', 'folder')}>Create Folder</button>
                <button onClick={() => handleCreateFile('root', 'New File.txt', 'file')}>Create file</button>
            </div>
        </div>
    )
}

export default FileExplorer;