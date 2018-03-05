import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, 
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Popover,
  PopoverHeader, PopoverBody } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { deleteItem, newItem, addCartToUser, setCartName, dev, clearCart, setAsSavedCart, clearRecs } from '../actions';
import '../App.css';
import { customColors as c } from '../custom/colors.js';
import { initGA, logPageView } from './ReactGA';
const axios = require('axios');

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      small: false,
      cart: [],
      npmString: '',
      yarnString: '',
      isOpen: [],
      modal: false,
      filename: '',
      description: '',
      private: false,
      selected: [],
      cartOptionsOpen: false,
      cartName: 'UntitledProject',
      newName: '',
      renaming: false,
      _id: null,
      loginModal: false,
      server: !dev ? 'https://javascript-library-discovery2.herokuapp.com/' : 'http://localhost:8080/',
      usersCart: false,
      empty: true,
      copied: false,
      value: '',
      npm: false,
      yarn: false,
      gotURL: false,
      clone_url: '',
    };
    this.toggleLoginModal = this.toggleLoginModal.bind(this);
  }

  componentDidUpdate() {
    // -----------------------------SECTION MAY BE USELESS--CHECK FOR ERRORS WHEN USER AUTH IS UP

    // if (this.props.cart.packages && this.props.cart.packages.length !== this.state.cart.length && this.refs.theCart) {
    //   console.log('update')
    //   let currentCart = [];
    //   if (this.props.cart.packages.length > 0) {
    //     currentCart = this.props.cart.packages.slice();
    //     const openArr = Array(currentCart.length).fill(false);
    //     let names = '';
    //     currentCart.forEach((item) => {
    //       names += ' ' + item.name;
    //     })
    //     const npmStr = 'npm install --save' + names;
    //     const yarnStr = 'yarn add' + names;
    //     this.setState({
    //       windowWidth: window.innerWidth,
    //       cart: currentCart,
    //       cartName: this.props.cart.name,
    //       isOpen: openArr,
    //       _id: this.props.cart._id,
    //       npmString: npmStr,
    //       yarnString: yarnStr,
    //       empty: false
    //     })
    //   }
    // }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    const small = this.state.windowWidth < 700 ? true : false;
    let currentCart = [];
    let name = 'Untitled Project';
    if (this.props.cart.packages && this.props.cart.packages.length > 0) {
      currentCart = this.props.cart.packages.slice();
      name = this.props.cart.name;
      let names = '';
      currentCart.forEach((item) => {
        names += ' ' + item.name;
      })
      const npmStr = 'npm install --save' + names;
      const yarnStr = 'yarn add' + names;
      this.setState({
        windowWidth: window.innerWidth,
        // cart: currentCart,
        cartName: name,
        _id: this.props.cart._id,
        npmString: npmStr,
        yarnString: yarnStr,
        empty: false,
        small: small
      })
      return;
    }
    if (this.refs.theCart) {
      this.setState({
        windowWidth: window.innerWidth,
        cart: currentCart,
        cartName: name,
        _id: this.props.cart._id,
        empty: currentCart.length === 0,
        small: small
      })
    }
    initGA();
    logPageView();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cart._id !== this.props.cart._id) {
      let names = '';
      if (nextProps.cart.packages.length) {
        nextProps.cart.packages.forEach((item) => {
          names += ' ' + item.name;
        })
      }
      const npmStr = 'npm install --save' + names;
      const yarnStr = 'yarn add' + names;
      this.setState({
        _id: nextProps.cart._id,
        // cart: nextProps.cart.packages,
        cartName: nextProps.cart.name,
        empty: nextProps.cart.packages.length === 0,
        npmString: npmStr,
        yarnString: yarnStr,
        yarn: false,
        npm: false
      })
    } else if (nextProps.cart.packages.length !== this.props.cart.packages.length) {
      let names = '';
      if (nextProps.cart.packages.length) {
        nextProps.cart.packages.forEach((item) => {
          names += ' ' + item.name;
        })
      }
      const npmStr = 'npm install --save' + names;
      const yarnStr = 'yarn add' + names;
      this.setState({
        empty: nextProps.cart.packages.length === 0,
        npmString: npmStr,
        yarnString: yarnStr,
        npm: false,
        yarn: false
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
    this.props.clearRecs();
  }

  handleResize() {
    if (!this.refs.theCart) {
        return;
    }
    const small = this.state.windowWidth < 700 ? true : false;
    this.setState({
        windowWidth: window.innerWidth,
        small: small
    })
  }
  
  removePackage(item, i) {
    this.props.deleteItem(item);
    let names = '';
    this.props.cart.packages.forEach((i) => {
      names += ' ' + i.name;
    })
    const npmStr = 'npm install --save' + names;
    const yarnStr = 'yarn add' + names;
    this.setState({
        npmString: npmStr,
        yarnString: yarnStr,
        empty: this.props.cart.packages.length === 0
    })
    this.toggleOpen(i);
  }

  toggleOpen(i) {
      const newArr = this.state.isOpen.slice();
      newArr[i] = !newArr[i];
      this.setState({
          isOpen: newArr
      })
  }


  onCreateRepoClick() {
    if (this.props.cart.packages.length === 0 || this.props.user.status === 'unauthorized') {
      this.toggleLoginModal();
      return;
    }
    const [ repo_name, description,  accessToken ] = 
      [ this.state.filename, this.state.description, this.props.user.user.accessToken ];
    let arrOfPckgs = []
    for (let obj of this.props.cart.packages) {
      arrOfPckgs.push(obj.name);
    }

    if (arrOfPckgs) {
      axios
      .post(`${this.state.server}create-repo`, { repo_name, description, accessToken, arrOfPckgs })
        .then((res) => {
          console.log(res.data);
          this.setState({ gotURL: true, clone_url: res.data })
        })
        .catch((err) => {
          console.log(err);
        })

    }

    this.setState({
      modal: !this.state.modal
    });
  }

  toggleURLModal() {
    this.setState({ gotURL: !this.state.gotURL })
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleLoginModal() {
    this.setState({
      loginModal: !this.state.loginModal
    });
  }

  onCheckBoxClick() {
    this.setState({ private: !this.state.private });
  }

  onRepoTextChange(e) {
    this.setState({ filename: e.target.value });
    e.preventDefault();
  }

  onDescriptionTextChange(e) {
    this.setState({ description: e.target.value });
    e.preventDefault();
  }
  
  toggleOpenCartOptions() {
    this.setState({
        cartOptionsOpen: !this.state.cartOptionsOpen
    })
  }

  saveCart() {
    if (this.props.cart.packages.length === 0 || this.props.user.status === 'unauthorized') {
      this.toggleLoginModal();
      return;
    }
    this.props.addCartToUser(this.props.cart.packages, this.props.user.user, this.state.cartName);
    this.toggleOpenCartOptions()
  }

  selectPackage(item) {
    if (this.state.selected.includes(item)) {
      const index = this.state.selected.findIndex(pkg => pkg === item)
      const newSelected = this.state.selected.slice();
      newSelected.splice(index, 1);
      this.setState({
        selected: newSelected
      })
    } else {
      let newSelected = [item];
      newSelected = newSelected.concat(this.state.selected);
      this.setState({
        selected: newSelected
      })
    }
  }

  toggleSelectAll() {
    const newSelected = [];
    if (this.props.cart.packages.length === this.state.selected.length || this.props.cart.packages.length === 0) {
      this.setState({
        selected: newSelected
      })
      return;
    }
    this.props.cart.packages.forEach(pkg => {
      newSelected.push(pkg.name)
    });
    this.setState({
      selected: newSelected
    });
  }

  deleteSelected() {
    const newCart = this.props.cart.packages.filter(pkg => !this.state.selected.includes(pkg.name));
    const itemsToDelete = this.props.cart.packages.filter(pkg => this.state.selected.includes(pkg.name));
    itemsToDelete.forEach(item => {
      this.props.deleteItem(item);
    })
    let names = '';
    newCart.forEach((i) => {
      names += ' ' + i.name;
    })
    const npmStr = 'npm install --save' + names;
    const yarnStr = 'yarn add' + names;
    this.setState({
        selected: [],
        npmString: npmStr,
        yarnString: yarnStr,
        empty: newCart.length === 0
    })
  }

  toggleRename() {
    this.setState({
      renaming: !this.state.renaming
    })
  }

  handleRenameText(e) {
    e.preventDefault()
    this.setState({
      newName: e.target.value
    })
  }

  renameCart(e) {
    e.preventDefault();
    if (this.state.newName.length < 1) {
      return;
    }
    this.props.setCartName(this.state.newName, this.state._id);
    this.setState({
      cartName: this.state.newName,
      newName: '',
      renaming: false
    })

  }

  handleLogInClick() {
    // TODO: Save cart to local storage
    if (this.props.cart.packages.length > 0) {
      sessionStorage.setItem('cart', JSON.stringify(this.props.cart))
    }
    axios
        .get(`${this.state.server}login`)
            .then((response) => {
                window.location = response.data;
            })
            .catch((err) => {
                console.log(err);
            });
  }

  overwriteCart() {
    const cart = this.props.cart.packages.map((pkg) => pkg._id);
    const cartid = this.state._id;
    const name = this.state.cartName;
    const config = { headers: { authorization: `Bearer ${this.props.user.user.jwt}`, github_id: this.props.user.user.github_id }}
    axios.put(`${this.state.server}edit-cart`, { cartid, cart, name }, config).then(() => {
      this.props.setAsSavedCart(this.state.cartName, this.state._id, this.props.cart.packages);
      this.toggleOpenCartOptions();
      return;
    })
  }

  clearCart() {
    this.props.clearCart();
    this.setState({
      cartName: 'Untitled Project',
      _id: null
    })
    this.toggleOpenCartOptions()
  }

  copyString(string) {
    console.log(string);
    const optionNPM = string[0] === 'n'
    const copyText = document.getElementById(optionNPM ? 'npmcopy' : 'yarncopy');
    copyText.select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    this.setState({
      npm: optionNPM,
      yarn: !optionNPM,
      copied: true
    })
  }

  render() {
    return (
      <div className='WrapCart'>
      <div ref='theCart' className='Cart' style={this.state.small ? {width: 'auto', margin: '.3em .3em'}: {}}>
        <div className='PackCartHead'>
          <h1 id='titleOfCart' className='PackTitle'>
            {this.state.cartName}
          </h1>
          <h1 className='PackDesc'>
            You have {this.props.cart.packages.length} {this.props.cart.packages.length === 1 ? 'package' : 'packages'} in your project
          </h1>
        </div>
        <div className='PackCart' style={{ height: 'auto', maxHeight: 'none' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
          <Button
            outline={!(this.props.cart.packages.length > 0 && this.state.selected.length === this.props.cart.packages.length)}
            color='secondary'
            size='sm'
            onClick={this.toggleSelectAll.bind(this)}
            style={{
              border: 'none',
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              textAlign: 'left',
              fontSize: '1.8rem',
              fontWeight: '100',
              color: '313531'
            }}>
            {(this.props.cart.packages.length > 0 && this.state.selected.length === this.props.cart.packages.length) ? 'Unselect All' : 'Select all'}
            </Button>
          <Button outline color='danger'
            disabled={this.state.selected.length === 0}
            style={{
              border: 'none',
              whiteSpace: 'normal',
              wordBreak: 'break-word',
              textAlign: 'left',
              fontSize: '1.8rem',
              fontWeight: '100'
            }}
            onClick={this.deleteSelected.bind(this)}
          >Delete Selected</Button>
        </div>
        <Dropdown
          group
          title='Cart Options'
          id={`options`}
          isOpen={this.state.cartOptionsOpen}
          toggle={this.toggleOpenCartOptions.bind(this)}
          style={{
            fontSize: '.8em',
            border: 'none'
          }}>
          <DropdownToggle
            style={{ border: 'none', fontSize: '1.8rem', fontWeight: '100' }}
            outline
            caret>
            Menu
          </DropdownToggle>

          {this.state._id === null ? (
          <DropdownMenu style={{backgroundColor: c.header, borderRadius: '.4rem'}}>
            <div>
              <p className={'SignCart'} style={{ padding: '0.3em 1em', width: '12em', margin: '0px auto' }} onClick={this.saveCart.bind(this)}>Save Project</p>
            </div>
            <div>
              <p className={'SignDD'} style={{ padding: '0.3em 1em', width: '12em', margin: '0px auto' }} id='rename'onClick={this.toggleRename.bind(this)}>Rename</p>
            </div>
            <div>
              <p className={'SignDD'} style={{ padding: '0.3em 1em', width: '12em', margin: '0px auto' }} onClick={() => this.toggleModal() }> Create A Repo </p>
            </div>

            <Popover style={ { backgroundColor: 'white', fontSize: '1.8rem' } }  placement='left' isOpen={this.state.renaming} target='options' toggle={this.toggleRename.bind(this)}>
              <PopoverHeader style={ { backgroundColor: c.header, color: 'white', fontSize: '1.8rem' } }>Rename Project</PopoverHeader>
              <PopoverBody>
                <Form onSubmit={this.renameCart.bind(this)}>
                  <FormGroup>
                    <Label for="rename project" hidden>Rename Project</Label>
                    <Input style={{ fontSize: '1.8rem', border: '1px solid #313131' }} onChange={this.handleRenameText.bind(this)} placeholder={this.state.cartName} />
                  </FormGroup>
                  {' '}
                  <Button outline style={{ border: 'none', fontSize: '1.8rem' }} color='primary' type='submit'>Submit</Button>
                </Form>
              </PopoverBody>
            </Popover>
            <div>
              <p className={'SignDel'} style={{ padding: '0.3em 1em', width: '12em', margin: '0px auto' }} onClick={this.clearCart.bind(this)}>Clear Project</p>
            </div>
          </DropdownMenu>
          ):(
          <DropdownMenu style={{backgroundColor: c.header, borderRadius: '.4rem'}}>
            <div className="username-dropdown">
              <p className={'SignCart'} style={{ padding: '0.3em 1em', width: '12em', margin: '0px auto' }} onClick={this.saveCart.bind(this)}>Save As New Project</p>
            </div>
            <div className="username-dropdown">
              <p className={'SignCart'} style={{ padding: '0.3em 1em', width: '12em', margin: '0px auto' }} onClick={this.overwriteCart.bind(this)}>Overwrite Project</p>
            </div>
            <div className="username-dropdown">
              <p className={'SignDD'} style={{ padding: '0.3em 1em', width: '12em', margin: '0px auto' }} id='rename'onClick={this.toggleRename.bind(this)}>Rename</p>
            </div>
            <div className="username-dropdown">
              <p className={'SignDD'} style={{ padding: '0.3em 1em', width: '12em', margin: '0px auto' }} color="secondary" onClick={() => this.toggleModal() }> Create A Repo </p>
            </div>
            <Popover style={ { backgroundColor: 'white', fontSize: '1.8rem' } }  placement='left' isOpen={this.state.renaming} target='options' toggle={this.toggleRename.bind(this)}>
              <PopoverHeader style={ { backgroundColor: c.header, color: 'white', fontSize: '1.8rem' } }>Rename Project</PopoverHeader>
              <PopoverBody>
                <Form onSubmit={this.renameCart.bind(this)}>
                  <FormGroup>
                    <Label for="rename project" hidden>Rename Project</Label>
                    <Input style={{ fontSize: '1.8rem', border: '1px solid #313131' }} onChange={this.handleRenameText.bind(this)} placeholder={this.state.cartName} />
                  </FormGroup>
                  {' '}
                  <Button outline style={{ border: 'none', fontSize: '1.8rem' }} color='primary' type='submit'>Submit</Button>
                </Form>
              </PopoverBody>
            </Popover>
            <div>
              <p className={'SignDel'} style={{ padding: '0.3em 1em', width: '12em', margin: '0px auto' }} onClick={this.clearCart.bind(this)}>Clear Project</p>
            </div>
          </DropdownMenu>)}
        </Dropdown>
        </div>
        <div className='CartDiv'>
        <TransitionGroup>
            {this.props.cart.packages ?
            this.props.cart.packages.map((item, i) => {
            return (
              <CSSTransition
                classNames="background"
                timeout={{exit: 500, enter: 500}}
                component='div'
                key={`transition${item._id}`}>
                <div className='PackCart' style={this.state.small ? { margin: '0am', maxHeight: 'none', height: 'auto'} : { margin: '0am'} } key={item.name}>
                  <Button 
                    key={item._id}
                    outline={!this.state.selected.includes(item.name)}
                    color='secondary'
                    size='sm'
                    onClick={this.selectPackage.bind(this, item.name)}
                    style={
                        this.state.small ? {
                        display: 'inline-flex',
                        border: 'none',
                      } : {
                        display: 'inline-flex',
                        border: 'none'
                    }}>
                      <span
                        className={!this.state.selected.includes(item.name) ? 'PackDescButton' : 'PackDescSelected'}
                        style={
                        this.state.small ? {
                          display: 'inline-flex',
                          textAlign: 'left',
                          border: 'none',
                        } : {
                            display: 'inline-flex',
                            textAlign: 'left',
                            border: 'none'
                          }}>
                        {item.name}
                      </span>
                  </Button>
                  <div key={`abc${item.name}`}>
                    <Dropdown
                        group
                        title='Options'
                        key={`abc${item._id}`}
                        id={`options-${item._id}`}
                        isOpen={this.state.isOpen[i]}
                        toggle={this.toggleOpen.bind(this, i)}
                        style={{
                            margin: '0em'
                        }}>
                        <DropdownToggle
                          key={`zyx${item.name}`}
                          style={{ border: 'none', margin: '0em', fontSize: '1.8rem', fontWeight: 100 }}
                          outline
                          caret>
                          Options
                        </DropdownToggle>
                        <DropdownMenu style={{backgroundColor: c.header, borderRadius: '.4rem'}}>
                          <div>
                            <p className={'SignDel'} style={{ padding: '0em .5em', width: '7em', margin: '0px auto' }} key={`q${item.name}`} onClick={this.removePackage.bind(this, item, i)}>Remove</p>
                          </div>  
                          <div>
                            <a className={'SignCart'} style={{ padding: '0em .5em', width: '7em', margin: '0px auto' }} key={`t${item.name}`} rel="noopener noreferrer" target="_blank" href={item.homepage} onClick={this.toggleOpen.bind(this, i)}>Homepage</a>
                          </div>
                        </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </CSSTransition>
            )
            })
            : null}
          </TransitionGroup>
        </div>
        <Modal isOpen={this.state.modal} toggle={() => this.toggleModal()}>
          <ModalHeader toggle={() => this.toggleModal()}>Short Info</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="repo name">Repo name</Label>
                <Input type="textarea" name="repo" id="reponame" placeholder="reponame" onChange={(e) => this.onRepoTextChange(e)}/>
              </FormGroup>
              <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" name="description" id="description" placeholder="description" onChange={(e) => this.onDescriptionTextChange(e)}/>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.onCreateRepoClick()}>Submit</Button>
            <Button color="secondary" onClick={() => this.toggleModal()}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.loginModal} toggle={this.toggleLoginModal.bind(this)}>
          <ModalHeader toggle={this.toggleLoginModal.bind(this)}>Log in</ModalHeader>
          <ModalBody>
            You must be logged in via GitHub to save a project.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleLogInClick.bind(this)}>Log-In</Button>
            <Button color="secondary" onClick={this.toggleLoginModal.bind(this)}>No thanks</Button>
          </ModalFooter>
        </Modal> 
      </div>
      { !this.state.empty ? (
        <div style={{ maxWidth: '1000px', margin: 'auto'  }}>
          <div className='TermBox' style={this.state.small ? { display: 'block', padding: '5px', marginTop: '0px' } : { marginTop: '0px' }}>
            <p
              readOnly
              value={this.state.npmString}
              className='TerminalCopy'
              onClick={this.copyString.bind(this, this.state.npmString)}
              style={ this.state.npm ? { color: '#33aa33', backgroundColor: '#151535' } : {}}>
                {this.state.npmString}
            <textarea
              id='npmcopy'
              readOnly
              value={this.state.npmString}
              style={ { opacity: 0, width: '0.01em', border: 'none', padding: 0, height: '0.01em', fontSize: '1px' }}>
                {this.state.npmString}
            </textarea>
            </p>
            <p
              readOnly
              className='TerminalCopy'
              value={this.state.yarnString}
              onClick={this.copyString.bind(this, this.state.yarnString)}
              style={ this.state.yarn ? { color: '#33aa33', backgroundColor: '#151535' } : {}}>
                {this.state.yarnString}
                <textarea
              readOnly
              id='yarncopy'
              value={this.state.yarnString}
              style={ { opacity:0, width: '0.01em', border: 'none', padding: 0, height: '0.01em', fontSize: '1px' }}>
                {this.state.yarnString}
            </textarea>
            </p>
          </div>
          <div className='TermBox'>
            <p className='PackDesc' style={{ margin: '5px 18px', lineHeight: 1 }}>{this.state.npm || this.state.yarn ? 'Copied!' : 'Click above to copy'}</p>
          </div>
          </div>
        ) : null }
          <div>
            <Modal isOpen={this.state.gotURL} toggle={() => this.toggleURLModal()}>
              <ModalHeader toggle={() => this.toggleURLModal()}>Repo Clone URL</ModalHeader>
              <ModalBody>
                { this.state.clone_url }
              </ModalBody>
              <ModalFooter>
                {/* <Button color="primary" onClick={() => this.onCreateRepoClick()}>Submit</Button> */}
                <Button color="secondary" onClick={() => this.toggleURLModal()}>Close</Button>
              </ModalFooter>
            </Modal>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      cart: state.cart,
      user: state.userStatusReducer,
  };
};

export default connect(mapStateToProps, { deleteItem, newItem, addCartToUser, setCartName, clearCart, setAsSavedCart, clearRecs })(Cart);