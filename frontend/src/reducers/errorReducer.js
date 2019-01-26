import { ERROR_HANDLER, CLEAR_ERROR_HANDLER } from '../constants/ActionTypes';

const initialState = {
    status: '',
    message: '',
}

export default function errorReducer(state = initialState, action) {
    switch (action.type) {
        case ERROR_HANDLER:
            return {
                ...state,
                status: action.payload.status,
                message: action.payload.message,
            }
        case CLEAR_ERROR_HANDLER:
            return {
                ...state,
                status: '',
                message: '',
            };
        default:
            return state;
    }
}