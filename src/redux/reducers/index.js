import { combineReducers } from 'redux'
import fileSystemReducer from './fileSystemReducer'
const rootReducer= combineReducers({
    fileSystem:fileSystemReducer
}) ;
  

export default rootReducer;