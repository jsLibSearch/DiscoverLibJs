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
        query: 'all'
    };
  }

  componentDidMount() {
    this.props.getPackages();
    window.addEventListener('resize', this.handleResize.bind(this))
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
    return (
      <div>
        <div>
          <h3 className='SearchHeader'>{Object.keys(this.state.packages).length} Search Results for "{this.state.query}"</h3>
        </div>
        <div className='SearchResults'>
          {this.state.packages ? Object.keys(this.state.packages).map((pkg, i) => {
            return (
            <div key={i + 'id'}>
              <Package key={i} name={this.state.packages[pkg].name} about={this.state.packages[pkg].description} freq={this.state.packages[pkg].freq} />
            </div>)
          }) : <p>No packages found for {this.state.query}</p>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      redux: state
  };
};

export default withRouter(connect(mapStateToProps, { getPackages })(SearchPage));