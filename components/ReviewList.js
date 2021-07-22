import React, {useState, Fragment} from 'react';
import store from "../Ethereum/OnlineStore"
import {Feed, Container, Image} from "semantic-ui-react"
import 'semantic-ui-css/semantic.min.css'





const ReviewList = (props) => {

    const [review, setReview] = useState({
    firstName: '',
    lastName: '',
    stars: 0,
    opinion: ''
})

    
   
    
    
    const getReviewDetails = async (product,reviewIndex) => {
        const reviews = await store.methods.getReview(product,reviewIndex).call();
       
        setReview({
            firstName: reviews[0],
            lastName: reviews[1],
            stars: reviews[2],
            opinion: reviews[3]
        })
        
       
    }
   
    getReviewDetails(props.productID,props.reviewID);
    
    

    return (
        <div style = {{ marginBottom: '2%' }} >
           
        <Feed.Event>
        <Feed.Label >
        <Image size = "mini" verticalAlign = "middle"  circular src = "https://ipfs.infura.io/ipfs/QmVgkmwGifpCJadXTwNeqnmMHa3EUNFwHtmMqep45dhqg8" />
        <span>
            {" " + review.firstName} {' ' + review.lastName}: {review.stars} stars
          </span>
        </Feed.Label>
        
        
        <Feed.Content style = {{marginLeft: '3.5%'}}>
         
          <Feed.Extra text>
            {review.opinion}
          </Feed.Extra>
        </Feed.Content>
      </Feed.Event>
        </div>
    )

   
        
         
    
}


export default ReviewList