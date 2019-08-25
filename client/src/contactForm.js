import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';
export default class ContactForm extends Component {
    state = {
        name: "",
        email: "",
        messages: ""
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const { name, email, messages } = this.state;
        axios.post('/api/contactform', {
            name,
            email,
            messages
        })
        this.setState({
            name: "",
            email: "",
            messages: ""
        })
    }

    render() {
        return (
            <div className="contact-form">
                <h1> React Contact Form</h1>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name : </Label>
                        <Input
                            type="name"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email : </Label>
                        <Input
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="messages">Messages : </Label>
                        <Input
                            type="textarea"
                            name="messages"
                            value={this.state.messages}
                            onChange={this.handleChange}
                        />
                    </FormGroup>

                    <Button>Submit</Button>
                </Form>
            </div>

        )
    }
}