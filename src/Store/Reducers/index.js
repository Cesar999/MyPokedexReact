const initialState = {pokemon: {}, ability: {}, move: {}};

const pokemonReducer = (state=initialState, action) => {
    switch(action.type){
        case 'SET_POKE':
            return {...state, pokemon: action.payload};
        case 'SET_ABILITY':
                return {...state, ability: action.payload};
        case 'SET_MOVE':
                return {...state, move: action.payload};
        default:
            return state;
    }
}

export default pokemonReducer;