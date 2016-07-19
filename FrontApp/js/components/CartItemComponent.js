import React, { Component } from 'react';
import actions from '../actions/index';
import { Link } from 'react-router';

const USER_CART_IDS = 'user-cart-ids';

let order = {};

class CartItemComponent extends Component {
    constructor() {
        super();
        this.state = {}
        this.state = {
            handle : 0,
            totalSum : 0
        }
    }

    componentDidMount() {
        this.setState(this.props.item);
    }

    handleAddToCart() {
        this.props.addToCart(this.props.item);
    }

    viewInfo(id) {
        this.props.getInfo(id);
    }

    viewInputValue() {
        this.setState({'handle' : Number(this.refs.quantity.value)});
        this.setState({'totalSum' : this.state.totalSum + this.state.handle*this.state.price})
    }

    render() {

        let itemsQuantity = JSON.parse(sessionStorage.getItem(USER_CART_IDS));
        let singleItemQuantity;
        let totalValue;

        for( var key in itemsQuantity) {

            if(key == this.state._id) {
                singleItemQuantity = itemsQuantity[key];
                    order.id = key;
                if(this.state.handle == 0) {
                    totalValue = this.state.price * itemsQuantity[key];
                    order.total = totalValue;
                    order.title = this.state.title;
                    order.count = itemsQuantity[key];

                } else {
                    totalValue = this.state.handle * this.state.price;
                    order.total = totalValue;
                    order.count = this.state.handle;
                    order.title = this.state.title;
                }
            }
        }

        if(Object.keys(order).length !=0) {
            this.props.showAll(order)
        }





        return (

                <div className="productInCart" key={this.state._id}>
                    <Link to={`/info/${this.state._id}`} style={{'display' : 'inline-block',
                'width' : '10%' , 'height' : '50px', 'marginRight' : '2%'}}>
                        <img src={`img/${this.state.image}.jpg`} className="product_img"/>
                    </Link>
                    <div className="productTitleCart">
                        <strong>Title </strong>
                        <span>{this.state.title}</span>
                    </div>
                    <div className="productPriceCart">
                        <strong>Price </strong>
                        <span>{this.state.price} $</span>
                    </div>
                    <div className="quantity">
                        <strong>Quantity </strong>
                        <input ref="quantity" type='text'
                               style={{width : '30px'}}
                               placeholder={singleItemQuantity}
                               onChange={this.viewInputValue.bind(this)}
                        />
                    </div>
                    <div className="total">
                        <strong>Total </strong>
                        <span>{totalValue} $</span>
                    </div>
                </div>
        );
    }
}

export default CartItemComponent;