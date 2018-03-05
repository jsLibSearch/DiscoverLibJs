import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap'
import { newItem } from '../actions';
import '../App.css';

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.cart.packages.length > 0) {   
        if (JSON.stringify(this.props.cart.packages) !== JSON.stringify(nextProps.cart.packages)) {
            for (let i = 0; i < nextProps.cart.packages.length; i++) {
                if (this.props.name === nextProps.cart.packages[i].name) {
                    this.setState({
                        added: true
                    })
                    break;
                }
            }
        }
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
      this.props.newItem(this.state.package);
      this.setState({
          added: true
      })
      return;
  }

  render() {
    return (
        <div className='Package' style={this.props.style}>
            <div className='PackDiv'>
                <h2 className='PackTitle'>{this.props.name}</h2>
                <p className='PackDesc' style={this.props.small ? { fontSize: '1.8rem' } : {}}>{this.props.about ? this.props.about : null}</p>
            </div>
                <div className='ExpandBox' style={ this.state.expanded ? {} : {display: 'none'} }>
                    <ul style={{margin: '0em', listStyleType: 'none', paddingLeft: '30px', maxWidth: window.innerWidth - 50}}>
                        <li style={{ wordWrap: 'break-word', overflowWrap: 'break-word', overflowX: 'hidden', textOverflow: 'ellipsis' }}>
                            Found in {this.props.freq} {this.props.freq > 1 ? 'packages' : 'package' }
                        </li>
                        <li style={{ wordWrap: 'break-word', overflowWrap: 'break-word', overflowX: 'break-all', textOverflow: 'ellipsis' }}>Homepage: <a rel="noopener noreferrer" target="_blank" href={this.props.homepage}>{this.props.homepage}</a></li>
                        <li style={{ wordWrap: 'break-word', overflowWrap: 'break-word', overflowX: 'break-all', textOverflow: 'ellipsis' }}>Keywords: {this.props.keywords ? this.props.keywords.map((keyword, i) => keyword + ' '): null}</li>
                    </ul>
                </div>
            <div className='PackButtons'>
                <Button
                    color='primary'
                    style={{ backgroundColor: '#115d63', borderColor: '#115d63', marginRight: '5px', fontSize: '1.8rem', color: 'white', fontWeight: '100' }}
                    onClick={this.handleCart.bind(this)}
                    disabled={this.state.added}>
                    {this.state.added ? 'Added to Project' : 'Add to Project'}
                </Button>
                <Button
                    outline
                    style={{ fontSize: '1.8rem', fontWeight: '100' }}
                    onClick={this.handleExpand.bind(this)}>
                    {!this.state.expanded ? 'More' : 'Less'}
                </Button>
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