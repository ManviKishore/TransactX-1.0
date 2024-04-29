import React, { useState, useEffect } from "react";
import { Button, Input } from "reactstrap";
const itemsPerPage = 5;
var indexF = 95; // Number of items per page

function ViewCreditCard({ creditCards }) {
  var tempCreditCards = creditCards;
  if (Array.isArray(creditCards)) {
    tempCreditCards = creditCards.slice(0, itemsPerPage);
  }
  console.log(tempCreditCards);
  const [visibleCreditCards, setVisibleCreditCards] = useState(tempCreditCards);

  useEffect(() => {
    setVisibleCreditCards(tempCreditCards);
    tempCreditCards = creditCards;
  }, [creditCards]);

  console.log("I'm heressss : ", visibleCreditCards);
  const [currentPage, setCurrentPage] = useState(1);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    const endIndex = nextPage * itemsPerPage;
    const nextItems = creditCards.slice(startIndex, endIndex);
    setVisibleCreditCards(nextItems);
    setCurrentPage(nextPage);
  };

  return (
    <>
      {/* Table header */}
      <tbody>
        {visibleCreditCards.length > 1 &&
          visibleCreditCards.map((creditCard, index) => (
            <tr key={index}>
              <td>{creditCard.AccountNumber}</td>
              <td>{creditCard.CardType}</td>
              <td>{creditCard.Annual_Percentage_Rate}</td>
              <td>{creditCard.InterestLatePayment}</td>
              <td>{creditCard.Masked_cred_num}</td>
            </tr>
          ))}
        {
          <tr key={indexF}>
            <td>{creditCards[0].AccountNumber}</td>
            <td>{creditCards[0].CardType}</td>
            <td>{creditCards[0].Annual_Percentage_Rate}</td>
            <td>{creditCards[0].InterestLatePayment}</td>
            <td>{creditCards[0].Masked_cred_num}</td>
          </tr>
        }
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
