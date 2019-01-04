
import {
    ADD_USER,
    DELETE_USER,
    UPDATE_USER,
    FETCH_USER,
    UPDATE_CURRENT_USER,
    CLEAR_USER_DATA,
    ERROR_HANDLER,
    CLEAR_ERROR_HANDLER,
    DEACTIVATE_USER
} from '../constants/ActionTypes';
import { toastr } from 'react-redux-toastr'
import axios from 'axios';

const apiUrl = 'http://localhost:8080/api/v1';

export const createUser = ({ name, cpfcnpj }) => {
    return (dispatch) => {
        return axios.post(`${apiUrl}/users/`, { name, cpfcnpj })
            .then(response => {
                toastr.success('Success ', response.data.message)
                dispatch(createUserSuccess(response.data.data))
            })
            .catch(error => {
                toastr.error('Failed ', error.response.data.message)
                dispatch(errorHandler(error.response.data));
            });
    };
};

export const createUserSuccess = (data) => {
    return {
        type: ADD_USER,
        payload: {
            _id: data._id,
            name: data.name,
            cpfcnpj: data.cpfcnpj
        }
    }
};

export const deleteUserSuccess = id => {
    return {
        type: DELETE_USER,
        payload: {
            id
        }
    }
}

export const deleteUser = (id) => {
    return (dispatch) => {
        return axios.delete(`${apiUrl}/users/${id}`)
            .then(response => {
                toastr.success('Success ', response.data.message)
                dispatch(deleteUserSuccess(id))
            })
            .catch(error => {
                toastr.error('Failed ', error.response.data.message)
                dispatch(errorHandler(error.response.data));
            });
    };
};

export const updateUserSuccess = (data) => {
    return {
        type: UPDATE_USER,
        payload: {
            _id: data._id,
            name: data.name,
            cpfcnpj: data.cpfcnpj
        }
    }
}

export const updateUser = ({ id, name, cpfcnpj }) => {
    return (dispatch) => {
        return axios.put(`${apiUrl}/users/${id}`, { name, cpfcnpj })
            .then(response => {
                toastr.success('Success ', response.data.message)
                dispatch(updateUserSuccess(response.data.data))
            })
            .catch(error => {
                toastr.error('Failed ', error.response.data.message)
                dispatch(errorHandler(error.response.data));
            });
    };
};

export const updateCurrentUserSuccess = (currentUser) => {
    return {
        type: UPDATE_CURRENT_USER,
        currentUser
    }
}

export const updateCurrentUser = (id) => {
    return (dispatch) => {
        return axios.get(`${apiUrl}/users/${id}`)
            .then(response => {
                dispatch(updateCurrentUserSuccess(response.data.data))
            })
            .catch(error => {
                dispatch(errorHandler(error.response.data));
            });
    };
};

export const deactivateUser = ({ _id, name, cpfcnpj, active }) => {
    return (dispatch) => {
        active = !active
        return axios.put(`${apiUrl}/users/${_id}`, { name, cpfcnpj, active })
            .then(response => {
                toastr.success('Success ', response.data.message)
                dispatch(updateUserSuccess(response.data.data))
            })
            .catch(error => {
                toastr.error('Failed ', error.response.data.message)
                dispatch(errorHandler(error.response.data));
            });
    };
};

export const deactivateUserSuccess = (data) => {
    return {
        type: DEACTIVATE_USER,
        payload: {
            _id: data._id,
            name: data.name,
            cpfcnpj: data.cpfcnpj,
            active: data.active
        }
    }
}

export const clearUserData = () => {
    return {
        type: CLEAR_USER_DATA,
    }
}

export const fetchUsers = (users) => {
    return {
        type: FETCH_USER,
        users
    }
};

export const fetchAllUsers = () => {
    return (dispatch) => {
        return axios.get(`${apiUrl}/users/`)
            .then(response => {
                dispatch(fetchUsers(response.data.data))
            })
            .catch(error => {
                throw(error)
            });
    };
};

export const errorHandler = (error) => {
    return {
        type: ERROR_HANDLER,
        payload: error
    }
};

export const clearErrorHandler = () => {
    return {
        type: CLEAR_ERROR_HANDLER,
    }
}