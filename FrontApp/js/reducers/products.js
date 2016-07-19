import types from '../constants/constants'

const USER_CART = 'user-cart';
const USER_CART_IDS = 'user-cart-ids';

const initialState = {
    products: [],
    topics: [],
    tree: [],
    isAuthorized: !!localStorage.getItem('access_token'),
    fetching: false,
    productsCart: JSON.parse(sessionStorage.getItem(USER_CART)) || [],
    cartProductIds: JSON.parse(sessionStorage.getItem(USER_CART_IDS)) || {},
    orderStore: {},
    orders: []
};

function products(state = initialState, action) {

    switch (action.type) {
        case types.CLEAR_CART:
            return Object.assign({}, state, {productsCart: [], cartProductIds: {}});
        case types.LOGIN_IN_WITH_SOCIAL:
            return Object.assign({}, state, {isAuthorized: action.isAuthorized});
        case types.GET_YOUR_ORDERS:
            return Object.assign({}, state, {orders: action.orders});
        case types.GET_PROD_BY_SUB_TOPIC:
            return Object.assign({}, state, {products: action.products});
        case types.GET_PROD_BY_TOPIC:
            return Object.assign({}, state, {products: action.products});
        case types.GET_PROD_INFO:
            return Object.assign({}, state, {products: action.products});
        case types.INIT_PRODUCTS:
            return Object.assign({}, state, {products: action.products});
        case types.INIT_TOPICS:
            return Object.assign({}, state, {topics: action.topics});
        case types.LOGGED_IN:
            return Object.assign({}, state, {isAuthorized: action.isAuthorized});
        case types.LOGOUT:
            return Object.assign({}, state, {isAuthorized: action.isAuthorized});
        case types.USER_CREATION_REQUEST:
            return Object.assign({}, state, {fetching: action.fetching});
        case types.USER_CREATED:
            return Object.assign({}, state, {fetching: action.fetching});
        case types.SEARCH_PRODUCT:
            return Object.assign({}, state, {fetching: action.fetching});
        case types.SEARCH_PRODUCT_SUCCESS:
            return Object.assign({}, state, {
                products: action.products,
                fetching: action.fetching
            });
        case types.PRODUCTS_ON_PAGE:
            return Object.assign({}, state, {products: action.products});
        case types.ADD_TO_CART:
            return Object.assign({}, state, {
                productsCart: action.productsCart,
                cartProductIds: action.cartProductIds
            });
        case types.REMOVE_FROM_CART:
            return Object.assign({}, state, {
                productsCart: action.productsCart,
                cartProductIds: action.cartProductIds
            });
        default:
            return state;
    }
}

export default products;

