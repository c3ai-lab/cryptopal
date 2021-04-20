import React from 'react';
import { Button, Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import Transaction from './Transaction';

class TransactionTimeline extends React.Component {
  render() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Latest Transactions</CardTitle>
        </CardHeader>
        <CardBody>
          <Transaction />
          <Transaction />
          <Transaction />
          <div className="d-inline-block mr-1 mb-1 dash-tansacton-button">
            <Button.Ripple color="flat-primary">
              See all transactions
            </Button.Ripple>
          </div>
        </CardBody>
      </Card>
    );
  }
}
export default TransactionTimeline;
