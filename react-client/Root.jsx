import React, {PropTypes, Component} from 'react';
import {browserHistory} from 'react-router';
import {Router, Route, Link, IndexRoute} from 'react-router';
import ReactDOM from 'react-dom';
import ModuleManager from './components/moduleManager/ModuleManager.jsx';


import App from './components/app.jsx';
/**
 * Handles sesion storage
 * @date   2016-01-14
 */
var storage = (function() {
  var uid = new Date();
  var result;
  try {
    sessionStorage.setItem(uid, uid);
    result = sessionStorage.getItem(uid) === uid;
    sessionStorage.removeItem(uid);
    return result && sessionStorage;
  } catch (e) {}
}());

/**
 * Root component. Renders React Routing Component.
 */
class Root extends Component {
  /**
   * Renders Routing component on the root level
   * @date   2016-01-18
   * @return {Jsx}   Routing component
   */

  render() {
    return (
        <Router history={browserHistory}>
        <Route path="/" component={App} >
          <Route path="(/:account)(/:module)(/:project)(/:campaign)" component={ModuleManager}>
            <Route path="*"/>
          </Route>
        </Route>
        <Route path="/" >

        </Route>
      </Router>
    );
  }
}

export default Root;

ReactDOM.render(
  <Root/>, document.getElementById('main')
);
