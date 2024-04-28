import React, { useState } from "react";
import { Button, Input } from "reactstrap";
const itemsPerPage = 5; // Number of items per page

function ViewPerson({ persons }) {
  const [visiblePersons, setVisiblePersons] = useState(
    persons.slice(1, itemsPerPage)
  );
  const [currentPage, setCurrentPage] = useState(1);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const endIndex = nextPage * itemsPerPage;
    const nextItems = persons.slice(0, endIndex);
    setVisiblePersons(nextItems);
    setCurrentPage(nextPage);
  };

  return (
    <>
      {/* Table header */}
      <tbody>
        {visiblePersons.map((persons, index) => (
          <tr key={index}>
            <td>{persons.ssn}</td>
            <td>{persons.firstname}</td>
            <td>{persons.Lastname}</td>
            <td>{persons.streetaddress}</td>
            <td>{persons.city}</td>
            <td>{persons.state}</td>
          </tr>
        ))}
      </tbody>

      {visiblePersons.length < persons.length && (
        <Button onClick={handleLoadMore} color="primary">
          Get Persons
        </Button>
      )}
    </>
  );
}

export default ViewPerson;
