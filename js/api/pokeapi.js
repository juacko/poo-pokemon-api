import { capitalizeFirstLetter } from "../utils/capitalize.js";

export async function fetchPokemonList() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151"); // Limitamos a los primeros 151 Pokémon
  const data = await response.json();
  const pokemonList = data.results;

  // Llenar los menús desplegables para Pokémon 1 y Pokémon 2
  const pokemon1Select = document.getElementById("pokemon1-select");
  const pokemon2Select = document.getElementById("pokemon2-select");

  // Vaciar el contenido actual
  pokemon1Select.innerHTML = "";
  pokemon2Select.innerHTML = "";

  // Agregar las opciones de Pokémon al menú desplegable
  pokemonList.forEach((pokemon, index) => {
    const option1 = document.createElement("option");
    option1.value = index + 1; // Los IDs de Pokémon empiezan desde 1
    option1.textContent = capitalizeFirstLetter(pokemon.name);
    pokemon1Select.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = index + 1;
    option2.textContent = capitalizeFirstLetter(pokemon.name);
    pokemon2Select.appendChild(option2);
  });
}
