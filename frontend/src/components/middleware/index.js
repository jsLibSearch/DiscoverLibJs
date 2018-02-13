import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveAccessToken } from '../../actions'
import {
    Route
} from 'react-router-dom';

export default ComposedComponent => {
    class RequireAuth extends Component {
        componentDidUpdate() {
            if (this.props.user.status === 'bloopykins') {
                this.props.history.push('/');
            }
        }

        componentDidMount() {
            let code;
            if (this.props.user.status === 'authenticated') {
                return;
            }
            if (this.props.location.search.match(/\?code=/g)) {
                code = this.props.location.search.replace(/\?code=/g, '');
                if (this.props.user.status === 'unauthorized') {
                    console.log('trying to save the access token again for some reason')
                    this.props.saveAccessToken(code);
                }
            }
            return;
        }

        componentWillReceiveProps(nextProps) {
            if (nextProps.user.jwt) {
                console.log(nextProps.user)
                sessionStorage.setItem('jwtToken', nextProps.user.jwt);
                sessionStorage.setItem('username', nextProps.user.username);
                sessionStorage.setItem('loggedIn', true);
            }
            if (nextProps.accessToken) {
                console.log('nextProps.accessToken')
            }
        }

        render() {
            switch(this.props.user.status) {
                case 'authenticated':
                    return (<Route path="/user" component={ComposedComponent} />);
                case 'loading':
                    return (<h3>loading</h3>);
                case 'unauthorized':
                    return (<h3 style={{ color: 'red' }}>{this.props.user.error}</h3>);
                default:
                    return (<h1>something is wrong with the middleware</h1>)
            }
        }
    }

    const mapStateToProps = state => {
        return {
            accessToken: state.accessToken,
            user: state.userStatusReducer
        };
    };

    return connect(mapStateToProps, { saveAccessToken })(RequireAuth);
};