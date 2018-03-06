import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
// import { customColors as c } from './custom/colors.js';
import { Home, LogIn, SearchPage, CartPage, Header, SignUp, UserPage, FAQ, GettingStarted } from './components';
import MobileHome from './components/mobileHome.js'
import RequireAuth from './components/middleware/index.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        windowWidth: window.innerWidth,
        small: window.innerWidth < 800
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this))
    this.setState({
      windowWidth: window.innerWidth,
        small: window.innerWidth < 800
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this))
  }

  handleResize() {
    const small = window.innerWidth < 800
    if (this.state.small !== small) {
      this.setState({
        small
      })
    }
  }
  
  render() {
    return (
      <div className="App">
        <Header />
        <div style={{ display: 'flex'}} className='Main' >
          <div className='Center'>
              <Route path='/search' component={SearchPage}/>
              <Route path='/cart' component={CartPage}/>
              <Route path='/login' component={LogIn}/>
              <Route path='/signup' component={SignUp}/>
              <Route path='/user' component={RequireAuth(UserPage)}/>
              <Route path='/faq' component={FAQ}/>
              <Route path='/gettingstarted' component={GettingStarted}/>
              <Route exact path='/' component={!this.state.small ? Home : MobileHome}/>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
