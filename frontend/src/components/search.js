import React, { Component } from 'react';
import '../App.css';
import { customColors as c } from '../custom/colors.js';
import testPackages from '../custom/dummy_data.json';
import Package from './package.js'

export class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        windowHeight: window.innerHeight - 40,
        packages: {}
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this))
    this.setState({
      windowHeight: window.innerHeight - 40,
      packages: testPackages
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
        search resultz
        {this.state.packages ? Object.keys(this.state.packages).map((pkg) => {
          return (
          <div>
            <Package name={this.state.packages[pkg].name} about={this.state.packages[pkg].description} freq={this.state.packages[pkg].freq} />
          </div>)
        }) : <p>no packages found</p>}
      </div>
    );
  }
}

export default SearchPage;
