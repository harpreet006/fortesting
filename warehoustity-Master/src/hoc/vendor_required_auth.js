import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {

        if(!this.props.vendorAuthenticated) {
          this.props.history.push('/');
        }

        // if(!this.props.vendorAuthenticated && !this.props.authenticated) {
        //   this.props.history.push('/');
        // }
      
    }

    componentWillUpdate(nextProps) {

        if(!nextProps.vendorAuthenticated) {
          this.props.history.push('/');
        }
      
    }

    PropTypes = {
      router: PropTypes.object,
    }

    render () {
      return <ComposedComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    if(localStorage.getItem('userType')==="vendor"){
      return { vendorAuthenticated: state.vendorAuthenticated };
    }
    // else{
    //   return { authenticated: state.authenticated };  
    // }

  }
  return connect(mapStateToProps)(Authentication);
}