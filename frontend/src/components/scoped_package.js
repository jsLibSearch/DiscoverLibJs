import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newItem } from '../actions';
import '../App.css';
import { customColors as c } from '../custom/colors.js';

class ScopedPackages extends Component {
  constructor(props) {
    super(props);
    this.state = {
        packages: [],
        expanded: false,
        added: [],
        name: 'test'
    };
  }

  componentDidUpdate() {
    if (this.props.name !== this.state.name) {
        const pkgs = this.props.packages
        const name = this.props.name
        let inCart = []
        if (this.props.cart.packages) {
            for (let i = 0; i < this.props.packages.length; i++) {
                if (this.props.cart.packages.includes(this.props.packages[i])) {
                    inCart.push(true)
                } else inCart.push(false)
            }
        } else {
            inCart = Array(this.props.packages.length).fill(false)
        }
        this.setState({
            packages: pkgs,
            added: inCart,
            expanded: false,
            name: name
        })
    }
  }

  componentDidMount() {
    const pkgs = this.props.packages
    let inCart = []
    const name = this.props.name
    if (this.props.cart.packages) {
        for (let i = 0; i < this.props.packages.length; i++) {
            if (this.props.cart.packages.includes(this.props.packages[i])) {
                inCart.push(true)
            } else inCart.push(false)
        }
    } else {
        inCart = Array(this.props.packages.length).fill(false)
    }
    this.setState({
        packages: pkgs,
        added: inCart,
        expanded: false,
        name: name
    })
  }

  handleExpand() {
      let expand = !this.state.expanded
      this.setState({
          expanded: expand
      })
  }

  handleCart(i) {
      // todo, add item to cart
      this.props.newItem(this.state.packages[i]);
      const addedItem = this.state.added.slice();
      addedItem.splice(i, 1, true);
      this.setState({
          added: addedItem
      })
      return;
  }

  render() {
    return (
        <div className='Package' style={this.props.style}>
            <div className='PackDiv'>
                <h2 className='PackTitle'>{this.props.name} - scoped packages:</h2>
                <p className='PackDesc'>{this.props.about}</p>
            </div>
                <div className='ExpandBox' style={ this.state.expanded ? {} : {display: 'none'} }>
                    {this.state.packages ? this.state.packages.map((pkg, i) => {
                        return (
                            <div className='PackButtons' style={{padding: '0.2em'}} key={pkg.name}>
                                <a className='PackDesc'>{pkg.name}</a>
                                <button 
                                    onClick={this.handleCart.bind(this, i)}
                                    disabled={this.state.added[i]}
                                    className='btn btn-success'
                                    style={ this.state.expanded ? {
                                        margin: 0,
                                        padding: '0em 0.8em',
                                        fontStyle: 'italic',
                                        fontSize: '.7em',
                                        color: c.body_bg,
                                        borderColor: c.off_green,
                                        backgroundColor: c.off_green 
                                        } : { 
                                        display: 'none' }}>
                                    {this.state.added[i] ? 'Added to Project' : 'Add to Project'}
                                </button>
                            </div>
                        )
                    }) : null}
                </div>
            <div className={this.state.expanded ? 'PackButtons' : 'PackButtons'}>
                <button
                    onClick={this.handleCart.bind(this)}
                    disabled={this.state.added}
                    className='btn btn-success'
                    style={ { opacity: 0 } }>
                </button>
                <button
                    onClick={this.handleExpand.bind(this)}
                    className='btn btn-outline-success'
                    style={ { 
                        width: '1.6em',
                        height: '1.6em',
                        margin: 0,
                        padding: '0em',
                        fontSize: '.7em' } }>
                    {!this.state.expanded ? '▼' : '▲'}
                </button>
            </div>
        </div>
    );
  }
}


const mapStateToProps = (state) => {
    return {
        cart: state.cart
    };
  };
  
export default connect(mapStateToProps, { newItem })(ScopedPackages);