/**
 * Created by user on 18.04.16.
 */
import React from 'react'
import { Route, IndexRoute } from 'react-router';

import App from './containers/App'
import CartContainer from './containers/CartContainer'
import ProductInfo from './components/ProductInfo'
import ContentContainer from './containers/ContentContainer'
import CategoryContentComponent from './containers/CategoryContentContainer'
import About from './components/About'
import myOrders from './components/myOrdersComponent'

export default (
    <div>
        <Route path="/" component={App}>
            <Route path="/myOrders"
                   component={myOrders} />
            <IndexRoute component={ContentContainer} />
            <Route path="/cart"
                   component={CartContainer}/>
            <Route path="/info/:id"
                   component={ProductInfo}/>
            <Route path="/:category"
                   component={CategoryContentComponent} />
            <Route path="/:category/:subcategory"
                   component={CategoryContentComponent} />
        </Route>

    </div>
)