import { UPDATE_CURRENT_USER, CLEAR_USER_DATA } from '../constants/ActionTypes';

const initialState = {
    id: '',
    name: '',
    cpfcnpj: '',
    isEdit: false
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CURRENT_USER:
            return {
                ...state,
                id: action.currentUser._id,
                name: action.currentUser.name,
                cpfcnpj: action.currentUser.cpfcnpj,
                isEdit: true
            }
        case CLEAR_USER_DATA:
            return {
                ...state,
                id: '',
                name: '',
                cpfcnpj: '',
                isEdit: false
            };
        default:
            return state;
    }
}