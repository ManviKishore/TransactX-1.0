import React, { useState, useEffect } from "react";
import { Button, Input } from "reactstrap";
var itemsPerPage = 5; // Number of items per page
var indexF = 90;
function ViewCustomers({ customers }) {
  var tempCustomers = customers;
  if (Array.isArray(customers)) {
    tempCustomers = customers.slice(0, itemsPerPage);
  }
  console.log(tempCustomers);
  const [visibleCustomers, setVisibleCustomers] = useState(tempCustomers);

  useEffect(() => {
    //setAllCustomer(customers);
    setVisibleCustomers(tempCustomers);
    tempCustomers = customers;
  }, [customers]);

  console.log("I'm heressss : ", visibleCustomers);
  // if (customers.length > 0) setVisibleCustomers(...customers);

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
        {visibleCustomers.length > 1 &&
          visibleCustomers.map((customer, index) => (
            // console.log(customer) && (
            <tr key={index}>
              <td>{customer.ssn}</td>
              <td>{customer.AccountNumber}</td>
              <td>{customer.username}</td>
            </tr>
          ))}
        {
          <tr key={indexF}>
            <td>{visibleCustomers.ssn}</td>
            <td>{visibleCustomers.AccountNumber}</td>
            <td>{visibleCustomers.username}</td>
          </tr>
        }
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
