import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectFile, toggleFolder } from '../redux/reducers/fileSystemReducer';

const DirectoryTree = ({ data ,currentPath,setCurrentPath}) => {

    const dispatch = useDispatch();
    const expandedFolders = useSelector((state) => state.fileSystem.expandedFolders);

    const handleToggle = (path) => {
        dispatch(toggleFolder(path));
        setCurrentPath(path);
    };
    const handleFileClick = (path) => {
        dispatch(selectFile(path));
    };

    const renderTree = (node, path) => {
        if (node.type === 'folder') {
            return (
                <div key={path}>
                    <div onClick={() => handleToggle(path)}>{expandedFolders[path] ? '-' : '+'}{node.name}</div>
                    {expandedFolders[path] && node.children.map((child, index) => renderTree(child, `${path}/${child.name}`))}
                </div>);
        }

        else {
            return (
                <div key={path} onClick={() => handleFileClick(path)}>{node.name}</div>
            )
        }
    }

    return (
        <div>{renderTree(data, 'root')}</div>
    );
}

export default DirectoryTree;