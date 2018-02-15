import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPackages, newItem } from '../actions';
import '../App.css';
// import { customColors as c } from '../custom/colors.js';
import Package from './package.js';
import ScopedPackages from './scoped_package.js'

export class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        windowHeight: window.innerHeight - 40,
        packages: [],
        query: '',
        dev: false,
        loading: false,
        results: 0
    };
  }

  componentDidUpdate() {
    if (this.props.redux.query !== this.state.query && this.refs.searchPage) {
      this.props.getPackages(this.props.redux.query);
      this.setState({
        query: this.props.redux.query
      })
    }
    if (this.props.redux.loading && !this.state.loading) {
      this.setState({
        loading: true,
        query: this.props.redux.query
      })
    } else if (!this.props.redux.loading && this.state.loading) {
      const numberOfResults = this.props.redux.packages.length + (Object.keys(this.props.redux.packages[this.props.redux.packages.length - 1]).length - 2)
      this.setState({
        loading: false,
        packages: this.props.redux.packages,
        results: numberOfResults
      })
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    if (this.props.redux.query.length > 0){
      this.props.getPackages(this.props.redux.query);
    }
    if (this.props.redux.loading && !this.state.loading) {
      console.log('loading =', this.props.redux.loading)
      this.setState({
        loading: true,
        query: this.props.redux.query
      })
    } else if (!this.props.redux.loading && this.state.loading) {
      console.log('loading =', this.props.redux.loading)
      this.setState({
        loading: false,
        packages: this.props.redux.packages
      })
    }
    if (!this.refs.searchPage) {
      return;
    }
    this.setState({
      windowHeight: window.innerHeight - 40,
      query: this.props.redux.query
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this))
  }

  handleResize() {
    if (!this.refs.searchPage) {
      return;
    }
    this.setState({
        windowHeight: window.innerHeight - 40
    })
  }
  
  fillDevCart() {
    this.props.redux.packages.forEach(pkg => {
      if (pkg.scoped === false || pkg.scoped === true) {
        return;
      }
      this.props.newItem(pkg)
    });
  }

  render() {
    return (
      <div ref='searchPage'>
        {this.state.dev ? (<button onClick={this.fillDevCart.bind(this)}>fill all</button>): null}
        <div>
          {this.state.loading ?
            (<h3 className='SearchHeader'>Loading search results for "{this.state.query}"</h3>)
            :!this.props.redux.query ? 
            (<h3 className='SearchHeader'>Please enter a search term above!</h3>)
              :(<h3 className='SearchHeader'>{this.props.redux.packages['error'] !== "no packages found" ? this.state.results : 0} Search Results for "{this.state.query}"</h3>)}
        </div>
        <div className='SearchResults'>
          {this.props.redux.packages['error'] !== "no packages found" ? Object.keys(this.props.redux.packages).map((pkg, i) => {
            if (pkg === 'error') {
              return (null)
            }
            if (this.props.redux.packages[pkg].scoped === true) {
              const keys = Object.keys(this.props.redux.packages[pkg])
              return keys.map(key => {
                if (key === 'scoped') {
                  return null
                }
                return (
                  <div key={key}>
                    <ScopedPackages
                        key={i + key}
                        name={key}
                        packages={this.props.redux.packages[pkg][key]}/>
                  </div>
                )
              })
            } else if (this.props.redux.packages[pkg].scoped === false) {
              return null;
            }
            return (
            <div key={i + 'id'}>
              <Package
                key={i}
                name={this.props.redux.packages[pkg].name}
                about={this.props.redux.packages[pkg].description}
                freq={this.props.redux.packages[pkg].freq}
                keywords={this.props.redux.packages[pkg].keywords}
                parents={this.props.redux.packages[pkg].parents}
                _id={this.props.redux.packages[pkg]._id}
                homepage={this.props.redux.packages[pkg].homepage}/>
            </div>)
          }) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      redux: state.packages
  };
};

export default withRouter(connect(mapStateToProps, { getPackages, newItem })(SearchPage));