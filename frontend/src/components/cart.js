import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSSTransitionGroup } from 'react-transition-group'
import { 
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Popover,
  PopoverHeader,
  PopoverBody
} from 'reactstrap';

import { deleteItem, newItem } from '../actions';
import '../App.css';
import { customColors as c } from '../custom/colors.js';


class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
        windowHeight: window.innerHeight - 40,
        cart: [],
        npmString: '',
        yarnString: '',
        isOpen: [],
        selected: [],
        cartOptionsOpen: false,
        cartName: 'Untitled Project',
        newName: '',
        renaming: false,
        
    };
  }

  componentDidUpdate() {
    if (this.props.cart && this.props.cart.length !== this.state.cart.length && this.refs.theCart) {
      let currentCart = [];
      if (this.props.cart.length > 0) {
        currentCart = this.props.cart.slice()
        const openArr = Array(currentCart.length).fill(false)
        this.setState({
            windowHeight: window.innerHeight - 40,
            cart: currentCart,
            isOpen: openArr
        })
      }
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    let currentCart = [];
    if (this.props.cart && this.props.cart.length > 0) {
      currentCart = this.props.cart.slice();
    }
    if (this.refs.theCart) {
        this.setState({
        windowHeight: window.innerHeight - 40,
        cart: currentCart
        })
    }

  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this))
  }

  handleResize() {
    if (!this.refs.theCart) {
        return;
    }
    this.setState({
        windowHeight: window.innerHeight - 40
    })
  }
  
  removePackage(item, i) {
    const newCart = this.state.cart.filter(pkg => pkg.name !== item.name)
    this.props.deleteItem(item);
    this.setState({
        cart: newCart
    })
  }

  toggleOpen(i) {
      const newArr = this.state.isOpen.slice();
      newArr[i] = !newArr[i];
      this.setState({
          isOpen: newArr
      })
  }

  toggleOpenCartOptions() {
    this.setState({
        cartOptionsOpen: !this.state.cartOptionsOpen
    })
  }

  saveCart() {
    console.log('saving cart')
    // this.props.saveCartToUser()
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
    const newSelected = []
    if (this.state.cart.length === this.state.selected.length || this.state.cart.length === 0) {
      this.setState({
        selected: newSelected
      })
      return;
    }
    this.state.cart.forEach(pkg => {
      newSelected.push(pkg.name)
    })
    this.setState({
      selected: newSelected
    })
  }

  deleteSelected() {
    const newCart = this.state.cart.filter(pkg => !this.state.selected.includes(pkg.name))
    const itemsToDelete = this.state.cart.filter(pkg => this.state.selected.includes(pkg.name))
    itemsToDelete.forEach(item => {
      this.props.deleteItem(item);
    })
    this.setState({
        cart: newCart,
        selected: []
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
    this.setState({
      cartName: this.state.newName,
      newName: '',
      renaming: false
    })
  }

  render() {
    return (
      <div ref='theCart' className='Package PackDiv'>
        <div className='PackCart' style={{ position: 'relative', padding: 0.2, marginBottom: 6 }}>
          <h1 className='PackTitle'>
            {this.state.cartName}
          </h1>
          <h1 className='PackDesc' style={{ position: 'absolute', bottom: 0, right:0, marginBottom: '0.5rem' }}>
            You have {this.state.cart.length} {this.state.cart.length === 1 ? 'package' : 'packages'} in your project
          </h1>
        </div>
        <div className='PackCart' style={{ padding: 0.2 }}>
        <div>
          <Button
            outline={!(this.state.cart.length > 0 && this.state.selected.length === this.state.cart.length)}
            color='success'
            size='sm'
            onClick={this.toggleSelectAll.bind(this)}
            style={{
              height: '2.2em',
              fontSize: '.8em',
              border: 'none',
              margin: 0
            }}>
            {(this.state.cart.length > 0 && this.state.selected.length === this.state.cart.length) ? 'Unselect All' : 'Select all'}
            </Button>
          <Button outline color='danger'
            size='sm'
            disabled={this.state.selected.length === 0}
            style={{
              height: '2.2em',
              fontSize: '.8em',
              border: 'none'
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
          size="sm"
          style={{
            height: '2.2em',
            fontSize: '.8em',
            border: 'none'
          }}>
          <DropdownToggle
            style={{ border: 'none', margin: '0em' }}
            size="sm"
            outline
            caret>
            Project Options
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={this.saveCart.bind(this)}>Save Project</DropdownItem>
            <DropdownItem id='rename'onClick={this.toggleRename.bind(this)}>Rename</DropdownItem>
            <Popover style={ { backgroundColor: c.body_bg } }  placement='left' isOpen={this.state.renaming} target='options' toggle={this.toggleRename.bind(this)}>
              <PopoverHeader style={ { backgroundColor: c.header, color: c.body_bg } }>Rename Project</PopoverHeader>
              <PopoverBody>
                <Form onSubmit={this.renameCart.bind(this)}>
                  <FormGroup>
                    <Label for="rename project" hidden>Rename Project</Label>
                    <Input bsSize='sm' onChange={this.handleRenameText.bind(this)} placeholder={this.state.cartName} />
                  </FormGroup>
                  {' '}
                  <Button size='sm' color='success' type='submit'>Submit</Button>
                </Form>
              </PopoverBody>
            </Popover>
            <DropdownItem divider />
            <DropdownItem>Delete Project</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </div>
        <div className='CartDiv'>
        <CSSTransitionGroup
                transitionName="background"
                transitionAppear
                transitionAppearTimeout={0}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
                component='div'>
            {this.state.cart ?
            this.state.cart.map((item, i) => {
            return (
                <div className='PackCart' style={{ margin: '0am'}} key={item.name}>
                  <h1 key={item._id} className='PackDesc' style={{
                          margin: '.6em 0em',
                          verticalAlign: 'middle',
                          display: 'inline-flex'
                      }}>{item.name}</h1>
                  <div key={`abc${item.name}`}>
                    <Button
                      outline={!this.state.selected.includes(item.name)}
                      color='success'
                      size='sm'
                      style={{ border: 'none', margin: '0em' }}
                      key={`abcd${item.name}`}
                      onClick={this.selectPackage.bind(this, item.name)}>
                      {this.state.selected.includes(item) ? 'Unselect' : 'Select'}
                    </Button>
                    <Dropdown
                        group
                        title='Options'
                        key={`abc${item._id}`}
                        id={`options-${item._id}`}
                        isOpen={this.state.isOpen[i]}
                        toggle={this.toggleOpen.bind(this, i)}
                        size="sm"
                        style={{
                            margin: '0em'
                        }}>
                        <DropdownToggle
                          key={`zyx${item.name}`}
                          style={{ border: 'none', margin: '0em' }}
                          size="sm"
                          outline
                          caret>
                          Options
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem key={`q${item.name}`} onClick={this.removePackage.bind(this, item, i)}>Remove</DropdownItem>
                          <DropdownItem key={`w${item.name}`}>Move Up</DropdownItem>
                          <DropdownItem key={`e${item.name}`}>Move Down</DropdownItem>
                          <DropdownItem key={`r${item.name}`} divider />
                          <DropdownItem key={`t${item.name}`} href={item.homepage}>Homepage</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
            )
            })
            : null}
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      cart: state.cart
  };
};

export default connect(mapStateToProps, { deleteItem, newItem })(Cart);
