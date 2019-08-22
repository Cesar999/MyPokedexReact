import React from 'react';
import './MoveCard.css';

function MoveCard(props){
    const color = getColorFromType(props.type);
    const style = {backgroundColor: color};
    return (
        <div style={style} className="MoveCard">
            <h3>{props.name} #{props.id}</h3>
            <p className="effectText">{props.effect}</p>
            <div className="propsContainer">
                <div>Power: {props.power||'--'}</div>
                <div>Acc: {props.accuracy||'--'}</div>
                <div>PP: {props.pp}</div>
                <div>Type: {props.type}</div>
                <div>Class: {props.class}</div>
            </div>
        </div>
    );
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

export default MoveCard;