// add all missing imports
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchVersion, fetchChampions } from "../../functions/fetch";
import "./champions.css";

function contains(str, substr) {
  return str.toLowerCase().indexOf(substr.toLowerCase()) >= 0;
}

export const Champions = () => {
  const [version, setVersion] = useState("0");
  const [champions, setChampions] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchResources = async () => {
    const version = await fetchVersion();
    setVersion(version);

    const champions = await fetchChampions(version);
    setChampions(champions);
  };

  useEffect(async () => {
    await fetchResources();
  }, []);

  return (
    <div className="page-container">
      <p>Version : {version}</p>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="champions-container">
        <ul className="champions-list" style={{ listStyle: "none" }}>
          {champions
            .filter((champion) => contains(champion.name, filter))
            .map((champion) => (
              <li key={champion.id}>
                <p>{champion.name}</p>
                <Link
                  to={`/champions/${champion.id}`}
                  className="champion-link"
                >
                  <img
                    className="splash"
                    src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
                    alt={champion.name}
                  />
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
