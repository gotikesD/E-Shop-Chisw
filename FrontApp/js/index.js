'use strict';

import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import thunk from 'redux-thunk'

import reducer from './reducers'
import routes from './routes'
import {Router, browserHistory} from 'react-router'

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

const history = syncHistoryWithStore(browserHistory, store);

render(
    <Provider store={store}>
            <Router history={history} routes={routes} />
    </Provider>,
    document.getElementById('root')
);