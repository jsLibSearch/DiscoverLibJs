import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPackages, newItem, searchRec, clearSearch } from '../actions';
import '../App.css';
// import { customColors as c } from '../custom/colors.js';
import Package from './package.js';
import ScopedPackages from './scoped_package.js';
import { initGA, logPageView } from './ReactGA';
import { Button } from 'reactstrap';

export class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        windowWidth: window.innerWidth,
        small: false,
        packages: [],
        query: '',
        dev: false,
        loading: false,
        results: 0,
        smallLimit: 30,
        recs: [],
        loadingRecs: false,
        loadRecsStarted: false,
        showMoreRecs: false
    };
  }

  componentDidUpdate() {
    if (this.props.redux.query !== this.state.query && this.refs.searchPage) {
      this.props.cart.packages.length > 0 ? this.props.searchRec(this.props.cart.packages, this.props.redux.query) : this.props.getPackages(this.props.redux.query);
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
        results: numberOfResults
      })
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    const small = this.state.windowWidth < 700 ? true : false;
    if (this.props.redux.query.length > 0){
      this.props.cart.packages.length > 0 ? this.props.searchRec(this.props.cart.packages, this.props.redux.query) : this.props.getPackages(this.props.redux.query);
    }
    if (this.props.redux.loading && !this.state.loading) {
      this.setState({
        loading: true,
        query: this.props.redux.query
      })
    } else if (!this.props.redux.loading && this.state.loading) {
      this.setState({
        loading: false,
      })
    }
    if (!this.refs.searchPage) {
      return;
    }
    this.setState({
      windowWidth: window.innerWidth,
      small: small,
      query: this.props.redux.query
    })
    initGA();
    logPageView();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.recState.loading && !this.props.recState.loading) {
      this.setState({
        loadingRecs: true,
        loadRecsStarted: true
      })
    } else if (!nextProps.recState.loading && this.props.recState.loading) {
      this.setState({
        loadingRecs: false,
        recs: nextProps.recState.recs,
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
    this.props.clearSearch();
  }

  handleResize() {
    if (!this.refs.searchPage) {
      return;
    }
    const small = this.state.windowWidth < 700 ? true : false;
    this.setState({
        windowWidth: window.innerWidth,
        small: small
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

  allowMoreResults() {
    const allow = this.state.smallLimit + 10;
    this.setState({
      smallLimit: allow
    })
  }

  toggleShowMoreRecs() {
    this.setState({
      showMoreRecs: !this.state.showMoreRecs
    })
  }

  render() {
    return (
      <div ref='searchPage'>
        {this.state.dev ? (<button onClick={this.fillDevCart.bind(this)}>fill all</button>): null}
        {this.props.cart.packages.length > 0 && this.state.loadRecsStarted ? (
        <div style={{ borderBottom: '1px solid rgb(103, 122, 87)', marginTop: '.2em' }}>
          <p className={this.state.small ? 'SearchHeaderSmall':'SearchHeader'}>
            {this.state.loadingRecs ? 'Loading recommendations' : 'Recommendations'}
          </p>
        </div>
      ): null}
        {this.props.recState.recs.length > 0 ?
        this.props.recState.recs.map((rec, i) => {
          if (this.props.recState.recs.length === i + 1) {
            return (
              <div key={'scoper'}>
              </div>
            )
          }
          if (!this.state.showMoreRecs && i >= 5) {
            if (i === 5) {
              return (
                <div key={'recbutton'}>
                  <Button size='sm' style={{
                    height: '2.2em',
                    fontSize: '.8em',
                    border: 'none'
              }} onClick={this.toggleShowMoreRecs.bind(this)}>Show more</Button>
                </div>
              )
            }
            return (null)
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
        <div style={{ borderBottom: '1px solid rgb(103, 122, 87)', marginTop: '.2em' }}>
          {this.state.loading ?
            (<h3 className={this.state.small ? 'SearchHeaderSmall':'SearchHeader'}>Loading search results for "{this.state.query}"</h3>)
            :!this.props.redux.query ? 
            (<h3 className={this.state.small ? 'SearchHeaderSmall':'SearchHeader'}>Please enter a search term above!</h3>)
              :(<h3 className={this.state.small ? 'SearchHeaderSmall':'SearchHeader'}>{this.props.redux.packages['error'] !== "no packages found" ? this.state.results : 0} Search Results for "{this.state.query}"</h3>)}
        </div>
        <div className='SearchResults'>
          {this.props.redux.packages['error'] !== "no packages found" ? Object.keys(this.props.redux.packages).map((pkg, i) => {
            if (this.state.small && i === this.state.smallLimit) {
              return <button key={i} onClick={this.allowMoreResults.bind(this)} style={{ width: '98%', margin: '.2em 0em' }} className='btn btn-success'>More results...</button>;
            } else if (this.state.small && i > this.state.smallLimit) {
              return null;
            }
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
                  <div key={key} style={this.state.small ? {margin: '0.3em'} : {}}>
                    <ScopedPackages
                        key={i + key}
                        name={key}
                        style={this.state.small ? { margin: '1em 0em' } : {}}
                        small={this.state.small}
                        packages={this.props.redux.packages[pkg][key]}/>
                  </div>
                )
              })
            } else if (this.props.redux.packages[pkg].scoped === false) {
              return null;
            }
            return (
            <div key={i + 'id'} style={this.state.small ? {margin: '0.3em'} : {}}>
              <Package
                style={this.state.small ? { margin: '1em 0em' } : {}}
                key={i}
                name={this.props.redux.packages[pkg].name}
                about={this.props.redux.packages[pkg].description}
                freq={this.props.redux.packages[pkg].freq}
                keywords={this.props.redux.packages[pkg].keywords}
                parents={this.props.redux.packages[pkg].parents}
                _id={this.props.redux.packages[pkg]._id}
                small={this.state.small}
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
      redux: state.packages,
      cart: state.cart,
      recState: state.recState
  };
};

export default withRouter(connect(mapStateToProps, { getPackages, newItem, searchRec, clearSearch })(SearchPage));