import React from 'react';
import './AbilityCard.css';

function AbilityCard(props){
    return (
        <div className="AbilityCard">
            <h3>{props.name} #{props.id}</h3>
            <p>{props.effect}</p>
        </div>
    );
}

export default AbilityCard;