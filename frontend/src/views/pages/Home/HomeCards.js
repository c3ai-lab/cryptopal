import React from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import { data } from './cardData';

class HomeCards extends React.Component {
  renderCards = () => {
    let result = data.map((item) => {
      return (
        <Row key={item.id}>
          <Card className="home-card">
            <CardBody className="text-center">
              <img
                src={item.img}
                alt={item.title}
                className="mx-auto mb-2 img-float"
                width="180"
              />
              <div className="prev-text">
                <h4>{item.title.toUpperCase()}</h4>
                <small className="text-dark">{item.text}</small>
              </div>
            </CardBody>
          </Card>
        </Row>
      );
    });
    return result;
  };
  render() {
    return <div>{this.renderCards()}</div>;
  }
}
export default HomeCards;
