import React from 'react';

export default ({ user: { name, cpfcnpj, _id, active }, onDelete, onEditUser, onDeactivateUser }) => {
    return (
        <tr>
            <th scope="row">{name}</th>
            <td>{cpfcnpj}</td>
            <td>
                <button className="btn btn-warning btn-xs margin-right" type="button" onClick={() => onEditUser(_id)}>
                    <span className="glyphicon glyphicon-edit" aria-hidden="true"> </span>
                    &nbsp;
                    Editar
                </button>
                <button className="btn btn-primary btn-xs margin-right" type="button" onClick={() => onDeactivateUser({_id, name, cpfcnpj, active})}>
                    <span className="glyphicon glyphicon-eye-close" aria-hidden="true"> </span>
                    &nbsp;
                    Ativar/Desativar
                </button>
                <button className="btn btn-danger btn-xs margin-right" type="button" onClick={() => onDelete(_id)}>
                    <span className="glyphicon glyphicon-trash" aria-hidden="true"> </span>
                    &nbsp;
                    Excluir
                </button>
            </td>
        </tr>
    );
};