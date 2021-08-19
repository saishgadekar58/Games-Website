import React from "react";
import Loading from "./Loading";
import Game from "./Game";
import { useGlobalContext } from "../context";

export default function GamesList() {
  const { games, loading } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }
  if (games.length < 1) {
    return (
      <h2 className="section-title">
        Please wait for 10 seconds and then type again
      </h2>
    );
  }

  return (
    <section className="section">
      <h2 className="section-title">game list </h2>
      <div className="games-center">
        {games.map((item) => {
          return <Game key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
}
