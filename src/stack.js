import React from 'react';

function Stack(props) {
    const divStyle = {
        top: props.top,
        left: props.left,
        height: props.height
    };
    let id = props.id;
    let className = 'stack';
    if (props.selected === props.id) {
        className += ' selected';
    }

    return (
        <div id={'s' + props.id} className={className} style={divStyle} onClick={() => props.function(id)}></div>
    )
}

export default Stack