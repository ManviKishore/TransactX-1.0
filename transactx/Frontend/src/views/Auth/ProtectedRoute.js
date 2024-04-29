import React, {useContext} from "react";
import { Navigate, useLocation } from "react-router-dom";  
import UserContext from "views/Auth/UseContext";

const ProtectedRoute = ({ element, roles }) => {
    const { user } = useContext(UserContext);
    const location = useLocation();
    // const role = sessionStorage.getItem("role");

    if(!user || !roles.includes(user.role) ){
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return element;
};

export default ProtectedRoute;
