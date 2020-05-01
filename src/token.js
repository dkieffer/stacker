import React from 'react';
import './colors.scss';

function Token(props) {
    var divStyle = {
        top: props.yPos,
        left: props.xPos
    };
    let className = 'token ' + props.color;
    if (props.selected === props.id) {
        className += ' selected';
    }
    return (
        <div className={className} style={divStyle} id={'t' + props.id}></div>
    )
}

export default Token