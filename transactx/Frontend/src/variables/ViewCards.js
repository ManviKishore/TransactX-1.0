import React, { useState } from 'react'
const itemsPerPage = 5; // Number of items per page
const ViewCards = ({ cards }) => {
    const [visibleCards, setVisibleCards] = useState(cards.slice(0, itemsPerPage));
    const [currentPage, setCurrentPage] = useState(1);

    const handleLoadMore = () => {
        const nextPage = currentPage + 1;
        const startIndex = (nextPage - 1) * itemsPerPage;
        const endIndex = nextPage * itemsPerPage;
        const nextItems = cards.slice(startIndex, endIndex);
        setVisibleCards(nextItems);
        setCurrentPage(nextPage);
      }
    
      return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Card Number</th>
                        <th>Card Type</th>
                        <th>Account Number</th>
                        <th>Late Payment Interest</th>
                        <th>APR</th>
                    </tr>
                </thead>
                <tbody>
                    {visibleCards.map((card, index) => (
                        <tr key={index}>
                            <td>{card.Masked_cred_num}</td>
                            <td>{card.CardType}</td>
                            <td>{card.AccountNumber}</td>
                            <td>{card.InterestLatePayment}</td>
                            <td>{card.Annual_Percentage_Rate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {visibleCards.length < cards.length && (
                <button onClick={handleLoadMore}>Load More</button>
            )}
        </>
    );
}
export default ViewCards