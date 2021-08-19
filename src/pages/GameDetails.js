import React from "react";
import Loading from "../components/Loading";
import { Container } from "reactstrap";
import { FaDownload } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
const url = "https://free-to-play-games-database.p.rapidapi.com/api/game?id=";

const SingleGame = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [game, setGame] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    const getGame = async () => {
      try {
        const response = await fetch(`${url}${id} `, {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "b655dfdea3msh19cdf43305f2661p1a10f4jsnad73f6cf4b48",
            "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
          },
        });
        const data = await response.json();

        if (!Object.keys(data).length < 1) {
          const {
            id,
            title,
            thumbnail: imgGame,
            description: desc,
            genre,
            platform,
            publisher,
            game_url: urlg,
            release_date: date,
            minimum_system_requirements: requirements,
            screenshots: ss,
          } = data;

          const newGame = {
            id,
            title,
            imgGame,
            desc,
            genre,
            platform,
            publisher,
            urlg,
            date,
            requirements,
            ss,
          };

          setGame(newGame);
        } else {
          setGame(null);
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getGame();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (!game) {
    return <h2 className="section-title">no details available</h2>;
  }

  const {
    title,
    imgGame,
    desc,
    genre,
    platform,
    publisher,
    urlg,
    date,
    requirements,
    ss,
  } = game;
  const { os, processor, memory, graphics, storage } = requirements;

  return (
    <section className="gamesSection">
      <div className="imgDiv">
        <img src={imgGame} alt={title} />
      </div>

      <Container className="infoContainer">
        <div className="textDiv">
          <h4>Name:{title}</h4>
          <h4>Platform:{platform}</h4>
          <h4>Genre:{genre}</h4>
          <h4>Publisher:{publisher}</h4>
          <h4>Release Date:{date}</h4>
          <p>{desc}</p>

          {os == null &&
          processor == null &&
          memory == null &&
          graphics == null &&
          storage == null ? (
            <div className="noReqDiv">
              <h4>No Requirements</h4>
            </div>
          ) : (
            <div className="reqDiv">
              <h4>Requirements</h4>

              <div className="ulDiv">
                <ul>
                  <li>
                    Os:{""}
                    {os}
                  </li>
                  <li>
                    Processor:{""}
                    {processor}
                  </li>
                  <li>
                    Memory:{""}
                    {memory}
                  </li>
                  <li>
                    Graphics:{""}
                    {graphics}
                  </li>
                  <li>
                    Storage:{""}
                    {storage}
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="download">
            <button>
              <a href={urlg} target="_blank" rel="noreferrer">
                <FaDownload className="downloadImg" />
              </a>
            </button>
          </div>
        </div>
        <div className="ssDivConatiner">
          {ss.map((item, index) => {
            return (
              <div className="ssDiv" key={index}>
                <img src={item.image} alt={title} />
              </div>
            );
          })}
        </div>
      </Container>

      <div className="backB">
        <Link to="/" className="btn btn-primary">
          Back Home
        </Link>
      </div>
    </section>
  );
};

export default SingleGame;
