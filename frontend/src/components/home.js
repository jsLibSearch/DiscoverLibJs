import React, { Component } from 'react';
import '../App.css';
// import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
//   ListGroup, ListGroupItem } from 'reactstrap';
import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCatalog, getRecs, dev } from '../actions';
import ListOfPckgs from './ListOfPckgs';
import { initGA, logPageView } from './ReactGA';
// const axios = require('axios');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        windowHeight: window.innerHeight - 40,
        essentials: false,
        ui: false,
        multimedia: false,
        graphics: false,
        data: false,
        development: false,
        utilities: false,
        applications: false,
        list: [],
        cart: [],
        server: !dev ? 'https://javascript-library-discovery2.herokuapp.com/' : 'http://localhost:8080/',
        loading: false,
        recs: [],
        ready: false,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.setState({
      windowHeight: window.innerHeight - 40
    });
    // console.log((this.props.catalog))
    if ( !Object.keys(this.props.catalog).length ) this.props.getCatalog();  
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

  essentials() {
    this.setState({ essentials: !this.state.essentials });
  }

  ui() {
    this.setState({ ui: !this.state.ui });
  }

  multimedia() {
    this.setState({ multimedia: !this.state.multimedia });
  }

  graphics() {
    this.setState({ graphics: !this.state.graphics });
  }

  data() {
    this.setState({ data: !this.state.data });
  }

  development() {
    this.setState({ development: !this.state.development });
  }

  utilities() {
    this.setState({ utilities: !this.state.utilities });
  }

  applications() {
    this.setState({ applications: !this.state.applications });
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
        <div ref="homePage">
          <div className='Catalog1'></div>
          <div className="Catalog">
            <div className="NavBar">
              <Navbar >
                <ul className="Title">Directories
                <li className="fa fa-gift fa-lg"><NavbarBrand className="Essentials" onClick={ () => this.essentials() } href="#">Essentials</NavbarBrand></li>
                <Collapse isOpen={this.state.essentials} navbar>
                  <Nav navbar>
                    <NavItem >
                      <NavLink onClick={ () => this.test('appFrameWorks') } href="#">Application Frameworks</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('mobileFrameWorks') } href="#">Mobile Frameworks</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('realTimeFrameWorks') } href="#">Realtime Frameworks</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('testingFrameWorks') } href="#">Testing Frameworks</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
                <li><NavbarBrand className="UI" onClick={ () => this.ui() } href="#">UI</NavbarBrand></li>
                <Collapse isOpen={this.state.ui} navbar>
                  <Nav navbar>
                    <NavItem >
                      <NavLink onClick={ () => this.test('uiFrameWorks') } href="#">UI Frameworks</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('windowsModalsPopups') } href="#">Windows, Modals, Popups</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('keyboardWrappers') } href="#">Keyboard Wrappers</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('formWidgets') } href="#">Form Widgets</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
                <li><NavbarBrand className="UI" onClick={ () => this.multimedia() } href="#">Multimedia</NavbarBrand></li>
                <Collapse isOpen={this.state.multimedia} navbar>
                  <Nav navbar>
                    <NavItem >
                      <NavLink onClick={ () => this.test('gameEngines') } href="#">Game Engines</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('physicsLib') } href="#">Physics Libraries</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('animationLib') } href="#">Animation Libraries</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('presentationLib') } href="#">Presentation Libraries</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
                <li><NavbarBrand className="UI" onClick={ () => this.graphics() } href="#">Graphics</NavbarBrand></li>
                <Collapse isOpen={this.state.graphics} navbar>
                  <Nav navbar>
                    <NavItem >
                      <NavLink onClick={ () => this.test('canvasWrappers') } href="#">Canvas Wrappers</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('WebGL') } href="#">WebGL</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('ImageManipulation') } href="#">Image Manipulation</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('visualizationLib') } href="#">Visualization Libraries</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
                <li><NavbarBrand className="UI" onClick={ () => this.data() } href="#">Data</NavbarBrand></li>
                <Collapse isOpen={this.state.data} navbar>
                  <Nav navbar>
                    <NavItem >
                      <NavLink onClick={ () => this.test('dataStructures') } href="#">Data Structures</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('dateLib') } href="#">Date Libraries</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('storageLib') } href="#">Storage Libraries</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('validationLib') } href="#">Validation</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
                <li><NavbarBrand className="UI" onClick={ () => this.development() } href="#">Development</NavbarBrand></li>
                <Collapse isOpen={this.state.development} navbar>
                  <Nav navbar>
                    <NavItem >
                      <NavLink onClick={ () => this.test('packageManagers') } href="#">Package Managers</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('timingLib') } href="#">Timing</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('toolkits') } href="#">Toolkits</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('codeProtectionLibs') } href="#">Code Protection</NavLink> {/* <---- this doesnt have any libs */}
                    </NavItem>
                  </Nav>
                </Collapse>
                <li><NavbarBrand className="UI" onClick={ () => this.utilities() } href="#">Utilities</NavbarBrand></li>
                <Collapse isOpen={this.state.utilities} navbar>
                  <Nav navbar>
                    <NavItem >
                      <NavLink onClick={ () => this.test('DOM') } href="#">DOM</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('ACFL') } href="#">Async, Control Flow, Event</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('functionalProgramming') } href="#">Functional Programming</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('mathLibs') } href="#">Math Libraries</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
                <li><NavbarBrand className="UI" onClick={ () => this.applications() } href="#">Applications</NavbarBrand></li>
                <Collapse isOpen={this.state.applications} navbar>
                  <Nav navbar>
                    <NavItem >
                      <NavLink onClick={ () => this.test('html5Apps') } href="#">Html5 Apps</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('siteGenerators') } href="#">Static Site Generators</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('codeEditors') } href="#">Code Editors</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={ () => this.test('designAndPrototyping') } href="#">Design And Prototyping</NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
                </ul>
              </Navbar>
              </div>
            <div className="Items">
              <ListOfPckgs data={this.state.list}/>
            </div>
            <div className="Box">
              <p>Recommendations</p>
              { this.state.recs.map((item, i) => {
                  if (this.state.recs.length === i + 1) {
                    return (
                      <div key={'scoper2'}>
                      </div>
                    )
                  }
                return (
                  <p key={item._id}>{ item.name }</p>
                )
              }) }
            </div>
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

export default withRouter(connect(mapStateToProps, { getCatalog, getRecs })(Home));




