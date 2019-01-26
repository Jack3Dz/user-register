import { ADD_USER, DELETE_USER, UPDATE_USER, FETCH_USER, DEACTIVATE_USER } from '../constants/ActionTypes';

const initialState = {
    users: []
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_USER:
            return [...state, action.payload];
        case DELETE_USER:
            return state.filter(user => user._id !== action.payload.id);
        case UPDATE_USER:
            return updateObject(state, action)
        case FETCH_USER:
            return action.users;
        case DEACTIVATE_USER:
            return updateObject(state, action)
        default: 
            return state;
    }
}

function updateObject(array, action) {
    return array.map((item, index) => {
        if (item._id !== action.payload._id) {
            return item
        }
        
        return {
            ...item,
            ...action.payload
        }
    })
}