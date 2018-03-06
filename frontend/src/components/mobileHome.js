import React, { Component } from 'react';
import '../App.css';
import { Navbar, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCatalog, getRecs, dev, clearCatalog } from '../actions';
import ListOfPckgs from './ListOfPckgs';
import { initGA, logPageView } from './ReactGA';


class MobileHome extends Component {

	constructor(props) {
			super(props);
			this.state = {
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
			if ( !this.props.catalog.data ) this.props.getCatalog();  
			initGA();
			logPageView();
			if ( this.props.catalog.data && this.props.catalog.ready && this.state.ready === false ) {
				this.setState({
				  ready: true
				})
			}
		}

		componentWillUnmount() {
			// this.props.clearCatalog();
		}
	
		componentWillReceiveProps(nextProps) {
			if ( nextProps.catalog.data && nextProps.catalog.ready && this.state.ready === false ) {
				this.setState({
				  ready: true
				})
			}
			if ( !nextProps.catalog.data ) this.props.getCatalog();
		}
	
		componentDidUpdate() {
			if (this.props.cart.packages.length !== this.state.cart.length && this.refs.homePage) {
				let currentCart = [];
				if (this.props.cart.packages.length > 0) {
					currentCart = this.props.cart.packages
					this.setState({
						cart: currentCart,
					})
				}
	
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
	
		toggle(str) {
			this.setState({
				[str]: !this.state[str]
			});
		}

		test(str) {
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
									<Dropdown group isOpen={this.state.essentials} toggle={() => this.toggle('essentials')}>
										<DropdownToggle outline style={{ backgroundColor: 'white', fontWeight: 100, border: 'none' , color: '#313531', fontSize: '1.8rem' }} caret>
												Essentials
										</DropdownToggle>
										<DropdownMenu style={{ backgroundColor: '#313531', color: 'white', fontSize: '1.8rem' }}>
											<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('appFrameWorks') }>App Frameworks</DropdownItem>
											<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('mobileFrameWorks') }>Mobile Frameworks</DropdownItem>
											<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('realTimeFrameWorks') }>Realtime Frameworks</DropdownItem>
											<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('testingFrameWorks') }>Testing Frameworks</DropdownItem>
										</DropdownMenu>
									</Dropdown>
									</li>
									<li className="mobileli">
										<Dropdown group isOpen={this.state.ui} toggle={() => this.toggle('ui')}>
											<DropdownToggle outline style={{ backgroundColor: 'white', fontWeight: 100, border: 'none' , color: '#313531', fontSize: '1.8rem' }} caret>
												UI
											</DropdownToggle>
											<DropdownMenu style={{ backgroundColor: '#313531', color: 'white', fontSize: '1.8rem'}}>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('uiFrameWorks') }>UI Frameworks</DropdownItem>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('windowsModalsPopups') }>Windows, Modals, Popups</DropdownItem>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('keyboardWrappers') }>Keyboard Wrappers</DropdownItem>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('formWidgets') }>Form Widgets</DropdownItem>
											</DropdownMenu>
										</Dropdown>
									</li>
									<li className="mobileli">
										<Dropdown group isOpen={this.state.multimedia} toggle={() => this.toggle('multimedia')}>
											<DropdownToggle outline style={{ backgroundColor: 'white', fontWeight: 100, border: 'none' , color: '#313531', fontSize: '1.8rem' }} caret>
													Multimedia
											</DropdownToggle>
											<DropdownMenu style={{ backgroundColor: '#313531', color: 'white', fontSize: '1.8rem'}}>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('gameEngines') }>Game Engines</DropdownItem>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('physicsLib') }>Physics Libraries</DropdownItem>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('animationLib') }>Animation Libraries</DropdownItem>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('presentationLib') }>Presentation Libraries</DropdownItem>
											</DropdownMenu>
										</Dropdown>
									</li>
									<li className="mobileli">
										<Dropdown group isOpen={this.state.graphics} toggle={() => this.toggle('graphics')}>
											<DropdownToggle outline style={{ backgroundColor: 'white', fontWeight: 100, border: 'none' , color: '#313531', fontSize: '1.8rem' }} caret>
													Graphics
											</DropdownToggle>
											<DropdownMenu style={{ backgroundColor: '#313531', color: 'white', fontSize: '1.8rem'}}>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('canvasWrappers') }>Canvas Wrappers</DropdownItem>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('WebGL') }>WebGL</DropdownItem>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('ImageManipulation') }>Image Manipulation</DropdownItem>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('visualizationLib') }>Visualization Libraries</DropdownItem>
											</DropdownMenu>
										</Dropdown>
									</li>
									<li className="mobileli">
										<Dropdown group isOpen={this.state.data} toggle={() => this.toggle('data')}>
											<DropdownToggle outline style={{ backgroundColor: 'white', fontWeight: 100, border: 'none' , color: '#313531', fontSize: '1.8rem' }} caret>
													Data
											</DropdownToggle>
											<DropdownMenu style={{ backgroundColor: '#313531', color: 'white', fontSize: '1.8rem'}}>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('dataStructures') }>Data Structures</DropdownItem>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('dateLib') }>Date Libraries</DropdownItem>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('storageLib') }>Storage Libraries</DropdownItem>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('validationLib') }>Validation</DropdownItem>
											</DropdownMenu>
										</Dropdown>
									</li>
									<li className="mobileli">
										<Dropdown group isOpen={this.state.devtools} toggle={() => this.toggle('devtools')}>
											<DropdownToggle outline style={{ backgroundColor: 'white', fontWeight: 100, border: 'none' , color: '#313531', fontSize: '1.8rem' }} caret>
													DevTools
											</DropdownToggle>
											<DropdownMenu style={{ backgroundColor: '#313531', color: 'white', fontSize: '1.8rem'}}>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('packageManagers') }>Package Managers</DropdownItem>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('timingLib') }>Timing</DropdownItem>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('toolkits') }>Toolkits</DropdownItem>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('codeProtectionLibs') }>Code Protection</DropdownItem>
											</DropdownMenu>
										</Dropdown>
									</li>
									<li className="mobileli">
										<Dropdown group isOpen={this.state.utils} toggle={() => this.toggle('utils')}>
											<DropdownToggle outline style={{ backgroundColor: 'white', fontWeight: 100, border: 'none' , color: '#313531', fontSize: '1.8rem' }} caret>
													Utilities
											</DropdownToggle>
											<DropdownMenu style={{ backgroundColor: '#313531', color: 'white', fontSize: '1.8rem'}}>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('DOM') }>DOM</DropdownItem>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('ACFL') }>Async, Control Flow, Event</DropdownItem>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('functionalProgramming') }>Functional Programming</DropdownItem>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('mathLibs') }>Math Libraries</DropdownItem>
											</DropdownMenu>
										</Dropdown>
									</li>
									<li className="mobileli">
										<Dropdown group isOpen={this.state.apps} toggle={() => this.toggle('apps')}>
											<DropdownToggle outline style={{ backgroundColor: 'white', fontWeight: 100, border: 'none' , color: '#313531', fontSize: '1.8rem' }} caret>
													Apps
											</DropdownToggle>
											<DropdownMenu style={{ backgroundColor: '#313531', color: 'white', fontSize: '1.8rem'}}>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('html5Apps') }>Html5 Apps</DropdownItem>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('siteGenerators') }>Static Site Generators</DropdownItem>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('codeEditors') }>Code Editors</DropdownItem>
												<DropdownItem style={{ backgroundColor: '#313531', fontWeight: 100, color: 'white', fontSize: '1.8rem' }} onClick={ () => this.test('designAndPrototyping') }>Design And Prototyping</DropdownItem>
											</DropdownMenu>
										</Dropdown>
									</li>
								</ul>
							</Navbar>
							
								
						</div>
						<div className="mobileItems">
						{this.state.list.length < 1 ?
							(<div style={{ display: 'flex', flexDirection: 'column', padding: '10px' }} className="introduction"> 
								<p style={{ padding: '0px 0px 10px', textAlign: 'center', margin: 'auto' }} className="PackTitle">Welcome to Javascript Library Discovery.</p>
								<p style={{ textAlign: 'left' }}>
									Search for a library or explore the directories of common libraries above. You may add libraries to your project which you can view by tapping the icon on the top right corner of the page. Once you have libraries in your project, personalized library recommendations will be available!
								</p>
							</div>
							) : (
							<ListOfPckgs small={true} data={this.state.list}/>)
						}
            </div>

					</div>
				);
			} else {
				return (
					<div>
						<h3 className='PackTitle'> Loading </h3>
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

export default withRouter(connect(mapStateToProps, { getCatalog, getRecs, clearCatalog })(MobileHome));