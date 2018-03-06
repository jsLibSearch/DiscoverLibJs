import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
  ListGroup, ListGroupItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCatalog, getRecs, dev } from '../actions';
import ListOfPckgs from './ListOfPckgs';
import { initGA, logPageView } from './ReactGA';
const axios = require('axios');


class MobileHome extends Component {

	constructor(props) {
			super(props);
			this.state = {
					windowHeight: window.innerHeight - 40,
					list: [],
					cart: [],
					server: !dev ? 'https://javascript-library-discovery2.herokuapp.com/' : 'http://localhost:8080/',
					loading: false,
					recs: [],
					ready: false,
					essentials: false,
					ui: false,
					multimedia: false,
					graphics: false,
					data: false,
					devtools: false,
					utils: false,
					apps: false,
			}
		}
	
		componentDidMount() {
			window.addEventListener('resize', this.handleResize.bind(this));
			this.setState({
				windowHeight: window.innerHeight - 40
			});
			console.log((this.props.catalog))
			// if ( !Object.keys(this.props.catalog).length ) this.props.getCatalog();  
			initGA();
			logPageView();
		}
	
		componentWillUnmount() {
			window.removeEventListener('resize', this.handleResize.bind(this));
		}
	
		componentWillReceiveProps(nextProps) {
	
		}
	
		componentDidUpdate() {
			if (this.props.cart.packages.length !== this.state.cart.length && this.refs.homePage) {
				let currentCart = [];
				if (this.props.cart.packages.length > 0) {
					currentCart = this.props.cart.packages
					this.setState({
						cart: currentCart,
					})
					this.sendRecRequest();
				}
	
			}
			if (this.props.recState.loading && !this.state.loading) {
				this.setState({
					loading: true,
				})
			} else if (!this.props.recState.loading && this.state.loading) {
				this.setState({
					loading: false,
					recs: this.props.recState.recs,
				})
			}
			if (this.state.cart && this.state.cart.length > 0 && this.state.recs.length === 0 && !this.props.recState.loading && !this.state.loading) {
				this.sendRecRequest();
			}
	
	
			if (this.props.catalog.ready && !this.state.ready) this.setState({ ready: true });
		}
	
		sendRecRequest() {
			if (this.state.cart && this.state.cart.length > 0) {
				this.props.getRecs(this.props.cart.packages);
			}
		}
	
		displayRecommends(arr) {
			// this.setState({ recommeds: arr });
			console.log(this.state.recommeds, '<--------------------RECOMMENDS!');
		}
	
		handleResize() {
			this.setState({
					windowHeight: window.innerHeight - 40
			})
		}
	
		toggle(str) {
			this.setState({
				[str]: !this.state[str]
			});
		}

