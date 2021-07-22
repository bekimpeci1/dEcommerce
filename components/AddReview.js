import React, {useState} from 'react'
import {Form, Input, TextArea, Button, Rating, Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import store from "../Ethereum/OnlineStore"
import web3 from "../Ethereum/web3"
import {
  useParams
} from "react-router-dom";
const AddReview = props => {

    //    function addReview(uint index, string memory firstName, string memory lastName, string memory opinion, uint8 stars) public  checkIfBuyer(index){
       const [firstName, setFirstName] = useState('');
       const [lastName, setLastName] = useState('');
       const [opinion, setOpinion] = useState('');
       const [stars, setStars] = useState(0);
      
     
      const AddRating = (e,{rating})  =>{
        setStars(rating);
       
      }

      const onSubmit = async event => {
        event.preventDefault();
        let accounts = await web3.eth.getAccounts();
        await store.methods.addReview(props.id,firstName,lastName,opinion,stars)
        .send({
          from: accounts[0]
        })

      }
   
        return (
          <>
          <h3 style = {{textAlign: 'center', marginBottom: '3%'}} >Add Review</h3>
            <Form onSubmit = {onSubmit} >
           
            <Form.Group widths='equal'>
          <Form.Field
            id='form-input-control-first-name'
            control={Input}
            label='First name'
            placeholder='First name'
            onChange = {e => setFirstName(e.target.value)}
           
          />
          <Form.Field
            id='form-input-control-last-name'
            control={Input}
            label='Last name'
            placeholder='Last name'
            onChange = {e => setLastName(e.target.value)}
            
          />
          <Form.Field>
          <div style = {{fontWeight: 'bold', marginBottom: '2%', marginTop:'1%'}}>Rating</div>
          <Rating maxRating={5} clearable
          onRate = {AddRating }
            
                />
          </Form.Field>
        </Form.Group>
        <Form.Field
          id='form-textarea-control-opinion'
          control={TextArea}
          label='Opinion'
          placeholder='Opinion'
          onChange = {e => setOpinion(e.target.value)}
         
        />
        
        
        <Button primary content = "Confirm"/>
       
        </Form>
        </>
        )
    }




export default AddReview