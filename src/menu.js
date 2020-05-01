import React from 'react';

function Menu(props) {
    let className = 'view';
    if (props.activeView === 'start') {
        className += ' active';
    }

    return (
        <div className={className}>
            <div>
                <h1>Stacker</h1>
                <button className="button" onClick={() => props.initGame()}>Play</button>
                <button className="button exit-button top left" onClick={() => props.toggleSettings()}>Settings</button>
            </div>
        </div>
    )
}

export default Menu