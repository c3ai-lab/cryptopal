import React from 'react';
import { Row, Col } from 'reactstrap';
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
  componentDidMount() {
    this.checkForNewData();
  }

  checkForNewData() {
    this.props.getWalletData();
    setTimeout(this.checkForNewData, 5000);
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="mb-2 ml-5">
          Welcome back {this.props.user.given_name}!
        </h1>
        <Row className="ml-4 mr-4">
          <Col lg="7" md="12">
            <GreetingCard />
            <DetailsCard balance={this.props.wallet.balance} />
          </Col>
          <Col lg="5" md="12">
            <SendCard />
            <TransactionTimeline />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  wallet: state.wallet
});

export default connect(mapStateToProps, { getWalletData })(Dashboard);
