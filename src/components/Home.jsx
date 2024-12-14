import React,{useState} from 'react';
import { Container, Row, Col, Button, Form, FormControl, Card } from 'react-bootstrap';
import { FaSearch, FaMapMarkerAlt, FaRegCreditCard, FaCar } from 'react-icons/fa';

function Home() {
  const [searchLocation, setSearchLocation] = useState('');

  const handleSearchChange = (e) => {
    setSearchLocation(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Placeholder for search functionality
    console.log('Searching for parking near:', searchLocation);
  };
  return (
    <div className="container mt-5">
      <section className="hero text-white text-center py-5" style={{ background: 'linear-gradient(to right, #6a11cb, #2575fc)' }}>
        <Container>
          <h1 className="display-4 font-weight-bold">Find Parking Fast and Easy</h1>
          <p className="lead">Get real-time information on available parking spots near you in just a few clicks.</p>
          <Form onSubmit={handleSearchSubmit} className="d-flex justify-content-center mt-4">
            <FormControl
              type="text"
              placeholder="Enter your location"
              value={searchLocation}
              onChange={handleSearchChange}
              className="mr-2"
              style={{ width: '50%' }}
            />
            <Button variant="light" type="submit">
              <FaSearch /> Find Parking
            </Button>
          </Form>
        </Container>
      </section>

      {/* Features Section */}
      <section className="features py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4">Why Choose ParkFinder?</h2>
          <Row className="text-center">
            <Col md={4}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <FaMapMarkerAlt size={40} className="text-primary mb-3" />
                  <Card.Title>Location-based Search</Card.Title>
                  <Card.Text>Find available parking near your location in seconds.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <FaRegCreditCard size={40} className="text-primary mb-3" />
                  <Card.Title>Seamless Payments</Card.Title>
                  <Card.Text>Pay for parking directly from the app with secure transactions.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <FaCar size={40} className="text-primary mb-3" />
                  <Card.Title>Parking for Every Type</Card.Title>
                  <Card.Text>Whether it's street parking or garages, we've got you covered.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}

export default Home;
