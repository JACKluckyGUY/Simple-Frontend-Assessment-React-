import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-red-500 text-white px-6 py-4 flex gap-6">
      <Link to="/" className="font-bold hover:underline">
        Home
      </Link>

      <Link to="/favorites" className="hover:underline">
        Favorites
      </Link>
    </nav>
  );
}

export default Navbar;