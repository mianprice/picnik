import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {Router, Route, hashHistory, Link, IndexLink, IndexRoute} from 'react-router';
import $ from 'jquery';
import { persistStore, autoRehydrate } from 'redux-persist';
import CookieStorage from 'redux-persist-cookie-storage';
import './index.css';

const reducer = Redux.combineReducers({

})

const store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    Redux.compose(Redux.applyMiddleware(ReduxThunk), autoRehydrate())
);

persistStore(store, { storage: new CookieStorage() });


class AppLayout extends React.Component {
    render() {
        return(
            <div>
                picnik
                <div>
                    {this.props.children}
                </div>
            </div>

        );
    }
}

const AppLayoutContainer = ReactRedux.connect(
    state => ({state})
)(AppLayout);


ReactDOM.render(
    <ReactRedux.Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={AppLayoutContainer}>

      </Route>
    </Router>
  </ReactRedux.Provider>,
  document.getElementById('root')
);
