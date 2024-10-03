import React, { useEffect, useState } from 'react';

import {
   Table,
   Spin, 
   Typography, 
   Dropdown, 
   Menu, 
   Modal, 
   Input 
} 
from 'antd';

const { Title } = Typography;
const { Search } = Input;

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayType, setDisplayType] = useState('name');
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  const filteredData = data.filter(user => {
    const value = displayType === 'name' ? user.name : user.email;
    return value.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return <Spin size="large" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const columns = [
    {
      title: displayType === 'name' ? 'Name' : 'Email',
      dataIndex: displayType === 'name' ? 'name' : 'email',
      key: displayType === 'name' ? 'name' : 'email',
      render: (text, record) => (
        <a onClick={() => handleUserClick(record)}>{text}</a>
      ),
    },
  ];

  const menu = (
    <Menu>

      <Menu.Item 
        key="name"
        onClick={() => {
          setDisplayType('name');
          setSearchTerm(''); 
        }}
        style={{ fontWeight: displayType === 'name' ? 'bold' : 'normal' }}>
        Name
      </Menu.Item>

      <Menu.Item 
        key="email" 
        onClick={() => {
          setDisplayType('email');
          setSearchTerm(''); 
        }}>
        Email
      </Menu.Item>

    </Menu>
  );

  return (

    <div style={{ padding: '20px' }}>

      <Title level={2}>
      User List
      </Title>

      <Dropdown overlay={menu} trigger={['click']}>

        <a onClick={e => e.preventDefault()}
          style={{ marginBottom: '20px', display: 'block' , color: '#722ed1'}}>
          Select 
        </a>

      </Dropdown>

      <Search
        placeholder="Search..."
        onSearch={value => setSearchTerm(value)}
        style={{ marginBottom: '20px' }}
      />

      <Table dataSource={filteredData} columns={columns} rowKey="id" />

      <Modal
        title="User Details"
        visible={!!selectedUser}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedUser && (
          <div>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Body:</strong> {selectedUser.body}</p>
            <p><strong>Post ID:</strong> {selectedUser.postId}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DataFetcher;


import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from "../slices/authSlice";
import { toast } from 'react-toastify';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo){
      navigate(redirect);
    }

  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
        const res = await login({ email, password}).unwrap();
        dispatch(setCredentials({...res, }));
        navigate(redirect);
    } catch (err) {
       toast.error(err?.data?.message || err.error); 
    }
  }

  return(
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className="my-3">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
        type='email'
        placeholder='Enter email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className="my-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
        type='password'
        placeholder='Enter password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
        </Form.Group>

        <Button type='submit' variant="primary" className="mt-2" disabled={ isLoading }>
            Sign In
        </Button>

        { isLoading && <Loader />}

        </Form>
        <Row className="py-3">
            <Col>
            New Customer? <Link to={ redirect ? `/register?redirect=${redirect}`: '/register' } >Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen;