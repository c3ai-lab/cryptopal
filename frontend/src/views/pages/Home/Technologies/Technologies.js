import React from 'react';
import { Card, Row } from 'reactstrap';
import HomeCards from '../HomeCards';
import { data } from './technologiesCardData';

class Technologies extends React.Component {
  render() {
    return (
      <div>
        <Row>
          <Card className="home-heading-card">
            <h3>Take advantage of blockchain technology.</h3>
            <p>
              CryptoPal offers the lowest fees on the market to be the payment
              provider of your business. With an easy to integrate solution we
              offer fast and secure payments all over the world. Start
              integrating CryptoPal today and increase your profits!
            </p>
          </Card>
        </Row>
        <HomeCards data={data} />
      </div>
    );
  }
}
export default Technologies;
