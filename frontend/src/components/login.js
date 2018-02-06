import React, { Component } from 'react';
import '../App.css';
// import { customColors as c } from '../custom/colors.js';
import { connect } from 'react-redux';
import { saveAccessToken } from '../actions';
// const axios = require('axios');

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
        windowHeight: window.innerHeight - 40
    };
  }

  componentDidMount() {
    const code = this.props.location.search.replace(/\?code=/g, '');

    window.addEventListener('resize', this.handleResize.bind(this));
    this.setState({
      windowHeight: window.innerHeight - 40
    });

    this.props.saveAccessToken(code);
    
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  handleResize() {
    this.setState({
        windowHeight: window.innerHeight - 40
    });
  }

  saveToken() {
    sessionStorage.setItem('jwtToken', this.props.user.jwt);
  }
  
  render() {
    this.saveToken();
    console.log(sessionStorage);
    return (
      <div>
        Logged In
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {

    user: state.accessToken

  }
}

LogIn = connect(mapStateToProps, { saveAccessToken })(LogIn);

export default LogIn;
