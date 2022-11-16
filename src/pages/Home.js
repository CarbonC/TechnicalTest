import React from 'react';
import BandsList from '../components/BandsList';
import Container from 'react-bootstrap/Container';

const Home = () => {
  return (
    <Container>
      <div>
        <h1 className="text-center">Metal Bands</h1>
        <BandsList />
      </div>
    </Container>
  );
};

export default Home;