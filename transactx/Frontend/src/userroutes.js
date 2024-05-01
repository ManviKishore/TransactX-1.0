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
import UserDashboard from "views/UserDashboard.js";
import UserPage from "views/UserPage.js";

var userDashRoutes = [
  {
    path: "/dashboard",
    name: "UserDashboard",
    icon: "design_app",
    component: <UserDashboard />,
    layout: "/user",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "users_single-02",
    component: <UserPage />,
    layout: "/user",
  },
];
export default userDashRoutes;
