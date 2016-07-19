import React, { Component } from 'react'
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contentActions from '../actions/index';

import HeaderComponent from '../components/HeaderComponent'
import SideBarComponent from '../components/SideBarComponent'
import FooterComponent from '../components/FooterComponent'

export default class App extends Component {
    constructor() {
        super();
    }


    render() {
        const { topics, isAuthorized, products } = this.props;
        const { ProdByTopic,  getAllTopics, getAllProducts, logout,
            login, createUser , BySubTopic , loadOrders , socialLogin } = this.props.contentActions;

        return (
            <div className="container">
                <div className="row">

                    <HeaderComponent socialLogin={socialLogin} loadOrders={loadOrders} getAllProducts={getAllProducts}  ProdByTopic={ProdByTopic}
                                     isAuthorized={isAuthorized} login={login}
                                     logout={logout} createUser={createUser}/>

                    <main id="main">
                        <SideBarComponent BySubTopic={BySubTopic} getAllProducts={getAllProducts}
                                          ProdByTopic={ProdByTopic}
                                          topics={topics} getAllTopics={getAllTopics} products={products}/>
                        {this.props.children}
                    </main>

                    <FooterComponent />

                </div>
            </div>
        )
    }
};


function mapDispatchToProps(dispatch) {
    return {
        contentActions: bindActionCreators(contentActions, dispatch)
    }
}

function mapStateToProps(state) {
    return {
        topics: state.products.topics,
        products: state.products.products,
        isAuthorized: state.products.isAuthorized,
        orderCart: state.products.orderCart
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)