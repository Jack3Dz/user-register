import React, { Component } from 'react';
import CreateUser from './containers/CreateUser';
import UserList from './containers/UserList';
import ReduxToastr from 'react-redux-toastr'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import './css/main.css'

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <ReduxToastr
            timeOut={4000}
            newestOnTop={false}
            preventDuplicates
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
            progressBar
            closeOnToastrClick />
        </div>
        <div className="container">
          <h1 className="styles-app">Usuários</h1>
          <div className="row styles-app">
            <div className="col-md-12">
              <CreateUser />
            </div>
            <div className="col-md-12">
              <UserList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;