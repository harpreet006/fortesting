import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
  class NotAuthentication extends Component {
    componentWillMount() {

      if(localStorage.getItem('userType')==="vendor"){
        if (this.props.vendorAuthenticated) {
          this.props.history.push('/vendor');
        }
      }

      if(localStorage.getItem('userType')==="userDashboard"){
        if (this.props.authenticated) {
          this.props.history.push('/dashboard');
      }
      }
    
      
    }

    componentWillUpdate(nextProps) {

      if(localStorage.getItem('userType')==="vendor"){
        if (nextProps.vendorAuthenticated) {
          this.props.history.push('/vendor');
        }
      }

      if(localStorage.getItem('userType')==="userDashboard"){
      if (nextProps.authenticated) {
              this.props.history.push('/dashboard');
            }
      }
      

    }

    PropTypes = {
      router: PropTypes.object,
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { 
      vendorAuthenticated: state.vendorAuthenticated,
      authenticated: state.authenticated,
       
    };
  }

  return connect(mapStateToProps)(NotAuthentication);
}