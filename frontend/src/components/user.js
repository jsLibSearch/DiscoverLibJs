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
        userCarts: [
          {name: 'cool cart no. 2', cart: [{ name: 'react' }, { name: 'redux' }], _id: '6e5rdytfcghder6uyfh' },
          {name: 'react project', cart: [{ name: 'Angular' }, { name: 'other thing' }], _id: '5677trid6y5eg5viu' }
        ],
        expanded: null,
        current: null
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this))
    this.setState({
      windowHeight: window.innerHeight - 40
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
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

  handleCart(i) {
    if (this.state.current === i) {
      this.setState({
        current: null
      })
    }
    if (this.state.current !== i) {
      this.setState({
        current: i
      })
    }
  }

  handleExpand(i) {
    if (this.state.expanded === i) {
      this.setState({
        expanded: null
      })
    }
    if (this.state.expanded !== i) {
      this.setState({
        expanded: i
      })
    }
  }
  
  render() {
    return (
      <div>
        {this.state.userCarts ? this.state.userCarts.map((cart, i) => {
          return (
          <div className='Package' key={cart._id}>
          <div className='PackDiv'>
              <h2 className='PackTitle'>{cart.name}</h2>
          </div>
              <div className='ExpandBox' style={ this.state.expanded === i ? {} : {display: 'none'} }>
                  <ul style={{margin: '0em', padding: '0em 3em'}}>
                      {cart.cart ? cart.cart.map((item) => (<li key={item.name}>{item.name}</li>)): null}
                  </ul>
              </div>
          <div className={this.state.expanded === i ? 'PackButtons' : 'PackButton'}>
              <button
                  onClick={this.handleCart.bind(this, i)}
                  className='btn btn-success'
                  style={ 
                      this.state.expanded === i ? {
                          margin: 0,
                          padding: '0em 0.8em',
                          fontStyle: 'italic',
                          fontSize: '.7em',
                          color: c.body_bg,
                          borderColor: c.off_green,
                          backgroundColor: c.off_green
                      } : {
                          display: 'none' } }>
                  {this.state.current === i ? 'Unset as current cart' : 'Set as current cart'}
              </button>
              <button onClick={this.handleExpand.bind(this, i)} className='btn btn-outline-success' style={ { width: '1.6em', height: '1.6em', margin: 0, padding: '0em', fontSize: '.7em' } }>{!(this.state.expanded === i) ? '▼' : '▲'}</button>
          </div>
      </div>
        )}) : null}
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
