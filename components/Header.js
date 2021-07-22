import React, {Component} from 'react'
import { Menu } from 'semantic-ui-react'
import Link from 'next/link'
import 'semantic-ui-css/semantic.min.css'
import web3 from "../Ethereum/web3"
class Header extends Component {
    async componentDidMount() {
        const accounts = await ethereum.request({method: 'eth_requestAccounts'});
        this.setState({address: accounts[0]})
    }
    constructor(props) {
        super(props);
        this.state = {
            address: ''
        }
    }

 
   
    
    render() {
        
        return (
            <Menu>
                <Menu.Item header >Online Store</Menu.Item>
                <Link href = "/">
                <a style = {{textDecoration: 'none'}}><Menu.Item name = "Home"/> </a>
                
                </Link>
              
                <Menu.Item name = "About Store" />
                <Link href = "createProduct">
                    <a  style = {{textDecoration: 'none'}} href=""><Menu.Item name = "Create Product" /></a>
                </Link>
                
                <Menu.Menu position = "right">
                   <Menu.Item>
                       {this.state.address}
                   </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
        }
}

export default Header;