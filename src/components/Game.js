import React from "react";
import { Link } from "react-router-dom";

const Game = ({ title, genre, id, short_description, thumbnail }) => {
  return (
    <article className="game">
      <div className="img-container">
        <img src={thumbnail} alt={title} />
      </div>
      <div className="game-footer">
        <h3>{title}</h3>
        <h4>{genre}</h4>
        <p>{short_description}</p>
        <Link to={`/game/${id}`} className="btn btn-primary btn-details">
          Details
        </Link>
      </div>
    </article>
  );
};

export default Game;
