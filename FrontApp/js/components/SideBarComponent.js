import React, { Component } from 'react';
import { Link } from 'react-router';
import TopicComponent from './TopicComponent'
import storeAPI from '../api/store';
import 'whatwg-fetch';

const TOPICS_URL = 'http://localhost:5000/sidebarTopics';

class SideBarComponent extends Component {
    /**
     * Initial tree parameters
     * @param props - properties from App container
     */
    constructor(props) {
        super(props);
        this.state = {
            tree: props.tree
        }
    }

    /**
     * used for fetching topics from DB and building topics tree
     */
    componentWillMount() {

        fetch(TOPICS_URL)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Server response wasn't OK");
                }
            })
            .then((responseData) => {
                this.buildTopicsTree(responseData);
            })
            .catch((error) => {
                throw error;
            });
    }

    /**
     * Return all products for View All
     */
    handleGetAllProducts() {
        this.props.getAllProducts();
    }

    /**
     * buildTopicsTree - created for building Topics tree from DB topics data
     * @param topics - list of topics from database
     * @returns {Array} - array of subtrees for building menu
     */
    buildTopicsTree(topics) {
        var roots = [],
            children = {};

        for (var i = 0; i < topics.length; ++i) {
            var item = topics[i],
                p = item.parent,
                target = !p ? roots : (children[p] || (children[p] = []));
            target.push({value: item});
        }

        var findChildren = function (parent) {
            if (children[parent.value._id]) {
                parent.children = children[parent.value._id];
                for (var i = 0, len = parent.children.length; i < len; ++i) {
                    findChildren(parent.children[i]);
                }
            }
        };

        for (var i = 0, len = roots.length; i < len; ++i) {
            findChildren(roots[i]);
        }
+

        this.setState({tree: roots});
    }

    /**
     * Builds menu from tree
     * @param i
     * @returns {*}
     */
    getTree(i) {
        let items = i || this.state.tree;
        if (!items) return null;
        return (  <ul>
            {items.map((el, i) =>
                <li key={i}>
                    < TopicComponent name={`${el.value.title}`} id={el.value._id}
                                     className={!el.value.parent ? '' : 'topic'}/>
                    <div>
                        { el.children && el.children.length ? this.getTree(el.children) : ' '}
                    </div>
                </li>
            )}
        </ul>)

    }

    /**
     * render sidebar component
     * @returns {XML}
     */
    render() {
        return (
            <aside>
                <ul>
                    {this.getTree()}
                    <li style={{cursor : " pointer", textAlign : 'left'}}
                        onClick={this.handleGetAllProducts.bind(this)}>
                        <Link to='/'>View All</Link>
                    </li>
                </ul>
            </aside>
        )
    }
}

export default SideBarComponent;
