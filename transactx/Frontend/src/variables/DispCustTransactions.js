import React, { useState } from "react";
import { Button, Input, Table } from "reactstrap";

function DispCustTransactions ({ transactions = [] }) {

   const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];  

   if (!Array.isArray(transactions)) {
    return <div>Error: Transactions data is not available or not an array.</div>;
 }

  return (
    <>
      <Table responsive>
        <thead className="text-primary">
          <tr className="text-center">
            <th>SN</th>
            <th>Year</th>
            <th>Month</th>
            <th>Card</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => {
            const date = new Date(transaction.TransactionDateTime);
            const year = date.getUTCFullYear();
            const month = monthNames[date.getUTCMonth()];
            return (
              <tr key={index} className="text-center">
                <td>{index + 1}</td>
                <td>{year}</td>
                <td>{month}</td>
                <td>{transaction.Masked_cred_num}$</td>
                <td>{transaction.amount}$</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default DispCustTransactions;

