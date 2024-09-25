export class Pokemon {
  constructor(nameOrId) {
    this.nameOrId = nameOrId;
    this.data = null;
    this.status = null; //estado especial del pokemon
  }

  // Método para obtener los datos del Pokémon desde la API
  async fetchData() {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${this.nameOrId}`
    );
    this.data = await response.json();
  }

  // Obtener el nombre del Pokémon
  getName() {
    return this.data.name;
  }

  // Obtener la imagen del Pokémon
  getImage() {
    return this.data.sprites.front_default;
  }

  // Obtener una estadística específica, por ejemplo, HP, Ataque, Defensa
  getStat(statName) {
    const stat = this.data.stats.find((s) => s.stat.name === statName);
    return stat ? stat.base_stat : 0;
  }

  // Obtener los tipos del Pokémon
  getTypes() {
    return this.data.types.map((typeInfo) => typeInfo.type.name);
  }

  // Método para aplicar un estado especial
  applyStatus(status) {
    this.status = status;
  }

  // Método para procesar el daño continuo o reducciones de estadísticas causadas por estados
  applyStatusEffects() {
    if (this.status === "burned") {
      console.log(
        `${this.getName()} está quemado. Su ataque se reduce y recibe daño continuo.`
      );
      this.damageOverTime(10); // Daño continuo
      this.attackReduction(0.5); // Reducción de ataque
    }

    if (this.status === "poisoned") {
      console.log(`${this.getName()} está envenenado. Recibe daño continuo.`);
      this.damageOverTime(15); // Daño continuo
    }
  }

  // Método que reduce el ataque del Pokémon
  attackReduction(factor) {
    this.data.stats.find((stat) => stat.stat.name === "attack").base_stat *=
      factor;
  }

  // Método que aplica daño continuo
  damageOverTime(damage) {
    const hpStat = this.data.stats.find((stat) => stat.stat.name === "hp");
    hpStat.base_stat -= damage;
    console.log(
      `${this.getName()} recibe ${damage} puntos de daño por su estado.`
    );
  }

  // Calcular el daño basado en el ataque y la defensa del oponente
  calculateDamage(opponent) {
    const attack = this.getStat("attack");
    const defense = opponent.getStat("defense");
    let damage = Math.max(0, attack - defense);

    // Aumentar o disminuir el daño según las ventajas por tipo
    opponent.getTypes().forEach((opponentType) => {
      this.getTypes().forEach((myType) => {
        if (typeAdvantages[myType]?.includes(opponentType)) {
          damage *= 2; // Doble daño si el tipo tiene ventaja
        }
      });
    });

    // Ataque crítico
    const criticalChance = 0.1; // 10% de probabilidad de ataque crítico
    const isCritical = Math.random() < criticalChance;
    if (isCritical) {
      damage *= 1.5; // Ataque crítico causa 1.5 veces el daño normal
      console.log(`¡${this.getName()} ha realizado un ataque crítico!`);
    }

    return damage;
  }
}

const typeAdvantages = {
  fire: ["grass", "bug", "ice", "steel"],
  water: ["fire", "ground", "rock"],
  grass: ["water", "ground", "rock"],
  electric: ["water", "flying"],
  // Puedes agregar más relaciones según las reglas de Pokémon
};
