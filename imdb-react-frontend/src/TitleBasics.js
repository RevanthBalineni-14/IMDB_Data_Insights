import React, { useState } from 'react';
import './TitleBasics.css'; // Ensure this path is correct

function TitleBasics() {
  const [tconst, setTconst] = useState('');
  const [titleType, setTitleType] = useState('');
  const [primaryTitle, setPrimaryTitle] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [isAdult, setIsAdult] = useState(false);
  const [runtimeMinutes, setRuntimeMinutes] = useState('');
  const [genres, setGenres] = useState('');

  const handleRequest = async (method) => {
    const body = {
      tconst,
      titleType,
      primaryTitle,
      originalTitle,
      isAdult,
      runtimeMinutes,
      genres: genres.split(',').map(genre => genre.trim()) // Trim spaces around genres
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/title-basics', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      if (response.ok) {
        alert('Success: ' + (data.success || JSON.stringify(data)));
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="title-basics-container">
      <h1>Title Basics Management</h1>
      <form onSubmit={e => e.preventDefault()}>
        <label>
          Tconst:
          <input type="text" value={tconst} onChange={e => setTconst(e.target.value)} />
        </label>
        <label>
          Title Type:
          <input type="text" value={titleType} onChange={e => setTitleType(e.target.value)} />
        </label>
        <label>
          Primary Title:
          <input type="text" value={primaryTitle} onChange={e => setPrimaryTitle(e.target.value)} />
        </label>
        <label>
          Original Title:
          <input type="text" value={originalTitle} onChange={e => setOriginalTitle(e.target.value)} />
        </label>
        <label>
          Is Adult:
          <input type="checkbox" checked={isAdult} onChange={e => setIsAdult(e.target.checked)} />
        </label>
        <label>
          Runtime Minutes:
          <input type="number" value={runtimeMinutes} onChange={e => setRuntimeMinutes(e.target.value)} />
        </label>
        <label>
          Genres (comma-separated):
          <input type="text" value={genres} onChange={e => setGenres(e.target.value)} />
        </label>
        <div>
          <button type="button" onClick={() => handleRequest('POST')} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', margin: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Insert</button>
          <button type="button" onClick={() => handleRequest('PUT')} style={{ backgroundColor: '#008CBA', color: 'white', padding: '10px 20px', margin: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Update</button>
          <button type="button" onClick={() => handleRequest('DELETE')} style={{ backgroundColor: '#f44336', color: 'white', padding: '10px 20px', margin: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
        </div>
      </form>
    </div>
  );
}

export default TitleBasics;
