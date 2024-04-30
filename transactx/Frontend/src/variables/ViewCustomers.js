import React, { useState, useEffect } from "react";
import { Button, Input } from "reactstrap";
var itemsPerPage = 5; // Number of items per page
var indexF = 90;
function ViewCustomers({ customers }) {
  // Number of items per page
<<<<<<< HEAD
  console.log("I'm here : ", customers);
  // const [allCustomer, setAllCustomer] = useState(customers);
  // setAllCustomer(...customers);
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
=======
  // console.log("I'm here : ", customers);
  // const [visibleCustomers, setVisibleCustomers] = useState(
  //   customers.slice(1, itemsPerPage)
  // );
  // console.log(customers.length);
  // if (customers.length <= 5) {
  //   console.log(customers.length);
  //   itemsPerPage = customers.length;
  // }
  // setVisibleCustomers(...customers.slice(1, itemsPerPage));
>>>>>>> f432b886e72e93189141c27754e4db499d90e8d0

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
<<<<<<< HEAD
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
=======
        {visibleCustomers.map(
          (customer, index) =>
            // console.log(customer) && (
              <tr key={index}>
                <td>{customer.ssn}</td>
                <td>{customer.AccountNumber}</td>
                <td>{customer.username}</td>
              </tr>
            // )
        )}
>>>>>>> f432b886e72e93189141c27754e4db499d90e8d0
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


// import React, { useState } from "react";

// function ViewCustomers({ customers }) {
//   // Number of items per page
//   console.log("I'm here : ", customers);
//   const [visibleCustomers, setVisibleCustomers] = useState([]);

//   return (
//     <>

//       <tbody>
//         {visibleCustomers.map((customer, index) =>
//               <tr key={index}>
//                 <td>{customer.ssn}</td>
//                 <td>{customer.AccountNumber}</td>
//                 <td>{customer.username}</td>
//               </tr>

//         )}
//       </tbody>

//     </>
//   );
// }

// export default ViewCustomers;
