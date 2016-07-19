import React, { Component } from 'react';
import { render } from 'react-dom';

class SearchComponent extends Component {

    handleSearch(e) {
        e.preventDefault();

        let criteria = {
            title: this.refs.title.value,
            description: this.refs.description.value,
            maxPrice: this.refs.priceTo.value,
            minPrice: this.refs.priceFrom.value
        };
        this.props.searchProducts(criteria);
    }

    render() {
        return (
            <div>
                <h4>We can help you. Just fill fields!</h4>
                <span className="logged-info">Available only for logged users</span>
                <form className="form-inline search-form">
                    <div className="form-group">
                        <input type="text" className="form-control" id="priceFrom"
                               ref="priceFrom" placeholder="Price From"/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="priceTo"
                               ref="priceTo" placeholder="Price To"/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="title"
                               ref="title" placeholder="Title"/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="description"
                               ref="description" placeholder="Description"/>
                    </div>
                    <button type="submit" className="btn btn-info"
                            onClick={this.handleSearch.bind(this)}>Search it!
                    </button>
                </form>
            </div>
        );
    }
}

export default SearchComponent;