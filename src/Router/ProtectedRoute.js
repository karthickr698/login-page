import React from "react";
import { Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    return isAuthenticated ? (
        <Component {...rest} />
    ) : (
            <Redirect to="/login" />
        );
};

export default ProtectedRoute;