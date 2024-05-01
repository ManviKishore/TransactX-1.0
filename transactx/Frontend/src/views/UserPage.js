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
import React, { useState, useContext } from "react";
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import image_profile from "../assets/img/bg5.jpg";
import UserContext from "views/Auth/UseContext";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { Typography } from "@mui/material";

function User() {
  const { user, role } = useContext(UserContext);

  const [showUsernameField, setShowUsernameField] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [existingDetails, setExistingDetails] = useState();
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [account, setAccount] = useState("ACC0000002");
  const [successMessage, setSuccessMessage] = useState(null);
  const updateUser = async (data) => {
    console.log(data);
    axios
      .post("http://localhost:4000/userprofile", data)
      .then((response) => {
        console.log("Response:", response.data);
        setSuccessMessage("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleSubmit = (event) => {
    // getUserDetails(user);
    // console.log("newpass", newPassword);
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(event.target); // Create a new FormData object with form data
    const data = Object.fromEntries(formData.entries());
    
    updateUser(data);

    // if (data.username != n) console.log("Form data:", data); // Log the form data
  };
 
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup style={{ border: "0rem" }}>
                        <label>Username</label>
                        <Input
                          defaultValue={user}
                          placeholder="Username"
                          type="text"
                          name="username"
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pr-1" md="6">
                      <FormGroup style={{ border: "0rem" }}>
                        <label>Primary AccountNo</label>
                        <Input
                          defaultValue={account}
                          placeholder="text"
                          type="text"
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    {showUsernameField && (
                      <Col className="pr-1" md="6" style={{ border: "0rem" }}>
                        <FormGroup style={{ border: "0rem" }}>
                          <label>Update Username</label>
                          <Input
                            defaultValue={user}
                            placeholder="New Username"
                            type="text"
                            name="changedusername"
                          />
                        </FormGroup>
                      </Col>
                      // </Row>
                    )}
                    {showPasswordField && (
                      // <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup style={{ border: "0rem" }}>
                          <label>Update Password</label>
                          <Input
                            placeholder="New Password"
                            type="password"
                            name="changedpassword"
                          />
                        </FormGroup>
                      </Col>
                    )}
                  </Row>
                  <Button type="submit">Submit</Button>
                </Form>
                <Typography
                  variant="body2"
                  className="success-message"
                  style={{ color: "green", marginTop: "10px" }}
                >
                  {successMessage}
                </Typography>
                
              </CardBody>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img alt="..." src={image_profile} />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={image_profile}
                    />
                    <h5 className="title">{user}</h5>
                  </a>
                </div>
                <p className="description text-center">
                  Welcome, {user}. We are here to assist you. <br />
                </p>
                <div className="text-center">
                  <Button
                    color="primary"
                    onClick={() => setShowUsernameField(!showUsernameField)}
                    style={{}}
                  >
                    {showUsernameField
                      ? "Hide Username Field"
                      : "Update Username"}
                  </Button>{" "}
                  <Button
                    color="primary"
                    onClick={() => setShowPasswordField(!showPasswordField)}
                  >
                    {showPasswordField
                      ? "Hide Password Field"
                      : "Update Password"}
                  </Button>
                </div>
              </CardBody>
              <hr />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;
