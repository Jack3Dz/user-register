import { connect } from 'react-redux';
import { createUser, updateUser, clearUserData, clearErrorHandler } from '../actions/user';
import NewUser from './NewUser';

const mapDispatchToProps = dispatch => {
    return {
        onAddUser: user => {
            dispatch(createUser(user));
        },
        onEdit: (id, name, cpfcnpj) => {
            dispatch(updateUser(id, name, cpfcnpj))
        },
        onClear: () => {
            dispatch(clearUserData());
        },
        onClearErrors: () => {
            dispatch(clearErrorHandler());
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(NewUser);