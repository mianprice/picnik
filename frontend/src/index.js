import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {Router, Route, hashHistory, Link, IndexLink, IndexRoute} from 'react-router';
import $ from 'jquery';
import { persistStore, autoRehydrate } from 'redux-persist';
import CookieStorage from 'redux-persist-cookie-storage';
import HomeContainer from './home/Home.js';
import HomeReducer from './home/Home.reducer.js';
import SignupContainer from './signup/Signup.js';
import SignupReducer from './signup/Signup.reducer.js';
import LoginContainer from './login/Login.js';
import LoginReducer from './login/Login.reducer.js';
import ProfileContainer from './profile/Profile.js';
import ProfileReducer from './profile/Profile.reducer.js';
import PlanningContainer from './planning/Planning.js';
import PlanningReducer from './planning/Planning.reducer.js';
import DrinksReducer from './drinks/Drinks.reducer.js';
import FoodReducer from './food/Food.reducer.js';
import MapReducer from './map/Map.reducer.js';
import './index.css';

const reducer = Redux.combineReducers({
    home: HomeReducer,
    signup: SignupReducer,
    login: LoginReducer,
    profile: ProfileReducer,
    planning: PlanningReducer,
    drinks: DrinksReducer,
    food: FoodReducer,
    map: MapReducer
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
                <div className="navbar">
                    <IndexLink to="/" className="app_title">picnik</IndexLink>
                    <div className="link_set">
                        <Link className="nav_link" to="/profile">Profile</Link>
                        <Link className="nav_link" to="/login">Login</Link>
                        <Link className="nav_link" to="/signup">Signup</Link>
                        <Link className="nav_link" to="/planning">Planning</Link>
                    </div>
                </div>
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
          <IndexRoute component={HomeContainer}/>
          <Route path='/signup' component={SignupContainer}/>
          <Route path='/login' component={LoginContainer}/>
          <Route path='/profile' component={ProfileContainer}/>
          <Route path='/planning' component={PlanningContainer}/>
      </Route>
    </Router>
  </ReactRedux.Provider>,
  document.getElementById('root')
);
