import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "../api/example";
import { Country } from "../entities/Country";
import { Link } from "react-router-dom";

function Countries() {
  const { data, loading, error } = useQuery(GET_COUNTRIES);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen animate-bounce text-2xl font-bold">
        Loading...
      </div>
    );
  if (error)
    return (
      <section className="flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-red-100 border-2 border-red-400 rounded-lg p-4 max-w-md">
          <h2 className="text-xl font-bold text-red-700 mb-2">
            Oups ! Une erreur s'est produite
          </h2>
          <p className="text-red-600">Impossible de charger les pays.</p>
        </div>
      </section>
    );

  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 md:flex md:flex-row gap-4 items-center justify-center flex-wrap">
      {data &&
        data.countries.map((country: Country) => (
          <Link
            to={`/country/${country.code}`}
            key={country.id}
            className="flex flex-col gap-2 w-full md:w-28 items-center justify-center border-2 border-gray-300 rounded-md p-4"
          >
            <p className="text-xl font-bold">{country.name}</p>
            <p className="text-xl">{country.emoji}</p>
          </Link>
        ))}
    </section>
  );
}

export default Countries;
