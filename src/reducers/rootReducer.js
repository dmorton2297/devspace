import userReducer from './userReducer';
import projectsReducer from './projectsReducer';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({ userReducer, projectsReducer });

export default rootReducer;