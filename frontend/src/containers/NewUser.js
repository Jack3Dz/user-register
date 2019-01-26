import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewUser extends Component {
    state = {
        id: '',
        name: '',
        cpfcnpj: '',
    };

    handleInputChange = e => {
        this.props.onClearErrors()
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleInputCpfCnpjChange = e => {
        this.props.onClearErrors()
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();

        if (this.props.currentUser.isEdit) {
            this.handleUserChange()
            this.props.onEdit(this.state);
            this.handleReset();
        } else {
            if (this.state.name.trim() && this.state.cpfcnpj.trim())
                this.props.onAddUser(this.state);
            this.handleReset();
        }
    };

    handleReset = () => {
        this.props.onClearErrors()
        this.props.onClear()
        this.setState({
            id: '',
            name: '',
            cpfcnpj: '',
        });
    };

    handleUserChange() {
        var stateObject = this.state
        stateObject.id = this.props.currentUser.id
        stateObject.name = this.state.name !== '' ? this.state.name : this.props.currentUser.name
        stateObject.cpfcnpj = this.state.cpfcnpj !== '' ? this.state.cpfcnpj : this.props.currentUser.cpfcnpj

        if (this.props.currentUser.isEdit) {
            this.setState(stateObject)
        }
    }

    render() {
        return (
            <div>
                <form className="form-inline" onSubmit={this.handleSubmit}>
                    <div className="form-group margin-right">
                        <input
                            type="text"
                            placeholder="Name"
                            className="form-control"
                            name="name"
                            onChange={this.handleInputChange}
                            value={this.state.name !== '' ? this.state.name : this.props.currentUser.name}
                        />
                    </div>
                    <div className="form-group margin-right">
                        <input
                            id="cpfcnpj"
                            type="text"
                            placeholder="CPF/CNPJ"
                            className="form-control"
                            name="cpfcnpj"
                            onChange={this.handleInputChange}
                            value={this.state.cpfcnpj !== '' ? this.state.cpfcnpj : this.props.currentUser.cpfcnpj}>
                        </input>
                    </div>
                    <div className="form-group">
                        <button type="submit" className={this.props.currentUser.isEdit ? "btn btn-success margin-right hidden" : "btn btn-success margin-right"}>
                            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                            &nbsp;
                            Adicionar
                        </button>
                        <button type="submit" className={this.props.currentUser.isEdit ? "btn btn-primary margin-right" : "btn btn-primary margin-right hidden"}>
                            <span className="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span>
                            &nbsp;
                            Salvar
                        </button>
                        <button type="button" className="btn btn-default margin-right" onClick={this.handleReset}>
                            <span className="glyphicon glyphicon-erase" aria-hidden="true"></span>
                            &nbsp;
                            Limpar
                        </button>
                    </div>
                    <div className={this.props.error.message !== '' ? "alert alert-danger margin-top" : "alert alert-danger margin-top hidden"} role="alert">
                        <strong>{this.props.error.message}</strong>
                    </div>
                </form>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        error: state.error
    };
};

export default connect(mapStateToProps)(NewUser);