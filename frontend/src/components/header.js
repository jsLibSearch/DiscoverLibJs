import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, Button, InputGroup, Input, InputGroupAddon } from 'reactstrap';
import { newSearch, clearAccessToken, makeServerCalls, logOutUser, setCartName, newItem, dev } from '../actions';
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
            windowWidth: window.innerWidth,
            server: !dev ? 'https://javascript-library-discovery2.herokuapp.com/' : 'http://localhost:8080/',
            userOptionsOpen: false
        };
    }

    componentDidUpdate() {
        if (this.props.user.user.username && this.props.user.user.username !== this.state.username) {
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
        const small = this.state.windowWidth < 700 ? true : false;
        const lastCart = JSON.parse(sessionStorage.getItem('cart'));
        if (lastCart !== null) {
            this.props.setCartName(lastCart.name);
            lastCart.packages.forEach(element => {
                this.props.newItem(element);
            });
            sessionStorage.removeItem('cart');
            this.setState({
                searchedQuery: '',
                itemsInCart: lastCart.packages.length,
                windowWidth: window.innerWidth,
                small: small,
            });
        }
        this.setState({
            searchedQuery: '',
            itemsInCart: 0,
            windowWidth: window.innerWidth,
            small: small,
        });
        if (this.props.user.status === 'unauthorized') {
            const userUnParsed  = sessionStorage.getItem('JSLDUser');
            const accessToken = sessionStorage.getItem('JSLDToken')
            const user = JSON.parse(userUnParsed)
            if (user) {
                this.props.makeServerCalls(user.jwt, user.github_id, accessToken);
            }
          }
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
        const small = this.state.windowWidth < 700 ? true : false;
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
        if (this.props.redux.cart.packages.length > 0) {
            sessionStorage.setItem('cart', JSON.stringify(this.props.redux.cart))
        }
        axios
            .get(`${this.state.server}login`)
                .then((response) => {
                    window.location = response.data;
                })
                .catch((err) => {
                    console.log(err);
                });
    }

    handleLogOutClick() {
        sessionStorage.removeItem('jwtToken');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('JSLDUser');
        sessionStorage.removeItem('JSLDToken');
        this.setState({
            username: '',
            loggedIn: false,
            userOptionsOpen: false
        })
        this.props.clearAccessToken();
        this.props.logOutUser();
    }

    toggleUserOptions() {
        const option = !this.state.userOptionsOpen;
        this.setState({
            userOptionsOpen: option
        })
    }

    render() {
        return (
        <div style={{ paddingBottom: '.25em' }}>
            <div className="App-header" style={this.state.small ? { justifyContent: 'center' } : { justifyContent: 'center' }}>
                <div className="App-header-Center" style={this.state.small ? { justifyContent: 'space-between' } : {}}>
                    <Link to='/' className='Logo' style={ this.state.small ? { fontSize: '3rem', overflow: 'visible', marginLeft: '0px', maxWidth: '150px', lineHeight: 1, padding: '14px 0px 11px' }:{  }}>JS LIB DISCOVERY</Link>
                    <div className='HeaderRight'>
                        {/* <Link to="/signup" className={!this.state.small ? 'Sign' : 'SignSmall'} style={this.state.loggedIn ? {display: 'none'} : null}>Sign Up</Link> */}
                        <Link to="/login" className={!this.state.small ? 'Sign' : 'SignSmall'} style={this.state.loggedIn ? {display: 'none'} : null} onClick={() => { this.handleLogInClick() }} >Log In</Link>
                        {this.state.loggedIn ? (
                        <Dropdown
                            group
                            title='User Options'
                            id={`options2`}
                            isOpen={this.state.userOptionsOpen}
                            toggle={this.toggleUserOptions.bind(this)}
                            size="sm">
                        <DropdownToggle
                            style={this.state.small ? { border: 'none', margin: '0em', fontSize: '2rem', maxWidth: this.state.windowWidth - 250 } : { border: 'none', margin: '0em' }}
                            size="sm"
                            outline
                            className={!this.state.small ? 'Username' : 'UsernameSmall'}
                            caret={false}>
                            {this.state.username}
                        </DropdownToggle>
                            <DropdownMenu style={{backgroundColor: c.header, borderRadius: '.4rem', width: 'auto'}}>
                                <div className="username-dropdown">
                                <Link to="/user" onClick={this.toggleUserOptions.bind(this)} className={!this.state.small ? 'SignDD' : 'SignDD'} >Your projects</Link>
                                </div>
                                <div className="username-dropdown">
                                <Link to="/logout" className={!this.state.small ? 'SignDD' : 'SignDD'} onClick={() => { this.handleLogOutClick() }} >Log Out</Link>
                                </div>
                            </DropdownMenu>
                        </Dropdown>) : null}
                        <div onClick={this.handleCart.bind(this)} className='Cart-Box'>
                            <p className='Brackets'>[{this.state.itemsInCart}]</p>
                        </div>
                    </div>
                </div>
            </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '15px 5px', height: '40px' }}>
            <InputGroup  style={{ maxWidth: '1000px', border: '5px #e1e1e2' }}>
                <Input color='secondary' placeholder={'Search for Libraries'} style={{color: c.header, backgroundColor: 'white', border: '1px solid #313532', fontSize: '1.8rem', textAlign: 'center', fontWeight: '100' }} onKeyPress={this.handleEnter.bind(this)} onChange={this.handleQuery.bind(this)} value={ this.state.searchedQuery } />
                <InputGroupAddon addonType="append">
                    <Button color='info' style={{ color: 'white', width: '95px', fontSize: '1.8rem', backgroundColor: '#115d63', border: '1px solid #115d63', fontWeight: '100'}} onClick={this.handleSearch.bind(this)}>Search</Button>
                </InputGroupAddon>
            </InputGroup>
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
  
export default withRouter(connect(mapStateToProps, { newSearch, clearAccessToken, makeServerCalls, logOutUser, setCartName, newItem })(Header));