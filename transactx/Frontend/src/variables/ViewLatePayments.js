import React, { useState } from "react";
import { Table } from "reactstrap";

const ViewLatePayments = ({ payments }) => {

  return (
    <>
      {/* <table>
        <thead> */}
        <Table responsive>
          <thead className="text-primary">
            <tr className="text-center">
              <th>Number</th>
              <th>Year Due</th>
              <th>Month Due</th>
              <th>Payments Missed</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={index} className="text-center">
                <td>{payment.cnt}</td>
                <td>{payment.year_duedate}</td>
                <td>{payment.Month_duedate}</td>
                <td>{payment.num_missed_payments}</td>
              </tr>
            ))}
          </tbody>
      </Table>
    </>
  );
};
export default ViewLatePayments;
