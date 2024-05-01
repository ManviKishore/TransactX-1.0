import React, { useState } from "react";
import { Table } from "reactstrap";

const ViewCustValue = ({ custLifeVal }) => {

  return (
    <>
      <Table responsive>
        <thead className="text-primary">
        
          <tr className="text-center">
            <th>Number</th>
            <th>Age Group</th>
          </tr>
        </thead>
        <tbody>
          {custLifeVal.map((value, index) => (
            <tr key={index} className="text-center">
              <td>{value.customerLifetimevalue}</td>
              <td>{value.agegroup}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export default ViewCustValue;
