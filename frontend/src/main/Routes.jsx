import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Home from '../components/home/Home';
import UserCrud from '../components/user/UserCrud';
import OrderCrud from '../components/order/OrderCrud';
import ProductCrud from '../components/product/ProductCrud';

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserCrud} />
        <Route path='/products' component={ProductCrud} />
        <Route path='/orders' component={OrderCrud} />
        <Redirect from='*' to="/" />
    </Switch>