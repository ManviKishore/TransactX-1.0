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
  Input
} from "reactstrap";

import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { thead, tbody } from "variables/general";

function RegularTables() {
  const [tableData, setTableData] = useState(tbody);
  const [filterText, setFilterText] = useState(Array(thead.length).fill(""));
  const [selectedTableName, setSelectedTableName] = useState("Table 1");

  const handleInputChange = (event, rowIndex, colIndex) => {
    const { value } = event.target;
    const updatedTableData = [...tableData];
    updatedTableData[rowIndex].data[colIndex] = value;
    // Add Salary column value for Table 1
    if (selectedTableName === "Table 1" && colIndex === 3) {
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
    const filteredData = tbody.filter(
      (row) => row.data[colIndex].toLowerCase().includes(value.toLowerCase())
    );
    setTableData(filteredData);
  };

  const handleAddRow = () => {
    const newRow = { data: Array(thead.length).fill("") };
    setTableData([...tableData, newRow]);
  };

  const handleSave = () => {
    // Logic to save the edited table data
    console.log("Table data saved:", tableData);
  };

  const handleTableSelect = (tableName) => {
    setSelectedTableName(tableName);
    // Reset filter and table data when switching tables
    setFilterText(Array(thead.length).fill(""));
    if (tableName === "Table 1") {
      setTableData(tbody);
    } else {
      // Exclude Salary column for Table 2
      const tableDataWithoutSalary = tbody.map(row => {
        const data = [...row.data];
        data.splice(3, 1);
        return { data };
      });
      setTableData(tableDataWithoutSalary);
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
                    onClick={() => handleTableSelect("Table 1")}
                    active={selectedTableName === "Table 1"}
                  >
                    Table 1
                  </Button>
                  <Button
                    color="info"
                    onClick={() => handleTableSelect("Table 2")}
                    active={selectedTableName === "Table 2"}
                  >
                    Table 2
                  </Button>
                  {/* Add more buttons for additional tables */}
                </div>
                <div className="filter-inputs">
                  {thead.map((col, colIndex) => (
                    <Input
                      key={colIndex}
                      type="text"
                      value={filterText[colIndex]}
                      placeholder={`Filter by ${col}`}
                      onChange={(event) => handleFilterChange(event, colIndex)}
                    />
                  ))}
                </div>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      {selectedTableName === "Table 1" &&
                        thead.map((prop, key) => (
                          <th key={key}>{prop}</th>
                        ))}
                      {selectedTableName === "Table 2" &&
                        thead
                          .filter((prop) => prop !== "Salary")
                          .map((prop, key) => <th key={key}>{prop}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.data.map(
                          (cell, colIndex) =>
                            (selectedTableName === "Table 1" ||
                              thead[colIndex] !== "Salary") && (
                              <td key={colIndex}>
                                <input
                                  type="text"
                                  value={cell}
                                  onChange={(event) =>
                                    handleInputChange(
                                      event,
                                      rowIndex,
                                      colIndex
                                    )
                                  }
                                />
                              </td>
                            )
                        )}
                      </tr>
                    ))}
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
