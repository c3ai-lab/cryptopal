import React from 'react';
import { Button, Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import Transaction from './Transaction';

class TransactionTimeline extends React.Component {
  render() {
    const transactions = this.props.transactions;
    const transactionList = [];
    for (let i = 0; i < transactions.length; i++) {
      const tx = transactions[i];
      transactionList.push(
        <Transaction
          key={tx.id}
          txId={tx.id}
          type={tx.type}
          amount={tx.value}
          name={tx.name}
          date={tx.date}
          description={tx.description}
        />
      );
    }
    return (
      <Card>
        <CardHeader>
          <CardTitle>Latest Transactions</CardTitle>
        </CardHeader>
        <CardBody>
          {transactionList.length !== 0 ? (
            transactionList
          ) : (
            <p>No transactions yet</p>
          )}
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
