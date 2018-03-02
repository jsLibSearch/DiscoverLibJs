import React, { Component } from 'react';
import { Dropdown, DropdownToggle, p, DropdownMenu, 
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Popover,
  PopoverHeader, PopoverBody } from 'reactstrap';
import axios from 'axios';
import '../App.css';
import { customColors as c } from '../custom/colors.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { saveAccessToken, loadCarts, newItem, setCartName, clearCart, dev } from '../actions';

export class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        windowWidth: window.innerWidth - 40,
        small: window.innerWidth <= 700,
        userCarts: [],
        expanded: null,
        current: null,
        loadingCarts: false,
        loadedCarts: false,
        currentModal: null,
        renaming: null,
        renameText: '',
        cartOptionsOpen: null,
        modal: false,
        private: false,
        filename: '',
        description: '',
        cartToRename: null,
        server: !dev ? 'https://javascript-library-discovery2.herokuapp.com/' : 'http://localhost:8080/'
    };
  }

  componentDidMount() {
    // TODO: set user's carts as current cart
    // TODO: test Users carts for package info
    // TODO: retrieve past cart from local storage and send to redux
    if (this.state.userCarts.length === 0 && this.state.loadedCarts === false) {
      this.props.loadCarts(this.props.userState.user);
    }
    window.addEventListener('resize', this.handleResize.bind(this))
    this.setState({
      windowWidth: window.innerWidth - 40,
      small: window.innerWidth <= 700,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userState.jwt !== this.props.userState.jwt) { 
      sessionStorage.setItem('jwtToken', nextProps.userState.jwt);
      sessionStorage.setItem('username', nextProps.userState.username);
      sessionStorage.setItem('github_id', nextProps.userState.github_id);
      sessionStorage.setItem('loggedIn', true);
    }
    if (nextProps.userState.loadingCarts !== this.props.userState.loadingCarts) {
      if (nextProps.userState.loadingCarts) {
        this.setState({
          loadingCarts: true
        })
      } else if (!nextProps.userState.loadingCarts && !this.state.loadedCarts) {
        let currentCartIndex = null;
        nextProps.userState.user.carts.forEach((c, i) => {
          if (c._id === this.props.cart._id) {
            currentCartIndex = i;
          }
        })
        this.setState({
          loadingCarts: false,
          loadedCarts: true,
          userCarts: nextProps.userState.user.carts,
          current: currentCartIndex
        })
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this))
  }

  handleResize() {
    this.setState({
        windowWidth: window.innerWidth - 40,
        small: window.innerWidth <= 700
    })
  }

  handleCart(i) {
    this.props.clearCart()
    if (this.state.current === i) {
      this.setState({
        current: null
      })
    }
    if (this.state.current !== i) {
      const curCart = this.state.userCarts[i]
      curCart.cart.forEach(element => {
        this.props.newItem(element)
      });
      this.props.setCartName(curCart.name, curCart._id);
      this.setState({
        current: i
      })
    }
  }

  handleExpand(i) {
    if (this.state.expanded === i) {
      this.setState({
        expanded: null
      })
    }
    if (this.state.expanded !== i) {
      this.setState({
        expanded: i
      })
    }
  }

  toggleCartOptions(i) {
    let newDropdownOpenIndex = this.state.cartOptionsOpen === i ? null : i;
    this.setState({
      cartOptionsOpen: newDropdownOpenIndex
    })
  }

  toggleRename(i) {
    if (typeof i === 'number') {
      this.setState({
        renaming: true,
        cartToRename: i
      });
      return
    }
    this.setState({
      renaming: false,
      cartToRename: null
    });
    return;
  }

  renameCart(e) {
    e.preventDefault()
    if (this.state.renameText.length < 1) {
      return;
    }
    const cart = this.state.userCarts[this.state.cartToRename].cart.map((pkg) => pkg._id);
    const cartid = this.state.userCarts[this.state.cartToRename]._id;
    const name = this.state.renameText;
    const config = { headers: { authorization: `Bearer ${this.props.userState.user.jwt}`, github_id: this.props.userState.user.github_id }}
    axios.put(`${this.state.server}edit-cart`, { cartid, cart, name }, config).then(() => {
      this.setState({
        renaming: false,
        cartToRename: null,
        loadedCarts: false,
        userCarts: []
      })
      this.props.loadCarts(this.props.userState.user);
      return;
    })
    this.setState({
      renaming: false,
      cartToRename: null
    })
  }

  handleRenameText(e) {
    e.preventDefault()
    this.setState({
      renameText: e.target.value,
    })
  }

  toggleModal(i = null) {
    if (typeof i === 'number') {
      this.setState({
        modal: true,
        currentModal: i
      });
      return
    }
    this.setState({
      modal: false,
      currentModal: null
    });
    return;
  }

  onCheckBoxClick() {
    this.setState({ private: !this.state.private });
  }

  onRepoTextChange(e) {
    e.preventDefault();
    this.setState({ filename: e.target.value });
   
  }

  onDescriptionTextChange(e) {
    e.preventDefault();
    this.setState({ description: e.target.value });
  }

  deleteCart(id, i) {
    const headers = { authorization: `Bearer ${this.props.userState.user.jwt}`, github_id: this.props.userState.user.github_id };
    axios.delete(`${this.state.server}delete-cart`, { data : { cartid: id }, headers }).then((response) => {
      this.setState({
        loadedCarts: false,
        userCarts: []
      })
      if (this.state.current === i) {
        this.props.clearCart();
      }
      this.props.loadCarts(this.props.userState.user);
      return;
    })
  }

  onCreateRepoClick() {
    console.log('TODO: IMPLEMENT REPO CLICK')
    // const [ repo_name, description, _private, accessToken ] = 
    //   [ this.state.filename, this.state.description, this.state.private, this.props.user.accessToken ];

    // axios
    //   .post(`http://localhost:5000/create-repo`, { repo_name, description, _private, accessToken })
    //     .then((res) => {
    //       console.log(res.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     })

    // this.setState({
    //   modal: false
    // });
  }
  
  render() {
    return (
      <div id='user_page_div'>
        <div style={{ borderBottom: '1px solid rgb(103, 122, 87)', marginTop: '.2em' }}>
          <p className='SearchHeader'>
            {this.state.loadingCarts ? 'Loading projects' : 'Your saved projects'}
          </p>
        </div>
        {!this.state.loadingCarts ? (this.state.userCarts.length > 0 ? this.state.userCarts.map((cart, i) => {
          return (
          <div className='Package' style={this.state.small ? {margin: '5px 0px', paddingBottom: '10px'}:{ paddingBottom: '0.5em' }} key={cart._id}>
          <div className='PackButtons' style={this.state.expanded === i ? { marginBottom: '10px' } : { marginBottom: '5px' }}>
              <h2 className='PackTitle' style={this.state.small ? { textAlign: 'left', marginBottom: 0 }:{ marginBottom: 0 }}>{cart.name}</h2>
          </div>
              <div className='ExpandBox' style={ this.state.expanded === i ? {} : {display: 'none'} }>
                  <ul style={{margin: '0em', padding: '0em 3em'}}>
                      {cart.cart ? cart.cart.map((item) => (<li key={item.name}>{item.name}</li>)): null}
                  </ul>
              </div>
          <div className='PackButtons' style={this.state.expanded === i ? { marginTop: '0px' } : { marginTop: '10px' }}>
          <Button onClick={this.handleExpand.bind(this, i)} size='sm' color='secondary' style={{
                      fontSize: '1.8rem', marginRight: '5px'}}>{!(this.state.expanded === i) ? 'Show Packages' : 'Hide Packages'}</Button>
              {/* dropdown */}
                <Dropdown
                  group
                  title='Cart Options'
                  id={`options${cart._id}`}
                  isOpen={this.state.cartOptionsOpen === i}
                  toggle={this.toggleCartOptions.bind(this, i)}
                  size="sm"
                  style={{
                    border: 'none'
                  }}>
                  <DropdownToggle
                    style={{
                      border: 'none',
                      fontSize: '1.8rem' }}
                    outline
                    caret>
                    Options
                  </DropdownToggle>
                  <DropdownMenu style={{backgroundColor: c.header, borderRadius: '.4rem'}}>
                    <div className="username-dropdown">
                      <p className={!this.state.small ? 'SignCart' : 'SignCart'} style={ { padding: '0em .5em', margin: '0px auto' } } onClick={this.handleCart.bind(this, i)}>{this.state.current === i ? `Don't use project` : 'Use project'}</p>
                    </div>
                    <div className="username-dropdown">
                      <p className={!this.state.small ? 'SignDD' : 'SignDD'} style={{ padding: '0em .5em', margin: '0px auto' }} id='rename' onClick={this.toggleRename.bind(this, i)}>Rename</p>
                    </div>
                    <div className="username-dropdown">
                      <p className={!this.state.small ? 'SignDD' : 'SignDD'} style={{ padding: '0em .5em', margin: '0px auto' }} color="secondary" onClick={this.toggleModal.bind(this, i)}> Create A Repo </p>
                    </div>
                    <div className="username-dropdown">
                      <p className={!this.state.small ? 'SignDel' : 'SignDel'} style={{ padding: '0em .5em', margin: '0px auto' }} onClick={this.deleteCart.bind(this, this.state.userCarts[i]._id, i)}>Delete Project</p>
                    </div>
                  </DropdownMenu>
                </Dropdown>
          </div>
      </div>
        )}): <p>You do not have any saved projects!</p>) : <h3>Loading Projects</h3>}
        {this.state.renaming ? (<Popover style={{ backgroundColor: 'white', fontSize: '1.8rem' }} placement='right' isOpen={this.state.renaming} target={`options${this.state.userCarts[this.state.cartToRename]._id}`} toggle={this.toggleRename.bind(this)}>
          <PopoverHeader style={{ backgroundColor: c.header, color: 'white', fontSize: '1.8rem' }}>Rename Project</PopoverHeader>
          <PopoverBody>
            <Form onSubmit={this.renameCart.bind(this)}>
              <FormGroup>
                <Label for={`rename`} hidden>Rename Project</Label>
                <Input style={{ fontSize: '1.8rem', border: '1px solid #313131' }} onChange={this.handleRenameText.bind(this)} placeholder={this.state.userCarts[this.state.cartToRename].name} />
              </FormGroup>
              {' '}
              <Button outline style={{ border: 'none', fontSize: '1.8rem' }} color='primary' type='submit'>Submit</Button>
            </Form>
          </PopoverBody>
        </Popover>) : null}
        <Modal isOpen={this.state.modal} toggle={this.toggleModal.bind(this)}>
          <ModalHeader toggle={this.toggleModal.bind(this)}>Create repo on GitHub</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="reponame">Repo name</Label>
                <Input type="textarea" name="repo" id="reponame" placeholder="reponame" onChange={this.onRepoTextChange.bind(this)}/>
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" name="description" id="description" placeholder="description" onChange={this.onDescriptionTextChange.bind(this)}/>
              </FormGroup>
              <FormGroup check >
              <Label check >
                <Input type="checkbox" id="checkbox" onClick={this.onCheckBoxClick.bind(this)} />{' '}
                Private?
              </Label>
            </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onCreateRepoClick.bind(this)}>Submit</Button>
            <Button color="secondary" onClick={this.toggleModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userState: state.userStatusReducer,
    token: state.accessToken,
    cart: state.cart
  }
}

export default withRouter(connect(mapStateToProps, { saveAccessToken, loadCarts, newItem, setCartName, clearCart })(UserPage));
