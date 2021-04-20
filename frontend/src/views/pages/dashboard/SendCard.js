import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Send } from 'react-feather';
import Avatar from '../../../components/@vuexy/avatar/AvatarComponent';

class SendCard extends React.Component {
  render() {
    return (
      <Card className="send-card">
        <CardBody className="text-center">
          <div className="send-button">
            <div className="avatar bg-primary shadow avatar-dashboard mt-0">
              <div className="avatar-content">
                <Send className="text-white" size={28} />
              </div>
            </div>
            <h5>Send</h5>
          </div>
          <div className="text-center">
            <h3 className="mb-2">Send again</h3>
            <div>
              <Avatar className="mr-1" content="LR" />
              <Avatar className="mr-1" content="PW" />
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}
export default SendCard;
