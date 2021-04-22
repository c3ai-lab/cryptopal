import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { CheckCircle } from 'react-feather';

class GreetingCard extends React.Component {
  render() {
    const tx = this.props.transaction;
    let formattedDate;
    if (tx.date) {
      const date = new Date(tx.date);
      const formatDate = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short'
      }).format;
      formattedDate = formatDate(date);
    }
    return (
      <Card className="bg-greeting text-white greeting-card">
        <CardBody className="text-center">
          <div className="avatar avatar-xl bg-primary shadow avatar-dashboard mt-0">
            <div className="avatar-content">
              <CheckCircle className="text-white" size={28} />
            </div>
          </div>
          <div className="award-info text-center">
            <h1 className="mb-2 text-white">{tx.description}</h1>
            <div className="m-auto mb-2 w-75">
              <span className="mr-4">{formattedDate}</span>
              <span className="ml-4">{tx.value ? tx.value + '$' : ''}</span>
            </div>
            <h3 className="mt-2 text-white">{tx.name}</h3>
          </div>
        </CardBody>
      </Card>
    );
  }
}
export default GreetingCard;
