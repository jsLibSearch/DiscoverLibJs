import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { newSearch, clearAccessToken, makeServerCalls } from '../actions';
import './header.css';
import { customColors as c } from '../custom/colors.js';
import { Link } from 'react-router-dom';
const axios = require('axios');


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedQuery: '',
            itemsInCart: 0,
            username: '',
            loggedIn: false,
            windowWidth: window.innerWidth
        };
    }

    componentDidUpdate() {
        if (this.props.user.user.username && this.props.user.user.username !== this.state.username) {
            console.log('kalamidy')
            this.setState({
                itemsInCart: this.props.redux.cart.packages.length,
                username: this.props.user.user.username,
                loggedIn: true,
            })
        }
        if (this.props.redux.cart.packages.length !== this.state.itemsInCart) {
            this.setState({ itemsInCart: this.props.redux.cart.packages.length })
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this));
        const small = this.state.windowWidth < 697 ? true : false;
        this.setState({
            searchedQuery: '',
            itemsInCart: 0,
            windowWidth: window.innerWidth,
            small: small,
        });
    }

    componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.user.user.hasOwnProperty('username')) {
            this.setState({
                username: nextProps.user.user.username,
                loggedIn: true,
            });
            
        }

        if (this.state.loggedIn) {
            // const jwtToken = sessionStorage.getItem('jwtToken');
            // this.props.makeServerCalls(jwtToken, this.props.user.github_id);         
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this));
    }

    handleResize() {
        this.setState({
            windowWidth: window.innerWidth
        })
        const small = this.state.windowWidth < 697 ? true : false;
        this.setState({
            small: small
        })
    }

    handleEnter(e) {
        if (e.key !== 'Enter') {
            return;
        }
        if (this.state.searchedQuery) {
            this.props.newSearch(this.state.searchedQuery);
        }
        this.props.history.push(`/search`);
        return;
    }

    handleSearch() {
        this.props.newSearch(this.state.searchedQuery);
        this.props.history.push(`/search`);
        return;
    }

    handleQuery(e) {
        const query = e.target.value;
        this.setState({
            searchedQuery: query,
        })
    }

    handleCart() {
        this.props.history.push(`/`);
        this.props.history.push(`/cart`);
        return;
    }

    // this will redirect user to GitHub login page
    handleLogInClick() { 
        axios
            .get('http://localhost:8080/login')
                .then((response) => {
                    window.location = response.data;
                })
                .catch((err) => {
                    console.log(err);
                });
    }

    handleLogOutClick() {
        sessionStorage.clear();
        this.setState({
            username: '',
            loggedIn: false,
        })
        this.props.clearAccessToken();
    }

    render() {
        return (
            <div className="App-header">

                <div style={this.state.small ? {display: 'inline-flex', width: '20em'} : {display: 'inline-flex', width: '50em'}}>
                    <Link to='/' className='Logo' style={ this.state.small ? { fontSize: '.6em', marginTop: '.6em' }: null}>JS Lib Discovery</Link>
                    <div className="btn-group"  style={!this.state.small ? {marginTop: '.25em', display: 'flex', justifyContent: 'center', marginBottom: 3, height: '2em', borderColor: c.off_green} : {marginTop: '.35em', display: 'flex', justifyContent: 'center', marginBottom: 3, height: '1.6em', borderColor: c.off_green}}>
                        <input placeholder='Search for Libraries' style={ !this.state.small ? {color: c.header, fontSize: '1em', backgroundColor: c.body_bg } : {color: c.header, fontSize: '.7em', backgroundColor: c.body_bg, width: '100px' }} className="btn btn-outline-secondary" onKeyPress={this.handleEnter.bind(this)} onChange={this.handleQuery.bind(this)} value={ this.state.searchedQuery } />
                        <button style={ !this.state.small ? { color: c.off_green, fontSize: '.75em', backgroundColor: c.body_bg } : { color: c.off_green, fontSize: '.45em', backgroundColor: c.body_bg  }} className="btn btn-outline-secondary" onClick={this.handleSearch.bind(this)}>Search</button>
                    </div>
                    <div className='HeaderLeft' style={this.state.windowWidth < 912 ? { display: 'none' } : null}>
                        <Link to="/gettingstarted" className='HeadLink'>Getting Started</Link>
                        <Link to="/faq" className='HeadLink'>FAQ</Link>
                        <a rel="noopener noreferrer" href="https://github.com/jsLibSearch/DiscoverLibJs" target="_blank" className='HeadLink'>GitHub</a>
                    </div>
                </div>
                <div className='HeaderRight'>
                    <Link to="/signup" className={!this.state.small ? 'Sign' : 'SignSmall'} style={this.state.loggedIn ? {display: 'none'} : null}>Sign Up</Link>
                    <Link to="/login" className={!this.state.small ? 'Sign' : 'SignSmall'} style={this.state.loggedIn ? {display: 'none'} : null} onClick={() => { this.handleLogInClick() }} >Log In</Link>
                    <Link to="/logout" className={!this.state.small ? 'Sign' : 'SignSmall'} style={!this.state.loggedIn ? {display: 'none'} : null} onClick={() => { this.handleLogOutClick() }} >Log Out</Link>
                    <Link to="/user" className={!this.state.small ? 'Username' : 'UsernameSmall'} style={!this.state.loggedIn ? {display: 'none'} : null}>{this.state.username.length > 0 ? this.state.username : ''}</Link>
                    <div onClick={this.handleCart.bind(this)} className='Cart-Box'>
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

const mapStateToProps = (state, ownProps) => {
    return {
        redux: state,
        accessToken: state.accessToken,
        user: state.userStatusReducer,
    };
};
  
export default withRouter(connect(mapStateToProps, { newSearch, clearAccessToken, makeServerCalls })(Header));