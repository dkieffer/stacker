import React from 'react';

function Win(props) {
    let className = 'view';
    if (props.activeView === 'win') {
        className += ' active';
    }

    return (
        <div className={className}>
            <div className="center-view">
                <h1>You Stacked</h1>
                <button className="button" onClick={() => props.startGame(true)}>Continue</button>
            </div>
        </div>
    )
}

export default Win