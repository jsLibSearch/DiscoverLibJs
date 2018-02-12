import React, { Component } from 'react';
import '../App.css';
import { customColors as c } from '../custom/colors.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { saveAccessToken } from '../actions';


export class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        windowHeight: window.innerHeight - 40,
        userCarts: []
    };
  }

  componentDidMount() {
    let code;
    if (this.props.location.search.match(/\?code=/g)) {
      code = this.props.location.search.replace(/\?code=/g, '');
      if (!this.props.user.jwt) {
        this.props.saveAccessToken(code);
      }
    }

    window.addEventListener('resize', this.handleResize.bind(this))
    this.setState({
      windowHeight: window.innerHeight - 40
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.jwt) { 
      sessionStorage.setItem('jwtToken', nextProps.user.jwt);
      sessionStorage.setItem('username', nextProps.user.username);
      sessionStorage.setItem('loggedIn', true);
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
