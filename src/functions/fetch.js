export async function fetchVersion() {
  const response = await fetch(
    "https://ddragon.leagueoflegends.com/api/versions.json",
    {
      method: "GET",
    }
  );

  const data = await response.json();
  const version = await data[0];
  return await version;
}

export async function fetchChampions(version) {
  const response = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`,
    {
      method: "GET",
    }
  );

  const data = await response.json();
  const champions = Object.values(data.data);

  return champions;
}

export async function fetchSplashart(champion) {
  const response = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`,
    {
      method: "GET",
    }
  );

  const data = await response.json();
  const splashart = await data;

  console.log(splashart);
  return splashart;
}

export async function fetchChampion(champ, version) {
  const response = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${champ}.json`,
    {
      method: "GET",
    }
  );

  const data = await response.json();
  const champion = await data;

  return champion;
}
