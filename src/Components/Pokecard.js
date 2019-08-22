import React from 'react';
import AbilityCard from './AbilityCard';
import MoveCard from './MoveCard';
import './Pokecard.css';

class Pokecard extends React.Component{
    constructor(){
        super();
        this.state = {abilityURL: '', moveURL: ''};
    }

    componentDidMount(){
        this.setState({abilityURL: this.props.pokemon.abilities[0].url}, ()=> this.submitAbility()); 

        this.setState({moveURL: this.props.pokemon.moves[0].url}, ()=> this.submitMove()); 
    }

    componentWillReceiveProps(nextProps){
        if(this.props.pokemon.name!== nextProps.pokemon.name){
            this.setState({moveURL: nextProps.pokemon.moves[0].url}, ()=> this.submitMove());         
        }
    }

    handleChange = (e) => {
        e.persist();
        this.setState({[e.target.name]: e.target.value}, ()=>{
            if(e.target!==null){
                if(e.target.name==='abilityURL'){
                    this.submitAbility();
                } if(e.target.name==='moveURL'){
                    this.submitMove();
                }
            }
        });

    }

    submitAbility = () => {
        this.props.submitAbility(this.state.abilityURL);
    }

    submitMove = () => {
        this.props.submitMove(this.state.moveURL);
    }

    render(){
        const id = formatID(this.props.pokemon.id);
        const imgSrc = `http://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
        const types = formatTypes(this.props.pokemon.types);
        const abilityOptions = formatAbilities(this.props.pokemon.abilities);
        const moveOptions = formatMoves(this.props.pokemon.moves);

        const typesStyles = getTypesStyles(this.props.pokemon.types);

        const abilityCard = this.props.ability.id?<AbilityCard name={this.props.ability.name} id={this.props.ability.id} effect={this.props.ability.effect}/>:'';

        const moveCard = this.props.move.id?<MoveCard name={this.props.move.name} id={this.props.move.id} effect={this.props.move.effect} accuracy={this.props.move.accuracy} power={this.props.move.power} pp={this.props.move.pp} type={this.props.move.type} class={this.props.move.class}/>:'';

        return(
            <div className="Pokecard">
            <div className="container" style={typesStyles}>
                <h3 className="title">{this.props.pokemon.name} #{this.props.pokemon.id}</h3>
                <img className="image" src={imgSrc} alt={this.props.pokemon.name}/>
    
                <div className="types">
                    {types}
                </div>
    
                <div className="stats">
                    <div className="att"><h5>Attack:</h5> {this.props.pokemon.stats.attack.base}</div>
                    <div className="spatt"><h5>Sp. Attack:</h5> {this.props.pokemon.stats.specialattack.base}</div>
                    <div className="def"><h5>Defense:</h5> {this.props.pokemon.stats.defense.base}</div>
                    <div className="spdef"><h5>Sp. Defense:</h5> {this.props.pokemon.stats.specialdefense.base}</div>
                    <div className="speed"><h5>Speed:</h5> {this.props.pokemon.stats.speed.base}</div>
                    <div className="hp"><h5>HP:</h5> {this.props.pokemon.stats.hp.base}</div>
                </div>
            </div>

            <div className="formsContainer">
                <div className="abilitiesContainer">
                <form className="abilityForm">
                    <select name="abilityURL" value={this.state.abilityURL} onChange={this.handleChange}>
                        {abilityOptions}
                    </select>
                </form>
                {abilityCard}
                </div>

                <div className="movesContainer">
                    <form className="moveForm">
                        <select name="moveURL" value={this.state.moveURL} onChange={this.handleChange}>
                            {moveOptions}
                        </select>
                    </form>
                    {moveCard}
                </div>
            </div>


            </div>
        );
    }
};

function formatID(id){
    let temp = id.toString();
    if(temp.length===1){
        return `00${temp}`;
    } else if (temp.length===2){
        return `0${temp}`;
    } else {
        return temp;
    }
}

function formatTypes(types){
    return types.map(item=>{
        const color = getColorFromType(item.name);
        const style = {backgroundColor: color};
        return (<div style={style} className="type" key={item.name}>{item.name}</div>)});
}

function formatAbilities(abilities){
    return abilities.map((item)=>{
      return <option value={item.url} key={item.name}>{item.name}</option>
    });
}

function formatMoves(moves){
    return moves.map((item)=>{
      return <option value={item.url} key={item.name}>{item.name}</option>
    });
}

function getTypesStyles(types){
    let temp = types.map(type=>{
        switch(type.name){
            case 'bug': return 'rgb(108, 175, 46)';
            case 'dark': return 'rgb(46, 47, 45)';
            case 'dragon': return 'rgb(88, 37, 255)';
            case 'electric': return 'rgb(243, 220, 10)';          
            case 'fairy': return 'rgb(235, 101, 190)';
            case 'fighting': return 'rgb(187, 19, 19)';
            case 'fire': return 'rgb(231, 85, 1)';
            case 'flying': return 'rgb(170, 152, 251)';   
            case 'ghost': return 'rgb(31, 8, 133)';
            case 'grass': return 'rgb(14, 175, 22)';
            case 'ground': return 'rgb(199, 137, 37)';
            case 'ice': return 'rgb(170, 235, 231)';   
            case 'normal': return 'rgb(243, 238, 189)';
            case 'poison': return 'rgb(166, 26, 200)';
            case 'psychic': return 'rgb(240, 40, 157)';
            case 'rock': return 'rgb(100, 70, 42)';
            case 'steel': return 'rgb(141, 140, 139)';
            case 'water': return 'rgb(17, 95, 221)';   
            default: return 'rgb(0,0,0)';  
        }
    });

    if(temp.length<=1){
        return {backgroundColor: temp[0]};
    } else {
        return {backgroundImage: `linear-gradient(${temp[0]} , ${temp[1]})`};
    }
}

function getColorFromType(type){
    switch(type){
        case 'bug': return 'rgb(108, 175, 46)';
        case 'dark': return 'rgb(46, 47, 45)';
        case 'dragon': return 'rgb(88, 37, 255)';
        case 'electric': return 'rgb(243, 220, 10)';          
        case 'fairy': return 'rgb(235, 101, 190)';
        case 'fighting': return 'rgb(187, 19, 19)';
        case 'fire': return 'rgb(231, 85, 1)';
        case 'flying': return 'rgb(170, 152, 251)';   
        case 'ghost': return 'rgb(31, 8, 133)';
        case 'grass': return 'rgb(14, 175, 22)';
        case 'ground': return 'rgb(199, 137, 37)';
        case 'ice': return 'rgb(170, 235, 231)';   
        case 'normal': return 'rgb(243, 238, 189)';
        case 'poison': return 'rgb(166, 26, 200)';
        case 'psychic': return 'rgb(240, 40, 157)';
        case 'rock': return 'rgb(100, 70, 42)';
        case 'steel': return 'rgb(141, 140, 139)';
        case 'water': return 'rgb(17, 95, 221)';   
        default: return 'rgb(0,0,0)';   
    };
}

export default Pokecard;

