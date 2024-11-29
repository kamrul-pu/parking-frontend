import React from 'react'
import { Form, Button } from 'react-bootstrap'

const Registration = () => {
    return (
        <Form id='register-form' >
            <Form.Group className="mb-3" >
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name='first_name' placeholder="Enter Your First Name" />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name='last_name' placeholder="Enter Your Last Name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="tel" name='phone' placeholder="Enter a valid email address" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="tel" name='phone' placeholder="Enter a valid phone number" />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" name='password2' placeholder="Confirm Password" />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Check type="checkbox" value={true} name='tc' label="I agree to term and condition." />

            </Form.Group>
            <Button variant="primary" type="submit" className='mb-3'>
                Register
            </Button>
        </Form>
    )
}

export default Registration