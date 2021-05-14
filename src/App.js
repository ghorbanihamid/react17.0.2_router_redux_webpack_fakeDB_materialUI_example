import React, { useEffect }                from 'react';
import { Route, Switch, Redirect,useParams, useRouteMatch, BrowserRouter } from 'react-router-dom';
import { AuthenticatedRoute }              from './components/AuthenticatedRoute';
import  Layout                             from './components/Layout';
import { Header }                          from './components/Header';
import { history }                         from './helpers/history';
import { Login }                           from './pages/login/Login';
import { Logout }                          from './pages/logout/Logout';
import { About }                           from './pages/about/About';
import { ForgotPassword }                  from './pages/login/ForgotPassword';
import { RegisterNewUser }                 from './pages/user/RegisterNewUser';
import { UsersList }                       from './pages/user/UsersList';
import Dashboard                           from './pages/dashboard/Dashboard';
import                                          './styles/App.css';

function App() {

  return (
      <div className="App">
        <Layout>
          <Switch>
            <Route              exact path="/"                 component={Login} />
            <Route              exact path="/login"            component={Login} />
            <Route              exact path="/logout"           component={Logout} />
            <Route              exact path="/about"            component={About}/>
            <Route              exact path="/newUser"          component={RegisterNewUser} />
            <Route              exact path="/forgotpassword"   component={ForgotPassword} />
            <AuthenticatedRoute exact path="/dashboard"        component={Dashboard} />
            <AuthenticatedRoute exact path="/usersList"        component={UsersList} />
          </Switch>
      </Layout>
      </div>
  );
}
export default App;
