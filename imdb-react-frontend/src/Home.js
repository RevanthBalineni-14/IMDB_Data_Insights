import React from 'react';

function Home({ handleSubmit, handleInputChange, query, results, error }) {
    return (
      <div>
        <header className="App-header">
          <h1>IMDb Query Interface</h1>
          <form onSubmit={handleSubmit}>
            <textarea
              value={query}
              onChange={handleInputChange}
              rows="4"
              cols="50"
              placeholder="Enter SQL query here"
            />
            <button type="submit">Run Query</button>
          </form>
          {error && <p className="error">{error}</p>}
          {results.length > 0 ? (
            <table>
              <thead>
                <tr>
                  {Object.keys(results[0]).map((key, index) => (
                    <th key={index}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, idx) => (
                      <td key={idx}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : !error && <p>No data to display</p>}
        </header>
      </div>
    );
  }
  
  export default Home;
  
