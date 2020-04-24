import React from 'react';
// import './App.css';

class Win extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let className = 'view';
        if (this.props.activeView === 'win') {
            className += ' active';
        }

        return (
            <div className={className}>
                <h1>You Stacked</h1>
                <button className="button" onClick={() => this.props.startGame()}>Continue</button>
            </div>
        )
    }
}

export default Win