import React from 'react';
import { Row, Col, Spinner } from 'reactstrap';
import GreetingCard from './GreetingCard';
import SendCard from './SendCard';
import DetailsCard from './DetailsCard';
import '../../../assets/scss/pages/dashboard.scss';
import TransactionTimeline from './TransactionTimeline';
import { connect } from 'react-redux';
import { getWalletData } from '../../../redux/actions/wallet/walletActions';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.checkForNewData = this.checkForNewData.bind(this);
  }

  activeComponent = true;

  componentDidMount() {
    this.activeComponent = true;
    this.checkForNewData();
  }

  componentWillUnmount() {
    this.activeComponent = false;
  }

  checkForNewData() {
    if (this.activeComponent) {
      this.props.getWalletData();
      setTimeout(this.checkForNewData, 5000);
    }
  }

  render() {
    if (this.props.wallet.address !== '0x00') {
      return (
        <React.Fragment>
          <h1 className="mb-2 ml-5">
            Welcome back {this.props.user.given_name}!
          </h1>
          <Row>
            <Col lg="7" md="12">
              <GreetingCard
                transaction={
                  this.props.wallet.transactions.length !== 0
                    ? this.props.wallet.transactions[0]
                    : {
                        description: 'Here occurs your last transaction'
                      }
                }
              />
              <DetailsCard balance={this.props.wallet.balance} />
            </Col>
            <Col lg="5" md="12">
              <SendCard contacts={this.props.wallet.contacts} />
              <TransactionTimeline
                transactions={this.props.wallet.transactions}
              />
            </Col>
          </Row>
        </React.Fragment>
      );
    } else {
      return (
        <div className="spinner-container">
          <Spinner color="primary" size="lg" />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  wallet: state.wallet
});

export default connect(mapStateToProps, { getWalletData })(Dashboard);
