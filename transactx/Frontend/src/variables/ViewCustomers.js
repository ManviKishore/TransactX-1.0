// import React from 'react';

// function ViewCustomers({ customers }) {
//   return (
//     <tbody>
//       {customers.map((customer, index) => (
//         <tr key={index}>
//           <td>{customer.firstname}</td>
//           <td>{customer.Lastname}</td>
//           <td>{customer.age}</td>
//           <td>{`${customer.city}, ${customer.state}`}</td>
//           <td>{customer.monthly_income}</td>
//           <td>{customer.ssn}</td>
//           <td>{customer.gender}</td>
//           <td>{customer.username}</td>
//           <td>{customer.AccountNumber}</td>
//         </tr>
//       ))}
//     </tbody>
//   );
// }

// export default ViewCustomers;



import React, { useState } from 'react';

const itemsPerPage = 5; // Number of items per page

function ViewCustomers({ customers }) {
    const [visibleCustomers, setVisibleCustomers] = useState(customers.slice(0, itemsPerPage));
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
        {visibleCustomers.map((customer, index) => (
            <tr key={index}>
            <td>{customer.firstname}</td>
            <td>{customer.Lastname}</td>
            <td>{customer.age}</td>
            <td>{`${customer.city}, ${customer.state}`}</td>
            <td className="text-right">{customer.monthly_income}</td>
            <td>{customer.ssn}</td>
            <td>{customer.gender}</td>
            <td>{customer.username}</td>
            <td>{customer.AccountNumber}</td>
            </tr>
          ))}
        </tbody>


      {visibleCustomers.length < customers.length && (
        <button onClick={handleLoadMore}>Load More</button>
      )}
    </>
  );
}

export default ViewCustomers;
