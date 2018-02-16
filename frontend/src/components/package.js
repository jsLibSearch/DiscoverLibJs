import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newItem } from '../actions';
import '../App.css';
import { customColors as c } from '../custom/colors.js';

class Package extends Component {
  constructor(props) {
    super(props);
    this.state = {
        package: {
            name: '',
            about: '',
            freq: 0,
            homepage: '',
            keywords: [],
            parents: [],
            _id: ''
        },
        expanded: false,
        added: false
    };
  }

  componentDidUpdate() {
    if (this.props.name !== this.state.package.name) {
        const pkg = {
            name: this.props.name,
            about: this.props.about,
            freq: this.props.freq,
            homepage: this.props.homepage,
            keywords: this.props.keywords,
            parents: this.props.parents,
            _id: this.props._id
        }
        let inCart = false
        if (this.props.cart.packages) {
            for (let i = 0; i < this.props.cart.packages.length; i++) {
                if (this.props.name === this.props.cart.packages[i].name) {
                    inCart = true
                }
            }
        }
        this.setState({
            package: pkg,
            added: inCart,
            expanded: false
        })
    }
  }

  componentDidMount() {
    const pkg = {
        name: this.props.name,
        about: this.props.about,
        freq: this.props.freq,
        homepage: this.props.homepage,
        keywords: this.props.keywords,
        parents: this.props.parents,
        _id: this.props._id
    }
    let inCart = false
    if (this.props.cart.packages) {
        for (let i = 0; i < this.props.cart.packages.length; i++) {
            if (this.props.name === this.props.cart.packages[i].name) {
                inCart = true
            }
        }
    }
    this.setState({
      package: pkg,
      added: inCart
    })
  }

  handleExpand() {
      let expand = !this.state.expanded
      this.setState({
          expanded: expand
      })
  }

  handleCart() {
      // todo, add item to cart
      this.props.newItem(this.state.package);
      this.setState({
          added: true
      })
      return;
  }

  render() {
    return (
        <div className='Package'>
            <div className='PackDiv'>
                <h2 className='PackTitle'>{this.props.name}</h2>
                <p className='PackDesc'>{this.props.about}</p>
            </div>
                <div className='ExpandBox' style={ this.state.expanded ? {} : {display: 'none'} }>
                    <ul style={{margin: '0em', padding: '0em 3em'}}>
                        <li>Found in {this.props.freq} {this.props.freq > 1 ? 'packages' : 'package' }</li>
                        <li>Homepage: <a href={this.props.homepage}>{this.props.homepage}</a></li>
                        <li>Keywords: {this.props.keywords ? this.props.keywords.map((keyword, i) => keyword + ' '): null}</li>
                    </ul>
                </div>
            <div className='PackButtons'>
                <button
                    onClick={this.handleCart.bind(this)}
                    disabled={this.state.added}
                    className='btn btn-success'
                    style={ {
                            margin: 0,
                            padding: '0em 0.8em',
                            fontStyle: 'italic',
                            fontSize: '.7em',
                            color: c.body_bg,
                            borderColor: c.off_green,
                            backgroundColor: c.off_green,
                            backgroundColor: c.off_green
                        } }>
                    {this.state.added ? 'Added to Project' : 'Add to Project'}
                </button>
                <button onClick={this.handleExpand.bind(this)} className='btn btn-outline-success' style={ { width: '1.6em', height: '1.6em', margin: 0, padding: '0em', fontSize: '.7em' } }>{!this.state.expanded ? '▼' : '▲'}</button>
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
  
export default connect(mapStateToProps, { newItem })(Package);