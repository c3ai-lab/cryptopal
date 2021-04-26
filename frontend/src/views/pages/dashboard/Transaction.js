import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Check } from 'react-feather';
import { history } from '../../../history';

class Transaction extends React.Component {
  render() {
    const send = this.props.type === 'OUT';
    const date = new Date(this.props.date);
    const formatDate = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short'
    }).format;
    const formattedDate = formatDate(date);
    return (
      <Card onClick={() => history.push('/transaction?tx=' + this.props.txId)}>
        <CardBody className="dash-transaction-card">
          <div
            className={
              'dash-transaction-icon ' + (send ? 'bg-info' : 'bg-success')
            }>
            <Check size={20} />
          </div>
          <div className="dash-transaction-info">
            <div className="dash-transaction-title">
              <span className="font-weight-bold mb-0">{this.props.name}</span>
              <span className={send ? '' : 'received-amount'}>
                {(send ? '-' : '+') + this.props.amount + '$'}
              </span>
            </div>

            <small className="text-muted">{formattedDate}</small>
            <p className="font-small-3">{this.props.description}</p>
          </div>
        </CardBody>
      </Card>
    );
  }
}
export default Transaction;
