import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useCrossRefApi } from "../../Hooks";

const InputBase = styled.input``;

function Input({ onChange, placeholder, ...props }) {
  return (
    <div>
      <InputBase
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      ></InputBase>
    </div>
  );
}

function SearchBar({ setSearchQuery, setIsSearching, ...props }) {
  const [authorQuery, setAuthorQuery] = useState("");
  const [titleQuery, setTitleQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!titleQuery && !authorQuery) return;

    setIsSearching(true);
    console.log("submited");

    let query1 = "";
    let query2 = "";
    let query = "";

    if (authorQuery) query1 = `query.author=${authorQuery}`;
    if (titleQuery) query2 = `query.bibliographic=${titleQuery}`;

    if (authorQuery && titleQuery) {
      query = `${query1}&${query2}`;
      //query = `query.bibliographic=${authorQuery}+${titleQuery}`;
    } else {
      if (authorQuery) {
        query = query1;
      } else {
        query = query2;
      }
    }
    setSearchQuery({
      query: query.split(" ").join("%20"),
      options: { mode: "cors" },
    });
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <Input
        placeholder={"author"}
        onChange={(event) => setAuthorQuery(event.target.value)}
        type={"text"}
      ></Input>
      <Input
        placeholder={"title"}
        onChange={(event) => setTitleQuery(event.target.value)}
      ></Input>
      <button type="submit">Search</button>
    </form>
  );
}

function DoiSearchBar({ addToRefList, ...props }) {
  const [query, setQuery] = useState("");

  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    addToRefList(query);
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <Input
        placeholder={"https://doi..."}
        onChange={(event) => setQuery(event.target.value)}
      ></Input>
      <button type="submit">Search</button>
    </form>
  );
}

function SearchResults({ items, addToRefList, ...props }) {
  return (
    <div>
      <div>
        {items.map((item, index) => (
          <ul key={index}>
            <li>
              Author:
              {item.author?.map((item) => `${item.given} ${item.family}`)}
            </li>
            <li>Title: {item.title?.[0]}</li>
            {item.subtitle && <li>Subtitle: {item.subtitle?.[0]}</li>}
            <li>
              Link:{" "}
              <a target="_blank" rel="noreferrer" href={item.URL}>
                {item.URL}
              </a>
            </li>
            <li>Type: {item.type}</li>
            <li>Date: {item.issued?.["date-parts"]?.[0]?.[0]}</li>
            <li>
              <button onClick={() => addToRefList(item.URL)}>Add</button>
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}

const SearchResultContainer = styled.div``;

function SearchWidget({ addToRefList, ...props }) {
  const [isSearching, setIsSearching] = useState(false);
  const [{ data, isLoading, isError }, setSearchQuery] = useCrossRefApi(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    console.log("SearchData has chenged");
    if (data) {
      setSearchResults(data);
    }
  }, [data]);

  function clearSearch() {
    setSearchResults([]);
    setIsSearching(false);
  }
  return (
    <section>
      <SearchBar
        setIsSearching={setIsSearching}
        setSearchQuery={setSearchQuery}
      ></SearchBar>
      <DoiSearchBar addToRefList={addToRefList}></DoiSearchBar>
      <SearchResultContainer>
        {isSearching && <h2>Search Results</h2>}
        {searchResults.length > 0 && (
          <button onClick={clearSearch}>Clear Search</button>
        )}
        {isLoading && <p>Loadding...</p>}
        {isError && <p>Loadding...</p>}
        {searchResults.length > 0 && (
          <SearchResults
            items={searchResults}
            addToRefList={addToRefList}
          ></SearchResults>
        )}
      </SearchResultContainer>

      <div></div>
    </section>
  );
}

export default SearchWidget;
