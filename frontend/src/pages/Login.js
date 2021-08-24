import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UserContext from '../UserContext';
import * as api from '../services/api';
import DismissableAlertHelper from '../components/DismissableAlertHelper';

export default function Login({isSignup}) {
  const { setUser } = useContext(UserContext);
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setValidated(true);

    const form = event.currentTarget;
    if (!form.checkValidity()) {
      return;
    }

    try {
      if (isSignup) {
        await api.signup(firstName, lastName, email, password);
      }
      const resp = await api.login(email, password);
      const loginToken = resp.token;
      window.sessionStorage.setItem('loginToken', loginToken);
      setUser({loginToken});
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  return (
    <div className='Login'>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <DismissableAlertHelper variant="danger" visible={error} message={error} dismissible />
        {isSignup &&
          <>
            <Form.Group size='lg' controlId='firstName' className='mt-3'>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                autoFocus
                required
                type='input'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">First Name required</Form.Control.Feedback>
            </Form.Group>
            <Form.Group size='lg' controlId='lastName' className='mt-3'>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                type='input'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">First Name required</Form.Control.Feedback>
            </Form.Group>
          </>
        }
        <Form.Group size='lg' controlId='email' className='mt-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus={!isSignup}
            required
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">Invalid Email</Form.Control.Feedback>
        </Form.Group>
        <Form.Group size='lg' controlId='password' className='mt-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">Password required</Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex justify-content-between mt-4">
          <Button type='submit'>
            {isSignup ? 'Sign up' : 'Log in'}
          </Button>
          <Button variant="link" as={Link} to={isSignup ? "/login" : "/signup"} onClick={e => e.target.blur()}>
            {isSignup ? "Log in" : "Sign up"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
