import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { CheckCircle } from 'react-feather';

class GreetingCard extends React.Component {
  render() {
    return (
      <Card className="bg-greeting text-white greeting-card">
        <CardBody className="text-center">
          <div className="avatar avatar-xl bg-primary shadow avatar-dashboard mt-0">
            <div className="avatar-content">
              <CheckCircle className="text-white" size={28} />
            </div>
          </div>
          <div className="award-info text-center">
            <h1 className="mb-2 text-white">Description</h1>
            <p className="m-auto mb-0 w-75">name</p>
            <p className="m-auto mb-0 w-75">value</p>
            <p className="m-auto mb-0 w-75">date</p>
          </div>
        </CardBody>
      </Card>
    );
  }
}
export default GreetingCard;
