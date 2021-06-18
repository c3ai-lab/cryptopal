import React from 'react';
import classnames from 'classnames';
import { history } from '../history';

const FullPageLayout = ({ children }) => {
  return (
    <div
      className={classnames('wrapper bg-full-screen-image dark-layout', {
        'blank-page':
          history.location.pathname !== '/' &&
          history.location.pathname !== '/registered' &&
          history.location.pathname !== '/email-confirmed'
      })}>
      <div className="app-content">
        <div className="content-wrapper">
          <div className="content-body">
            <div className="flexbox-container">
              <main className="main w-100">{children}</main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPageLayout;
