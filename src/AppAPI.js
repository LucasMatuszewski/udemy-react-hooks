import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef();

  // 1. Promise - .then()
  /* useEffect(() => {
    axios
      .get('http://hn.algolia.com/api/v1/search?query=reacthooks')
      .then(res => {
        setResults(res.data.hits);
      });
  }, []); // Empty array = don't start useEffect on every render */

  // 2. Async Await:
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `http://hn.algolia.com/api/v1/search?query=${query}`
        );
        console.log(response.data.hits);

        await setResults(response.data.hits);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    }

    query.length > 2 && fetchData();
  }, [query]); /* Empty array = don't start useEffect on every render */

  function handleClearSearch() {
    setQuery('');
    setResults([]);
    // In class components we had "REF" to reference to React rendered elements.
    // With hooks we have setRef()
    searchInputRef.current.focus(); // we focus on an element rendered by React
  }

  // we use classes from: https://tailwindcss.com/
  // CDN from: https://cdnjs.com/

  return (
    <div className="m-10 p-5 border rounded">
      <h1 className="font-bold text-xl mb-2">News</h1>
      <input
        type="text"
        name="query"
        placeholder="Search..."
        value={query}
        onChange={event => setQuery(event.target.value)}
        ref={searchInputRef}
        className="border"
      />
      <button
        type="button"
        onClick={handleClearSearch}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 mx-2 border border-blue-500 hover:border-transparent rounded"
      >
        Clear
      </button>
      {!isLoading ? (
        <ul className="list-disc m-5 p-3">
          {results.map(result => (
            <li key={result.objectID}>
              <a
                href={result.url}
                className="text-indigo-600 hover:text-indigo-400"
              >
                {result.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>LOADING...</p>
      )}
      {error && <p>{error.message}</p>}
    </div>
  );
}
