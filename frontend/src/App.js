import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
// import { customColors as c } from './custom/colors.js';
import { Home, LogIn, SearchPage, CartPage, Header, SignUp, UserPage, FAQ, GettingStarted } from './components';
import RequireAuth from './components/middleware/index.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        windowHeight: window.innerHeight - 40,
        windowWidth: window.innerWidth,
        small: window.innerWidth < 700
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this))
    this.setState({
      windowHeight: window.innerHeight - 40,
      windowWidth: window.innerWidth,
        small: window.innerWidth < 700
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this))
  }

  handleResize() {
    this.setState({
        windowHeight: window.innerHeight - 40,
    })
    
    const small = window.innerWidth < 700
    if (this.state.small !== small) {
      this.setState({
        small
      })
    }
  }
  
  render() {
    return (
      <div className="App">
        <Route path='/' component={Header} />
        <div style={{ minHeight: `${ this.state.windowHeight }px`, display: 'flex'}} className='Main' >
          <div className='Center' style={{ minHeight: `${this.state.windowHeight}px`}}  >
              <Route path='/search' component={SearchPage}/>
              <Route path='/cart' component={CartPage}/>
              <Route path='/login' component={LogIn}/>
              <Route path='/signup' component={SignUp}/>
              <Route path='/user' component={RequireAuth(UserPage)}/>
              <Route path='/faq' component={FAQ}/>
              <Route path='/gettingstarted' component={GettingStarted}/>
              <Route exact path='/' component={!this.state.small ? Home :
              () => (<div>
                  <div
                    className="introduction"
                    style={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                    <p
                      className="PackTitle"
                      style={{ textAlign: 'center', margin: 'auto', padding: '10px' }}>
                      Welcome to Javascript Library Discovery.
                    </p>
                    <p
                      style={{ textAlign: 'left', padding: '10px' }}>
                      Search for a library above or explore the directories of common libraries to the left. You may add libraries to your project which you can view by clicking on the icon on the top right corner of the page. Once you have libraries in your project, personalized library recommendations will be available!
                    </p>
                  </div>
                </div>
              )}/>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
