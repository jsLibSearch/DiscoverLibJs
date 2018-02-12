import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownDropdown, DropdownItem, DropdownMenu, 
  Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { deleteItem, newItem } from '../actions';
import '../App.css';
import { customColors as c } from '../custom/colors.js';
const axios = require('axios');

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
        windowHeight: window.innerHeight - 40,
        cart: [],
        npmString: '',
        yarnString: '',
        isOpen: [],
        modal: false,
        filename: '',
        description: '',
        private: false,
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

  onCreateRepoClick() {
    const [ repo_name, description, _private, accessToken ] = 
      [ this.state.filename, this.state.description, this.state.private, this.props.user.accessToken ];

    axios
      .post(`http://localhost:5000/create-repo`, { repo_name, description, _private, accessToken })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        })


    this.setState({
      modal: !this.state.modal
    });
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
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

  render() {
    return (
      <div ref='theCart' className='Package PackDiv'>
        <h1 className='PackTitle'>You have {this.state.cart.length} {this.state.cart.length === 1 ? 'package' : 'packages'} in your project</h1>
        <div className='CartDiv'>
            {this.state.cart ?
            this.state.cart.map((item, i) => {
            return (
                <div className='PackCart' key={item._id}>
                <h1 className='PackDesc' key={item.name}>{item.name}</h1>
                <Dropdown
                    group
                    title='Options'
                    key={item._id}
                    id={`options-${item._id}`}
                    isOpen={this.state.isOpen[i]}
                    toggle={this.toggleOpen.bind(this, i)}
                    size="sm"
                    style={{
                        margin: '-.4em 0em 0em 0em'
                    }}
                >
                    <DropdownToggle outline caret>Options</DropdownToggle>
                    <DropdownMenu>
                    <DropdownItem onClick={this.removePackage.bind(this, item, i)}>Remove</DropdownItem>
                    <DropdownItem>Move Up</DropdownItem>
                    <DropdownItem>Move Down</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem href={item.homepage}>Homepage</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                </div>
            )
            })
            : null}
        </div>
        <Button color="secondary" onClick={() => this.toggleModal() }> Create A Repo </Button>
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
              <FormGroup check >
              <Label check >
                <Input type="checkbox" id="checkbox" onClick={() => this.onCheckBoxClick()} />{' '}
                Private?
              </Label>
            </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.onCreateRepoClick()}>Sumbit</Button>
            <Button color="secondary" onClick={() => this.toggleModal()}>Cancel</Button>
          </ModalFooter>
        </Modal> 
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      cart: state.cart,
      user: state.accessToken,
  };
};

export default connect(mapStateToProps, { deleteItem, newItem })(Cart);
