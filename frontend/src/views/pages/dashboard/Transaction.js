// ================================================================================================
// 	File Name: Transaction.js
// 	Description:
//  This component represents a single transaction in the list of transactions on the dashboard.
//  A single transactions shows the sender/receivers name, the amount with different colors for
//  incomming and outgoing transactions, the date and the transactions description. Due to the
//  colering, the user can see if the transaction was in- or outgoing.
// ================================================================================================
import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Check } from 'react-feather';
import { history } from '../../../history';

class Transaction extends React.Component {
  render() {
    // format the date from timestamp to dd. Month format
    const send = this.props.type === 'OUT';
    const date = new Date(this.props.date);
    const formatDate = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short'
    }).format;
    const formattedDate = formatDate(date);

    // render single transaction information
    return (
      <Card onClick={() => history.push('/transaction?tx=' + this.props.txId)}>
        <CardBody className="dash-transaction-card">
          {/* icon with color of transaction type */}
          <div
            className={
              'dash-transaction-icon ' + (send ? 'bg-info' : 'bg-success')
            }>
            <Check size={20} />
          </div>

          {/* send amount of transaction */}
          <div className="dash-transaction-info">
            <div className="dash-transaction-title">
              <span className="font-weight-bold mb-0">{this.props.name}</span>
              <span className={send ? '' : 'received-amount'}>
                {(send ? '-' : '+') + this.props.amount + '$'}
              </span>
            </div>

            {/* date and description of transaction */}
            <small className="text-muted">{formattedDate}</small>
            <p className="font-small-3">{this.props.description}</p>
          </div>
        </CardBody>
      </Card>
    );
  }
}
export default Transaction;
