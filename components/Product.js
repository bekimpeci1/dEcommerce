import React from 'react'
import {Card,Image,Icon} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link'
const Product = props => {
    return (
        
        <Card >
            <Link href = {`/product/${props.productID}`}>
            <a>
            <Image src = {"https://ipfs.infura.io/ipfs/" + props.photo} size = "small" style = {{width:'100%',height: '40vh'}} rounded   />
            </a>
            </Link>
             
            <Card.Content  >
                <Card.Header>{props.name}</Card.Header>
                <Card.Meta>Price: {props.price}</Card.Meta>
                <Card.Meta>{props.review}</Card.Meta>
                <Card.Description>{props.descripion}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a href="">
                    <Icon name = {props.category.toLowerCase()} />
                     {props.category}
                </a>
            </Card.Content>
            </Card> 
    )
}
export default Product