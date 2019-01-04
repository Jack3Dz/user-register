import { combineReducers } from 'redux';
import users from './userReducer';
import currentUser from './currentUserReducer';
import error from './errorReducer';
import {reducer as toastrReducer} from 'react-redux-toastr'

export default combineReducers({
    users,
    currentUser,
    error,
    toastr: toastrReducer
});