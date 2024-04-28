import React, { useState } from "react";
import { Button, Input } from "reactstrap";
var itemsPerPage = 5; // Number of items per page

function ViewCustomers({ customers }) {
  // Number of items per page
  console.log("I'm here : ", customers);
  // const [visibleCustomers, setVisibleCustomers] = useState(
  //   customers.slice(1, itemsPerPage)
  // );
  // console.log(customers.length);
  // if (customers.length <= 5) {
  //   console.log(customers.length);
  //   itemsPerPage = customers.length;
  // }
  // setVisibleCustomers(...customers.slice(1, itemsPerPage));

  // const [currentPage, setCurrentPage] = useState(1);
  const [visibleCustomers, setVisibleCustomers] = useState(
    customers.slice(0, itemsPerPage)
  );
  const [currentPage, setCurrentPage] = useState(1);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    const endIndex = nextPage * itemsPerPage;
    const nextItems = customers.slice(startIndex, endIndex);
    setVisibleCustomers(nextItems);
    setCurrentPage(nextPage);
  };

  return (
    <>
      {/* Table header */}
      <tbody>
        {visibleCustomers.map(
          (customer, index) =>
            console.log(customer) && (
              <tr key={index}>
                <td>{customer.ssn}</td>
                <td>{customer.AccountNumber}</td>
                <td>{customer.username}</td>
              </tr>
            )
        )}
      </tbody>

      {visibleCustomers.length < customers.length && (
        <Button onClick={handleLoadMore} color="primary">
          Get Customers
        </Button>
      )}
    </>
  );
}

export default ViewCustomers;
