import React, { useState } from "react";
import { Button, Input } from "reactstrap";
const itemsPerPage = 5; // Number of items per page

function ViewCreditCard({ creditCards }) {
  const [visibleCreditCards, setVisibleCreditCards] = useState(
    creditCards.slice(1, itemsPerPage)
  );
  const [currentPage, setCurrentPage] = useState(1);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const endIndex = nextPage * itemsPerPage;
    const nextItems = creditCards.slice(0, endIndex);
    setVisibleCreditCards(nextItems);
    setCurrentPage(nextPage);
  };

  return (
    <>
      {/* Table header */}
      <tbody>
        {visibleCreditCards.map((creditCard, index) => (
          <tr key={index}>
            <td>{creditCard.AccountNumber}</td>
            <td>{creditCard.CardType}</td>
            <td>{creditCard.Annual_Percentage_Rate}</td>
            <td>{creditCard.InterestLatePayment}</td>
            <td>{creditCard.Masked_cred_num}</td>
          </tr>
        ))}
      </tbody>

      {visibleCreditCards.length < creditCards.length && (
        <Button onClick={handleLoadMore} color="primary">
          Get Credit Card
        </Button>
      )}
    </>
  );
}

export default ViewCreditCard;
