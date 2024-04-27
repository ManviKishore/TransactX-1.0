import React, { useState } from "react";
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
  tbody,
  filterInputCust,
  theadPerson,
} from "variables/general";

function RegularTables() {
  //actual table data can be used here.
  const [tableData, setTableData] = useState(theadCustomer);
  const [rowIndex, setRowIndex] = useState(0);
  const [formData, setFormData] = useState({}); // State to hold form data

  const [userToDelete, setUserToDelete] = useState("");

  const [filterText, setFilterText] = useState(
    Array(theadCustomer.length).fill("")
  );
  const [selectedTableName, setSelectedTableName] = useState("Customer");

  const handleFilterChange = (event, colIndex) => {
    const { value } = event.target;
    const newFilterText = [...filterText];
    newFilterText[colIndex] = value;
    setFilterText(newFilterText);
    const filteredData = tbody.filter((row) =>
      row.data[colIndex].toLowerCase().includes(value.toLowerCase())
    );
    setTableData(filteredData);
  };

  const handleSave = () => {
    // Logic to save the edited table data
    console.log("Table data saved:", tableData);
  };

  const handleTableSelect = (tableName) => {
    setSelectedTableName(tableName);
    // Reset filter and table data when switching tables
    setFilterText(Array(theadCustomer.length).fill(""));
    if (tableName === "Customer") {
      setTableData(theadCustomer);
    } else if (tableName == "CreditCard") {
      setTableData(theadCrditCard);
    } else if (tableName == "Person") {
      setTableData(theadPerson);
    }
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
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

                  {/* Add more buttons for additional tables */}
                </div>
                <div className="filter-inputs">
                  {selectedTableName === "Customer" &&
                    filterInputCust.map((col, colIndex) => (
                      <Input
                        key={colIndex}
                        type="text"
                        value={filterText[colIndex]}
                        placeholder={`Filter by ${col}`}
                        onChange={(event) =>
                          handleFilterChange(event, colIndex)
                        }
                      />
                    ))}
                  {selectedTableName === "CreditCard" &&
                    theadCrditCard.map((col, colIndex) => (
                      <Input
                        key={colIndex}
                        type="text"
                        value={filterText[colIndex]}
                        placeholder={`Filter by ${col}`}
                        onChange={(event) =>
                          handleFilterChange(event, colIndex)
                        }
                      />
                    ))}
                  {selectedTableName === "Person" &&
                    theadPerson.map((col, colIndex) => (
                      <Input
                        key={colIndex}
                        type="text"
                        value={filterText[colIndex]}
                        placeholder={`Filter by ${col}`}
                        onChange={(event) =>
                          handleFilterChange(event, colIndex)
                        }
                      />
                    ))}
                </div>
                <Table responsive>
                  <thead className="text-primary">
                    <tr style={{ fontSize: "0.8rem" }}>
                      {selectedTableName === "Customer" &&
                        theadCustomer.map((prop, key) => (
                          <th key={key}>{prop}</th>
                        ))}
                      {selectedTableName === "CreditCard" &&
                        theadCrditCard.map((prop, key) => (
                          <th key={key}>{prop}</th>
                        ))}
                      {selectedTableName === "Person" &&
                        theadPerson.map((prop, key) => (
                          <th key={key}>{prop}</th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    <form onSubmit={handleFormSubmit}>
                      {/* Form starts here */}

                      {/* <form onSubmit={handleFormSubmit}> */}
                      <tr key={rowIndex} style={{ fontSize: "0.7rem" }}>
                        {rowData.map((prop, colIndex) => (
                          <td key={colIndex}>
                            <input
                              type="text"
                              name={`row-${rowIndex}-col-${colIndex}`} // Unique name for each input
                              value={
                                formData[`row-${rowIndex}-col-${colIndex}`] ||
                                prop
                              } // Use form data if available, otherwise use initial value
                              onChange={(event) =>
                                handleInputChange(event, rowIndex, colIndex)
                              }
                            />
                          </td>
                        ))}
                      </tr>
                    </form>
                  </tbody>
                </Table>
                <Button type="submit" color="primary" onClick={handleSave}>
                  Save
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      <p></p>
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  <h4>Delete Users </h4> <h6> (with no credit cards)</h6>
                </CardTitle>

                <Input
                  type="text"
                  value={userToDelete}
                  placeholder={`Enter SSN`}
                  // onChange={(event) => handleFilterChange(event, colIndex)}
                />
              </CardHeader>
              <Button color="primary" style={{ marginLeft: "1rem" }}>
                Delete
              </Button>
              <CardBody></CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default RegularTables;
