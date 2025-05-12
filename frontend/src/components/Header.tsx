import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-pink-600 text-white p-4 flex flex-col justify-between items-center">
      <h1 className="text-2xl font-bold pb-4">Checkpoint : frontend</h1>
      <Link to="/" className="text-white hover:text-gray-300">
        Countries
      </Link>
    </header>
  );
}
