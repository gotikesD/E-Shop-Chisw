import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contentActions from '../actions/index';
import cartActions from '../api/cartActions'
import OrderDetailComponent from  '../components/OrderDetailComponent'

class myOrdersComponent extends Component {


    render() {

       let count = 0;
       let orders =  this.props.orders.map((i) => {

           count++;
            return (
                <OrderDetailComponent  key={count} order={i} />
            )


        });
        return (
            <div id="ordersPage">
                <ul>
                    {orders}
                </ul>

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
        orders: state.products.orders
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(myOrdersComponent)
