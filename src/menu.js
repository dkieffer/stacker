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
                <h1>Stacker</h1>
                <button className="button" onClick={() => this.props.startGame()}>Play</button>
            </div>
        )
    }
}

export default Menu