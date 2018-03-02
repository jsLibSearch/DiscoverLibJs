import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Cart from './cart.js';
import Package from './package.js';
import { getRecs, dev, clearRecs } from '../actions';
import '../App.css';

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      small: false,
      cart: [],
      recs: [],
      loading: false,
      dev: dev,
      loadRecsStarted: false,
    };
    this.sendRecRequest = this.sendRecRequest.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    const small = this.state.windowWidth < 700 ? true : false;
    let currentCart = [];
    if (this.props.cart.packages.length > 0) {
      this.sendRecRequest(this.props.cart.packages);
    }

    this.setState({
      windowWidth: window.innerWidth,
      small: small,
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
          cart: [],
          loadRecsStarted: false,
        })
      }
    } else if (nextProps.cart.packages.length !== this.props.cart.packages.length) {
      if (nextProps.cart.packages.length === 0) {
        this.setState({
          recs: [],
          cart: [],
          loadRecsStarted: false,
        })
        this.props.clearRecs();
      }
    }
    if (this.props.cart.packages.length !== nextProps.cart.packages.length && this.refs.cartPage) {
      if (nextProps.cart.packages.length > 0) {
        this.sendRecRequest(nextProps.cart.packages);
      }
    }
    if (nextProps.recState.loading && !this.props.recState.loading) {
      this.setState({
        loading: true,
        loadRecsStarted: true,
      })
    }
    if (!nextProps.recState.loading && this.state.loading) {
      this.setState({
        loading: false,
        recs: nextProps.recState.recs,
      })
    }
  }

  handleResize() {
    if (!this.refs.cartPage) {
      return;
    }
    const small = this.state.windowWidth < 700 ? true : false;
    this.setState({
      windowWidth: window.innerWidth,
      small: small
    })
  }

  sendRecRequest(pkgs) {
    if (pkgs && pkgs.length > 0) {
      this.setState({
        loadRecsStarted: false,
      })
      this.props.getRecs(pkgs);
    }
  }

  render() {
    return (
      <div ref='cartPage'>
        <Cart />
        <p className='RecText' style={this.state.small ? {textAlign: 'center', margin: '50px 0px 0px'} : {}}>
          {this.state.loading ? 'Loading recommendations' : this.state.loadRecsStarted ? 'Recommendations' : ''}
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
            <div key={rec._id + 'id'} style={this.state.small ? {margin: '0.3em'} : {}}>
              <Package
                style={this.state.small ? { margin: '1em 0em' }:{}}
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

export default withRouter(connect(mapStateToProps, { getRecs, clearRecs })(CartPage));