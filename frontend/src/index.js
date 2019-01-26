
import React from 'react';
import ReactDOM from 'react-dom';
import { Store } from './store'
import { Provider } from 'react-redux';

import App from './App';
import { fetchAllUsers } from './actions/user';

import registerServiceWorker from './registerServiceWorker';

Store.dispatch(fetchAllUsers());

ReactDOM.render(
    <Provider store={Store}>
        <App />
    </Provider>, document.getElementById('root'));

registerServiceWorker();