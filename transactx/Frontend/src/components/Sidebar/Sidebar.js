/*!

=========================================================
* Now UI Dashboard React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React, { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import UserContext from "views/Auth/UseContext";


var ps;

function Sidebar(props) {
  const sidebar = React.useRef();
  const location = useLocation();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  
  const { user, role } = useContext(UserContext);
  const user_ = sessionStorage.getItem('user');
  // console.log(user_);
  const myRole = sessionStorage.getItem('role');
  // console.log(myRole);
  //useContext to logout user
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
      logout();
      // navigate('/');
   };

  return (
    <div className="sidebar" data-color={props.backgroundColor}>
      <div className="logo">
        <a
          href=""
          className="simple-text logo-mini"
          target="_blank"
        >

        </a>
        <a
          href=""
          className="simple-text logo-normal"
          target="_blank"
        >
          TransactX
        </a>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            if (prop.redirect) return null;
            return (
              <li
                className={
                  activeRoute(prop.layout + prop.path) +
                  (prop.pro ? " active active-pro" : "")
                }
                key={key}
              >
                <NavLink to={prop.layout + prop.path} className="nav-link">
                  <i className={"now-ui-icons " + prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            );
          })}
          
          {/* {user && (
            <div>
            <li className="active-pro">
              <NavLink to="" className="nav-link" >
                <i className="now-ui-icons users_single-02" />
                <p>{user}</p>
              </NavLink>
            </li>
            </div>
          )} */}


          <li className="active-pro">
          {user && (
          <NavLink to="" className="nav-link" >
                <i className="now-ui-icons users_single-02" />
                <p>{user}</p>
              </NavLink>
              
          )}
            <NavLink to="/" className="nav-link" onClick={handleLogout}>
              <i className="now-ui-icons objects_key-25" />
              <p>logout</p>
            </NavLink>
            
          </li>
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
