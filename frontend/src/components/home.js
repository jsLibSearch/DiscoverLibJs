import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
  ListGroup, ListGroupItem } from 'reactstrap';


import AnimationList from './AnimationList';

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
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this))
    this.setState({
      windowHeight: window.innerHeight - 40
    })
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

  test() {
    console.log('123')
  }
  
  render() {
    const list = <AnimationList />;
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
                    <NavLink onClick={ () => this.test() } href="#">Application Frameworks</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Mobile Frameworks</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Realtime Frameworks</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Testing Frameworks</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
              <li><NavbarBrand className="UI" onClick={ () => this.ui() } href="#">UI</NavbarBrand></li>
              <Collapse isOpen={this.state.ui} navbar>
                <Nav navbar>
                  <NavItem >
                    <NavLink onClick={ () => this.test() } href="#">UI Frameworks</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Windows, Modals, Popups</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Keyboard Wrappers</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Form Widgets</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
              <li><NavbarBrand className="UI" onClick={ () => this.multimedia() } href="#">Multimedia</NavbarBrand></li>
              <Collapse isOpen={this.state.multimedia} navbar>
                <Nav navbar>
                  <NavItem >
                    <NavLink onClick={ () => this.test() } href="#">Game Engines</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Physics Libraries</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Animation Libraries</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Presentation Libraries</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
              <li><NavbarBrand className="UI" onClick={ () => this.graphics() } href="#">Graphics</NavbarBrand></li>
              <Collapse isOpen={this.state.graphics} navbar>
                <Nav navbar>
                  <NavItem >
                    <NavLink onClick={ () => this.test() } href="#">Canvas Wrappers</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">WebGL</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Image Manipulation</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Visualization Libraries</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
              <li><NavbarBrand className="UI" onClick={ () => this.data() } href="#">Data</NavbarBrand></li>
              <Collapse isOpen={this.state.data} navbar>
                <Nav navbar>
                  <NavItem >
                    <NavLink onClick={ () => this.test() } href="#">Data Structures</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Date Libraries</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Storage Libraries</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Validation</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
              <li><NavbarBrand className="UI" onClick={ () => this.development() } href="#">Development</NavbarBrand></li>
              <Collapse isOpen={this.state.development} navbar>
                <Nav navbar>
                  <NavItem >
                    <NavLink onClick={ () => this.test() } href="#">Package Managers</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Timing</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Toolkits</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Code Protection</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
              <li><NavbarBrand className="UI" onClick={ () => this.utilities() } href="#">Utilities</NavbarBrand></li>
              <Collapse isOpen={this.state.utilities} navbar>
                <Nav navbar>
                  <NavItem >
                    <NavLink onClick={ () => this.test() } href="#">DOM</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Async, Control Flow, Event</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Functional Programming</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Math Libraries</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
              <li><NavbarBrand className="UI" onClick={ () => this.applications() } href="#">Applications</NavbarBrand></li>
              <Collapse isOpen={this.state.applications} navbar>
                <Nav navbar>
                  <NavItem >
                    <NavLink onClick={ () => this.test() } href="#">Html5 Apps</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Static Site Generators</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Code Editors</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={ () => this.test() } href="#">Design And Prtotyping</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
              </ul>
            </Navbar>
            </div>
          <div className="Items">
            { list }
          </div>
          <div className="Box">
            TEST
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
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


