import { useState, useEffect } from "react";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (userInfo){
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            
        } catch (error) {
            
        }
    }

    return(
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email" className="my-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password" className="my-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                     type="password"
                     placeholder="Enter Password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     ></Form.Control>
                </Form.Group>

                <Button type='submit' variant="primary" className="mt-2">
                    Sign In
                </Button> 
            </Form>

            <Row className="py-3">
                <Col>
                    New Customer? <Link to={ redirect ? `/signup?redirect=${redirect}` : '/signup'}>Sign Up</Link>
                </Col>
            </Row>
        </FormContainer>
    )

}

export default Login;