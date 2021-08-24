import React, {useContext, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import UserContext from '../UserContext';
import * as api from '../services/api';
import DismissableAlertHelper from '../components/DismissableAlertHelper';

export default function Home() {
  const { user } = useContext(UserContext);
  const [address, setAddress] = useState('');
  const [chain, setChain] = useState('');
  const [delegationInfo, setDelegationInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function validateForm() {
    return address.length > 0 && chain.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setDelegationInfo(null);

    try {
      const info = await api.check(chain, address, user.loginToken);
      console.log(info);
      setDelegationInfo(info);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
    
    setLoading(false);
  }

  return (
    <Container>
      <Form className="mt-5 mb-3" onSubmit={handleSubmit}>
        <DismissableAlertHelper variant="danger" visible={error} message={error} dismissible />
        <Row>
          <Col sm={9}>
            <Form.Control
              autoFocus
              required
              type='input'
              placeholder='Type your address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Col>
          <Col sm={2}>
            <Form.Select
              value={chain}
              onChange={(e) => setChain(e.target.value)}
            >
              <option>Select chain</option>
              <option value="solana">Solana</option>
              <option value="polygon">Polygon</option>
            </Form.Select>
          </Col>
          <Col sm={1}>
            <Button type='submit' disabled={!validateForm()}>Check</Button>
          </Col>
        </Row>
      </Form>
      {loading ?
        <p>Loading...</p>
      : delegationInfo &&
        <Card>
          <Card.Header>
            <h5>Stake Delegation</h5>
          </Card.Header>
          <Card.Body>
            <Table>
              <tr>
                <td>Validator</td>
                <td className='float-end'>
                  <a href={delegationInfo.voter} target='_blank' rel='noreferrer' className='p-0'>{delegationInfo.voter}</a>
                </td>
              </tr>
              <tr>
                <td>Stake</td>
                <td className='float-end'>
                  {delegationInfo.stake}
                </td>
              </tr>
            </Table>
          </Card.Body>
        </Card>
      }
    </Container>
  );
}
