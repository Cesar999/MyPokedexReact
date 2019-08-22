import React, {Component} from 'react';
import {connect} from 'react-redux';
import {lookPoke, lookAbility, lookMove} from '../Store/Actions';
import PokeCard from './Pokecard';
import './Pokedex.css';

class Pokedex extends Component {
    constructor(){
        super();
        this.state = {pokename: ''};
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.lookPoke(this.state.pokename);
        this.setState({pokename: ''});
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value.toLowerCase()});
    }

    submitAbility = (abilityURL) => {
        this.props.lookAbility(abilityURL);
    }

    submitMove = (moveURL) => {
        this.props.lookMove(moveURL);
    }

    render(){
        let card = '';
        if(this.props.pokemon){
            card = this.props.pokemon.name?<PokeCard pokemon={{...this.props.pokemon}} submitAbility={this.submitAbility} submitMove={this.submitMove} ability={{...this.props.ability}} move={{...this.props.move}}/>:'';
        } 
        return(
            <div className="Pokedex">
                <form className="fetchFrom" onSubmit={this.handleSubmit}>
                    <input type="text" name="pokename" onChange={this.handleChange} value={this.state.pokename}/>
                    <button>Fetch</button>
                </form>
                <hr/>
                {card}
            </div>
        );
    }
}

const mapStateToProps = (state)=>{
    return {pokemon: state.pokemon, ability: state.ability, move: state.move};
}

const mapDispatchToProps = {lookPoke, lookAbility, lookMove};

export default connect(mapStateToProps, mapDispatchToProps)(Pokedex);