import React from 'react';
import Stack from './stack';
import Token from './token';

function Game(props) {
    let className = 'view';
    if (props.activeView === 'game') {
        className += ' active';
    }

    let stacks = [];
    // var i;
    for (let i = 0; i < props.stacks.length; i++) {
        let xPos = 'calc(50vw + ' + props.stacks[i].xPos + 'px)';
        let yPos = 'calc(' + props.stacks[i].yPos + 'px + 50vh)';
        let height = '103px';
        // console.log(props.stacks[i].yPos);
        // console.log(yPos);
        stacks.push(<Stack top={yPos} left={xPos} height={height} id={i} key={i} function={props.manageStackAction} selected={props.selectedStack} />);
    }

    let tokens = [];
    for (let i = 0; i < props.tokens.length; i++) {
        let xPos = 'calc(' + props.tokens[i].xPos + 'px + 50vw)';
        let yPos = 'calc(' + props.tokens[i].yPos + 'px + 50vh)';
        let zIndex = props.tokens[i].zIndex;
        tokens.push(<Token id={props.tokens[i].id} key={i} color={props.tokens[i].color} xPos={xPos} yPos={yPos} zIndex={zIndex} selected={props.selectedToken} />);
    }

    return (
        <div className={className}>
            <div>
                {stacks}
                {tokens}
            </div>
            <div>
                <p className="hud">{props.level}</p>
                <button className="button exit-button" onClick={() => props.quitGame()}>Exit</button>
                <p className="counter">{props.moveCounter}</p>
            </div>
        </div>
    );
}

export default Game