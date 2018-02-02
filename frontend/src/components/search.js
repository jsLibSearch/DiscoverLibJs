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

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    if (this.props.redux.query.length > 0){
      this.props.getPackages(this.props.redux.query);
    }
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
    return (
      <div>
        <div>
          <h3 className='SearchHeader'>{this.props.redux.packages['error'] !== "no packages found" ? Object.keys(this.props.redux.packages).length : 0} Search Results for "{this.state.query}"</h3>
        </div>
        <div className='SearchResults'>
          {this.props.redux.packages['error'] !== "no packages found" ? Object.keys(this.props.redux.packages).map((pkg, i) => {
            if (pkg === 'error') {
              return (null)
            }
            return (
            <div key={i + 'id'}>
              <Package
                key={i}
                name={this.props.redux.packages[pkg].name}
                about={this.props.redux.packages[pkg].description}
                freq={this.props.redux.packages[pkg].freq}
                keywords={this.props.redux.packages[pkg].keywords}
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

export default withRouter(connect(mapStateToProps, { getPackages })(SearchPage));