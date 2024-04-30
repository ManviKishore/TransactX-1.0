import React, { useState } from "react";
import { Button, Input, Table } from "reactstrap";
var itemsPerPage = 5; // Number of items per page

function DispCustExp ({ expenses }) {
  const [visibleExpenses, setVisibleExpenses] = useState(
    expenses.slice(0, itemsPerPage)
  );
  const [currentPage, setCurrentPage] = useState(1);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    const endIndex = nextPage * itemsPerPage;
    const nextItems = expenses.slice(startIndex, endIndex);
    setVisibleExpenses(nextItems);
    setCurrentPage(nextPage);
  };
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  return (
    <>
      <Table responsive>
          <thead className="text-primary">
            <tr className="text-center">
              <th>SN</th>
              <th>Year</th>
              <th>Month</th>
              <th>Expenditure</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(
              (expense, index) =>
                <tr key={index} className="text-center">
                  <td>{index+1}</td>
                  <td>{expense.year}</td>
                  <td>{monthNames[expense.month -1]}</td>
                  <td>{expense.total_expenditure}$</td>
                </tr>
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

export default DispCustExp;

