import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Home from './Home';
import TitleBasics from './TitleBasics';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');  // State to store the error message

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setError('');  // Clear previous errors when the user types a new query
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);  // Set the error message to display in the UI
      setResults([]);  // Clear previous results
    }
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/title-basics">Title Basics</Link>
            </li>
            <li>
              <Link to="/">Title Timeline</Link>
            </li>
            <li>
              <Link to="/">Title Akas</Link>
            </li>
            <li>
              <Link to="/">Tile Writer</Link>
            </li>
            <li>
              <Link to="/">Title Episode</Link>
            </li>
            <li>
              <Link to="/">Title Director</Link>
            </li>
            <li>
              <Link to="/">Title Principals</Link>
            </li>
            <li>
              <Link to="/">Title Ratings</Link>
            </li>
            <li>
              <Link to="/">Name Basics</Link>
            </li>
            <li>
              <Link to="/">Worker Basics</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/title-basics" element={<TitleBasics />} />
          <Route path="/" element={
            <Home
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
              query={query}
              results={results}
              error={error}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
