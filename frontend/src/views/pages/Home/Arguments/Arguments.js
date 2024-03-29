// ================================================================================================
// 	File Name: Arguments.js
// 	Description:
//  This is a static component, which renders text elements for the landing page (home). It
//  represents the arguments section showing heading and argument cards for using the service.
// ================================================================================================
import React from 'react';
import { Card, Row } from 'reactstrap';
import HomeCards from '../HomeCards';
import { data } from './argumentsCardData';

class Arguments extends React.Component {
  render() {
    return (
      <div className="home-section">
        <Row>
          <Card className="home-heading-card">
            <h3>
              Increase your profits by lowering payment fees with CryptoPal!
            </h3>
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
export default Arguments;
