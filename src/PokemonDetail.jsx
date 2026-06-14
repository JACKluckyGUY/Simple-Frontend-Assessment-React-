import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PokemonDetail() {
  //pokemon details
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  
  //loading & error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//react loop
  useEffect(() => {
    async function fetchPokemon() {
      try {
        //declare
        setLoading(true);
        setError(null);

        //fetch
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );

        const data = await res.json();
        
        //declare
        setPokemon(data);
      } catch (err) {
        //if error
        setError(err.message);
      } finally {
        //if load fail
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [id]);

  if (loading) {
    return <p className="p-6 text-blue-500">Loading...</p>;
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  //blank
  if (!pokemon) return null;

 return (
  <div className="p-6">
    <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        
        {/* Left Side - Image */}
        <div>
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-64 h-64"
          />
        </div>

        {/* Right Side - Details */}
        <div className="flex-1 flex flex-col items-start">
          <h1 className="text-4xl font-bold capitalize mb-4">
            {pokemon.name}
          </h1>

          <p className="mb-2">
            <strong>ID:</strong> {pokemon.id}
          </p>

          <p className="mb-2">
            <strong>Height:</strong> {pokemon.height}
          </p>

          <p className="mb-2">
            <strong>Weight:</strong> {pokemon.weight}
          </p>

          {/* TYPES */}
          <div className="mt-4">
            <h2 className="font-bold mb-2">Types</h2>

            <div className="flex flex-wrap gap-2 justify-start">
              {pokemon.types.map((t) => (
                <span
                  key={t.type.name}
                  className="px-3 py-1 bg-gray-200 rounded-full capitalize"
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
);
}

export default PokemonDetail;