import { Pokemon } from "./classes/pokemon.js";
import { Battle } from "./classes/battle.js";
import { fetchPokemonList } from "./api/pokeapi.js";

window.onload = function () {
  fetchPokemonList();
};

function startBattle() {
  document
    .getElementById("start-battle-button")
    .addEventListener("click", async function () {
      const pokemon1Id = document.getElementById("pokemon1-select").value;
      const pokemon2Id = document.getElementById("pokemon2-select").value;

      const pokemon1Status = document.getElementById("pokemon1-status").value;
      const pokemon2Status = document.getElementById("pokemon2-status").value;

      // Crear instancias de los Pokémon usando los valores seleccionados
      const pokemon1 = new Pokemon(pokemon1Id);
      const pokemon2 = new Pokemon(pokemon2Id);

      // Cargar los datos de la API de PokéAPI
      await pokemon1.fetchData();
      await pokemon2.fetchData();

      // Mostrar información del Pokémon 1
      document.getElementById("poke1-name").innerText = pokemon1.getName();
      document.getElementById("poke1-img").src = pokemon1.getImage();
      document.getElementById("poke1-stats").innerHTML = `
      <p>HP: ${pokemon1.getStat("hp")}</p>
      <p>Ataque: ${pokemon1.getStat("attack")}</p>
      <p>Defensa: ${pokemon1.getStat("defense")}</p>
      <p>Tipos: ${pokemon1.getTypes().join(", ")}</p>
    `;

      // Mostrar información del Pokémon 2
      document.getElementById("poke2-name").innerText = pokemon2.getName();
      document.getElementById("poke2-img").src = pokemon2.getImage();
      document.getElementById("poke2-stats").innerHTML = `
      <p>HP: ${pokemon2.getStat("hp")}</p>
      <p>Ataque: ${pokemon2.getStat("attack")}</p>
      <p>Defensa: ${pokemon2.getStat("defense")}</p>
      <p>Tipos: ${pokemon2.getTypes().join(", ")}</p>
    `;

      // Aplicar los estados especiales seleccionados
      if (pokemon1Status !== "none") {
        pokemon1.applyStatus(pokemon1Status);
      }
      if (pokemon2Status !== "none") {
        pokemon2.applyStatus(pokemon2Status);
      }

      // Iniciar la batalla
      const battle = new Battle(pokemon1, pokemon2);
      const result = battle.fight();

      // Mostrar el resultado en el log de batalla
      document.getElementById("battle-log").innerHTML = `<p>${result}</p>`;
    });
}

startBattle();
