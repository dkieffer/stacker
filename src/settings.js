import React from 'react';
// import './App.css';

class Settings extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let className = 'view';
        if (this.props.activeView === 'settings') {
            className += ' active';
        }

        return (
            <div className={className}>
                <div className="">
                    <h1>Settings</h1>
                    <p>Level {this.props.level}<button className="button" onClick={() => this.props.startOver()}>Start Over</button></p>
                    <button className="button exit-button top left" onClick={() => this.props.quitGame()}>Exit</button>

                </div>
            </div>
        )
    }
}

export default Settings