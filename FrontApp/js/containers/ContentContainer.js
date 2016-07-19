/**
 * Created by user on 18.04.16.
 */
import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contentActions from '../actions/index';

import ContentComponent from '../components/ContentComponent'

export default class ContentContainer extends Component {
    constructor() {
        super();
    }

    render() {
        const { products, isAuthorized} = this.props;
        const { getAllProducts, addToCart, searchProducts, paginate} = this.props.contentActions;

        return (
            <ContentComponent products={products}
                              isAuthorized={isAuthorized}
                              getAllProducts={getAllProducts}
                              addToCart={addToCart}
                              searchProducts={searchProducts}
                              paginate={paginate} />
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
        amountOfProducts: state.products.amountOfProducts,
        products: state.products.products,
        isAuthorized: state.products.isAuthorized
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContentContainer)