import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Home } from 'react-feather';
import { NavLink } from 'react-router-dom';
class BreadCrumbs extends React.Component {
  render() {
    return (
      <div className="content-header row">
        <div className="content-header-left col-md-9 col-12 mb-2">
          <div className="row breadcrumbs-top">
            <div className="col-12">
              {this.props.breadCrumbTitle ? (
                <h2 className="content-header-title float-left mb-0">
                  {this.props.breadCrumbTitle}
                </h2>
              ) : (
                ''
              )}
              <div className="breadcrumb-wrapper vx-breadcrumbs d-sm-block d-none col-12">
                <Breadcrumb tag="ol">
                  <BreadcrumbItem tag="li">
                    <NavLink to="/dashboard">
                      <Home className="align-top" size={15} />
                    </NavLink>
                  </BreadcrumbItem>
                  {this.props.breadCrumbParent ? (
                    <BreadcrumbItem tag="li" className="text-primary">
                      <NavLink to="/transactions">
                        {this.props.breadCrumbParent}
                      </NavLink>
                    </BreadcrumbItem>
                  ) : (
                    ''
                  )}
                  <BreadcrumbItem tag="li" active>
                    {this.props.breadCrumbActive}
                  </BreadcrumbItem>
                </Breadcrumb>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default BreadCrumbs;
