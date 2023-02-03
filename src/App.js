import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card";

function App() {
  const [loading, setLodaing] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    const fetchPokemonData = async () => {
      let res = await getAllPokemon(initialURL);

      loadPokemon(res.results);
      setLodaing(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord
      })
    );
    setPokemonData(_pokemonData)
  };

  console.log(pokemonData);

  return (
      <div className="App">
        {loading ? (
          <h1>ロード中</h1>
        ) :(
          <>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon,i) => {
              return <Card pokemon={pokemon} key={i}/>
            })}
          </div>
          </>
        )}
      </div>
  );
}

export default App;
