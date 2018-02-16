import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Cart from './cart.js';
import Package from './package.js';
import { getRecs } from '../actions';
import '../App.css';
import { customColors as c } from '../custom/colors.js';

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowHeight: window.innerHeight - 40,
      cart: [],
      recs: [],
      loading: false,
      dev: true
    };
    this.sendRecRequest = this.sendRecRequest.bind(this);
  }

  componentDidUpdate() {
    if (this.props.cart.packages.length !== this.state.cart.length && this.refs.cartPage) {
      let currentCart = [];
      if (this.props.cart.packages.length > 0) {
        currentCart = this.props.cart.packages
        this.setState({
          windowHeight: window.innerHeight - 40,
          cart: currentCart,
        })
        this.sendRecRequest();
      }
    }
    if (this.props.recState.loading && !this.state.loading) {
      this.setState({
        loading: true,
      })
    } else if (!this.props.recState.loading && this.state.loading) {
      this.setState({
        loading: false,
        recs: this.props.recState.recs,
      })
    }
    if (this.state.cart && this.state.cart.length > 0 && this.state.recs.length === 0 && !this.props.recState.loading && !this.state.loading) {
      this.sendRecRequest();
    }
  }

  

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));

    let currentCart = [];
    if (this.props.cart.packages.length > 0) {
      currentCart = this.props.cart.packages
      this.sendRecRequest();
    }

    this.setState({
      windowHeight: window.innerHeight - 40,
      cart: currentCart
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cart._id !== this.props.cart._id) {
      if (nextProps.cart.packages.length === 0) {
        this.setState({
          recs: [],
          cart: []
        })
      }
    }
    if (nextProps.cart.packages.length !== this.props.cart.packages.length) {
      if (nextProps.cart.packages.length === 0) {
        this.setState({
          recs: [],
          cart: []
        })
      }
    }
  }

  handleResize() {
    if (!this.refs.cartPage) {
      return;
    }
    this.setState({
      windowHeight: window.innerHeight - 40
    })
  }

  sendRecRequest() {
    if (this.state.cart && this.state.cart.length > 0) {
      this.props.getRecs(this.props.cart.packages);
    }
  }

  render() {
    return (
      <div ref='cartPage'>
        <Cart />
        <p style={{ color: c.darker_orange, fontStyle: 'italic', textAlign: 'left', marginLeft: '3.8em' }}>
          {this.state.loading ? 'Loading recommendations' : 'Recommendations'}
        </p>
        {this.state.recs.length > 0 ?
        this.state.recs.map((rec, i) => {
          if (this.state.recs.length === i + 1) {
            return (
              <div key={'scoper'}>
              </div>
            )
          }
          return (
            <div key={rec._id + 'id'}>
              <Package
                key={i}
                name={rec.name}
                about={rec.description}
                freq={rec.freq}
                keywords={rec.keywords}
                parents={rec.parents}
                _id={rec._id}
                homepage={rec.homepage}/>
            </div>
          )
        })
        : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    recState: state.recState
  };
};

export default withRouter(connect(mapStateToProps, { getRecs })(CartPage));