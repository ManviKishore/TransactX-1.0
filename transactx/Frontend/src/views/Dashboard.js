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
import React, { useEffect, useState } from "react";
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

import ViewCustomers from "variables/ViewCustomers";
import ViewCards from "variables/ViewCards";
import Freq from "variables/Freq";
import LineChart from "variables/LineChart";
import { dashboardPanelChart2 } from "variables/charts";
import BarChart from "variables/BarChart";
import CustFreq from "variables/CustFreq";

function Dashboard() {
  const [data, setData] = React.useState({
    Tablename: "",
    Operation: "",
    SSN: "",
    Username: "",
    Password: "",
    AccountNumber: "",
  });

  const [customers, setCustomers] = React.useState([]);

  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const postData = {
        Tablename: data.Tablename,
        Operation: data.Operation,
        SSN: data.SSN,
        Username: data.Username,
        Password: data.Password,
        AccountNumber: data.AccountNumber,
      };
      setData(postData);
      const response = await fetch("http://localhost:4000/tableops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const responseData = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //get the active customers
  const getCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/customer");
      // console.log(response.data.results[0][0].age);
      setCustomers(response.data.results[0]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getCustomers();
    // console.log(customers[0]);
  }, []);

  const [cards, setCards] = React.useState([]);
  const getCards = async () => {
    try {
      const response = await axios.get("http://localhost:4000/creditcard");
      // console.log(response.data.results[0]);
      setCards(response.data.results[0]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getCards();
    // console.log(cards[0]);
  }, []);

  const [openAccounts, setOpenAccounts] = React.useState([]);
  const [closedAccounts, setClosedAccounts] = React.useState([]);

  useEffect(() => {
    const getClosedbyDate = async () => {
      try {
        const response = await axios.get("http://localhost:4000/byclosedate");
        // console.log(response.data.results[0][1].cnt);
        // setOpenAccounts(response.data.results[0][0]);
        const closedCount = response.data.results[0][0].cnt;
        const openCount = response.data.results[0][1].cnt;
        setOpenAccounts(openCount);
        setClosedAccounts(closedCount);
        
        
      } catch (error) {
        console.error('Error:', error);
      }
    }
    getClosedbyDate();
    // console.log(openAccounts);
  }, [3000]);

  const [stateCount, setStateCount] = React.useState([]);
  const [state, setState] = React.useState([]);

  useEffect(() => {
    const getByState = async () => {
      try {
        const response = await axios.get("http://localhost:4000/bystate");
        // console.log(response.data.results[0]);
        const states = response.data.results[0].map((item) => item.state);
        const stateCount = response.data.results[0].map((item) => item.cnt);
        setStateCount(stateCount);
        setState(states);
        // console.log(label);
        // console.log(stateCount);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    getByState();
  }, []);

  const [avgMonthExpense, setAvgMonthExpense] = useState([]);
  const [avgMonth, setAvgMonth] = useState([]);
  
  useEffect(() => {
    const getAvgMonthExpense = async () => {
      try {
        const response = await axios.get("http://localhost:4000/avgmonthexpense");
        // console.log(response.data.results[0]);
        const avg = response.data.results[0].map((item) => item.average_amount);
        // const labels = response.data.results[0].map((item) => item.month_transactionDate);
        const labels = response.data.results[0]
        .filter(item => item.month_transactionDate !== undefined && item.month_transactionDate !== null)
        .map(item => {
            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            return monthNames[item.month_transactionDate - 1];
        });
      

          setAvgMonthExpense(avg);
          setAvgMonth(labels);

      } catch (error) {
        console.error('Error:', error);
      }
    }
    getAvgMonthExpense();
    // console.log(avgMonth);
    // console.log(avgMonthExpense);
  }, [1000]);

  // const [cardsByType, setCardsByType] = useState([]);
  const [visa, setVisa] = useState([]);
  const [mastercard, setMastercard] = useState([]);
  const [amex, setAmex] = useState([]);

  useEffect(() => {
    const getCardsByType = async () => {
      try {
        const response = await axios.get("http://localhost:4000/bycardtype");
        // console.log(response.data.results[0]);
        const visaCount = response.data.results[0][0].cnt;
        const mastercardCount = response.data.results[0][1].cnt;
        const amexCount = response.data.results[0][2].cnt;
        setVisa(visaCount);
        setMastercard(mastercardCount);
        setAmex(amexCount);

      } catch (error) {
        console.error('Error:', error);
      }
    }
    getCardsByType();
  }, []);

  const [custValue, setCustValue] = useState([]);
  const [custValueLabels, setCustValueLabels] = useState([]);
  const getCustValue = async () => {
    try {
      const response = await axios.get("http://localhost:4000/customervalue");
      // console.log(response.data.results[0]);
      const value = response.data.results[0].map((item) => item.value);
      const labels = response.data.results[0].map((item) => item.age);
      setCustValue(value);
      setCustValueLabels(labels);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  //use a button to get the customer value
  const handleCustValue = async (event) => {
    event.preventDefault();
    getCustValue();
  }


  return (
    <>
      {/* <PanelHeader
        size="lg"
        content={
          <Line
            data={dashboardPanelChart.data}
            options={dashboardPanelChart.options}
          />
        }
      /> */}
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
            labels={avgMonth}
            data={avgMonthExpense}
          />

        }
      />
      <div className="content">
        <Row>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Payments</h5>
                <CardTitle tag="h4">Late Payments</CardTitle>
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
                  <Line
                    data={dashboardShippedProductsChart.data}
                    options={dashboardShippedProductsChart.options}
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
                <h5 className="card-category">Transactions</h5>
                <CardTitle tag="h4">Average Monthly Expenses</CardTitle>
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-round btn-outline-default btn-icon"
                    color="default"
                  >
                    <i className="now-ui-icons loader_gear" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Change Year</DropdownItem>
                    <DropdownItem>Add</DropdownItem>
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
                    data={dashboardAllProductsChart.data}
                    options={dashboardAllProductsChart.options}
                  /> */}
                  <LineChart 
                    labels={avgMonth}
                    data={avgMonthExpense}
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
          {/* <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Accounts</h5>
                <CardTitle tag="h4">Number of Accounts</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={dashboard24HoursPerformanceChart.data}
                    options={dashboard24HoursPerformanceChart.options}
                  />
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons ui-2_time-alarm" /> Last 7 days
                </div>
              </CardFooter>
            </Card>
          </Col> */}
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Accounts</h5>
                <CardTitle tag="h4">Number of Accounts</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Freq open={openAccounts} closed={closedAccounts} />
                  {/* <Bar
                    data={dashboardMonthPerformanceChart.aggregatedData}
                    options={dashboardMonthPerformanceChart.options}
                  /> */}
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons ui-2_time-alarm" /> Last Year
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>


        <Row>
          
          
          {/* <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Accounts</h5>
                <CardTitle tag="h4">Number of Accounts</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={dashboard24HoursPerformanceChart.data}
                    options={dashboard24HoursPerformanceChart.options}
                  />
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons ui-2_time-alarm" /> Last 7 days
                </div>
              </CardFooter>
            </Card>
          </Col> */}
          
        </Row>


        <Row>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Customers</h5>
                <CardTitle tag="h4">Customers By State</CardTitle>
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
                  <BarChart
                    labels={state}
                    data={stateCount}
                  />
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69" /> Last 1 Year
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Transactions</h5>
                <CardTitle tag="h4">Transactions Per Card</CardTitle>
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-round btn-outline-default btn-icon"
                    color="default"
                  >
                    <i className="now-ui-icons loader_gear" />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>Change Year</DropdownItem>
                    <DropdownItem>Add</DropdownItem>
                    {/* <DropdownItem>Something else here</DropdownItem> */}
                    <DropdownItem className="text-danger">
                      Remove data
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={dashboardAllProductsChart.data}
                    options={dashboardAllProductsChart.options}
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
          {/* <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Accounts</h5>
                <CardTitle tag="h4">Number of Accounts</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={dashboard24HoursPerformanceChart.data}
                    options={dashboard24HoursPerformanceChart.options}
                  />
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons ui-2_time-alarm" /> Last 7 days
                </div>
              </CardFooter>
            </Card>
          </Col> */}
          <Col xs={12} md={4}>
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Customers</h5>
                <CardTitle tag="h4">Customers by Card Type</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <CustFreq 
                    visa={visa}
                    master={mastercard}
                    amex={amex}
                  />
                  {/* <LineChart
                    label={state}
                    data={stateCount}

                  /> */}
                </div>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons ui-2_time-alarm" /> Last Year
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>


        <Row>
          <Col xs={12} md={12}>

            {/* <Card>
              <CardHeader>
                <h5 className="card-category">Customer Table</h5>
              </CardHeader>

              <CardBody>
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for="Tablename">Table Name</Label>
                    <Input
                      type="select"
                      name="Tablename"
                      id="tablename"
                      value={data.Tablename}
                      onChange={handleInputChange}
                    >
                      <option value=" ">Select table name</option>
                      <option value="Customer">Customer</option>
                      <option value="Account">Account</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="Operation">Operation</Label>
                    <Input
                      type="select"
                      name="Operation"
                      id="operation"
                      value={data.Operation}
                      onChange={handleInputChange}
                    >
                      <option value=" ">Select operation</option>
                      <option value="Add">Add</option>
                      <option value="Update">Update</option>
                      <option value="Delete">Delete</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label for="SSN">Customer SSN</Label>
                    <Input
                      type="text"
                      name="SSN"
                      id="ssn"
                      placeholder="Enter Customer SSN"
                      value={data.SSN}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Username">Username</Label>
                    <Input
                      type="text"
                      name="Username"
                      id="username"
                      placeholder="Enter Customer Username"
                      value={data.Name}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="Password">Initial Password</Label>
                    <Input
                      type="text"
                      name="Password"
                      id="password"
                      placeholder="Enter Customer Password"
                      value={data.Password}
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="AccountNumber">Account Number</Label>
                    <Input
                      type="text"
                      name="AccountNumber"
                      id="condition"
                      placeholder="Account Number"
                      value={data.AccountNumber}
                      onChange={handleInputChange}
                    />
                  </FormGroup>

                  <Button>Add Customer</Button>
                </form>
               
              </CardBody>
            </Card> */}
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={6}>
            <Card className="card-tasks">
              <CardHeader>
                <h5 className="card-category">
                  {" "}
                  <IoNotificationsOutline />{" "}
                </h5>
                <CardTitle tag="h4">Notifications</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="table-full-width table-responsive">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          {/* <FormGroup check>
                            <Label check>
                              <Input defaultChecked type="checkbox" />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup> */}
                        </td>
                        <td className="text-left">
                          Pending transactions exceeded threshold.
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
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="danger"
                            id="tooltip923217206"
                            type="button"
                          >
                            <i className="now-ui-icons ui-1_simple-remove" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip923217206"
                          >
                            Remove
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {/* <FormGroup check>
                            <Label check>
                              <Input defaultChecked type="checkbox" />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup> */}
                        </td>
                        <td className="text-left">Late payments detected.</td>
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
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="danger"
                            id="tooltip923217206"
                            type="button"
                          >
                            <i className="now-ui-icons ui-1_simple-remove" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip923217206"
                          >
                            Remove
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {/* <FormGroup check>
                            <Label check>
                              <Input type="checkbox" />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup> */}
                        </td>
                        <td className="text-left">New transactions made</td>
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
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="danger"
                            id="tooltip496353037"
                            type="button"
                          >
                            <i className="now-ui-icons ui-1_simple-remove" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip496353037"
                          >
                            Remove
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {/* <FormGroup check>
                            <Label check>
                              <Input defaultChecked type="checkbox" />
                              <span className="form-check-sign" />
                            </Label>
                          </FormGroup> */}
                        </td>
                        <td className="text-left">User card added</td>
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
                          <Button
                            className="btn-round btn-icon btn-icon-mini btn-neutral"
                            color="danger"
                            id="tooltip389516969"
                            type="button"
                          >
                            <i className="now-ui-icons ui-1_simple-remove" />
                          </Button>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip389516969"
                          >
                            Remove
                          </UncontrolledTooltip>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin" /> 
                  Updated 3
                  minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <Card>
              <CardHeader>
                {/* <h5 className="card-category"></h5> */}
                <CardTitle tag="h4">Cards</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Firstname</th>
                      <th>Address</th>
                      <th>Age</th>
                      <th className="text-right">Income</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Dakota Rice</td>
                      <td>Niger</td>
                      <td>Oud-Turnhout</td>
                      <td className="text-right">$36,738</td>
                    </tr>
                    <tr>
                      <td>Minerva Hooper</td>
                      <td>Curaçao</td>
                      <td>Sinaai-Waas</td>
                      <td className="text-right">$23,789</td>
                    </tr>
                    <tr>
                      <td>Sage Rodriguez</td>
                      <td>Netherlands</td>
                      <td>Baileux</td>
                      <td className="text-right">$56,142</td>
                    </tr>
                    <tr>
                      <td>Doris Greene</td>
                      <td>Malawi</td>
                      <td>Feldkirchen in Kärnten</td>
                      <td className="text-right">$63,542</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                {" "}
                <h5 className="card-category"></h5>
                <CardTitle tag="h4">Customer Lifetime Value</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <ViewCards cards={cards} />
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                {" "}
                <h5 className="card-category"></h5>
                <CardTitle tag="h4">Cards</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <ViewCards cards={cards} />
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                {/* <h5 className="card-category"></h5> */}
                <CardTitle tag="h4">Customer Details</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Firstname</th>
                      <th>Lastname</th>
                      <th>Age</th>
                      <th>Address</th>
                      <th className="text-right">Income</th>
                      <th>SSN</th>
                      <th>Gender</th>
                      <th>Username</th>
                      <th>AccountNumber</th>
                    </tr>
                  </thead>
                  <td>
                    <ViewCustomers customers={customers} />
                  </td>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
