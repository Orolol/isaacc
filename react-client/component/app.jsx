import React, {PropTypes, Component} from 'react';
import {Router, Route, Link, IndexRoute} from 'react-router';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next'; // as we build ourself via webpack
import i18n from '../i18n';
/**
* App Component
*/
class App extends React.Component {
  /**
  * Constructs APP component
  * @date   2016-01-27
  * @param  {Object}   props holds location object
  */
  constructor(props) {
    super(props);
    this.account = {};
    this.routingParams = {};
    // Acceptance criterea for routing parameters in the url
    this.acceptedParams = [
      {key: 'module', rename: 'module', criteria: '[\\d]+', valueOptional: true, type: 'string'},
      {key: 'project', rename: 'projectId', criteria: '[\\d]*', valueOptional: true, type: 'int'},
      {key: 'campaign', rename: 'campaignId', criteria: '[\\d]*', valueOptional: true, type: 'int'},
    ];
    let wcm_access = {};
    $.ajax({
      url: base_url + 'default/user/wcmaccess',
      type: 'GET',
      async: false,
      success: function(data){
        wcm_access = data;
      }
    });
    this.wcm_access = wcm_access;
    if (props.params.account !== undefined) {
      this.account.id = parseInt(props.params.account, 10);
    }
    this.routingParams = this.handleRoutingParams(props.params);
    this.handleRoutingParams = this.handleRoutingParams.bind(this);
    this.handleClearCache = this.handleClearCache.bind(this);
  }
  /**
  * Retruns childContext, loaction Object
  * @date   2016-01-27
  * @return {object}   location
  */
  getChildContext() {
    return {location: this.props.location, params: this.routingParams, access: this.wcm_access};
  }
  /**
  * @date   2016-03-01
  * @param  {Object}   nextProps   Next Properties
  * @param  {Object}   nextContext Next context properties
  */
  componentWillReceiveProps(nextProps, nextContext) {
    this.routingParams = this.handleRoutingParams(nextProps.params);
  }
  /**
  * Handles Routing parameters
  * @date   2016-03-01
  * @param  {Object}   params Routing parameters
  * @return {Object}          URL parameters split into Object
  */
  handleRoutingParams(params) {
    let splitParams;
    if (params.splat !== undefined) {
      splitParams = this.splatToParams(this.acceptedParams, params.splat);
    }
    return Object.assign(params, splitParams);
  }
  /**
  * Clears cache for selected account
  * @date   2016-02-26
  */
  handleClearCache() {
    AccountActions.clearCache(this.props.params.accountId);
  }
  /**
  * Converts 'splatted' params as String to params as Object
  * @date   2016-03-01
  * @param  {Object}   acceptedParams Acceptance criteria
  * @param  {String}   splat          Splatted parameters
  * @return {Object}                  Oject with routing params
  */
  splatToParams(acceptedParams, splat) {
    var newParams = {};

    var splitResult = splat.split('\/');
    if(splitResult[0] != '..' && splitResult[0] != '.'){
      newParams.account = splitResult[0];
    } else {
        newParams.account = this.props.params.account
    }
    newParams.module = splitResult[1];

    return newParams;
  }
  /**
  * renders app component
  * @date   2016-01-27
  * @return {Jsx}   things
  */
  render() {
    return (

      <div>
      <I18nextProvider i18n={ i18n }>
      {this.props.children}
      </I18nextProvider>
      </div>
    );
  }
}

App.childContextTypes = {
  location: React.PropTypes.object,
  params: React.PropTypes.object,
  access: React.PropTypes.object,
};

App.contextTypes = {
  router: React.PropTypes.object,
};

App.propTypes = {
  params: React.PropTypes.object,
  children: React.PropTypes.object,
  location: React.PropTypes.object,
};

export default App;
