/**
 * Created by user on 21.04.16.
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contentActions from '../actions/index';

import CategoryContentComponent from '../components/CategoryContentComponent'

export default class CategoryContentContainer extends Component {
    constructor() {
        super();
    }

    render() {
        const { products, isAuthorized } = this.props;
        const { getAllProducts, addToCart, searchProducts } = this.props.contentActions;

        return (
            <CategoryContentComponent products={products} isAuthorized={isAuthorized}
                              getAllProducts={getAllProducts} addToCart={addToCart}
                              searchProducts={searchProducts} />
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
        products: state.products.products,
        isAuthorized: state.products.isAuthorized
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryContentContainer)