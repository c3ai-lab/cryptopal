import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Check } from 'react-feather';

class Transaction extends React.Component {
  state = {
    type: 're',
    amount: '45.43',
    name: 'Peter Wackel',
    date: '14.Apr',
    description: 'Here is space for transaction description'
  };
  render() {
    const send = this.state.type === 'send';
    return (
      <Card>
        <CardBody className="dash-transaction-card">
          <div
            className={
              'dash-transaction-icon ' + (send ? 'bg-info' : 'bg-success')
            }>
            <Check size={20} />
          </div>
          <div className="dash-transaction-info">
            <div className="dash-transaction-title">
              <span className="font-weight-bold mb-0">{this.state.name}</span>
              <span className={send ? '' : 'received-amount'}>
                {(send ? '-' : '+') + this.state.amount + '$'}
              </span>
            </div>

            <small className="text-muted">{this.state.date}</small>
            <p className="font-small-3">{this.state.description}</p>
          </div>
        </CardBody>
      </Card>
    );
  }
}
export default Transaction;
