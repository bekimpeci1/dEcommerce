import React, {Component} from "react"
import web3 from "../../Ethereum/web3"
import Layout from "../../components/Layout"
import 'semantic-ui-css/semantic.min.css'
import store from "../../Ethereum/OnlineStore"
import ProductDetails from "../../components/DisplayProduct" 
import AddReview from "../../components/AddReview"  
import ReviewList from "../../components/ReviewList" 
class StoreProduct extends Component{
     static async getInitialProps(props) {
        const id = props.query.id;
        const product = await store.methods.storeProducts(id).call();
        return {product}
    }

    pushReviews() {
        let review = []
        for(let i = 0; i < this.props.product.reviewCount; i++) {
           this.state.reviews.push(i);
        }
    }
    constructor() {
        super();
        this.state = {
            reviews: []
        }
    }
    

    render() {
        
        
        {this.pushReviews()}
        return (
            <Layout>
           <ProductDetails 
               photo = {this.props.product.photo}
               title = {this.props.product.name}
               description = {this.props.product.descripion}
               publisher = {this.props.product.publisher}
               price = {web3.utils.fromWei(this.props.product.price,'ether')}
               category = {this.props.product.category}
               quantity = {this.props.product.quantity}
               review = {this.props.product.avgReview}
               id = {this.props.product.productID}
           /> 
            <h3 style = {{textAlign: 'center'}}>Reviews from other Buyers</h3>
           {
               this.state.reviews.map(element => {
                    return <ReviewList productID = {this.props.product.productID} reviewID = {element} /> 
               })
           }
            
            
            <AddReview id = {this.props.product.productID}  />
           
          
           </Layout>
           
        )
    }
}

export default StoreProduct