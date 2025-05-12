import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { GET_COUNTRY } from "../api/example";

function Country() {
  const { code } = useParams();
  const { data, loading, error } = useQuery(GET_COUNTRY, {
    variables: { code },
  });

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
          <p className="text-red-600">Impossible de charger le pays.</p>
        </div>
      </section>
    );

  if (!data) return <div>Aucune donnée trouvée</div>;

  return (
    <article className="flex flex-col gap-4 items-center justify-center pt-20">
      <p className="text-9xl">{data.country.emoji}</p>
      <h1 className="text-2xl font-semibold">
        {data.country.name} ({data.country.code})
      </h1>
      {data.country.continent && (
        <p className="text-xl">Continent: {data.country.continent.name}</p>
      )}
    </article>
  );
}

export default Country;
