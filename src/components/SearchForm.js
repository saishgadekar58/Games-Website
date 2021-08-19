import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const searchValue = useRef("");

  const searchGame = () => {
    return setSearchTerm(searchValue.current.value);
  };

  useEffect(() => {
    searchValue.current.focus();
  }, []);

  const handelSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="section search">
      <form className="search-form" onSubmit={handelSubmit}>
        <div className="form-control">
          <label htmlFor="name">Enter Game Category </label>
          <input
            type="text"
            id="name"
            ref={searchValue}
            onChange={searchGame}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
