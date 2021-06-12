// ================================================================================================
// 	File Name: Technologies.js
// 	Description:
//  This is a static component, which renders text elements for the landing page (home). It
//  represents the technologies section showing heading and technology cards describing the service.
// ================================================================================================
import React from 'react';
import { Card, Row } from 'reactstrap';
import HomeCards from '../HomeCards';
import { data } from './technologiesCardData';

class Technologies extends React.Component {
  render() {
    return (
      <div className="tech-section">
        <Row>
          <Card className="home-heading-card tech-section">
            <h3>Take advantage of blockchain technology.</h3>
            <p>
              CryptoPal is a payment provider fully build on blockchain
              technology. It provides an easy to use gateway to cryptocurrency
              for customers and merchants. The service relies on xDai, a stable
              coin which is directly bound to the USD to ensure secure and
              stable instant payments.
            </p>
          </Card>
        </Row>
        <HomeCards data={data} rows />
      </div>
    );
  }
}
export default Technologies;
