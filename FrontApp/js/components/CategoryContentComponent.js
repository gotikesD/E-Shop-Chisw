/**
 * Created by user on 21.04.16.
 */
import React, { Component } from 'react';

import SearchComponent from './SearchComponent';
import ItemComponent from './ItemComponent';
import PaginationComponent from './PaginationComponent';

class CategoryContentComponent extends Component {

    render() {

        var items = this.props.products.map((item) => {

            return(
                <ItemComponent key={item._id} item={item} addToCart={this.props.addToCart} />
            );
        });

        return (
            <div id="content">
                <div className={this.props.isAuthorized ? "search" : "search-hidden" }>
                    <SearchComponent searchProducts={this.props.searchProducts}/>
                </div>

                <div id="pagination-block">
                    <PaginationComponent />
                </div>

                <div id="products-main">
                    { items }

                </div>
            </div>
        );
    }
}

export default CategoryContentComponent;