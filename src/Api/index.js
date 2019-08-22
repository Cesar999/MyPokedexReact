import axios from 'axios';

export async function getMove(moveURL){
  try{
    const response = await axios.get(moveURL);
    const m = response.data;
    if(response.data.name){
      const newMove = {name: m.name, id: m.id, class: m.damage_class.name, effect: m.effect_entries[0].effect, power: m.power, pp: m.pp, priority: m.priority, accuracy: m.accuracy, type: m.type.name};
      return newMove;
    } else {
      return null;
    }

  } catch (error) {
      console.error(error);
    }
}

export async function getAbility(abilityURL){
  try{
    const response = await axios.get(abilityURL);
    const effect = response.data.effect_entries[0].effect;
    const newAbility = {name: response.data.name, id: response.data.id, effect};

    return newAbility;

  } catch (error) {
      console.error(error);
    }
}

export async function getPokemonByName(pokename) {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokename}`);
      const {moves, stats, abilities, types, name, id} = response.data;

      const newMoves = formatMoves(moves);
      const newStats = formatStats(stats);
      const newAbilities = formatAbilities(abilities);
      const newTypes = formatTypes(types);

      let newPokemon = {name, id, abilities: newAbilities, types: newTypes, stats: newStats, moves: newMoves};

      return newPokemon;

    } catch (error) {
      console.error(error);
    }
}

function formatMoves(moves){
  let res = [];
  for(let item of moves){
    res.push({name: item.move.name, url: item.move.url})
  }
  let output = res.sort(compare);
  return output;
}

function formatAbilities(abilities){
  let res = [];
  for(let item of abilities){
    res.push({name: item.ability.name, url: item.ability.url})
  }
  let output = res.sort(compare);
  return output;
}

function formatStats(stats){
  const map = {};
  for(let item of stats){
    let temp = item.stat.name.replace(/\-/g, '');
    map[temp] = {base: item.base_stat, name: temp,  url: item.stat.url};
  }
  return map;
}

function formatTypes(types){
  let res = [];
  for(let item of types){
    res.push({name: item.type.name, url: item.type.url});
  }
  return res.reverse();
}

function compare(a, b) {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();
  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}