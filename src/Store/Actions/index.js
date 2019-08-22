export const lookPoke = (name)=>{
    return {type: 'FETCH_POKE', payload: name};
}

export const lookAbility = (abilityURL)=>{
    return {type: 'FETCH_ABILITY', payload: abilityURL};
}

export const lookMove = (moveURL)=>{
    return {type: 'FETCH_MOVE', payload: moveURL};
}