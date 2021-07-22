import React, {useState} from 'react'
import {Image, Grid,Button} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Layout from "./Layout"
import AddReview from "./AddReview"
import web3 from "../Ethereum/web3"
import store from "../Ethereum/OnlineStore"
const BigNumber = require('bignumber.js');



const ProductDetails = props => {

    const onClick = async event => {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        await store.methods.buyProduct(props.id).send({
            from: accounts[0],
            value: web3.utils.toWei(props.price,'ether')
        })
    }

    const [avgReview, setAvgReview] = useState(0)
    const getAvgReview = async () => {
        try {
            const review =  await store.methods.getAvgReview(props.id).call();
            setAvgReview(review);
        } catch (error) {
            console.error(error)
        }
    }
    getAvgReview();
    return (
        
         <Grid style = {{marginTop: '5%', marginBottom: '20%'}}>
    
    <Grid.Column width = {4}>
        <Image src = {`https://ipfs.infura.io/ipfs/${props.photo}`} />
    </Grid.Column>
    <Grid.Column width = {8} >
        <Grid.Row style = {{marginBottom: '5%'}}>
            <h1>{props.title}</h1>
        </Grid.Row>
        <Grid.Row>
            <h3>Description</h3>
            <p>
            {props.description}
            </p>
        </Grid.Row>
    </Grid.Column>
    <Grid.Column width = {3} >
        <h3>Publisher: {props.publisher}</h3>
        <h3>Price: {props.price} ETH</h3>
        <h3>Category: {props.category}</h3>
        <h3>Avg Review: {avgReview}</h3>
        <h3>Quantity: {props.quantity}</h3>
       <Button style = {{marginTop: '5%'}}primary  onClick = {onClick} content = "Buy Product"  />
    </Grid.Column>
</Grid>
    
    
    
   
    )
}

export default ProductDetails