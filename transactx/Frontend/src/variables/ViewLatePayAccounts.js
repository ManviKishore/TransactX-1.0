import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "reactstrap";

const ViewLatePayAccounts = ({ payments }) => {

  return (
    <>
      {/* <table>
        <thead> */}
        <Table responsive>
          <thead className="text-primary">
            <tr className="text-center">
              <th>SN</th>
              <th>Account</th>
              <th>Payments Missed</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} className="text-center">
                <td>{index + 1}</td>
                <td>{payment.AccountNumber}</td>
                <td>{payment.num_missed_payments}</td>
              </tr>
            ))}
          </tbody>
      </Table>

      {/* <Button 
        className="btn-round btn-icon btn-icon-mini btn-neutral"
        color="info"
        id="tooltip731609871"
        type="button">
          <Link to="/admin/extended-tables">View</Link>
      </Button> */}
    </>
  );
};
export default ViewLatePayAccounts;
