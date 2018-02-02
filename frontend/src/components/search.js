import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPackages } from '../actions';
import '../App.css';
import { customColors as c } from '../custom/colors.js';
import Package from './package.js';

export class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        windowHeight: window.innerHeight - 40,
        packages: {},
        query: 'all',
    };
  }

  componentWillMount() {
    console.log(this.props.getPackages());
  }

  componentDidMount() {
    console.log(this.state.packages, '<------', 'this.state.packages');
    window.addEventListener('resize', this.handleResize.bind(this));
    this.setState({
      windowHeight: window.innerHeight - 40,
      packages: this.props.redux.packages,
      query: this.props.redux.query
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this))
  }

  handleResize() {
    this.setState({
        windowHeight: window.innerHeight - 40
    })
  }
  
  render() {
    console.log(this.props.redux.packages);
    console.log(this.state.packages, '<-----', 'this.state.packages');
    return (
      <div>
        <div>
          <h3 className='SearchHeader'>{Object.keys(this.props.redux.packages).length} Search Results for "{this.state.query}"</h3>
        </div>
        <div className='SearchResults'>
          {this.props.redux.packages ? Object.keys(this.props.redux.packages).map((pkg, i) => {
            return (
            <div key={i + 'id'}>
              <Package key={i} name={this.props.redux.packages[pkg].name} about={this.props.redux.packages[pkg].description} freq={this.props.redux.packages[pkg].freq} />
            </div>)
          }) : <p>No packages found for {this.state.query}</p>}
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

export default withRouter(connect(mapStateToProps, { getPackages })(SearchPage));