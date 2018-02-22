import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
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
        const small = this.state.windowWidth < 500 ? true : false;
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
        const small = this.state.windowWidth < 500 ? true : false;
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
            <div className="App-header" style={this.state.small ? { justifyContent: 'space-between' } : {}}>

                <div style={this.state.small ? {display: 'inline-flex', justifyContent: 'space-between'} : {display: 'inline-flex', paddingLeft: '1em', paddingRight: '5em'}}>
                    <Link to='/' className='Logo' style={ this.state.small ? { fontSize: '.8em', margin: '.5em .1em', lineHeight:'1.1em', maxWidth: '6em', fontFamily: 'Barricada-Pro' }: this.state.windowWidth < 1200 ? {fontSize: '1.5em', marginTop: '0.2em', fontFamily: 'Barricada-Pro'} : { fontFamily: 'Barricada-Pro' }}>JS Lib Discovery</Link>
                    <div className="btn-group"  style={!this.state.small ? {marginTop: '.25em', display: 'flex', justifyContent: 'center', marginBottom: 3, height: '2em', borderColor: c.off_green} : {marginTop: '.35em', display: 'flex', justifyContent: 'center', marginBottom: 3, height: '1.6em', borderColor: c.off_green}}>
                        <input placeholder='Search for Libraries' style={ !this.state.small ? {color: c.header, fontSize: '1em', backgroundColor: c.body_bg, width: `${this.state.windowWidth < 1200 ? 15 + (((this.state.windowWidth / 1200)) * 5) : 30}em` } : {color: c.header, fontSize: '.7em', backgroundColor: c.body_bg, width: '15em', borderRadius: '0.25rem' }} className="btn btn-outline-secondary" onKeyPress={this.handleEnter.bind(this)} onChange={this.handleQuery.bind(this)} value={ this.state.searchedQuery } />
                        <button style={ !this.state.small ? { color: c.off_green, fontSize: '.75em', backgroundColor: c.body_bg } : { color: c.off_green, fontSize: '.45em', backgroundColor: c.body_bg, maxWidth: '8em', padding: '0.2em', display: 'none'  }} className="btn btn-outline-secondary" onClick={this.handleSearch.bind(this)}>Search</button>
                    </div>
                    {/* <div className='HeaderLeft' style={this.state.windowWidth < 1056 ? { display: 'none' } : null}>
                        <Link to="/gettingstarted" className='HeadLink'>Getting Started</Link>
                        <Link to="/faq" className='HeadLink'>FAQ</Link>
                        <a rel="noopener noreferrer" href="https://github.com/jsLibSearch/DiscoverLibJs" target="_blank" className='HeadLink'>GitHub</a>
                    </div> */}
                </div>
                <div className='HeaderRight'>
                    {/* <Link to="/signup" className={!this.state.small ? 'Sign' : 'SignSmall'} style={this.state.loggedIn ? {display: 'none'} : null}>Sign Up</Link> */}
                    <Link to="/login" className={!this.state.small ? 'Sign' : 'SignSmall'} style={this.state.loggedIn ? {display: 'none'} : null} onClick={() => { this.handleLogInClick() }} >Log In</Link>
                    {this.state.loggedIn ? (
                    <Dropdown
                        group
                        title='User Options'
                        id={`options`}
                        isOpen={this.state.userOptionsOpen}
                        toggle={this.toggleUserOptions.bind(this)}
                        size="sm">
                    <DropdownToggle
                        style={this.state.small ? { border: 'none', margin: '0em', padding: '0em .3em' } : { border: 'none', margin: '0em' }}
                        size="sm"
                        outline
                        className={!this.state.small ? 'Username' : 'UsernameSmall'}
                        caret={false}>
                        {this.state.username}
                    </DropdownToggle>
                        <DropdownMenu style={{backgroundColor: c.header, borderRadius: '1em'}}>
                            <div>
                            <Link to="/user" onClick={this.toggleUserOptions.bind(this)} className={!this.state.small ? 'Sign' : 'SignSmall'} style={!this.state.loggedIn ? {display: 'none'} : null}>Your projects</Link>
                            </div>
                            <div>
                            <Link to="/logout" className={!this.state.small ? 'Sign' : 'SignSmall'} style={!this.state.loggedIn ? {display: 'none'} : null} onClick={() => { this.handleLogOutClick() }} >Log Out</Link>
                            </div>
                        </DropdownMenu>
                    </Dropdown>) : null}
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
  
export default withRouter(connect(mapStateToProps, { newSearch, clearAccessToken, makeServerCalls, logOutUser, setCartName, newItem })(Header));