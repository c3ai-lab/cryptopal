// ================================================================================================
// 	File Name: ChangeRoleComp.js
// 	Description:
//  This component contains a button to send a change role (from customer to merchant and the other
//  way around) request to the server and shows its feedback.
// ================================================================================================
import React from 'react';
import { Alert, Button } from 'reactstrap';

import { connect } from 'react-redux';
import { changeRole } from '../../../redux/actions/auth/authActions';
import { clearErrors } from '../../../redux/actions/errors/errorActions';

class ChangeRoleComp extends React.Component {
  constructor(props) {
    super(props);
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  // keep track of server feedback
  state = {
    feedback: { type: 'success', msg: null }
  };

  // check for request error
  componentDidUpdate(prevProps) {
    // set error message if exists
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.setState({ feedback: { type: 'danger', msg: error.msg } });
    }
  }

  // call change role route with redux actions and set feedback
  onButtonClick() {
    let message = 'Upgrade successful!';
    if (this.props.userRole === 'merchant') {
      this.props.changeRole(false);
      message = 'Downgrade successful!';
    } else {
      this.props.changeRole(true);
    }
    this.setState({ feedback: { type: 'success', msg: message } });
  }

  // render component with a button to send a request for changing users role and show server feedback
  render() {
    const { feedback } = this.state;
    const userRole = this.props.userRole;
    return (
      <React.Fragment>
        <h4>Change Role</h4>
        <p>You can change your current role by clicking the button below.</p>
        {feedback.msg ? (
          <Alert color={feedback.type}>{feedback.msg}</Alert>
        ) : null}

        <Button.Ripple
          className="mr-50"
          color="primary"
          onClick={this.onButtonClick}>
          {userRole === 'merchant'
            ? 'Downgrade to user'
            : 'Upgrade To Merchant'}
        </Button.Ripple>
      </React.Fragment>
    );
  }
}

// connect with redux
const mapStateToProps = (state) => ({
  userRole: state.auth.userRole
});

export default connect(mapStateToProps, { changeRole, clearErrors })(
  ChangeRoleComp
);
