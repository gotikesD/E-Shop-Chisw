"use strict";
import types from '../constants/constants';
import store from '../api/store';

import cartActions from '../api/cartActions';


function socialLoginAction(token) {
    console.log('From action');
    return {
        type: types.LOGIN_IN_WITH_SOCIAL,
        isAuthorized : token
    }
}

export function socialLogin(token) {
    return dispatch => {
        store.socialLogin(token,
            token => {
                dispatch(socialLoginAction(token))
            })
    }
}



function clearCartAction() {
    return {
        type: types.CLEAR_CART
    }
}

export function clearCart() {
    return dispatch => {
        dispatch(clearCartAction())
    }
}

function orderSetter(orders) {
    return {
        type: types.GET_YOUR_ORDERS,
        orders: orders
    }
}


export function loadOrders() {
    return dispatch => {
        cartActions.getFiltered(
            orders => {
                dispatch(orderSetter(orders))
            })
    }
}



function ProdBySubTopic(products) {
    return {
        type: types.GET_PROD_BY_SUB_TOPIC,
        products: products
    }
}


export function BySubTopic(products) {
    return dispatch => {
        dispatch(ProdBySubTopic(products))
    }
}


function ByTopic(products) {
    return {
        type: types.GET_PROD_BY_TOPIC,
        products: products
    }
}


export function ProdByTopic(_id) {
    console.log('_id in actions',_id);
    return dispatch => {
        store.getByCategory(_id,
            products => {
                console.log('ProdByTopic: ', products);
                dispatch(ByTopic(products))
        })
    }
}


function receiveProducts(products) {
    return {
        type: types.INIT_PRODUCTS,
        products: products,
        info : true
    }
}

export function getAllProducts() {
    return dispatch => {
        store.getProducts(products => {
            dispatch(receiveProducts(products))
        })
    }
}


function receiveProductsByPage(products) {
    return {
        type: types.PRODUCTS_ON_PAGE,
        products: products
    }
}

export function paginate(productsPerPage, pageNumber) {

    return dispatch => {
        store.getPage(productsPerPage, pageNumber, products => {
            dispatch(receiveProductsByPage(products))
        })
    }
}

function receiveTopics(topics) {
    return {
        type: types.INIT_TOPICS,
        topics: topics
    }
}

export function getAllTopics() {
    return dispatch => {
        store.getTopics(topics => {
            dispatch(receiveTopics(topics))
        })
    }
}

function ProductInfo(product) {
    return {
        type: types.GET_PROD_INFO,
        products: product
    }
}

export function logout() {
    return dispatch => {
        dispatch({
            type: types.LOGOUT,
            isAuthorized: false
        });
    }
}

export function login(email, password) {
    return (dispatch) => {
        store.login(email, password, dispatch);
    }
}

export function createUser(email, password, firstName, lastName) {

    return (dispatch) => {
        dispatch({
            type: types.USER_CREATION_REQUEST,
            fetching: true
        });

        store.createUser(email, password, firstName, lastName, dispatch);
    }
}

export function searchProducts(criteria) {
    return (dispatch) => {
        dispatch({
            type: types.SEARCH_PRODUCT,
            fetching: true
        });

        store.searchProduct(criteria, dispatch);
    }
}

export function addToCart(item) {
    return dispatch => {
        dispatch(cartActions.addToCart(item));
    }
}

export function removeFromCart(_id) {
    return dispatch => {
        dispatch(cartActions.removeFromCart(_id));
    }
}

