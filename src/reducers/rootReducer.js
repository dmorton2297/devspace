import userReducer from './userReducer';
import projectsReducer from './projectsReducer';
import tabReducer from './tabReducer';
import blogReducer from './blogReducer';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({ userReducer, projectsReducer, tabReducer, blogReducer });

export default rootReducer;