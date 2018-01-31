import React, { Component } from 'react';
import '../App.css';
import { customColors as c } from '../custom/colors.js';
import { Route } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedQuery: '',
            itemsInCart: 0,
            username: '',
            loggedIn: false
        };
    }

    componentDidMount() {
        this.setState({
            searchedQuery: '',
            itemsInCart: 9,
            username: 'coleferg',
            loggedIn: true
        })
    }
    handleEnter(e) {
        if (e.key !== 'Enter') {
            return;
        }
        return;
    }

    handleSearch() {
        return;
    }

    handleQuery(e) {
        const query = e.target.value;
        this.setState({
            searchedQuery: query,
        })
    }

    render() {
        return (
            <div className="App-header">
                <div style={{display: 'inline-flex', width: '50em'}}>
                    <h1 className='Logo'>JS Lib Discovery</h1>
                    <div className="btn btn-secondary" className="btn-group"  style={{marginTop: '.25em', display: 'flex', justifyContent: 'center', marginBottom: 3, height: '2em', borderColor: c.off_green}}>
                        <input placeholder='Search for Libraries' style={{color: c.header, fontSize: '1em', backgroundColor: c.body_bg }} className="btn btn-outline-secondary" onKeyPress={this.handleEnter.bind(this)} onChange={this.handleQuery.bind(this)} value={ this.state.searchedQuery } />
                        <button style={{ color: c.off_green, fontSize: '.75em', backgroundColor: c.body_bg  }} className="btn btn-outline-secondary" onClick={this.handleSearch.bind(this)}>Search</button>
                    </div>
                    <div className='HeaderLeft'>
                        <h1 className='HeadLink'>Getting Started</h1>
                        <h1 className='HeadLink'>FAQ</h1>
                        <h1 className='HeadLink'>GitHub</h1>
                    </div>
                </div>
                <div className='HeaderRight'>
                    <h1 className='Sign' style={this.state.loggedIn ? {display: 'none'} : null}>Sign Up</h1>
                    <h1 className='Sign' style={this.state.loggedIn ? {display: 'none'} : null}>Log In</h1>
                    <h1 className='Sign' style={!this.state.loggedIn ? {display: 'none'} : null}>Log Out</h1>
                    <h1 className='Username' style={!this.state.loggedIn ? {display: 'none'} : null}>{this.state.username.length > 0 ? this.state.username : ''}</h1>
                    <div className='Cart-Box'>
                        <div className={'Inner-Cart-Box'}>
                            <h2 className='Brackets'>[</h2>
                            <h2 className='Quantity'>{this.state.itemsInCart}</h2>
                            <h2 className='Brackets'>]</h2>
                        </div>
                    </div>
                </div>
                    
            </div>
    );
  }
}

export default Header;