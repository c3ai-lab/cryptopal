import React, { Suspense, lazy } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from './history';
import { connect } from 'react-redux';
import Spinner from './components/@vuexy/spinner/Loading-spinner';
import { ContextLayout } from './utility/context/Layout';

// Route-based code splitting
const Home = lazy(() => import('./views/pages/Home'));
const Page2 = lazy(() => import('./views/pages/Page2'));
const accountSettings = lazy(() =>
  import('./views/pages/account-settings/AccountSettings')
);
const products = lazy(() => import('./views/pages/products/Products'));

// authorization base sites
const login = lazy(() => import('./views/pages/authentication/login/Login'));
const register = lazy(() =>
  import('./views/pages/authentication/register/Register')
);
const registerSuccessful = lazy(() =>
  import('./views/pages/authentication/register/RegisterSuccessful')
);
const emailConfirmed = lazy(() =>
  import('./views/pages/authentication/register/ConfirmationSuccessful')
);
const forgotPassword = lazy(() =>
  import('./views/pages/authentication/ForgotPassword')
);

// error sites
const authorized = lazy(() => import('./views/pages/misc/NotAuthorized'));

// Set Layout and Component Using App Route
const RouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      return (
        <ContextLayout.Consumer>
          {(context) => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === 'horizontal'
                ? context.horizontalLayout
                : context.VerticalLayout;
            return (
              <LayoutTag {...props} permission={props.user}>
                <Suspense fallback={<Spinner />}>
                  <Component {...props} />
                </Suspense>
              </LayoutTag>
            );
          }}
        </ContextLayout.Consumer>
      );
    }}
  />
);
const mapStateToProps = (state) => {
  return {
    user: state.auth.userRole
  };
};

const AppRoute = connect(mapStateToProps)(RouteConfig);

class AppRouter extends React.Component {
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute exact path="/" component={Home} />
          <AppRoute path="/page2" component={Page2} />
          <AppRoute path="/account-settings" component={accountSettings} />
          <AppRoute path="/products" component={products} />
          <AppRoute path="/register" component={register} fullLayout />
          <AppRoute
            path="/registered"
            component={registerSuccessful}
            fullLayout
          />
          <AppRoute
            path="/email-confirmed"
            component={emailConfirmed}
            fullLayout
          />
          <AppRoute
            path="/forgot-password"
            component={forgotPassword}
            fullLayout
          />
          <AppRoute path="/login" component={login} fullLayout />
          <AppRoute
            path="/misc/not-authorized"
            component={authorized}
            fullLayout
          />
        </Switch>
      </Router>
    );
  }
}

export default AppRouter;
