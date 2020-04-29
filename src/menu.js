import React from 'react';
// import './App.css';

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let className = 'view';
        if (this.props.activeView === 'start') {
            className += ' active';
        }

        return (
            <div className={className}>
                <div>
                    <h1>Stacker</h1>
                    <button className="button" onClick={() => this.props.initGame()}>Play</button>
                    <button className="button exit-button top left" onClick={() => this.props.toggleSettings()}>Settings</button>
                </div>
            </div>
        )
    }
}

export default Menu