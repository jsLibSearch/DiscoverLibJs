import React from 'react';
import ReactDOM from 'react-dom';
import './custom-bootstrap.css';
import './index.css';
import App from './App';
import AnimThree from './three';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

ReactDOM.render(
    <Provider store={ createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) }>
        <Router>
            <Route path='/' component={App} />
        </Router>
    </Provider>
, document.getElementById('root'));
// ReactDOM.render(<AnimThree />, document.getElementById('anim'));
registerServiceWorker();
