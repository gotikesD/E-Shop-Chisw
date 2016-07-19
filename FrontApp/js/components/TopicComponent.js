/**
 * Created by user on 22.04.16.
 */
//component is deprecated
import React, { Component } from 'react';
import { Link } from  'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contentActions from '../actions/index';

export default class TopicComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    handleTopic(_id) {
        this.props.contentActions.ProdByTopic(_id)
    }

    render() {
        return (
            <div style={ {'textTransform' : 'uppercase'}}>
                <Link to={`${this.props.name}`} onClick={this.handleTopic.bind(this, this.props.id)}>
                    {this.props.name}
                </Link>
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
        topics: state.products.topics
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopicComponent)