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
import React, { useContext, useEffect, useState } from "react";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import { IoNotificationsOutline } from "react-icons/io5";
import axios from "axios";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Button,
  Label,
  FormGroup,
  Input,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import {
  dashboardPanelChart,
  dashboardShippedProductsChart,
  dashboardAllProductsChart,
  dashboard24HoursPerformanceChart,
  dashboardMonthPerformanceChart, 
} from "variables/charts.js";

import LineChart from "variables/LineChart";
import LineChartRed from "variables/LineChartRed";
import UserContext from "./Auth/UseContext";
import DispCustExp from "variables/DispCustExp";
import { set } from "react-hook-form";
import DispCustLatePay from "variables/DispCustLatePay";
import DispCustTransactions from "variables/DispCustTransactions";

function UserDashboard() {
  const [data, setData] = React.useState({
    Tablename: "",
    Operation: "",
    SSN: "",
    Username: "",
    Password: "",
    AccountNumber: "",
  });
  const { user } = useContext(UserContext);
  
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const [expenditure, setExpenditure] = useState([]);
  const [userExpenditure, setUserExpenditure] = useState([]);
  const [userExpenditureLabels, setUserExpenditureLabels] = useState([]);

  useEffect(() => {
    const displayExpenses = async () => {
      try {
        // if (user) {
          const userObject = { username: user.replace(/"/g, '') }; 
          const response = await fetch("http://localhost:4000/userexpenses", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userObject),
          });
          if (!response.ok) {
            throw new Error("Failed to fetch");
          }
          const responseData = await response.json();
          setExpenditure(responseData.results);
          
          const labels = responseData.results
          .filter(item => item.month !== undefined && item.month !== null)
          .map(item => {
              const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
              return monthNames[item.month - 1];
          });
          const avg = responseData.results.map((item) => item.total_expenditure);
          setUserExpenditure(avg);
          setUserExpenditureLabels(labels);
          // console.log(userExpenditure);
          // console.log(userExpenditureLabels);

        // } else {
        //   console.error("User is undefined");
        // }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    displayExpenses();
  }, []);
  
  const [accountDets, setAccountDets] = useState([]);

  useEffect(() => {
    const getAccountStatus = async () => {
      try {
        const userObject = { username: user.replace(/"/g, '') }; 
        
        const response = await fetch("http://localhost:4000/useraccountstats", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userObject),
          });
        
          const responseData = await response.json();

        setAccountDets(responseData.results[0]);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    getAccountStatus();
    // console.log(accountDets);
  }, [5000]);

  const [dueDate, setDueDate] = useState([]);
  const [paymentDueDate, setPaymentDueDate] = useState([]);

  useEffect(() => {
    const getDueDate = async () => {
      try {

        const userObject = { username: user.replace(/"/g, '') };
        const response = await fetch("http://localhost:4000/userduedate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userObject),
        });
        const responseData = await response.json();
        setDueDate(responseData.results[0]);
        const dueOn = new Date(responseData.results[0].duedate).toISOString().split('T')[0];
        setPaymentDueDate(dueOn);

      } catch (error) {
        console.error('Error:', error);
      }
    }
    getDueDate();
  }, [5000]);

  const [userLatePayment, setUserLatePayment] = useState([]);
  const [latePaymentLabels, setLatePaymentLabels] = useState([]);
  const [lateData, setLateData] = useState([]);

  useEffect(() => {
    const getLatePayments = async () => {
      try {
        const userObject = { username: user.replace(/"/g, '') };
        const response = await fetch("http://localhost:4000/userlatepayments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userObject),
        });
        const responseData = await response.json();
        // setUserLatePayment(responseData.results);
        // console.log(responseData.results);
        const labels = responseData.results
        .filter(item => item.Duedate !== undefined && item.Duedate !== null)
        .map(item => {
            const date = new Date(item.Duedate); 
            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            const month = monthNames[date.getUTCMonth()]; 
            const year = date.getUTCFullYear(); 
            return `${month}-${year}`; 
        });
        const latePayments = responseData.results.map((item) => item.minimum_payment_due);
        // console.log(labels);
        setLateData(responseData.results);
        setLatePaymentLabels(labels);
        setUserLatePayment(latePayments);

      } catch (error) {
        console.error('Error:', error);
      }
    }
    getLatePayments();
  }, [5000]);
  // const handleLatePayments = (e) => {
  //   e.preventDefault();
  //   getLatePayments();
  // };


  const [transactData, setTransactData] = useState([]);
  // useEffect(() => {
    const viewTransactions = async () => {
      try {
        const userObject = { username: user.replace(/"/g, '') };
        const response = await fetch("http://localhost:4000/usertransactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userObject),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const responseData = await response.json();
        
        const data = responseData.results;
        setTransactData(data);
        // console.log(transactData);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    // viewTransactions();
    // console.log(transactData[0].amount);
  // }, [5000]);

  const handleTransactionsView = (e) => {
    e.preventDefault();
    viewTransactions();
  };

  return (
    <>

      {/* <PanelHeader
        size="lg"
        content={
          <Line
            data={dashboardPanelChart2.data}
            options={dashboardPanelChart2.options}
          />
        }
      /> */}
      <PanelHeader
        size="lg"
        content={
          <LineChart
            labels={userExpenditureLabels}
            data={userExpenditure}
          />

        }
      />
      <div className="content">
        <Row>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Expenses</h5>
                <CardTitle tag="h4">Expenditure</CardTitle>
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-round btn-outline-default btn-icon"
                    color="default"
                  >
                    <i className="now-ui-icons loader_gear" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>View Customers</DropdownItem>
                    <DropdownItem>Change Period</DropdownItem>
                    {/* <DropdownItem>Something else here</DropdownItem> */}
                    <DropdownItem className="text-danger">
                      Remove data
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  {/* <Line
                    data={dashboardShippedProductsChart.data}
                    options={dashboardShippedProductsChart.options}
                  /> */}
                  <LineChartRed
                    labels={userExpenditureLabels}
                    data={userExpenditure}
                  />

                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69" /> Just
                  Updated
                </div>
              </CardFooter>
            </Card>
          </Col>

          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
              
                <h5 className="card-category">Payments</h5>
                <CardTitle tag="h4">Missed Payments</CardTitle>
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-round btn-outline-default btn-icon"
                    color="default"
                  >
                    <i className="now-ui-icons loader_gear" />
                  </DropdownToggle>
    
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <LineChart
                    labels={latePaymentLabels}
                    data={userLatePayment}
                  />

                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69" /> Just
                  Updated
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="card-tasks">
              <CardHeader>
                <h5 className="card-category">
                  {" "}
                  <IoNotificationsOutline />{" "}
                </h5>
                <CardTitle tag="h4">Account Information</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      <tr>
                        <td>

                        </td>
                        <td className="text-left">
                          Account Number: {accountDets.accountNumber}
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id="tooltip731609871"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_settings-90" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip731609871"
                          >
                            View
                          </UncontrolledTooltip>
                          
                        </td>
                      </tr>
                      <tr>
                        <td>

                        </td>
                        <td className="text-left">Total Expenditure: ${accountDets.total_exprenditure} </td>
                        <td className="td-actions text-right">
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id="tooltip731609871"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_settings-90" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip731609871"
                          >
                            View
                          </UncontrolledTooltip>
                         
                        </td>
                      </tr>
                      <tr>
                        <td>
                         
                        </td>
                        <td className="text-left">Cards on Account: {accountDets.Masked_cred_num}</td>
                        <td className="td-actions text-right">
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id="tooltip907509347"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_settings-90" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip907509347"
                          >
                            View
                          </UncontrolledTooltip>
                          
                        </td>
                      </tr>
                      <tr>
                        <td>
                        
                        </td>
                        <td className="text-left">Recent Transaction Date: {accountDets.most_recent_transaction}</td>
                        <td className="td-actions text-right">
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id="tooltip326247652"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_settings-90" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip326247652"
                          >
                            View
                          </UncontrolledTooltip>
                          
                        </td>
                      </tr>

                      <tr>
                        <td>
                        
                        </td>
                        <td className="text-left">Number of Transactions: {accountDets.number_of_total_transactions}</td>
                        <td className="td-actions text-right">
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id="tooltip326247652"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_settings-90" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip326247652"
                          >
                            View
                          </UncontrolledTooltip>
                          
                        </td>
                      </tr>

                      <tr>
                        <td>

                        </td>
                        <td className="text-left">
                          Upcoming Payment: ${dueDate.amount} Due: {paymentDueDate}  
                        </td>
                        <td className="td-actions text-right">
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="info"
                            id="tooltip731609871"
                            type="button"
                          >
                            <i className="now-ui-icons ui-2_settings-90" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip731609871"
                          >
                            View
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
              {/* <CardFooter>
                <hr />
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin" /> 
                  Updated 3
                  minutes ago
                </div>
              </CardFooter> */}
            </Card>
          </Col>

        </Row>
        <Row>
         
          
        </Row>

        <Row>
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
              {transactData && (
                  <Button onClick={handleTransactionsView} color="primary">
                  Show Transaction Details
                </Button>
                )}

                {/* <Button onClick={handleTransactionsView} color="primary">
                  Show Transactions
                </Button> */}
                <h5 className="card-category"></h5>
                <CardTitle tag="h4">Transaction Details</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <DispCustTransactions
                    transactions={transactData}
                  />
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
        <Col xs={12} md={12}>
          <Card>
            <CardHeader>
              {/* {latePayments && latePaymentLabels && (
                <Button onClick={handleLatePayments} color="primary">
                Show Late Payments
              </Button>
              )} */}
             
              <h5 className="card-category"></h5>
              <CardTitle tag="h4">Missed Payment Details</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive>
                  {/* <ViewLatePayments 
                    payments={lateData && lateData}
                  /> */}
                  <DispCustLatePay
                    payments={lateData}
                  />  
              </Table>
            </CardBody>
          </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={12}>

            <Card>
              <CardHeader>
              
                {/* {latePayments && latePaymentLabels && (
                  <Button onClick={handleLatePayments} color="primary">
                  Show Late Payments
                </Button>
                )} */}
              
                <h5 className="card-category"></h5>
                <CardTitle tag="h4">Monthly Expenditure</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                    {/* <ViewLatePayments 
                      payments={lateData && lateData}
                    /> */}
                    <DispCustExp
                      expenses={expenditure}
                    />  
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

    
      </div>
    </>
  );
}

export default UserDashboard;
