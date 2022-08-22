import { useState } from 'react';
import { Row, Col, Tab, Tabs, Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import Gable from './components/Gable/Gable';
import Monopitch from './components/Monopitch/Monopitch';
import Uniform from './components/Uniform/Uniform';

/* 
  A simple react app for estimating the number of conventional hay bales you can
  fit in a shed.
*/
function App() {

  const [result, setResult] = useState<number>(-1);

  return (
    <div className="App">
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>Hay Bale Storage Calculator</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row className="justify-content-md-center">
          <Col sm={4}><br />            
            <h6>Easily estimate the number of conventional hay bales (90cm x 45cm x 35cm) you can fit in a shed.</h6><br />
            <Card>
              {result < 0
                ?
                <Card.Body>
                  <Card.Title>
                    Your shed is a bit small...
                  </Card.Title>
                  Enter your shed dimensions
                </Card.Body>
                :
                <Card.Body>
                  <Card.Title>
                    Your shed fits around {result} bales.
                  </Card.Title>
                  Assuming you stack them nicely...
                </Card.Body>
              }
            </Card>
          </Col>
          <Col sm={5}><br />
            <Tabs defaultActiveKey="uniform" id="space-selector-tabs" unmountOnExit>
              <Tab eventKey="uniform" title="Uniform" className='Tabs-bdr'>
                <Uniform callback={setResult} />
              </Tab>
              <Tab eventKey="monopitch" title="Monopitch Roof" className='Tabs-bdr' unmountOnExit>
                <Monopitch callback={setResult}/>
              </Tab>
              <Tab eventKey="gable" title="Gable Roof" className='Tabs-bdr' unmountOnExit>
                <Gable callback={setResult} />
              </Tab>

            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
