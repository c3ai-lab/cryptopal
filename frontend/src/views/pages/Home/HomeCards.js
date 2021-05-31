import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';

class HomeCards extends React.Component {
  renderCards = () => {
    const data = this.props.data;
    let result = data.map((item) => {
      return (
        <Col key={item.id}>
          <Card>
            <CardBody className="text-center">
              <img
                src={item.img}
                alt={item.title}
                className="mx-auto mb-2"
                width="180"
              />
              <div className="home-argument-card">
                <h4>{item.title.toUpperCase()}</h4>
                <small className="text-dark">{item.text}</small>
              </div>
            </CardBody>
          </Card>
        </Col>
      );
    });
    return result;
  };
  render() {
    return <Row>{this.renderCards()}</Row>;
  }
}
export default HomeCards;
