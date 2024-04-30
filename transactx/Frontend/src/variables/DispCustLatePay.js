import React, { useState } from "react";
import { Button, Input, Table } from "reactstrap";

function DispCustLatePay ({ payments }) {

   const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];  

  return (
    <>
      <Table responsive>
          <thead className="text-primary">
            <tr className="text-center">
              <th>SN</th>
              <th>Year</th>
              <th>Month</th>
              <th>Min. Due</th>
              <th>Total Due</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => {
              const date = new Date(payment.Duedate);
              const year = date.getUTCFullYear();
              const month = monthNames[date.getUTCMonth()];
            return (
                <tr key={index} className="text-center">
                  <td>{index+1}</td>
                  <td>{year}</td>
                  <td>{month}</td>
                  <td>{payment.minimum_payment_due}$</td>
                  <td>{payment.Total_Amount_due}$</td>
                </tr>
                );
              }
            )}
          </tbody>
      </Table>

      {/* {visibleExpenses.length < expenses.length && (
        <Button onClick={handleLoadMore} color="primary">
          Load More
        </Button>
      )} */}
    </>
  );
}

export default DispCustLatePay;