		test(str) {
			console.log(this.props.catalog)
			switch (str) {
				case 'appFrameWorks':
					this.setState({ list: this.props.catalog.data.appFrameWorks })
					return;
				case 'mobileFrameWorks':
					this.setState({ list: this.props.catalog.data.mobileFrameWorks })
					return;
				case 'realTimeFrameWorks':
					this.setState({ list: this.props.catalog.data.realTimeFrameWorks })
					return;
				case 'testingFrameWorks':
					this.setState({ list: this.props.catalog.data.testingFrameWorks })
					return;
				case 'uiFrameWorks':
					this.setState({ list: this.props.catalog.data.uiFrameWorks })
					return;
				case 'windowsModalsPopups':
					this.setState({ list: this.props.catalog.data.windowsModalsPopups })
					return;
				case'keyboardWrappers':
					this.setState({ list: this.props.catalog.data.keyboardWrappers })
					return;
				case'formWidgets':
					this.setState({ list: this.props.catalog.data.formWidgets })
					return;
				case'gameEngines':
					this.setState({ list: this.props.catalog.data.gameEngines })
					return;
				case'physicsLib':
					this.setState({ list: this.props.catalog.data.physicsLib })
					return;
				case'animationLib':
					this.setState({ list: this.props.catalog.data.animationLib })
					return;
				case'presentationLib':
					this.setState({ list: this.props.catalog.data.presentationLib })
					return;
				case'canvasWrappers':
					this.setState({ list: this.props.catalog.data.canvasWrappers })
					return;
				case'WebGL':
					this.setState({ list: this.props.catalog.data.WebGL })
					return;
				case'ImageManipulation':
					this.setState({ list: this.props.catalog.data.ImageManipulation })
					return;
				case'visualizationLib':
					this.setState({ list: this.props.catalog.data.visualizationLib })
					return;
				case'dataStructures':
					this.setState({ list: this.props.catalog.data.dataStructures })
					return;
				case'dateLib':
					this.setState({ list: this.props.catalog.data.dateLib })
					return;
				case'storageLib':
					this.setState({ list: this.props.catalog.data.storageLib })
					return;
				case'validationLib':
					this.setState({ list: this.props.catalog.data.validationLib })
					return;
				case'packageManagers':
					this.setState({ list: this.props.catalog.data.packageManagers })
					return;
				case'timingLib':
					this.setState({ list: this.props.catalog.data.timingLib })
					return;
				case'toolkits':
					this.setState({ list: this.props.catalog.data.toolkits })
					return;
				case'codeProtectionLibs':
					this.setState({ list: this.props.catalog.data.codeProtectionLibs })
					return;
				case'DOM':
					this.setState({ list: this.props.catalog.data.DOM })
					return;
				case'ACFL':
					this.setState({ list: this.props.catalog.data.ACFL })
					return;
				case'functionalProgramming':
					this.setState({ list: this.props.catalog.data.functionalProgramming })
					return;
				case'mathLibs':
					this.setState({ list: this.props.catalog.data.mathLibs })
					return;
				case'html5Apps':
					this.setState({ list: this.props.catalog.data.html5Apps })
					return;
				case'siteGenerators':
					this.setState({ list: this.props.catalog.data.siteGenerators })
					return;
				case'codeEditors':
					this.setState({ list: this.props.catalog.data.codeEditors })
					return;
				case'designAndPrototyping':
					this.setState({ list: this.props.catalog.data.designAndPrototyping })
					return;
				default: 
					console.log('default');
			}
		}
		
