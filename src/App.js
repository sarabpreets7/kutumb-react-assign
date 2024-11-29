import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import QuoteList from "./components/QuoteList";
import CreateQuote from "./components/CreateQuote";

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/quotes" element={<QuoteList token={token} />} />
        <Route path="/create" element={<CreateQuote token={token} />} />
      </Routes>
    </Router>
  );
};

export default App;
