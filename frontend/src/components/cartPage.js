import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Cart from './cart.js';
// import { getRecommendations } from '../actions';
import '../App.css';
// import { customColors as c } from '../custom/colors.js';

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowHeight: window.innerHeight - 40,
      cart: [],
      recs: []
    };
  }

  componentDidUpdate() {
    if (this.props.cart.length !== this.state.cart.length && this.refs.cartPage) {
      let currentCart = [];
      if (this.props.cart.length > 0) {
        currentCart = this.props.cart
        this.setState({
          windowHeight: window.innerHeight - 40,
          cart: currentCart
        })
      }
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));

    let currentCart = [];
    if (this.props.cart.length > 0) {
      currentCart = this.props.cart
    }

    this.setState({
      windowHeight: window.innerHeight - 40,
      cart: currentCart
    })
    console.log(sessionStorage);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this))
  }

  handleResize() {
    if (!this.refs.cartPage) {
      return;
    }
    this.setState({
      windowHeight: window.innerHeight - 40
    })
  }

  render() {
    return (
      <div ref='cartPage'>
        <Cart />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  };
};

export default withRouter(connect(mapStateToProps, {})(CartPage));