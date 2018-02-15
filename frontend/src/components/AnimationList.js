import React, { Component } from 'react';
import '../App.css';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
  ListGroup, ListGroupItem, CardBody, Card, Button } from 'reactstrap';

const axios = require('axios');


class AnimationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            data: null,
        }
    }


    componentDidMount() {

    }

    openLink() {
        console.log('test');
    }

    toggle() {
        axios
            .post('http://localhost:8080/get-readme', { repoName: 'express' })
                .then((res) => {
                    console.log(typeof res.data)
                    this.setState({  
                        data: res.data
                    })
                })
                .catch((err) => {
                    console.log(err);
                })

        this.setState({ collapse: !this.state.collapse });
    }

    onAddProject() {
        console.log('test');
    }

    render() {
        return (
            <ListGroup>
                <ListGroupItem tag="a" href="#" onClick={() => this.toggle()}>react</ListGroupItem>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            <button onClick={() => this.onAddProject()}
                                style={ {
                                margin: 0,
                                padding: '0em 0.8em',
                                fontStyle: 'italic',
                                fontSize: '.7em',
                                color: 'white',
                                borderColor: 'black',
                                backgroundColor: 'black' 
                                } }>Add to Project</button>
                            <hr/>
                            <div dangerouslySetInnerHTML={{__html: this.state.data}}/>
                        </CardBody>
                    </Card>
                </Collapse>
                <ListGroupItem tag="a" href="#" >Mongo</ListGroupItem>
                <ListGroupItem tag="a" href="#" >Express</ListGroupItem>
                <ListGroupItem tag="a" href="#" >Nacl</ListGroupItem>
                <ListGroupItem tag="a" href="#" >Cors</ListGroupItem>
            </ListGroup>
        )
    }
}


export default AnimationList;


/***
 *  GITHUB LOGO
 * 
 *                      <div class="container-lg d-flex px-3">
                            <div class="d-flex flex-justify-between flex-items-center">
                                <a class="header-logo-invertocat my-0" aria-label="Homepage" data-ga-click="(Logged out) Header, go to homepage, icon:logo-wordmark">
                                    <svg aria-hidden="true" class="octicon octicon-mark-github" height="32" version="1.1" viewBox="0 0 16 16" width="32">
                                        <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
 */