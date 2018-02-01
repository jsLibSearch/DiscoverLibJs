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
            freq: 0
        }
    };
  }

  componentDidMount() {
    const pkg = {
        name: this.props.name,
        about: this.props.about,
        freq: this.props.freq
    }
    this.setState({
      package: pkg
    })
  }

  render() {
    const name = this.state.package.name;
    const about = this.state.package.about;
    const freq = this.state.package.freq;
    return (
      <div>
        <h2>{name}</h2>
        <p>Found in {freq} {freq > 1 ? 'packages' : 'package' }</p>
        <p>{about}</p>
      </div>
    );
  }
}

export default Package;
