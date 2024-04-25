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
} from "variables/general";

function RegularTables() {
  //actual table data can be used here.
  const [tableData, setTableData] = useState(theadCustomer);

  const [filterText, setFilterText] = useState(
    Array(theadCustomer.length).fill("")
  );
  const [selectedTableName, setSelectedTableName] = useState("Customer");

  const handleInputChange = (event, rowIndex, colIndex) => {
    const { value } = event.target;
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex].data[colIndex] = value;
    // Add Salary column value for Table 1
    if (selectedTableName === "Customer" && colIndex === 3) {
      // 3 is the index of the Salary column in Table 1
      updatedTableData[rowIndex].data[3] = value;
    }
    setTableData(updatedTableData);
  };

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

  const handleAddRow = () => {
    const newRow = { data: Array(theadCustomer.length).fill("") };
    setTableData([...tableData, newRow]);
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
    }
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ fontSize: "0.7rem", paddingLeft: "0.2rem" }}>
                      {tableData.map((prop, key) => (
                        <td key={key}>
                          <input
                            type="text"
                            value={prop}
                            // onChange={(event) =>
                            //   handleInputChange(event, rowIndex, key)
                            // }
                          />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </Table>
                <Button color="primary" onClick={handleAddRow}>
                  Add Row
                </Button>
                <Button color="primary" onClick={handleSave}>
                  Save
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default RegularTables;
