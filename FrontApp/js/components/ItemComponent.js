/**
 * Created by user on 14.04.16.
 */
import React, { Component } from 'react';

import { Link } from 'react-router';

class ItemComponent extends Component {
    constructor() {
        super();
        this.state = {
            filtered : false
        };
    }

    componentDidMount() {
        this.setState(this.props.item);
    }

    handleAddToCart() {
        this.props.addToCart(this.props.item);
    }

    render() {
        //var subCategory =this.props.item.subCategory.map((item) => {
        //    return (
        //        <span style={{'display' : 'inline-block', 'fontSize' : '12px','paddingLeft':'3px'}} key={item}>{item}</span>
        //    )
        //})
        return (
                <div className="product" key={this.state._id} style={this.state.filtered ? { display : 'none'} : { display : 'block'}}>
                    <img src={`img/${this.state.image}.jpg`} className="product_img"/>
                    <div className="product_title">
                        <strong>Title </strong>
                        <span>{this.state.title}</span>
                    </div>
                    <div className="product_price">
                        <strong>Price </strong>
                        <span>{this.state.price} $</span>
                    </div>
                    <Link to={`/info/${this.state._id}`} className="detail" >More detail</Link>
                    <button className="detail"
                            onClick={this.handleAddToCart.bind(this)}>Add To Cart</button>
                </div>
            )

    }
}

export default ItemComponent;