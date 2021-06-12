// ================================================================================================
// 	File Name: Products.js
// 	Description:
//  This view shows the products page. It renders a table with all loaded products and related
//  actions on products. All configurations of the table are set in DataListConfig.js.
// ================================================================================================
import React from 'react';
import { Row, Col } from 'reactstrap';
import Breadcrumbs from '../../../components/@vuexy/breadCrumbs/BreadCrumb';
import ThumbViewConfig from './DataListConfig';
import queryString from 'query-string';
class ThumbView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs breadCrumbTitle="Products" breadCrumbActive="Products" />
        <Row>
          <Col sm="12">
            <ThumbViewConfig
              thumbView={true}
              parsedFilter={queryString.parse(this.props.location.search)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default ThumbView;
