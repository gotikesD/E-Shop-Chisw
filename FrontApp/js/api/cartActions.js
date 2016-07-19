import types from '../constants/constants';
import _ from 'lodash';
import jwtDecode from 'jwt-decode';
const USER_CART = 'user-cart';
const USER_CART_IDS = 'user-cart-ids';
const INITIAL_VALUE = 1;
const ORDER_URL = 'http://localhost:5000/orders';
const USER_ORDERS_URL = 'http://localhost:5000/orders/own/';
const API_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};


export default {

    // get all of your orders

    getFiltered(callback) {
        let currentUser =  localStorage.getItem('access_token')
        if(!currentUser) {
            alert("First you need to Log In")
        } else {
            let decodedUser = jwtDecode(currentUser);

            let decodedUserEmail = decodedUser._doc.email;

            //Filter Criteria
            console.log(decodedUserEmail);

            let target = USER_ORDERS_URL + decodedUserEmail;
            fetch(target, {
                method: 'get',
                mode: 'cors',
                headers: {
                    email : decodedUserEmail
                }
            })
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
        }

    },

    // sending single order into DB - orders collection - orders

    sendOrder(order) {
        console.log(order)
        fetch(ORDER_URL, {
            method: 'post',
            mode: 'cors',
            headers: API_HEADERS,
            body: JSON.stringify(order)
        })

    },

    // storing prods at localStorage
    addToCart(item){

        if(!sessionStorage.getItem(USER_CART)){

            let cartItems = [];
            cartItems.push(item);
            sessionStorage.setItem(USER_CART, JSON.stringify(cartItems));

            let cartItemsIds = {
                [item._id]: INITIAL_VALUE
            };

            sessionStorage.setItem(USER_CART_IDS, JSON.stringify(cartItemsIds));

            console.log('first added item', JSON.parse(sessionStorage.getItem(USER_CART_IDS)));

            return {
                type: types.ADD_TO_CART,
                productsCart: item,
                cartProductIds: cartItemsIds
            }

        } else {

            let tempCart = JSON.parse(sessionStorage.getItem(USER_CART));
            let tempCartIds = JSON.parse(sessionStorage.getItem(USER_CART_IDS));

            //console.log('tempCart before push: ', tempCart);
            console.log('tempCartIds before push: ', tempCartIds);

            if(_.findIndex(tempCart, item) == -1) {
                tempCart.push(item);
            }
            sessionStorage.setItem(USER_CART, JSON.stringify(tempCart));

            let newValue = tempCartIds[item._id] || 0;
            //console.log('new value: ', newValue);
            let updatedTempCartIds = _.assign(tempCartIds, {[item._id]: ++newValue});
            sessionStorage.setItem(USER_CART_IDS, JSON.stringify(updatedTempCartIds));

            //console.log('from storage', tempCart);
            console.log('from storage ids', sessionStorage.getItem(USER_CART_IDS));
            return {
                type: types.ADD_TO_CART,
                productsCart: tempCart,
                cartProductIds: updatedTempCartIds
            }
        }
    },

    // have to be implemented later
    removeFromCart(_id){
        let tempCart = JSON.parse(sessionStorage.getItem(USER_CART));
        let tempCartIds = JSON.parse(sessionStorage.getItem(USER_CART_IDS));
        console.log('ids object before remove', sessionStorage.getItem(USER_CART_IDS));

        let updatedTempCartIds = {};
        if(tempCartIds[_id] > INITIAL_VALUE) {
            console.log('inside first part', tempCartIds);
            updatedTempCartIds = _.assign(tempCartIds, {[_id]: --tempCartIds[_id]});
            sessionStorage.setItem(USER_CART_IDS, JSON.stringify(updatedTempCartIds));
        } else {
            updatedTempCartIds = _.omit(tempCartIds, _id);
            sessionStorage.setItem(USER_CART_IDS, JSON.stringify(updatedTempCartIds));

            var newCart = tempCart.filter(product=>{
                return product._id !== _id;
            });
            sessionStorage.setItem(USER_CART, JSON.stringify(newCart));
        }

        console.log('value after remove', sessionStorage.getItem(USER_CART_IDS));
        console.log('value after remove', sessionStorage.getItem(USER_CART));

        return {
            type: types.REMOVE_FROM_CART,
            productsCart: newCart,
            cartProductIds: updatedTempCartIds
        }
    }
}