		render() {
			if (this.state.ready) {
				return ( 
					<div>
						<div className="mobileNavBar" >
							<Navbar color="faded" light expand="md" className="mobileNavBarInner">
								<ul className="mobileTitle">
									<li className="mobileli">
									<Dropdown group size="sm" isOpen={this.state.essentials} toggle={() => this.toggle('essentials')}>
										<DropdownToggle caret>
												Essentials
										</DropdownToggle>
										<DropdownMenu>
											<DropdownItem onClick={ () => this.test('appFrameWorks') }>App Frameworks</DropdownItem>
											<DropdownItem onClick={ () => this.test('mobileFrameWorks') }>Mobile Frameworks</DropdownItem>
											<DropdownItem onClick={ () => this.test('realTimeFrameWorks') }>Realtime Frameworks</DropdownItem>
											<DropdownItem onClick={ () => this.test('testingFrameWorks') }>Testing Frameworks</DropdownItem>
										</DropdownMenu>
									</Dropdown>
									</li>
									<li className="mobileli">
										<Dropdown group size="sm" isOpen={this.state.ui} toggle={() => this.toggle('ui')}>
											<DropdownToggle caret>
												UI
											</DropdownToggle>
											<DropdownMenu>
												<DropdownItem onClick={ () => this.test('uiFrameWorks') }>UI Frameworks</DropdownItem>
												<DropdownItem onClick={ () => this.test('windowsModalsPopups') }>Windows, Modals, Popups</DropdownItem>
												<DropdownItem onClick={ () => this.test('keyboardWrappers') }>Keyboard Wrappers</DropdownItem>
												<DropdownItem onClick={ () => this.test('formWidgets') }>Form Widgets</DropdownItem>
											</DropdownMenu>
										</Dropdown>
									</li>
									<li className="mobileli">
										<Dropdown group size="sm" isOpen={this.state.multimedia} toggle={() => this.toggle('multimedia')}>
											<DropdownToggle caret>
													Multimedia
											</DropdownToggle>
											<DropdownMenu>
												<DropdownItem onClick={ () => this.test('gameEngines') }>Game Engines</DropdownItem>
												<DropdownItem onClick={ () => this.test('physicsLib') }>Physics Libraries</DropdownItem>
												<DropdownItem onClick={ () => this.test('animationLib') }>Animation Libraries</DropdownItem>
												<DropdownItem onClick={ () => this.test('presentationLib') }>Presentation Libraries</DropdownItem>
											</DropdownMenu>
										</Dropdown>
									</li>
									<li className="mobileli">
										<Dropdown group size="sm" isOpen={this.state.graphics} toggle={() => this.toggle('graphics')}>
											<DropdownToggle caret>
													Graphics
											</DropdownToggle>
											<DropdownMenu>
												<DropdownItem onClick={ () => this.test('canvasWrappers') }>Canvas Wrappers</DropdownItem>
												<DropdownItem onClick={ () => this.test('WebGL') }>WebGL</DropdownItem>
												<DropdownItem onClick={ () => this.test('ImageManipulation') }>Image Manipulation</DropdownItem>
												<DropdownItem onClick={ () => this.test('visualizationLib') }>Visualization Libraries</DropdownItem>
											</DropdownMenu>
										</Dropdown>
									</li>
									<li className="mobileli">
										<Dropdown group size="sm" isOpen={this.state.data} toggle={() => this.toggle('data')}>
											<DropdownToggle caret>
													Data
											</DropdownToggle>
											<DropdownMenu>
												<DropdownItem onClick={ () => this.test('dataStructures') }>Data Structures</DropdownItem>
												<DropdownItem onClick={ () => this.test('dateLib') }>Date Libraries</DropdownItem>
												<DropdownItem onClick={ () => this.test('storageLib') }>Storage Libraries</DropdownItem>
												<DropdownItem onClick={ () => this.test('validationLib') }>Validation</DropdownItem>
											</DropdownMenu>
										</Dropdown>
									</li>
									<li className="mobileli">
										<Dropdown group size="sm" isOpen={this.state.devtools} toggle={() => this.toggle('devtools')}>
											<DropdownToggle caret>
													DevTools
											</DropdownToggle>
											<DropdownMenu>
												<DropdownItem onClick={ () => this.test('packageManagers') }>Package Managers</DropdownItem>
												<DropdownItem onClick={ () => this.test('timingLib') }>Timing</DropdownItem>
												<DropdownItem onClick={ () => this.test('toolkits') }>Toolkits</DropdownItem>
												<DropdownItem onClick={ () => this.test('codeProtectionLibs') }>Code Protection</DropdownItem>
											</DropdownMenu>
										</Dropdown>
									</li>
									<li className="mobileli">
										<Dropdown group size="sm" isOpen={this.state.utils} toggle={() => this.toggle('utils')}>
											<DropdownToggle caret>
													Utilities
											</DropdownToggle>
											<DropdownMenu>
												<DropdownItem onClick={ () => this.test('DOM') }>DOM</DropdownItem>
												<DropdownItem onClick={ () => this.test('ACFL') }>Async, Control Flow, Event</DropdownItem>
												<DropdownItem onClick={ () => this.test('functionalProgramming') }>Functional Programming</DropdownItem>
												<DropdownItem onClick={ () => this.test('mathLibs') }>Math Libraries</DropdownItem>
											</DropdownMenu>
										</Dropdown>
									</li>
									<li className="mobileli">
										<Dropdown group size="sm" isOpen={this.state.apps} toggle={() => this.toggle('apps')}>
											<DropdownToggle caret>
													Apps
											</DropdownToggle>
											<DropdownMenu>
												<DropdownItem onClick={ () => this.test('html5Apps') }>Html5 Apps</DropdownItem>
												<DropdownItem onClick={ () => this.test('siteGenerators') }>Static Site Generators</DropdownItem>
												<DropdownItem onClick={ () => this.test('codeEditors') }>Code Editors</DropdownItem>
												<DropdownItem onClick={ () => this.test('designAndPrototyping') }>Design And Prototyping</DropdownItem>
											</DropdownMenu>
										</Dropdown>
									</li>
								</ul>
							</Navbar>
							
								
						</div>
						<div className="mobileItems">
              <ListOfPckgs data={this.state.list}/>
            </div>

					</div>
				);
			} else {
				return (
					<div>
						<h3> LOADING </h3>
					</div>
				)
			}
		}
	}
    
const mapStateToProps = (state, ownProps) => {
    return {
    catalog: state.catalog,
    cart: state.cart,
    recState: state.recState,
    };
};

export default withRouter(connect(mapStateToProps, { getCatalog, getRecs })(MobileHome));