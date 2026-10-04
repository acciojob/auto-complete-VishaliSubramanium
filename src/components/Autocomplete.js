import React, { useState, useEffect } from "react";

const Autocomplete = ({ suggestions = [] }) => {
  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    // If input is empty, clear suggestions immediately or keep it clean
    if (!query.trim()) {
      setFilteredSuggestions(suggestions);
      return;
    }

    // Debounce state update to handle asynchronous filtering without UI lag
    const handler = setTimeout(() => {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }, 300);

    // Cleanup timer on every query change or component unmount
    return () => {
      clearTimeout(handler);
    };
  }, [query, suggestions]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <h1>Search item</h1>
      <input 
        type="text" 
        value={query} 
        onChange={handleInputChange} 
        placeholder="Search..."
      />
      <ul>
        {filteredSuggestions.map((suggestion) => (
          <li key={suggestion}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
