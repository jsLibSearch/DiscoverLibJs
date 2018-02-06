import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownDropdown, DropdownItem, DropdownMenu } from 'reactstrap';
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
        isOpen: []
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
    console.log(this.props);
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
