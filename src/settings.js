import React from 'react';

function Settings(props) {
    let className = 'view';
    if (props.activeView === 'settings') {
        className += ' active';
    }

    return (
        <div className={className}>
            <div className="">
                <h1>Settings</h1>
                <p>Level {props.level}<button className="button" onClick={() => props.startOver()}>Start Over</button></p>
                <button className="button exit-button top left" onClick={() => props.quitGame()}>Exit</button>
            </div>
        </div>
    )
}

export default Settings