import { Link } from "react-router-dom";

function Favorites({ pokemon, favorites }) {
  const favoritePokemon = pokemon.filter((p) =>
    favorites.includes(p.id)
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Favorite Pokémon
      </h1>


      {favoritePokemon.length === 0 ? (
        <p className="text-blue-500">
          Loading Pokémon...
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {favoritePokemon.map((p) => (
            <Link
              key={p.id}
              to={`/pokemon/${p.id}`}
              className="bg-white shadow rounded-lg p-4 text-center"
            >
              <img
                src={p.sprites.front_default}
                alt={p.name}
                className="mx-auto"
              />

              <h2 className="capitalize font-bold">
                {p.name}
              </h2>

              <p>#{p.id}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;