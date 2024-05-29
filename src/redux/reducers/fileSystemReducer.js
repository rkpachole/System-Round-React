import { createSlice } from '@reduxjs/toolkit';
import fileSystemData from "../../fileSystemData.json";
import { createNote, deleteNode, renameNode } from "../../utils/fileSystemUtils"

const initialState = {
    fileSystem: fileSystemData,
    selectedFile: null,
    expandedFolders: {},
};
const fileSystemSlice = createSlice({
    name: "fileSystem",
    initialState,
    reducers: {
        selectFile: (state, action) => {
            state.selectedFile = action.payload;
        },
        toggleFolder: (state, action) => {
            const path = action.payload;
            state.expandedFolders[path] = !state.expandedFolders[path];
        },
        createFile: (state, action) => {
            const { path, newNode } = action.payload;
            createNote(path, newNode, state.fileSystem)
        },
        deleteFile: (state, action) => {
            const path = action.payload;
            deleteNode(path, state.fileSystem);
        },
        renameFile: (state, action) => {
            const { path, newName } = action.payload;
            renameNode(path, newName, state.creteFilefileSystem);
        },
    },
})
export const { selectFile, toggleFolder, createFile, deleteFile, renameFile } = fileSystemSlice.actions;
export default fileSystemSlice.reducer;


