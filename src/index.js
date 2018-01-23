import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import configureStore from './store'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'

const store = configureStore()
window.store = store;

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
)
registerServiceWorker();
