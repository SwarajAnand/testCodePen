import {combineReducers} from 'redux'
import useAuthReducer from './userAuthReducer'
import projectReducer from './projectReducer'
import searchReducer from './searchReducer'

const myReducer = combineReducers({
    user : useAuthReducer,
    projects: projectReducer,
    searchTerm: searchReducer
})

export default myReducer