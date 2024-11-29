import React, { useState, useEffect } from "react";
import { getQuotes } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Quotes.css";

const QuoteList = ({ token }) => {
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [sortOrder, setSortOrder] = useState("latest");
  const navigate = useNavigate();

  const fetchQuotes = async () => {
    try {
      const data = await getQuotes(token, 10, offset);
      if (data.data.length === 0) {
        setHasMore(false);
      } else {
        // Sort only the newly fetched quotes and append them
        const sortedNewQuotes = sortQuotes(data.data, sortOrder);
        setQuotes((prev) => [...prev, ...sortedNewQuotes]);
        setOffset((prev) => prev + 10);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Session expired. Redirecting to login.");
        navigate("/");
      } else {
        alert("Failed to load quotes.");
      }
    }
  };

  // Function to sort quotes by createdAt date
  const sortQuotes = (quotesArray, order) => {
    return quotesArray.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      console.log(dateA, dateB, "datess");
      if (order === "latest") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
  };

  const handleSortChange = (e) => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);

    // Re-sort all quotes already loaded when sort order changes
    setQuotes((prev) => sortQuotes([...prev], newSortOrder));
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="quote-list-container">
      <h1>Quotes</h1>
      <div className="filter-container">
        <label htmlFor="sortOrder">Sort By:</label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      <div className="quotes-grid">
        {quotes.map((quote, index) => (
          <div className="quote-card" key={index}>
            <img src={quote.mediaUrl} alt="Quote" />
            <div className="overlay">
              <p>{quote.text}</p>
            </div>
            <p className="author">By {quote.username}</p>
            <p className="created">
              {new Date(quote.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      {hasMore && (
        <button className="load-more-button" onClick={fetchQuotes}>
          Load More
        </button>
      )}
      <button className="floating-button" onClick={() => navigate("/create")}>
        +
      </button>
    </div>
  );
};

export default QuoteList;
