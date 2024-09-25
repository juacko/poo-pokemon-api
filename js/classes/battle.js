export class Battle {
  constructor(pokemon1, pokemon2) {
    this.pokemon1 = pokemon1;
    this.pokemon2 = pokemon2;
  }

  // Función que simula la batalla
  fight() {
    console.log("¡Comienza la batalla!");

    // Aplicar efectos de estado antes del ataque
    this.pokemon1.applyStatusEffects();
    this.pokemon2.applyStatusEffects();

    const pokemon1Damage = this.pokemon1.calculateDamage(this.pokemon2);
    const pokemon2Damage = this.pokemon2.calculateDamage(this.pokemon1);

    const pokemon1Hp = this.pokemon1.getStat("hp") - pokemon2Damage;
    const pokemon2Hp = this.pokemon2.getStat("hp") - pokemon1Damage;

    let battleLog = "";

    if (pokemon1Damage > 0) {
      battleLog += `${this.pokemon1.getName()} ataca a ${this.pokemon2.getName()} y causa ${pokemon1Damage} puntos de daño.<br>`;
      console.log(battleLog);
    }

    if (pokemon2Damage > 0) {
      battleLog += `${this.pokemon2.getName()} ataca a ${this.pokemon1.getName()} y causa ${pokemon2Damage} puntos de daño. <br>`;
      console.log(battleLog);
    }

    if (pokemon1Hp > pokemon2Hp) {
      battleLog += `${this.pokemon1.getName()} gana con ${pokemon1Hp} HP restantes.`;
    } else if (pokemon2Hp > pokemon1Hp) {
      battleLog += `${this.pokemon2.getName()} gana con ${pokemon2Hp} HP restantes.`;
    } else {
      battleLog += "¡Es un empate!";
    }

    return battleLog;
  }
}
