import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchChampion } from "../../functions/fetch";
import "./singlechampion.css";
import { ucfirst } from "../../functions/fonts";

export const SingleChampion = () => {
  //get the champion id from the url
  const championId = useParams().id;

  //get the version from the url
  const version = useParams().version;

  //array of colors red blue purple and green in hex
  const colors = ["#FF0000", "#0000FF", "#800080", "#008000"];

  //state actual champion
  const [champion, setChampion] = useState({
    id: "",
    title: "",
    info: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      //fetch the champion data
      const championData = await fetchChampion(championId, version);
      championData && setChampion(championData.data[championId]);
    };

    fetchData();
  }, []);

  return (
    <div className="single-champion-container">
      <div className="champion-container">
        <div className="champion-image">
          <img
            className="single-splash"
            src={`http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championId}_0.jpg`}
            alt="Aatrox"
          />

          <h1>{ucfirst(champion.id)}</h1>
          <h2>{ucfirst(champion.title)}</h2>

          {/* loop inside object */}
          {Object.keys(champion.info).map((key, index) => {
            return (
              <SkillBar
                size={10}
                title={ucfirst(key)}
                skills={champion.info[key]}
                color={colors[index]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SkillBar = (props) => {
  const { title, size, skills, color } = props;

  const divs = [];

  for (let i = 0; i < size; i++) {
    divs[i] = <div className="skillbar"></div>;
  }

  return (
    <div className="fullskillbar">
      <p>{title}</p>
      <div className="skillbar-container">
        {divs.map((div, index) => {
          if (index < skills)
            return (
              <div
                style={{ backgroundColor: color }}
                className="skillbar full"
              ></div>
            );
          return div;
        })}
      </div>
    </div>
  );
};
