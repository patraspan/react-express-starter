import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class ContactForm extends Component {
constructor(props) {
  super(props);
  this.state = {
    name: '',
    email:'',
    message:'',
  }
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);

}
handleChange = e => {
  this.setState({ [e.target.name]: e.target.value})
}
async handleSubmit(e) {
  e.preventDefault();
  
  const { name, email, message} = this.state;

  const form = await axios.post('/api/form', {
    name, email, message
  })
}

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="container">
        <FormGroup>
          <Label for="name">Password</Label>
          <Input type="text" name="name" id="name" placeholder="Your name" onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" placeholder="Your email" onChange={this.handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">Text Area</Label>
          <Input type="textarea" name="message" id="exampleText" onChange={this.handleChange} />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default ContactForm;
