import React, { Component } from 'react';
import '../App.css';
// import { customColors as c } from '../custom/colors.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
    
    window.addEventListener('resize', this.handleResize.bind(this));
    this.setState({
      windowHeight: window.innerHeight - 40
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  handleResize() {
    this.setState({
        windowHeight: window.innerHeight - 40
    });
  }

  render() {
    return (
      <div>
        Logged In
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.accessToken,
  }
}

export default withRouter(connect(mapStateToProps, { saveAccessToken })(LogIn));

