import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchChampion, fetchVersion } from "../../functions/fetch";
import "./singlechampion.css";
import { ucfirst } from "../../functions/fonts";

export const SingleChampion = () => {
  //get the champion id from the url
  const championId = useParams().id;

  //state actual champion
  const [champion, setChampion] = useState({});

  //state version
  const [version, setVersion] = useState("0");

  useEffect(() => {
    const fetchData = async () => {
      //fetch the version
      version === "0" && setVersion(await fetchVersion());

      //fetch the champion data
      if (!champion.id) {
        const actualChampion = await fetchChampion(championId, version);
        setChampion(actualChampion.data[championId]);
      }
    };

    fetchData();
  }, [champion, version]);

  console.log(champion);

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
          {Object.keys(champion.info).map((key) => {
            return (
              <SkillBar
                size={10}
                title={ucfirst(key)}
                skills={champion.info[key]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SkillBar = (props) => {
  const { title, size, skills } = props;

  const divs = [];

  for (let i = 0; i < size; i++) {
    divs[i] = <div className="skillbar"></div>;
  }

  return (
    <div className="fullskillbar">
      <p>{title}</p>
      <div className="skillbar-container">
        {divs.map((div, index) => {
          if (index < skills) return <div className="skillbar full"></div>;
          return div;
        })}
      </div>
    </div>
  );
};
