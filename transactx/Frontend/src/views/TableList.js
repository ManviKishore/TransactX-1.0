import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Input,
} from "reactstrap";

import PanelHeader from "components/PanelHeader/PanelHeader.js";
import {
  theadCrditCard,
  theadCustomer,
  saveCreditHead,
  theadPerson,
} from "variables/general";
import ViewCustomers from "variables/ViewCustomers";
import ViewCreditCard from "variables/ViewCreditCard";
import ViewPerson from "variables/ViewPersons";

function RegularTables() {
  const [tableData, setTableData] = useState(theadCustomer);
  const [customers, setCustomers] = React.useState([]);
  const [creditcards, setCreditcards] = React.useState([]);
  const [currentData, setcurrentData] = React.useState([]);
  const [ssn, setSSN] = React.useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, touchedFields, submitCount },
  } = useForm();

  const [selectedTableName, setSelectedTableName] = useState("Customer");

  const handleTableSelect = (tableName) => {
    setSelectedTableName(tableName);
    // Reset filter and table data when switching tables
    // setFilterText(Array(theadCustomer.length).fill(""));
    if (tableName === "Customer") {
      setTableData(theadCustomer);
      setcurrentData(customers);
    } else if (tableName == "CreditCard") {
      setcurrentData(creditcards);
      setTableData(theadCrditCard);
    } else if (tableName == "Person") {
      setTableData(theadPerson);
      setcurrentData(customers);
    }
  };
  const handleDelete = (event) => {
    const inputssn = ssn;
    var row = {
      Tablename: selectedTableName,
      Operation: "Delete",
      data: {
        ssn: inputssn,
      },
    };

    console.log(row);
  };
  const getCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/customer");
      setCustomers(response.data.results[0]);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const getCreditCards = async () => {
    try {
      const response = await axios.get("http://localhost:4000/creditcard");
      setCreditcards(response.data.results[0]);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const saveRows = async () => {
    axios
      .post("http://localhost:4000/tableops", rowData)
      .then((response) => {
        console.log("Response:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleFilterChange = (event, column) => {
    if (event.key === "Enter") {
      const { value } = event.target;

      let requiredRows = [];
      if (selectedTableName === "CreditCard") {
        requiredRows = creditcards.filter((row) => row[column] === value);

        console.log(requiredRows);
        setcurrentData(requiredRows);
      } else {
        console.log(column.toLowerCase());
        console.log(value);

        if (column == "SSN") column = column.toLowerCase();

        requiredRows = customers.filter((row) => row[column] === value);
        console.log("inside filter");
        console.log("prev current:", currentData.length);
        console.log(requiredRows);

        setcurrentData(...requiredRows);
        console.log("updated current:", currentData.length);
      }
    }
  };

  useEffect(() => {
    getCustomers();
    getCreditCards();
  }, [selectedTableName]);

  const onSubmit = (data) => {
    var row = {
      Tablename: selectedTableName,
      Operation: "Add",
      data,
    };
    console.log(row);
  };

  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Editable Tables</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="table-switch">
                  <Button
                    color="info"
                    onClick={() => handleTableSelect("Customer")}
                    active={selectedTableName === "Customer"}
                  >
                    {" "}
                    Customer
                  </Button>
                  <Button
                    color="info"
                    onClick={() => handleTableSelect("Person")}
                    active={selectedTableName === "Person"}
                  >
                    Person
                  </Button>
                  <Button
                    color="info"
                    onClick={() => handleTableSelect("CreditCard")}
                    active={selectedTableName === "CreditCard"}
                  >
                    Credit Card
                  </Button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Table responsive>
                    <tr style={{ alignItems: "center" }}>
                      {selectedTableName === "Customer" &&
                        tableData.map((col, colIndex) => (
                          <td>
                            <input
                              {...register(col)}
                              type="text"
                              //  name={`col-${colIndex}`} // Unique name for each input
                              placeholder={col}
                              // value={col} // Use form data if available, otherwise use initial value
                            />
                          </td>
                        ))}
                      {selectedTableName === "CreditCard" &&
                        saveCreditHead.map((col, colIndex) => (
                          <td>
                            <input
                              {...register(col)}
                              type="text"
                              //  name={`col-${colIndex}`} // Unique name for each input
                              placeholder={col}
                              // value={col} // Use form data if available, otherwise use initial value
                            />
                          </td>
                        ))}
                    </tr>
                  </Table>
                  {(selectedTableName === "Customer" ||
                    selectedTableName === "CreditCard") && (
                    <Button type="submit" color="primary">
                      Save
                    </Button>
                  )}
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                {selectedTableName === "Customer" && (
                  <CardTitle tag="h4">
                    <h4>Customers </h4>
                  </CardTitle>
                )}
                {selectedTableName === "Person" && (
                  <CardTitle tag="h4">
                    <h4>Persons </h4>
                  </CardTitle>
                )}
                {selectedTableName === "CreditCard" && (
                  <CardTitle tag="h4">
                    <h4>Credit Card Details </h4>
                  </CardTitle>
                )}
              </CardHeader>
              <CardBody>
                <div className="filter-inputs">
                  {selectedTableName === "Customer" &&
                    theadCustomer.map((col, colIndex) => (
                      <Input
                        key={colIndex}
                        type="text"
                        // value={filterText[colIndex]}
                        placeholder={`Filter by ${col}`}
                        onKeyDown={(event) => handleFilterChange(event, col)}
                      />
                    ))}
                  {selectedTableName === "CreditCard" &&
                    theadCrditCard.map((col, colIndex) => (
                      <Input
                        key={colIndex}
                        type="text"
                        // value={filterText[colIndex]}
                        placeholder={`Filter by ${col}`}
                        onKeyDown={(event) => handleFilterChange(event, col)}
                      />
                    ))}
                  {selectedTableName === "Person" &&
                    theadPerson.map((col, colIndex) => (
                      <Input
                        key={colIndex}
                        type="text"
                        // value={filterText[colIndex]}
                        placeholder={`Filter by ${col}`}
                        onKeyDown={(event) => handleFilterChange(event, col)}
                      />
                    ))}
                </div>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      {selectedTableName === "CreditCard" &&
                        theadCrditCard.map((col, colIndex) => <th>{col}</th>)}
                      {selectedTableName === "Customer" &&
                        theadCustomer.map((col, colIndex) => <th>{col}</th>)}
                      {selectedTableName === "Person" &&
                        theadPerson.map((col, colIndex) => <th>{col}</th>)}
                    </tr>
                  </thead>
                  {selectedTableName === "CreditCard" && (
                    <ViewCreditCard creditCards={currentData} />
                  )}
                  {selectedTableName === "Customer" && (
                    <ViewCustomers customers={currentData} />
                  )}
                  {selectedTableName === "Person" && (
                    <ViewPerson persons={currentData} />
                  )}
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {(selectedTableName === "Customer" ||
          selectedTableName === "CreditCard") && (
          <Row>
            <Col xs={12}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">
                    <h4>Delete Users </h4> <h6> (with no credit cards)</h6>
                  </CardTitle>

                  <Input
                    type="text"
                    // value={userToDelete}
                    placeholder={`Enter SSN`}
                    onChange={(event) => setSSN(event.target.value)}
                  />
                </CardHeader>
                <Button
                  color="primary"
                  style={{ marginLeft: "1rem" }}
                  onClick={(event) => handleDelete(event)}
                >
                  Delete
                </Button>
                <CardBody></CardBody>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
}

export default RegularTables;
