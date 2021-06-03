// 	File Name: TransactionTimeline.js
// 	Description:
//  This component represents a card on the dashboard with a list of the last three transactions.
//  To display the transactions it renders Transaction.js for every single transaction in the list.
// ================================================================================================
import React from 'react';
import { Button, Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import Transaction from './Transaction';

class TransactionTimeline extends React.Component {
  render() {
    // create Transaction object for every transaction
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
          {/* render transaction components */}
          {transactionList.length !== 0 ? (
            transactionList
          ) : (
            <p>No transactions yet</p>
          )}

          {/* button to show all transactions - links to transactions page */}
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
