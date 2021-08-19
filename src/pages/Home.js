import React from "react";
import GamesList from "../components/GamesList";
import SearchForm from "../components/SearchForm";

const Home = () => {
  return (
    <main>
      <h1 className="saishTitle">Download Top Games</h1>
      <SearchForm />
      <GamesList />
    </main>
  );
};

export default Home;
