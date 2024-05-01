import React, {useContext} from "react";
import { Navigate, useLocation } from "react-router-dom";  
import UserContext from "views/Auth/UseContext";

const ProtectedRoute = ({ element, roles }) => {
    // const { user } = useContext(UserContext);
    // const { role } = useContext(UserContext);
    // const location = useLocation();
    
    // if(!role || !roles.includes(user.role) ){
    //     return <Navigate to="/" state={{ from: location }} />;
    // }
    // return element;

    
    const { user } = useContext(UserContext);
    const location = useLocation();
    const { role } = useContext(UserContext);

    if (!user) {
        // Redirect to login page if the user is not authenticated
        return <Navigate to="/" state={{ from: location }} />;
    }

    // Check if the user's role is included in the allowed roles
    const userRole = user.role;
    if (roles) {
        if (role === 'user') {
            return <Navigate to="/user/dashboard" replace />;
        } else if (role === 'admin') {
            return <Navigate to="/admin/dashboard" replace />;
        }
    }

    return element;
    
};

export default ProtectedRoute;
