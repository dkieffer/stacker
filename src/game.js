import React from 'react';
// import './App.css';
import Stack from './stack';
import Token from './token';

class Game extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let className = 'view';
        if (this.props.activeView === 'game') {
            className += ' active';
        }

        let stacks = [];
        for (var i = 0; i < this.props.stacks.length; i++) {
            let xPos = this.props.stacks[i].xPos  + '%';
            let height = (this.props.game.stackCapacity * 45) + 'px';
            stacks.push(<Stack top="50%" left={xPos} height={height} id={i} function={this.props.manageStackAction} selected={this.props.selectedStack} />);
        }

        let tokens = [];
        for (var i = 0; i < this.props.tokens.length; i++) {
            let xPos = this.props.tokens[i].xPos  + '%';
            let yPos = this.props.tokens[i].yPos  + '%';
            tokens.push(<Token id={this.props.tokens[i].id} color={this.props.tokens[i].color} xPos={xPos} yPos={yPos} selected={this.props.selectedToken} />);
        }
    
        return (
            <div className={className}>
                <div>
                    {stacks}
                    {tokens}
                </div>
                <div>
                    <button className="button" onClick={() => this.props.quitGame()}>Exit</button>
                </div>
            </div>
        );
    }
}

export default Game