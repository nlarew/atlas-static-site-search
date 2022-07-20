import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import Search from "../components/Search";
import {API} from '../api/API';

export default function SearchPage() {

  const api = API.getInstance();

  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [query, setQuery] = useState("");
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }
  const [results, setResults] = useState([]);

  const fakeHighlights = [
    {
      "path" : "description",
      "texts" : [
        {
          "value" : "The greatest of all fruits is naturally the ",
          "type" : "text"
        },
        {
          "value" : "Mango",
          "type" : "hit"
        },
        {
          "value" : " especially when it is served ",
          "type" : "text"
        },
        {
          "value" : " with sticky rice ",
          "type" : "text"
        }
      ],
      "score" : 1.2841906547546387
    }
  ];

  async function getNewSearchResults() {
    if (!query || !query.trim()) {
      setResults([]);
    } else {
      const results = await api.searchDocs(query);
      let modifiedResults = results;

      // JUST FOR TESTING PURPOSES FOR NOW (BECAUSE THERE ARE NO HIGHLIGHTS IN API)
      if (results && results.length > 0 && !results[0].highlights) {
        modifiedResults.map((result: any) => {
          result['highlights'] = fakeHighlights;
        })
      }
      setResults(modifiedResults ?? []);
    }
  }

  useEffect(() => {
    setLoading(false);

    if ((query && query.trim()) && (!results || results.length === 0)) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }

  }, [results])

  useEffect(() => {
    setLoading(true);

    if (!query || !query.trim()) {
      setResults([]);
      return;
    }

    const delayFetchResults = setTimeout(() => {
      getNewSearchResults();
    }, 1500)

    return () => clearTimeout(delayFetchResults);
  }, [query])

  return (
      <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            height: "400px"
          }}
      >
        <Typography variant="h3">
          🥭
        </Typography>
        <Search
          searchResults={results}
          query={query}
          handleQueryChange={handleQueryChange}
          loading={loading}
          noResults={noResults && !loading}
        />
      </div>
    )
}