import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";
const url =
  "https://free-to-play-games-database.p.rapidapi.com/api/games?category=";
const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("racing");
  const [games, setGames] = useState([]);
  const fetchGames = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`, {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "b655dfdea3msh19cdf43305f2661p1a10f4jsnad73f6cf4b48",
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        },
      });
      const data = await response.json();

      if (!data.length < 1) {
        const newgames = data.map((item) => {
          const {
            title,
            genre,
            platform,
            id,
            thumbnail,
            short_description,
            release_date,
            publisher,
            game_url,
            developer,
          } = item;
          return {
            id,
            title,
            platform,
            genre,
            thumbnail,
            short_description,
            release_date,
            publisher,
            game_url,
            developer,
          };
        });
        setGames(newgames);
      } else {
        setGames([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchGames();
  }, [searchTerm, fetchGames]);

  return (
    <AppContext.Provider value={{ loading, games, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
