import React from 'react';
import { connect } from 'react-redux';
import User from '../components/User';
import { deleteUser, updateCurrentUser, deactivateUser } from '../actions/user';
import NewUser from './NewUser';

function UserList({ users, onDelete, onEditUser, onDeactivateUser }) {
    if (!users.length) {
        return (
            <div className="margin-top">
                No Users
            </div>
        )
    }
    return (
        <div className="margin-top">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">CPF/CNPJ</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        return (
                            <User user={user} onDelete={onDelete} onEditUser={onEditUser} onDeactivateUser={onDeactivateUser} key={user._id} />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        users: state.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onDelete: id => {
            dispatch(deleteUser(id));
        },
        onEditUser: (id) => {
            dispatch(updateCurrentUser(id))
        },
        onDeactivateUser: (id) => {
            dispatch(deactivateUser(id))
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList, NewUser);