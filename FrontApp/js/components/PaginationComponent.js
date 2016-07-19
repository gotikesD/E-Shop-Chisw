import React, { Component } from 'react';
import { render } from 'react-dom';

const BASE_SHIFT  = 0
    , TITLE_SHIFT = 1
    , TITLES = {
    first:   'First',
    prev:    'prev',
    prevSet: '...',
    nextSet: '...',
    next:    'next',
    last:    'Last'
};

function range(start, end) {
    var res = [];
    for ( var i = start; i < end; i++ ) {
        res.push( i );
    }
    return res;
}

function getAmount(callback) {

    fetch('http://localhost:5000/amount')
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Server response wasn't OK");
            }
        })
        .then((responseData) => {
            callback(responseData.amount);
        })
        .catch((error) => {
            throw error;
        });
}

export default class PaginationComponent extends Component {

    constructor() {
        super();
        this.state = {
            total:       14,
            current:     0,
            visiblePage: 3,
            productsOnPage: 3,
            amount: 0
        };
    }

    componentWillMount() {
        this.props.paginate(this.state.productsOnPage, this.state.current + 1);
    }

    componentDidMount() {
        getAmount(amount => {
            this.setState({ amount: amount });
        });
    }

    handlePageChanged( newPage ) {
        this.setState({ current : newPage });
        this.props.paginate(this.state.productsOnPage, newPage + 1);
    }

    handleSelectChanged(value) {
        this.setState({ productsOnPage: Number(value),
                        total: Math.ceil(this.state.amount / value)});
        this.props.paginate(value, this.state.current + 1);
    }

    render() {

        return (
            <Pager total={this.state.total}
                   current={this.state.current}
                   visiblePages={this.state.visiblePage}
                   productsOnPage={this.state.productsOnPage}
                   onPageChanged={this.handlePageChanged.bind(this)}
                   onSelectChanged={this.handleSelectChanged.bind(this)}
                   paginate={this.props.paginate} />
        );
    }
}

class Pager extends Component {

    calcBlocks() {
        var props = this.props,
            total = props.total,
            blockSize = props.visiblePages,
            current = props.current + TITLE_SHIFT,
            blocks = Math.ceil(total / blockSize),
            currBlock = Math.ceil(current / blockSize) - TITLE_SHIFT;

        return {
            total: blocks,
            current: currBlock,
            size: blockSize
        };
    }

    isPrevDisabled() {
        return this.props.current <= BASE_SHIFT;
    }

    handleFirstPage() {
        if ( this.isPrevDisabled() ) return;
        this.handlePageChanged( BASE_SHIFT );
    }

    handlePreviousPage() {
        if ( this.isPrevDisabled() ) return;
        this.handlePageChanged( this.props.current - TITLE_SHIFT );
    }

    isPrevMoreHidden() {
    var blocks = this.calcBlocks();
    return ( blocks.total === TITLE_SHIFT )
        || ( blocks.current === BASE_SHIFT );
    }

    handleMorePrevPages() {
        var blocks = this.calcBlocks();
        this.handlePageChanged( blocks.current * blocks.size - TITLE_SHIFT );
    }

    isNextMoreHidden() {
        var blocks = this.calcBlocks();
        return ( blocks.total === TITLE_SHIFT )
            || ( blocks.current === (blocks.total - TITLE_SHIFT) );
    }

    handleMoreNextPages() {
        var blocks = this.calcBlocks();
        this.handlePageChanged( (blocks.current + TITLE_SHIFT) * blocks.size );
    }

    isNextDisabled() {
        return this.props.current >= ( this.props.total - TITLE_SHIFT );
    }

    handleNextPage() {
        if ( this.isNextDisabled() ) return;
        this.handlePageChanged( this.props.current + TITLE_SHIFT );
    }

    handleLastPage() {
        if ( this.isNextDisabled() ) return;
        this.handlePageChanged( this.props.total - TITLE_SHIFT );
    }

    handlePageChanged( el ) {
        var handler = this.props.onPageChanged;
        if ( handler ) handler( el );
    }

    handleSelectChanged(e) {
        let selectHandler = this.props.onSelectChanged;
        selectHandler(e.target.value);
    }

    visibleRange() {
        var blocks  = this.calcBlocks()
            , start   = blocks.current * blocks.size
            , delta   = this.props.total - start
            , end     = start + ( (delta > blocks.size) ? blocks.size : delta );
        return [ start + TITLE_SHIFT, end + TITLE_SHIFT ];
    }

    renderPages(pair) {
        var self = this;

        return range( pair[0], pair[1] ).map(function ( el, idx ) {

            var current = el - TITLE_SHIFT,
                onClick = self.handlePageChanged.bind(self, current),
                isActive = (self.props.current === current);

            return (
                React.createElement(Page, {key: idx, isActive: isActive,
                className: "btn-numbered-page",
                onClick: onClick}, el));
        });
    }

    render() {
        return (
            <div>
                <span>Products on page:   </span>
                <select name="productsOnPage" value={this.val} onChange={this.handleSelectChanged.bind(this)} >
                    <option value={3}>3</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                </select>
                <nav>
                    <ul className="pagination">
                        <Page  className="btn-first-page"
                              key="btn-first-page"
                              isDisabled={this.isPrevDisabled()}
                              onClick={this.handleFirstPage.bind(this)}>{TITLES.first}</Page>

                        <Page className="btn-prev-page"
                              key="btn-prev-page"
                              isDisabled={this.isPrevDisabled()}
                              onClick={this.handlePreviousPage.bind(this)}>{TITLES.prev}</Page>

                        <Page className="btn-prev-more"
                              key="btn-prev-more"
                              isHidden={this.isPrevMoreHidden()}
                              onClick={this.handleMorePrevPages.bind(this)}>{TITLES.prevSet}</Page>

                        {this.renderPages( this.visibleRange() )}

                        <Page className="btn-next-more"
                              key="btn-next-more"
                              isHidden={this.isNextMoreHidden()}
                              onClick={this.handleMoreNextPages.bind(this)}>{TITLES.nextSet}</Page>

                        <Page className="btn-next-page"
                              key="btn-next-page"
                              isDisabled={this.isNextDisabled()}
                              onClick={this.handleNextPage.bind(this)}>{TITLES.next}</Page>

                        <Page className="btn-last-page"
                              key="btn-last-page"
                              isDisabled={this.isNextDisabled()}
                              onClick={this.handleLastPage.bind(this)}>{TITLES.last}</Page>
                    </ul>
                </nav>
            </div>
        )
    }
}

class Page extends Component {

    render() {

        var props = this.props;
        if ( props.isHidden ) return null;

        var baseCss = props.className ? props.className + ' ' : '',
            css = baseCss + (props.isActive ? 'active' : '')
                + (props.isDisabled ? ' disabled' : '');

        return (
            <li key={this.props.key} style={{'cursor' : 'pointer'}} className={css}>
                <a onClick={this.props.onClick}>{this.props.children}</a>
            </li>
        );
    }
}