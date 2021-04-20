import { Button } from 'reactstrap';
import React from 'react';
import { Card, CardBody } from 'reactstrap';

class DetailsCard extends React.Component {
  render() {
    return (
      <Card className="details-card">
        <CardBody>
          <h2>CryptoPal Balance:</h2>
          <div className="balance text-center">
            <h1>{this.props.balance} $</h1>
            <p>available</p>

            <div className="d-inline-block mr-1 mb-1">
              <Button.Ripple color="primary" outline>
                Get Balance
              </Button.Ripple>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}
export default DetailsCard;
