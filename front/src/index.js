import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from "redux";
import {ConnectedRouter, routerMiddleware} from "react-router-redux";
import {Helmet} from "react-helmet/es/Helmet";
import {composeWithDevTools} from "redux-devtools-extension";
import createHistory from 'history/createHashHistory';
import thunk from "redux-thunk";
import 'es6-promise/auto'
import 'setimmediate'

import {BrowserRouter} from "react-router-dom";
import {LocaleProvider} from "antd";
import enGB from 'antd/lib/locale/en_GB'
import registerServiceWorker from "react-scripts/template/src/registerServiceWorker";


import 'resources/_antd.less';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'resources/AntStyles/AntDesign/antd.cleanui.scss'
import 'resources/CleanStyles/Core/core.cleanui.scss'
import 'resources/CleanStyles/Vendors/vendors.cleanui.scss'

import reducer from '../src/ducks';
import Layout from '../src/components/LayoutComponents/Layout/index'

const history = createHistory();
const router = routerMiddleware(history);
const middlewares = [router, thunk]
const isLogger = false;
if (isLogger && process.env.NODE_ENV === 'development') {
  const {logger} = require('redux-logger')
  middlewares.push(logger)
}
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)))


ReactDOM.render(
  <BrowserRouter>
        <Provider store={store} >
          <ConnectedRouter  history={history} >
            <LocaleProvider locale={enGB} >
              <div>
                <Helmet titleTemplate="GC Connect - %s" />
                <Layout/>
              </div>
            </LocaleProvider>
          </ConnectedRouter>
        </Provider>
     </BrowserRouter>,
document.getElementById('root')
)

registerServiceWorker()

export default history
