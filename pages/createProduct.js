import React, {Component} from 'react'
const create  = require('ipfs-http-client')
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
import web3 from "../Ethereum/web3"
import store from "../Ethereum/OnlineStore"
import {Form, Button,TextArea,Label} from 'semantic-ui-react'
import Layout from "../components/Layout"
import 'semantic-ui-css/semantic.min.css'


/*
     struct Product {
        uint productID;
        address payable publisher;
        string name;
        string descripion;
        string category;
        uint price;
        uint avgReview;
        bool isSold;
        uint quantity;
        mapping (uint => address) Buyers;
        uint buyerCount;
        mapping (address => bool) isBuyer;
        mapping (uint => Reviews) allReviews;
        uint reviewCount;
    }
*/

class CreateProduct extends Component {


    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            name: '',
            description: '',
            quantity: 0,
            price: 0,
            category: '',
            errorMessage: '',
            buffer: null,
            photoHash: ''
            
        }
    }

    captureFile = event => {
        event.stopPropagation();
        event.preventDefault();
        const file = event.target.files[0];
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
          this.setState({buffer: Buffer(reader.result)})
         
        }
      }

    onSubmit = async event  => {
        event.preventDefault()
        const result = await ipfs.add(this.state.buffer);
        this.setState({photoHash: result.path});
        this.setState({loading: true})
        try {
            const accounts = await web3.eth.getAccounts();
            //createProduct(string memory name, string memory descripion, string memory category, uint price, uint quantity)
            await store.methods
            .createProduct(this.state.name,this.state.description,this.state.category,this.state.price,this.state.quantity,this.state.photoHash)
            .send({
                from: accounts[0]
            });

        } catch (error) {
            this.setState({errorMessage: error.message})
        }
        this.setState({loading: false});
    }

    render() {
        return (
            <Layout>
            <h3>Create a Product</h3>
                 <Form  loading = {this.state.loading} onSubmit = {this.onSubmit} >
                     <Form.Group>
                         <Form.Input label = "Product Name" 
                         placeholder = "Name" 
                         width = {5} 
                         onChange =  {event => this.setState({name: event.target.value})}
                         />
                         <Form.Input label = "Category" 
                         placeholder = "Book" 
                         width = {5} 
                         onChange = {event => this.setState({category: event.target.value})}
                         />
                     </Form.Group>
                     <Form.Group> 
                        <Form.Field
                            id='form-textarea-control-opinion'
                             control={TextArea}
                             label='Product Description'
                             placeholder='Description' 
                                 width  = {10}
                            onChange = {event => this.setState({description: event.target.value})}
                             />
                     </Form.Group>
                     <Form.Group>
                        <Form.Input label = "Price in wei" 
                        placeholder = "100000000" 
                        width = {4} 
                        onChange = {event => this.setState({price : event.target.value})}
                        />
                        <Form.Input label = "Quantity" 
                        placeholder = '0' 
                        width = {3} 
                        onChange = {event => this.setState({quantity: event.target.value})}
                        />
                        <div>
                            <label htmlFor="file" style ={{marginLeft: '12%', fontWeight: 'bold'}} >Chose Image</label>
                            <input type="file" name="file" id="file" style ={{border: '0'}} onChange = {this.captureFile}/>
                        </div>
                     </Form.Group>
                     
                     <Button content = "Create Product" primary  />
                 </Form>
            </Layout>
           
        )
    }
}


export default CreateProduct