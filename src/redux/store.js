import { configureStore } from "@reduxjs/toolkit";
import fileSystemReducer from "./reducers/fileSystemReducer";
const store = configureStore({
    reducer:{
        fileSystem:fileSystemReducer,
    }
})
export default store;