import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
// import { customColors as c } from './custom/colors.js';
import { Home, LogIn, SearchPage, CartPage, Header, SignUp, UserPage, FAQ, GettingStarted } from './components';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        windowHeight: window.innerHeight - 40,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this))
    this.setState({
      windowHeight: window.innerHeight - 40,
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
  
  render() {
    return (
      <div className="App">
        <Route path='/' component={Header} />
        <div style={{ minHeight: `${ this.state.windowHeight }px`}} className='Main' >
          <div className='Center' style={{ minHeight: `${this.state.windowHeight}px`}}  >
            <Route path='/search' component={SearchPage}/>
            <Route path='/cart' component={CartPage}/>
            <Route path='/login' component={LogIn}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/user' component={UserPage}/>
            <Route path='/faq' component={FAQ}/>
            <Route path='/gettingstarted' component={GettingStarted}/>
            <Route exact path='/' component={Home}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
