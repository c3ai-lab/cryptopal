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
  state = {
    feedback: { type: 'success', msg: null }
  };

  componentDidMount() {
    console.log(this.props);
  }

  // check for request error
  componentDidUpdate(prevProps) {
    // set error message if exists
    const { error } = this.props;
    if (error !== prevProps.error) {
      this.setState({ feedback: { type: 'danger', msg: error.msg } });
    }
  }

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
const mapStateToProps = (state) => ({
  userRole: state.auth.userRole
});

export default connect(mapStateToProps, { changeRole, clearErrors })(
  ChangeRoleComp
);
