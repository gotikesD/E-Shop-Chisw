"use strict";
import 'whatwg-fetch';
import 'babel-polyfill';
import jwtDecode from 'jwt-decode';
import types from '../constants/constants';

const API_URL = 'http://127.0.0.1:3000/auth/login';
const REGISTRATION_URL = 'http://127.0.0.1:3000/users';
const SEARCH_PRODUCTS_URL = 'http://localhost:5000/search';

const API_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export default {

    socialLogin(cookie, callback) {
        cookie.split(';').forEach((i) => {
            if(i.split('=')[0] === 'token') {
                localStorage.setItem('access_token', i.split('=')[1]);
                let token = localStorage.getItem('access_token');
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                callback(token)
            }
        });
    },

    getByCategory(_id,callback) {
        fetch(`http://localhost:5000/products/${_id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                console.log('resp dat ',responseData);
                callback(responseData);
            })
            .catch((error) => {
                throw error;
            });
    },
    // this function is deprecated
    getTopics(callback) {
        fetch('http://localhost:5000/sidebarTopics')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                callback(responseData);
            })
            .catch((error) => {
                throw error;
            });
    },

    getSubTopics(id, callback) {
        fetch(`http://localhost:5000/topics/${id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                callback(responseData);
            })
            .catch((error) => {
                throw error;
            });
    },

    getProducts(callback) {
        fetch('http://localhost:5000/allproducts')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                callback(responseData)
            })
            .catch((error) => {
                throw error;
            });
    },

    login(email, password, callback) {

        let requestBody = {
            email: email,
            password: password
        };

        fetch(API_URL, {
            method: 'post',
            mode: 'cors',
            headers: API_HEADERS,
            body: JSON.stringify(requestBody)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK")
                }
            })
            .then(token=> {
                if (!token.status) {
                    console.log(token);
                    localStorage.setItem('access_token', token.access_token);
                    callback({
                        type: types.LOGGED_IN,
                        isAuthorized: !!token.access_token
                    });
                } else {
                    callback({
                        type: types.LOGGED_IN,
                        isAuthorized: false
                    });
                    alert(`Status code: ${token.status}\n Message:${token.message}`);
                }
            })
            .catch(console.log);
    },

    createUser(email, password, firstName, lastName, callback) {

        let requestBody = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        };

        fetch(REGISTRATION_URL, {
            method: 'post',
            mode: 'cors',
            headers: API_HEADERS,
            body: JSON.stringify(requestBody)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK")
                }
            })
            .then(user=> {
                if (!user.status) {
                    callback({
                        type: types.USER_CREATED,
                        fetching: false
                    });
                    console.log(user);
                } else {
                    alert(`Status code: ${token.status}\n Message:${token.message}`);
                }
            })
            .catch(console.log)
    },

    searchProduct(criteria, callback) {

        let reqBody = {
            title: criteria.title,
            description: criteria.description,
            minPrice: criteria.minPrice,
            maxPrice: criteria.maxPrice
        };

        let token = localStorage.getItem('access_token');

        fetch(SEARCH_PRODUCTS_URL,{
            method: 'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reqBody)
        }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                callback({
                    type: types.SEARCH_PRODUCT_SUCCESS,
                    products: responseData,
                    fetching: false
                });
            })
            .catch((error) => {
                throw error;
            });
    },

    getPage(productsPerPage, pageNumber, callback) {

        fetch(`http://localhost:5000/page/page?page=${pageNumber}&perPage=${productsPerPage}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                callback(responseData);
            })
            .catch((error) => {
                throw error;
            });
    }
}