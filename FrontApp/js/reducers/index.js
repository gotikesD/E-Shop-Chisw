/**
 * Created by user on 18.04.16.
 */
import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import products from './products'

let reducers = combineReducers({
    products,
    routing
});

export default reducers;