import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({component, ...props}) {
    return (
        <Route>
            {props.loggedIn ? component : <Redirect to={"/signup"} />}
        </Route>
    )
}

export default ProtectedRoute;