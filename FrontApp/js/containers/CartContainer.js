/**
 * Created by user on 15.04.16.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contentActions from '../actions/index';

import jwtDecode from 'jwt-decode';
import { Link } from  'react-router'
import cartActions from '../api/cartActions'


import CartComponent from '../components/CartComponent';

export default class CartContainer extends Component {

    constructor() {
        super();
        this.allItemsInOrderInfo = [];
        this.totalSum = 0;
        this.state = {
            total : 0,
            items : []
        }
    }

    setTotal(item) {
        let count = 1;
        let copy = Object.assign({},item);
        if(this.allItemsInOrderInfo.length > count) {
            this.allItemsInOrderInfo.forEach((i) => {
                if (i.id == copy.id) {
                    i.count = copy.count
                    i.total = copy.total
                }
            }
        )} else {
            this.allItemsInOrderInfo.push(copy)
        }
        ++count;
    }

    handleInfo() {
        // Confirm Order Info
        let order={}

        // Current user Info
        let currentUser =  localStorage.getItem('access_token')
        let decodedUser = jwtDecode(currentUser);
        let decodedUserEmail = decodedUser._doc.email;
        let decodedUserFirstName =  decodedUser._doc.firstName;

        order.email = decodedUserEmail;
        order.firstName = decodedUserFirstName;
        order.products = [];

        // Current Items in Cart Info

        this.allItemsInOrderInfo.forEach((i) => {
            order.products.push(i);
            this.totalSum  +=i.total;
        })
        order.totalSumOfOrder = this.totalSum;
        order.created = new Date();
        cartActions.sendOrder(order);
        this.totalSum = 0;

    }

    clearCart() {
        sessionStorage.clear()
        this.props.contentActions.clearCart();
    }

    render() {

        const { productsCart } = this.props;
        const { removeFromCart   } = this.props.contentActions;
        return (
                <div className="cartItemsHolder">
                        <button type='button' className="btn btn-success confirmOrder"
                                data-toggle="modal"
                                data-target="#confirmModal"
                                onClick={this.handleInfo.bind(this)}
                        >
                                            Confirm
                        </button>
                    <CartComponent showAll={this.setTotal.bind(this)} productsCart={productsCart} removeFromCart={removeFromCart} />

                    <div className="modal fade" id="confirmModal" tabIndex="-1" role="dialog"
                         aria-labelledby="myModalLabel">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span></button>
                                    <h4 className="modal-title" id="myModalLabel1">Order</h4>
                                </div>
                                <div className="modal-body">
                                    <h3>Thank you for you order!</h3>
                                    <h3> We will phone you later!!!</h3>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={this.clearCart.bind(this)} type="button" className="btn btn-default" data-dismiss="modal">
                                        Close
                                    </button >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        contentActions: bindActionCreators(contentActions, dispatch)
    }
}

function mapStateToProps(state) {
    return {
        productsCart: state.products.productsCart,
        orderStore : state.products.orderStore
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartContainer)
