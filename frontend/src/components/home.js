import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
  ListGroup, ListGroupItem } from 'reactstrap';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCatalog } from '../actions';


import ListOfPckgs from './ListOfPckgs';

const sideBar = [ 'Animation', 'Application Tools', 'Audio' ];

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
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this))
    this.setState({
      windowHeight: window.innerHeight - 40
    })

    this.props.getCatalog();

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this))
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
    switch (str) {
      case 'appFrameWorks':
        this.setState({ list: this.props.catalog.appFrameWorks })
        // console.log(this.props.catalog.appFrameWorks)
        return;
      case 'mobileFrameWorks':
        this.setState({ list: this.props.catalog.mobileFrameWorks })
        // console.log(this.props.catalog.mobileFrameWorks)
        return;
      case 'realTimeFrameWorks':
        this.setState({ list: this.props.catalog.realTimeFrameWorks })
        // console.log(this.props.catalog.realTimeFrameWorks)
        return;
      case 'testingFrameWorks':
        this.setState({ list: this.props.catalog.testingFrameWorks })
        // console.log(this.props.catalog.testingFrameWorks)
        return;
      case 'uiFrameWorks':
        this.setState({ list: this.props.catalog.uiFrameWorks })
        // console.log(this.props.catalog.uiFrameWorks)
        return;
      case 'windowsModalsPopups':
        this.setState({ list: this.props.catalog.windowsModalsPopups })
        // console.log(this.props.catalog.windowsModalsPopups)
        return;
      case'keyboardWrappers':
        this.setState({ list: this.props.catalog.keyboardWrappers })
        // console.log(this.props.catalog.keyboardWrappers)
        return;
      case'formWidgets':
        this.setState({ list: this.props.catalog.formWidgets })
        // console.log(this.props.catalog.formWidgets)
        return;
      case'gameEngines':
        this.setState({ list: this.props.catalog.gameEngines })
        // console.log(this.props.catalog.gameEngines)
        return;
      case'physicsLib':
        this.setState({ list: this.props.catalog.physicsLib })
        // console.log(this.props.catalog.physicsLib)
        return;
      case'animationLib':
        this.setState({ list: this.props.catalog.animationLib })
        // console.log(this.props.catalog.animationLib)
        return;
      case'presentationLib':
        this.setState({ list: this.props.catalog.presentationLib })
        // console.log(this.props.catalog.animationLib)
        return;
      case'canvasWrappers':
        this.setState({ list: this.props.catalog.canvasWrappers })
        // console.log(this.props.catalog.canvasWrappers)
        return;
      case'WebGL':
        this.setState({ list: this.props.catalog.WebGL })
        // console.log(this.props.catalog.WebGL)
        return;
      case'ImageManipulation':
        this.setState({ list: this.props.catalog.ImageManipulation })
        // console.log(this.props.catalog.ImageManipulation)
        return;
      case'visualizationLib':
        this.setState({ list: this.props.catalog.visualizationLib })
        // console.log(this.props.catalog.visualizationLib)
        return;
      case'dataStructures':
        this.setState({ list: this.props.catalog.dataStructures })
        // console.log(this.props.catalog.dataStructures)
        return;
      case'dateLib':
        this.setState({ list: this.props.catalog.dateLib })
        // console.log(this.props.catalog.dateLib)
        return;
      case'storageLib':
        this.setState({ list: this.props.catalog.storageLib })
        // console.log(this.props.catalog.storageLib)
        return;
      case'validationLib':
        this.setState({ list: this.props.catalog.validationLib })
        // console.log(this.props.catalog.validationLib)
        return;
      case'packageManagers':
        this.setState({ list: this.props.catalog.packageManagers })
        // console.log(this.props.catalog.packageManagers)
        return;
      case'timingLib':
        this.setState({ list: this.props.catalog.timingLib })
        // console.log(this.props.catalog.timingLib)
        return;
      case'toolkits':
        this.setState({ list: this.props.catalog.toolkits })
        // console.log(this.props.catalog.toolkits)
        return;
      case'codeProtectionLibs':
        this.setState({ list: this.props.catalog.codeProtectionLibs })
        // console.log(this.props.catalog.codeProtectionLibs)
        return;
      case'DOM':
        this.setState({ list: this.props.catalog.DOM })
        // console.log(this.props.catalog.DOM)
        return;
      case'ACFL':
        this.setState({ list: this.props.catalog.ACFL })
        // console.log(this.props.catalog.ACFL)
        return;
      case'functionalProgramming':
        this.setState({ list: this.props.catalog.functionalProgramming })
        // console.log(this.props.catalog.functionalProgramming)
        return;
      case'mathLibs':
        this.setState({ list: this.props.catalog.mathLibs })
        // console.log(this.props.catalog.mathLibs)
        return;
      case'html5Apps':
        this.setState({ list: this.props.catalog.html5Apps })
        // console.log(this.props.catalog.html5Apps)
        return;
      case'siteGenerators':
        this.setState({ list: this.props.catalog.siteGenerators })
        // console.log(this.props.catalog.siteGenerators)
        return;
      case'codeEditors':
        this.setState({ list: this.props.catalog.codeEditors })
        // console.log(this.props.catalog.codeEditors)
        return;
      case'designAndPrototyping':
        this.setState({ list: this.props.catalog.designAndPrototyping })
        // console.log(this.props.catalog.designAndPrototyping)
        return;
      default: 
        console.log('default');
    }
    

  }
  
  render() {
    return (
      <div>
        <h4 className='Catalog1'>Directories</h4>
        <div className="Catalog">

          <div className="NavBar">
            <Navbar >
              <ul>
              <li><NavbarBrand className="Essentials" onClick={ () => this.essentials() } href="#">Essentials</NavbarBrand></li>
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
            Recommendations
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    catalog: state.catalog
  };
};

export default withRouter(connect(mapStateToProps, { getCatalog })(Home));


/**
 * <nav className="navigation">
        <ul class="mainmenu">
          <li><a>Essentials</a>
            <ul class="submenu">
              <li><a href="">Application Frameworks</a></li>
              <li><a href="">Mobile Frameworks</a></li>
              <li><a href="">Realtime Frameworks</a></li>
              <li><a href="">Testing Frameworks</a></li>
            </ul>
          </li>
          <li><a href="">UI</a>
            <ul class="submenu">
              <li><a href="">Tops</a></li>
              <li><a href="">Bottoms</a></li>
              <li><a href="">Footwear</a></li>
            </ul>
          </li>
          <li><a href="">Multimedia</a>
            <ul class="submenu">
              <li><a href="">Tops</a></li>
              <li><a href="">Bottoms</a></li>
              <li><a href="">Footwear</a></li>
            </ul>
          </li>
          <li><a href="">Graphics</a>
            <ul class="submenu">
              <li><a href="">Tops</a></li>
              <li><a href="">Bottoms</a></li>
              <li><a href="">Footwear</a></li>
            </ul>
          </li>
          <li><a href="">Data</a>
            <ul class="submenu">
              <li><a href="">Tops</a></li>
              <li><a href="">Bottoms</a></li>
              <li><a href="">Footwear</a></li>
            </ul>
          </li>
          <li><a href="">Development</a>
            <ul class="submenu">
              <li><a href="">Tops</a></li>
              <li><a href="">Bottoms</a></li>
              <li><a href="">Footwear</a></li>
            </ul>
          </li>
          <li><a href="">Utilities</a>
            <ul class="submenu">
              <li><a href="">Tops</a></li>
              <li><a href="">Bottoms</a></li>
              <li><a href="">Footwear</a></li>
            </ul>
          </li>
        </ul>
 *    </nav>
 */


