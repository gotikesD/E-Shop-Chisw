import React, { Component } from 'react'
import { render } from 'react-dom';
import {Link} from 'react-router'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux';
import * as contentActions from '../actions/index';

class Info extends Component {


    render () {

        let TITLE,
            IMAGE,
            PRICE,
            DESCRIPTION,
            URL,
            CATEGORY;

       this.props.products.filter((i) => {

           if(i._id == this.props.params.id) {
                TITLE = i.title;
                IMAGE = i.image;
                PRICE = i.price;
                DESCRIPTION = i.description;
                URL = i.url;
                CATEGORY = i.mainCategory;
           }
        });
        return(
            <div id="content">
                <div className="detailProduct" >
                    <img src={`../img/${IMAGE}.jpg`} alt=""/>
                    <div className="detail">
                        <div className="title">
                            <span>{TITLE}</span>
                        </div>
                        <div className="price">
                            <h2 >Price - </h2>
                            <span>{PRICE} $</span>
                        </div>
                        <div className="description">
                            <h2>Description</h2>
                            <span className="description">{DESCRIPTION}</span>
                        </div>
                        <div className="subInfo">
                            <div className="url">
                                <a href={URL} className="description">{URL}</a>
                            </div>
                            <div className="category">
                                <span>category :</span>
                                <span className="description">{CATEGORY}</span>
                            </div>
                        </div>
                        <Link to="/"><button className="btn btn-info">Home</button></Link>
                    </div>
                </div>
            </div>
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
        products: state.products.products,
        isAuthorized: state.products.isAuthorized
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Info)


