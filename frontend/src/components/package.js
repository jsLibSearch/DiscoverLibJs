import React, { Component } from 'react';
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
            homepage: 'http://www.google.com/',
            keywords: ['javascript', 'fun', 'basic', 'web']
        },
        expanded: false
    };
  }

  componentDidMount() {
    const pkg = {
        name: this.props.name,
        about: this.props.about,
        freq: this.props.freq,
        homepage: `https://www.npmjs.com/package/` + this.props.name,
        keywords: this.state.package.keywords
    }
    this.setState({
      package: pkg
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
      console.log(this.state.package.name, 'was added to the cart')
      return;
  }

  render() {
    const name = this.state.package.name;
    const about = this.state.package.about;
    const freq = this.state.package.freq;
    return (
        <div className='Package'>
            <div className='PackDiv'>
                <h2 className='PackTitle'>{name}</h2>
                <p className='PackDesc'>{about}</p>
            </div>
            <div className='ExpandBox' style={ this.state.expanded ? {} : {display: 'none'} }>
                <ul style={{margin: '0em', padding: '0em 3em'}}>
                    <li>Found in {freq} {freq > 1 ? 'packages' : 'package' }</li>
                    <li>Homepage: <a href={this.state.package.homepage}>{this.state.package.homepage}</a></li>
                    <li>Keywords: {this.state.package.keywords ? this.state.package.keywords.map((keyword, i) => keyword + ' '): null}</li>
                </ul>
            </div>
            <div className={this.state.expanded ? 'PackButtons' : 'PackButton'}>
                <button onClick={this.handleCart.bind(this)} className='btn btn-success' style={ this.state.expanded ? { margin: 0, padding: '0em 0.8em', fontStyle: 'italic', fontSize: '.7em', color: c.body_bg, borderColor: c.off_green, backgroundColor: c.off_green } : { display: 'none' } }>{!this.state.expanded ? '' : 'Add to Cart'}</button>
                <button onClick={this.handleExpand.bind(this)} className='btn btn-outline-secondary' style={ { width: '1.6em', height: '1.6em', margin: 0, padding: '0em', fontSize: '.7em', color: c.pink_red, borderColor: c.off_green } }>{!this.state.expanded ? '▼' : '▲'}</button>
            </div>
        </div>
    );
  }
}

export default Package;
