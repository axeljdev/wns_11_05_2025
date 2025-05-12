import { useMutation, useQuery } from "@apollo/client";
import { ADD_COUNTRY, GET_CONTINENTS, GET_COUNTRIES } from "../api/example";
import { useState } from "react";
import { Continent } from "../entities/Continent";
import isCountryFlag from "../services/verifyFlag";
import isValidCountryCode from "../services/verifyCode";
function Form() {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [code, setCode] = useState("");
  const [continent, setContinent] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [formError, setFormError] = useState("");
  const [addCountry] = useMutation(ADD_COUNTRY);
  const { refetch } = useQuery(GET_COUNTRIES);
  const { data: continents, error } = useQuery(GET_CONTINENTS);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCountry({
        variables: {
          data: {
            name,
            emoji,
            code,
            continent: { id: parseInt(continent) },
          },
        },
      });
      setName("");
      setEmoji("");
      setCode("");
      setShowMessage(true);
      setFormError("");
      refetch();
    } catch {
      setFormError("Une erreur est survenue lors de l'ajout du pays");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="border-2 border-gray-300 rounded-md p-4 flex flex-col lg:flex-row gap-4 lg:gap-10 items-end"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            required
            className="border-2 border-gray-300 rounded-md p-2 bg-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="emoji"
            className="flex text-sm gap-2 font-medium items-center"
          >
            Flag
            {emoji && !isCountryFlag(emoji) && (
              <p className="text-red-600 text-[0.75rem] mt-1">
                Enter a valid flag
              </p>
            )}
          </label>
          <input
            type="text"
            placeholder="🇫🇷"
            required
            maxLength={4}
            className={`border-2 rounded-md p-2 bg-white ${
              emoji && !isCountryFlag(emoji)
                ? "border-red-400"
                : "border-gray-300"
            }`}
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="code" className=" flex gap-2 text-sm font-medium">
            Code du pays
            {code && !isValidCountryCode(code) && (
              <p className="text-red-600 text-xs mt-1">2 letters only</p>
            )}
          </label>
          <input
            type="text"
            placeholder="FR"
            required
            maxLength={2}
            className={`border-2 rounded-md p-2 bg-white ${
              code && !isValidCountryCode(code)
                ? "border-red-400"
                : "border-gray-300"
            }`}
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="continent" className="text-sm font-medium">
            Continent
          </label>
          <select
            id="continent"
            required
            className={`border-2 rounded-md p-2 ${
              error ? "border-red-400 bg-red-50" : "border-gray-300 bg-white"
            }`}
            value={continent}
            onChange={(e) => setContinent(e.target.value)}
          >
            <option value="" disabled>
              {error
                ? "⚠️ Impossible de charger les continents"
                : "Select a continent"}
            </option>
            {continents &&
              continents.continents.map((continent: Continent) => (
                <option key={continent.id} value={continent.id}>
                  {continent.name}
                </option>
              ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-pink-600 text-white rounded-md p-2 h-full w-full lg:w-auto"
        >
          Add
        </button>
      </form>

      {showMessage && (
        <div className="mt-4 p-2 bg-green-100 text-green-700 rounded-md text-center">
          Country added successfully !
        </div>
      )}

      {formError && (
        <div className="mt-4 p-2 bg-red-100 text-red-700 rounded-md text-center">
          {formError}
        </div>
      )}
    </>
  );
}

export default Form;
