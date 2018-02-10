import React, { Component } from 'react';
import '../App.css';
import { customColors as c } from '../custom/colors.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { saveAccessToken } from '../actions';
// import { customColors as c } from '../custom/colors.js';


export class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        windowHeight: window.innerHeight - 40,
        userCarts: []
    };
  }

  componentDidMount() {
    const code = this.props.location.search.replace(/\?code=/g, '');

    window.addEventListener('resize', this.handleResize.bind(this))
    this.setState({
      windowHeight: window.innerHeight - 40
    })
    if (!this.props.user.jwt) {
      this.props.saveAccessToken(code);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.jwt) { 
      sessionStorage.setItem('jwtToken', nextProps.user.jwt);
      sessionStorage.setItem('username', nextProps.user.username);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this))
  }

  handleResize() {
    this.setState({
        windowHeight: window.innerHeight - 40
    })
  }
  
  render() {
    return (
      <div>
        user page
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.accessToken,
  }
}

export default withRouter(connect(mapStateToProps, { saveAccessToken })(UserPage));
