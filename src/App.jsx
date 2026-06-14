//react
import { useEffect, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";

//Nav
import Navbar from "./Navbar";

//Pokemon Details
import PokemonDetail from "./PokemonDetail";

//Fav Page
import Favorites from "./Favorites";


//main
function App() {
  
  //pokemon
  const [pokemon, setPokemon] = useState([]);
  
  //loading
  const [loading, setLoading] = useState(true);
  
  //error
  const [error, setError] = useState(null);

  //search
  const [searchTerm, setSearchTerm] = useState("");


    //start
    //react loop
    const fetchPokemon = async () => {
      try {

        //delcare
        setLoading(true);
        setError(null);
        
        //fetching API
        const res = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1025"
        );

        //if fail send error
        // can't output as intended, probably because it's overwhited, will refind it if given time
        if (!res.ok) {
          throw new Error("Failed to fetch Pokémon list");
        }
        
        
        const data = await res.json();
        
        const detailed = await Promise.all(
          data.results.map(async (p) => {
            try {
              const res = await fetch(p.url);
              
              //if fail send error
              // can't output as intended, probably because it's overwhited, will refind it if given time
              if (!res.ok) {
                throw new Error(`Failed to load ${p.name}`);
              }

              return await res.json();
            } catch (err) {
              console.error("Pokémon detail error:", err);
              return null; //prevent full crash
            }
          })
        );

         // remove failed fetches
          setPokemon(detailed.filter(Boolean));
        } catch (err) {
          setError(err.message || "Something went wrong");
        } finally {
          setLoading(false);
        }
      };

    //react loop
    useEffect(() => {
      fetchPokemon();
    }, []);

    // Search filter
    const filteredPokemon = pokemon.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

return (
    <>
      {/* NAVBAR */}
      <Navbar />

      <Routes>
        
        {/* HOME */}
        <Route
          path="/"
          element={
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-6">
                Pokémon List
              </h1>
              
              {/* SEARCH BAR */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search Pokémon..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="w-full max-w-md border rounded-lg px-4 py-2"
                />
              </div>

              {/* LOADING */}
              {loading && (
                <p className="text-blue-500">
                  Loading Pokémon...
                </p>
              )}

              {/* ERROR */}
              {error && (
                <div className="text-red-500">
                  <p>⚠️ {error}</p>

                  <button
                    onClick={fetchPokemon}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* NO RESULTS */}
              {!loading &&
                !error &&
                filteredPokemon.length === 0 && (
                  <p className="text-gray-500">
                    No Pokémon found.
                  </p>
                )}

              {/* POKEMON GRID */}
              {!loading &&
                !error &&
                filteredPokemon.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {filteredPokemon.map((p) => (
                      <Link
                        to={`/pokemon/${p.id}`}
                        key={p.id}
                        className="bg-white shadow rounded-lg p-4 text-center block hover:shadow-lg transition"
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
          }
        />

        {/* DETAIL */}
        <Route
          path="/pokemon/:id"
          element={<PokemonDetail />}
        />

        {/* FAVORITES */}
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App
