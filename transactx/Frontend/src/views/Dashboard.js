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
import ViewCustValue from "variables/ViewCustValue";
import LineChartRed from "variables/LineChartRed";
import ViewLatePayments from "variables/ViewLatePayments";
import DispCustomers from "variables/DispCustomers";
import { set } from "react-hook-form";
import ViewLatePayAccounts from "variables/ViewLatePayAccounts";
import { Link } from "react-router-dom";

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
      setCustomers(response.data.results[0]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const [cards, setCards] = React.useState([]);
  const getCards = async () => {
    try {
      const response = await axios.get("http://localhost:4000/creditcard");
      setCards(response.data.results[0]);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getCards();
  }, []);

  const [openAccounts, setOpenAccounts] = React.useState([]);
  const [closedAccounts, setClosedAccounts] = React.useState([]);

  useEffect(() => {
    const getClosedbyDate = async () => {
      try {
        const response = await axios.get("http://localhost:4000/byclosedate");
        const closedCount = response.data.results[0][0].cnt;
        const openCount = response.data.results[0][1].cnt;
        setOpenAccounts(openCount);
        setClosedAccounts(closedCount);  
      } catch (error) {
        console.error('Error:', error);
      }
    }
    getClosedbyDate();
  }, [3000]);

  const [stateCount, setStateCount] = React.useState([]);
  const [state, setState] = React.useState([]);

  useEffect(() => {
    const getByState = async () => {
      try {
        const response = await axios.get("http://localhost:4000/bystate");
        const states = response.data.results[0].map((item) => item.state);
        const stateCount = response.data.results[0].map((item) => item.cnt);
        setStateCount(stateCount);
        setState(states);
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
        // const avg = response.data.results[0].map((item) => item.average_amount);
        const labelsAndExpenditure = response.data.results[0]
        .filter(item => item.month_transactionDate !== undefined && item.month_transactionDate !== null)
        .map(item => {
            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            const month = monthNames[item.month_transactionDate - 1];
            const year = item.year_transactiondate;
            const label = `${month} ${year}`;
            const expenditure = item.average_amount;
            return {label, expenditure};
        });
        const avg = labelsAndExpenditure.map(item => item.expenditure);
        const labels = labelsAndExpenditure.map(item => item.label);
        
          setAvgMonthExpense(avg);
          setAvgMonth(labels);

      } catch (error) {
        console.error('Error:', error);
      }
    }
    getAvgMonthExpense();
   
  }, [1000]);

  const [visa, setVisa] = useState([]);
  const [mastercard, setMastercard] = useState([]);
  const [amex, setAmex] = useState([]);

  useEffect(() => {
    const getCardsByType = async () => {
      try {
        const response = await axios.get("http://localhost:4000/bycardtype");
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

      const value = response.data.results[0];
      const labels = response.data.results[0].map((item) => item.agegroup);
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

  const [visaUtil, setVisaUtil] = useState([]);
  const [masterUtil, setMasterUtil] = useState([]);
  const [amexUtil, setAmexUtil] = useState([]);

  useEffect (() => {
    const getUtilisation = async () => {
      try {
        const response = await axios.get("http://localhost:4000/utilisationbycard");

        const visaUtil = response.data.results[0][0].cnt;
        const masterUtil = response.data.results[0][1].cnt;
        const amexUtil = response.data.results[0][2].cnt;
        setVisaUtil(visaUtil);
        setMasterUtil(masterUtil);
        setAmexUtil(amexUtil);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    getUtilisation();
  }, []);

  const [latePayments, setLatePayments] = useState([]);
  const [latePaymentLabels, setLatePaymentLabels] = useState([]);
  const [lateData, setLateData] = useState([]);

  useEffect(() => {
    const getLatePayments = async () => {
      try {
        const response = await axios.get("http://localhost:4000/latepayments");

        // const late = response.data.results[0].map((item) => item.cnt);
        const data = response.data.results[0];
        const months = response.data.results[0]
        .filter(item => item.Month_duedate !== undefined && item.Month_duedate !== null)
        .map(item => {
            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            const month = monthNames[item.Month_duedate - 1];
            const year = item.year_duedate;
            const label = `${month} ${year}`;
            const payments = item.cnt
            return {label, payments};
        });
        const late = months.map(item => item.payments);
        const labels = months.map(item => item.label);
        setLatePayments(late);
        setLatePaymentLabels(labels); 
        setLateData(data);    
              
      } catch (error) {
        console.error('Error:', error);
      }
    }
    getLatePayments();
    
  }, []);

  const handleLatePayments = async (event) => {
    event.preventDefault();
  }

  const [defaulters, setDefaulters] = useState([]);
  const [viewButton, setViewButton] = useState(false);
  const freqLatePayments = async () => {
    try {
      const response = await axios.get("http://localhost:4000//missedpaymentsaccounts");
      console.log(response.data.results[0]);
      const data = response.data.results[0];
      setDefaulters(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleViewFreqLatePayments = async (event) => {
    event.preventDefault();
    freqLatePayments();
    setViewButton(true);
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
                  {/* <Line
                    data={dashboardShippedProductsChart.data}
                    options={dashboardShippedProductsChart.options}
                  /> */}
                  <LineChartRed
                    labels={latePaymentLabels}
                    data={latePayments}
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
                <CardTitle tag="h4">Utilisation Per Card</CardTitle>
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
                  <CustFreq
                    data={[ visaUtil, masterUtil, amexUtil ]}
                    labels={['Visa', 'Mastercard', 'Amex']}
                    label='Card Utilisation'
                    // use green and orange for the bars
                    backgroundColor={['#2CAF8F', '#2CBFF', '#2CA']}
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
                    data={[ visa, mastercard, amex ]}
                    labels={['Visa', 'Mastercard', 'Amex']}
                    label='Open vs Closed Account'
                    backgroundColor={['#FF6384', '#2CA8FF', '#FFCE56']}
                  />


                  {/* <CustFreq 
                    visa={visa}
                    master={mastercard}
                    amex={amex}
                  /> */}
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
            <Card>
              <CardHeader>
              {defaulters && (
                  <Button onClick={handleViewFreqLatePayments} color="primary">
                  Show Accounts
                </Button>
                )}
                <h5 className="card-category"></h5>
                <CardTitle tag="h4">Frequent Defaulters</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <ViewLatePayAccounts
                    payments={defaulters}
                  />
                  {viewButton && (
                    <Button 
                      className="btn-round btn-icon btn-icon-mini btn-neutral"
                      color="info"
                      id="tooltip731609871"
                      type="button">
                        <Link to="/admin/extended-tables">View</Link>
                    </Button>
                  )}
                </Table>
              </CardBody>
            </Card>
          </Col>

          <Col xs={12} md={6}>

            <Card>
              <CardHeader>
              {custValue && custValueLabels && (
                  <Button onClick={handleCustValue} color="secondary">
                  Show Customer Value
                </Button>
                )}
                <h5 className="card-category"></h5>
                <CardTitle tag="h4">Customer Lifetime Value</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <ViewCustValue 
                    custLifeVal={custValue}
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
              <CardTitle tag="h4">Late Payment Details</CardTitle>
            </CardHeader>
            <CardBody>
              <Table responsive>
                  <ViewLatePayments 
                    payments={lateData && lateData}
                  />
                
              </Table>
            </CardBody>
          </Card>
          </Col>
          {/* <Col xs={12} md={12}>
            <Card>
              <CardHeader>
              
                <CardTitle tag="h4">Customer Lifetime Value</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <ViewCards cards={custValue} />
                </Table>
              </CardBody>
            </Card>
          </Col> */}

          
        </Row>
        <Row>
          {/* <Col xs={12} md={12}>
            <Card>
              <CardHeader>
              
                <CardTitle tag="h4">Customer Lifetime Value</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <ViewCards cards={custValue} />
                </Table>
              </CardBody>
            </Card>
          </Col> */}
        </Row>
        <Row>
          <Col xs={12} md={12}>
          {/* <Card>
              <CardHeader>
                {custValue && custValueLabels && (
                  <Button onClick={handleCustValue} color="primary">
                  Show Customer Value
                </Button>
                )}
                <CardTitle tag="h4">Customer Lifetime Value</CardTitle>
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
            </Card> */}
          </Col>
        </Row>

        <Row>
          <Col xs={12} md={12}>
            <Card>
              <CardHeader>
                {/* <h5 className="card-category"></h5> */}
                <CardTitle tag="h4">All Customers</CardTitle>
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
                      {/* <th>SSN</th> */}
                      <th>Gender</th>
                      <th>Username</th>
                      <th>AccountNumber</th>
                    </tr>
                  </thead>
                  {/* <td> */}
                    <DispCustomers customers={customers} />
                  {/* </td> */}
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
