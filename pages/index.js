import React, {Component} from "react";
import web3 from "../Ethereum/web3"
import store from "../Ethereum/OnlineStore"
import Layout from "../components/Layout"
import { Card, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Product from "../components/Product"
class ListProducts extends Component {
     static async getInitialProps() {
        const productLength = await store.methods.storeProductsLength().call();
        let product;
        let products = [];
        for(let i = 0; i < productLength; i++ ) {
            product = await store.methods.storeProducts(i).call();
            products.push(product);
        }
        return{products} 
    }

    constructor(props) {
        super(props);
        this.state  = {
            products: {}
        }
    }

    render() {
        return (
                <Layout>
               
                    <Card.Group>
                    {
                    this.props.products.map(element => {
                    return <Product 
                       photo = { element.photo}
                       name = {element.name}
                       review = {'Average Review: ' + element.avgReview}
                       //So the length of the description does go on for to long
                       //Where long it causes all the cards to get also longer
                       //so if its description is longer than 35char(which it should be) we only select the first 35 and add a ...
                       //to indicate that the description isnt over
                       descripion = {element.descripion.length > 35 ? element.descripion.substring(0,35) + '...': element.descripion}
                       category = {element.category}
                       price = {web3.utils.fromWei(element.price,'ether') + ' ETH'}
                       productID = {element.productID}
                   />
                    })
                }
                    </Card.Group>
             
              
                   
                </Layout>
                    
           )
        
    }

  
}

export default ListProducts