/**
 * Created by user on 15.04.16.
 */
import React, { Component } from 'react';
import CartItemComponent from './CartItemComponent';

class CartComponent extends Component {

    constructor() {
        super();
    }

    handleRemoveFromCart(_id) {
        this.props.removeFromCart(_id);
    }


    render() {
        let items = this.props.productsCart.map(item=> {
            return (
                <div key={item._id}>
                    <CartItemComponent showAll={this.props.showAll} item={item} />
                    <button type="submit" className="btn btn-info removeFromCart"
                            onClick={this.handleRemoveFromCart.bind(this, item._id)}>REMOVE
                    </button>
                </div>
            );
        });

        return (
            <div>

                { items }
            </div>
        );
    }
}

export default CartComponent;