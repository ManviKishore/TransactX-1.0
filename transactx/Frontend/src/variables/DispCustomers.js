import React, { useState } from "react";
import { Button, Input } from "reactstrap";
var itemsPerPage = 5; // Number of items per page

function DispCustomers ({ customers }) {
  // Number of items per page
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
            // console.log(customer) && (
              <tr key={index}>
                         
                <td>{customer.firstname}</td>
                <td>{customer.Lastname}</td>
                <td className="text-center">{customer.age}</td>
                <td>{`${customer.city}, ${customer.state}`}</td>
                <td className="text-center">{customer.monthly_income}</td>
                {/* <td>{customer.ssn}</td> */}
                <td>{customer.gender}</td>
                <td>{customer.username}</td>
                <td className="text-center">{customer.AccountNumber}</td>
              </tr>
            // )
        )}
      </tbody>

      {visibleCustomers.length < customers.length && (
        <Button onClick={handleLoadMore} color="primary">
          Load More
        </Button>
      )}
    </>
  );
}

export default DispCustomers;


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
