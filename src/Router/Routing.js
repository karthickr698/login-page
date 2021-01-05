import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

import Login from '../Components/auth/Login';
import Register from '../Components/auth/Register';
import Home from '../Components/common/Home';
import ProtectedRoute from "./ProtectedRoute";

function Routes(props) {
    const { isAuthenticated } = props
    console.log(isAuthenticated)

    return (
        <div>
            {isAuthenticated ? <Redirect to="/" /> : null}
            <Switch>
                <ProtectedRoute
                    exact
                    path="/"
                    isAuthenticated={isAuthenticated}
                    component={Home}
                />
                <Route path="/login" component={Login} />
                {/* <Route path="/password-reset" component={FrogetPassword} /> */}
                <Route path="/register" component={Register} />
                <Route render={() => <h3>404 Not Found</h3>} />
            </Switch>
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Routes);