import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as contentActions from '../actions/index';
import jwtDecode from 'jwt-decode';

export default class HeaderComponent extends Component {

    logOut(e) {
        e.preventDefault();
        this.props.logout();
        window.localStorage.clear();
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    }

    handleLogin(e) {
        e.preventDefault();
        this.props.login(this.refs.email1.value, this.refs.password1.value);

        this.refs.email = '';
        this.refs.password = '';
    }

    handleCreateUser(e) {
        e.preventDefault();
        this.props.createUser(this.refs.email.value, this.refs.password.value,
        this.refs.firstName.value, this.refs.lastName.value);
    }

    handleTopic(title) {
        this.props.ProdByTopic(title)
    }

    handleOrders() {
        this.props.loadOrders()
    }


    //handleFaceBookLogin () {
    //    let cookie = document.cookie;
    //    console.log(cookie)
    //    this.props.socialLogin(cookie)
    //}
    //
    //handleGoogleLogin () {
    //    let cookie = document.cookie;
    //    this.props.socialLogin(cookie)
    //
    //    }




    render() {
        let filteredMainTopics = this.props.topics.filter(topic=>{
            return !topic.parent;
        });

        let headerTopics = filteredMainTopics.map((item) => {
            return(
                <li key={item._id} style={{cursor : " pointer", textAlign : 'center'}}>
                    <Link to={`/${item.title}`}
                          className='topic' onClick={this.handleTopic.bind(this, item._id)}>
                        {item.title}
                    </Link>
                </li>
            )
        });

        return (
            <header>
                <div className="navbar navbar-default">
                    <div className="navbar-header">
                        <a className="navbar-brand logo" href="/">Brand</a>
                    </div>

                    <div className=" collapse navbar-collapse" id="resp-menu">
                        <ul className=" nav navbar-nav">
                            <li><a href="/">Main</a></li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">Our products
                                    <b className="caret" /></a>
                                <ul className="dropdown-menu products-category">
                                    {headerTopics}
                                    <li style={{cursor : " pointer", textAlign : 'center'}}>
                                        <Link to="/"> View All </Link>
                                    </li>
                                </ul>
                            </li>
                            <li><Link to="/about"> About Us </Link></li>
                        </ul>

                        <form className={this.props.isAuthorized? "form-inline-display-none" : "form-inline"}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control" id="email"
                                       ref="email1"
                                       placeholder="Enter Your Email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password"
                                       ref="password1"
                                       placeholder="Enter Your Password"/>
                            </div>
                            <button type="submit" className="btn btn-success login-button"
                                    onClick={this.handleLogin.bind(this)}>Login
                            </button>
                            <span className="or"> or </span>
                            <button type="button" className="btn btn-info" data-toggle="modal"
                                    data-target="#registerModal">Register
                            </button>
                        </form>
                        <Link to={`/cart`} id={this.props.isAuthorized ? "btn-logout" : "btn-logout-hidden"}
                              className="btn btn-info" href="#">CART</Link>
                        <Link to={`/myOrders`} onClick={this.handleOrders.bind(this)}
                              className="view-orders btn btn-info" href="#">VIEW MY ORDERS</Link>
                        <button type="button" className="btn btn-info"
                                id={this.props.isAuthorized ? "btn-logout" : "btn-logout-hidden"}
                                onClick={this.logOut.bind(this)}>Logout
                        </button>

                        <div id="social-login" style={this.props.isAuthorized ? {'visibility': 'hidden'} : {'visibility': 'visible'}}>
                            <span> Also you can login with : </span>
                            <ul role="group" aria-label="...">
                                <li><a  href="http://localhost:3000/auth/facebook"
                                       ref='facebook'
                                       className="facebook">Facebook</a></li>
                                <li><a href="http://localhost:3000/auth/google"
                                       className="google">Google</a></li>
                            </ul>
                        </div>

                    </div>
                    <div className="modal fade" id="registerModal" tabIndex="-1" role="dialog"
                         aria-labelledby="myModalLabel">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span></button>
                                    <h4 className="modal-title" id="myModalLabel">Register form</h4>
                                </div>
                                <div className="modal-body">
                                    <form >
                                        <div className="form-group">
                                            <label htmlFor="regFN">First Name</label>
                                            <input type="text" className="form-control" id="regFN"
                                                   ref="firstName"
                                                   placeholder="Enter First Name"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="regLN">Last Name</label>
                                            <input type="text" className="form-control" id="regLN"
                                                   ref="lastName"
                                                   placeholder="Enter Last Name"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="regEmail">Email</label>
                                            <input type="text" className="form-control" id="regEmail"
                                                   ref="email"
                                                   placeholder="Enter Your Email"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="regPassword">Password</label>
                                            <input type="password" className="form-control" id="regPassword"
                                                   ref="password"
                                                   placeholder="Enter Your Password"/>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close
                                    </button>
                                    <button type="button" className="btn btn-primary sendRegForm"
                                            onClick={this.handleCreateUser.bind(this)}>Register
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        contentActions: bindActionCreators(contentActions, dispatch)
    }
}

function mapStateToProps(state) {
    return {
        topics: state.products.topics,
        isAuthorized : state.products.isAuthorized
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderComponent)
