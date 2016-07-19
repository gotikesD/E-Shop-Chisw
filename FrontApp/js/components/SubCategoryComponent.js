// component is deprecated
import React, { Component } from 'react';
import { Link } from  'react-router';
import TopicComponent from './Node';

class SubCategoryComponent extends Component {

    constructor() {
        super(...arguments);
        this.state = {
            showSubCategory: false
        }
    }

    handleFindProductByTopic(_id) {
        console.log(_id);
        this.props.getProductsByTopic(_id);
    }

    showSubCategories() {
        this.setState({showSubCategory: !this.state.showSubCategory})
    }

    render() {

        var topics = this.props.topics.map(topic=> {
            return (
            <Link to={`/${this.props.parentTopic.title}/${topic.title}`}
                  onClick={this.handleFindProductByTopic.bind(this, topic._id)}
                  className='subCategoryItem' key={topic._id}
                  style={{'display' : 'block'
                            , 'marginLeft' : '20px'
                            , 'lineHeight' : '35px'
                            , 'textTransform' : 'lowercase'
                            , 'textDecoration' : 'none'
                            , 'zIndex' : '10'} }>
                {topic.title}

            </Link>

            );
        });

        return (
            <div className='subCategoryItem' onClick={this.showSubCategories.bind(this)}>
                {topics}
            </div>
        )
    }

}

export default SubCategoryComponent;

/*<div className='subCategoryItem' key={topic._id}
 style={{'display' : 'block'
 , 'marginLeft' : '20px'
 , 'lineHeight' : '35px'
 , 'textTransform' : 'lowercase'
 , 'textDecoration' : 'none'
 , 'zIndex' : '10'} }
 onClick={this.handleFindProductByTopic.bind(this, topic._id)}>
 {topic.title}
 </div>*/