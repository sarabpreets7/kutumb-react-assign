import React, { useState } from "react";
import { uploadImage, postQuote } from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Create.css";

const CreateQuote = ({ token }) => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mediaData = await uploadImage(file);
      await postQuote(token, text, mediaData.mediaUrl);
      alert("Quote created successfully!");
      navigate("/quotes");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/");
      } else {
        alert("Failed to create quote.");
      }
    }
  };

  return (
    <div className="create-quote-container">
      <h1>Create Quote</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your quote"
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateQuote;
