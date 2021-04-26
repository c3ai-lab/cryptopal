import React from 'react';
import { Row, Col } from 'reactstrap';
import Breadcrumbs from '../../../../components/@vuexy/breadCrumbs/BreadCrumb';
import ThumbViewConfig from './DataListConfig';
class Transactions extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Transactions"
          breadCrumbActive="Transactions"
        />
        <Row>
          <Col sm="12">
            <ThumbViewConfig />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default Transactions;
