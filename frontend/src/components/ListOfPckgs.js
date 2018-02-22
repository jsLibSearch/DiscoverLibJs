import React, { Component } from 'react';
import '../App.css';
import { Collapse, ListGroup, ListGroupItem, CardBody, Card } from 'reactstrap';
import { dev } from '../actions'
import { customColors as c } from '../custom/colors.js';
import { newItem } from '../actions';
import { connect } from 'react-redux';
const axios = require('axios');
const ReactMarkdown = require('react-markdown');

class ListOfPckgs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            data: null,
            list: [],
            collapses: [],
            server: !dev ? 'https://javascript-library-discovery2.herokuapp.com/' : 'http://localhost:8080/',
            added: [],
            tracker: []
        }
    }


    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (JSON.stringify(this.state.list) !== JSON.stringify(nextProps.data)) {
            const arr = new Array(nextProps.data.length).fill(false); 
            
            const arr2 = nextProps.data.map((p) => {
                for (let i = 0; i < this.props.cart.packages.length; i++) {
                    if (p.name === this.props.cart.packages[i].name) {
                        return true;
                    }
                }
                return false;
            })

            this.setState({ list: nextProps.data, collapses: arr, tracker: arr2 });
        }
    }

    openLink() {
        console.log('test');
    }

    toggle(name, idx) {
        axios
            .post(`${this.state.server}get-readme`, { repoName: `${name}` })
                .then((res) => {
                    this.setState({  
                        data: res.data
                    })
                })
                .catch((err) => {
                    console.log(err);
                })
        let arr = this.state.collapses.slice();
        arr[idx] = !arr[idx];
        this.setState({ collapses: arr });
    }

    onAddtoProject(pckg, idx) {
        this.props.newItem(pckg);
        let arr = this.state.tracker;
        arr[idx] = true;
        this.setState({ tracker: arr });
    }

    render() {
        return (
            <ListGroup>
                { this.state.list ? this.state.list.map( (pckg, idx) => {
                    return (
                            <div key={pckg.name}>
                                <ListGroupItem className="PackTitle" tag="a" href="#" onClick={() => this.toggle(pckg.name, idx)}>{ pckg.name }</ListGroupItem>
                                <Collapse isOpen={this.state.collapses[idx]}>
                                    <Card>
                                        <CardBody>
                                            <button className="btn btn-success" disabled={this.state.tracker[idx]} onClick={this.onAddtoProject.bind(this, pckg, idx)}
                                                style={ {
                                                    margin: 0,
                                                    padding: '0em 0.8em',
                                                    fontStyle: 'italic',
                                                    fontSize: '.7em',
                                                    color: c.body_bg,
                                                    borderColor: c.off_green,
                                                    backgroundColor: c.off_green,
                                                } }>{this.state.tracker[idx] ? 'Added to Project' : 'Add to Project'}</button>
                                            <hr/>
                                            <div dangerouslySetInnerHTML={{__html: this.state.data}}/>
                                            {/* <ReactMarkdown source={this.state.data} skipHtml={false}/> */}
                                        </CardBody>
                                    </Card>
                                </Collapse>
                            </div>   
                        ) 
                } )  : null }   
            </ListGroup>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
    }
}


export default connect(mapStateToProps, { newItem })(ListOfPckgs);


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