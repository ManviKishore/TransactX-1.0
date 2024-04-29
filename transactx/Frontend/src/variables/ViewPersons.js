import React, { useState, useEffect } from "react";
import { Button, Input } from "reactstrap";
const itemsPerPage = 5;
var indexF = 90; // Number of items per page

function ViewPerson({ persons }) {
  console.log(persons);
  var tempPersons = persons;
  if (Array.isArray(persons)) {
    tempPersons = persons.slice(0, itemsPerPage);
  }
  console.log(tempPersons);
  const [visiblePersons, setVisiblePersons] = useState(tempPersons);

  useEffect(() => {
    setVisiblePersons(tempPersons);
    tempPersons = persons;
  }, [persons]);

  console.log("I'm heressss : ", visiblePersons);

  const [currentPage, setCurrentPage] = useState(1);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    const endIndex = nextPage * itemsPerPage;
    const nextItems = persons.slice(startIndex, endIndex);
    setVisiblePersons(nextItems);
    setCurrentPage(nextPage);
  };

  return (
    <>
      {/* Table header */}
      <tbody>
        {visiblePersons.length > 1 &&
          visiblePersons.map((persons, index) => (
            <tr key={index}>
              <td>{persons.ssn}</td>
              <td>{persons.firstname}</td>
              <td>{persons.Lastname}</td>
              <td>{persons.streetaddress}</td>
              <td>{persons.city}</td>
              <td>{persons.state}</td>
            </tr>
          ))}
        {
          <tr key={indexF}>
            <td>{persons.ssn}</td>
            <td>{persons.firstname}</td>
            <td>{persons.Lastname}</td>
            <td>{persons.streetaddress}</td>
            <td>{persons.city}</td>
            <td>{persons.state}</td>
          </tr>
        }
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
