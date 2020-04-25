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
            let xPos = 'calc(50vw + ' + this.props.stacks[i].xPos + 'px)';
            let yPos = 'calc(' + this.props.stacks[i].yPos + 'px + 50vh)';
            let height = '192px';
            console.log(this.props.stacks[i].yPos);
            console.log(yPos);
            stacks.push(<Stack top={yPos} left={xPos} height={height} id={i} function={this.props.manageStackAction} selected={this.props.selectedStack} />);
        }

        let tokens = [];
        for (var i = 0; i < this.props.tokens.length; i++) {
            let xPos = 'calc(' + this.props.tokens[i].xPos + 'px + 50vw)';
            let yPos = 'calc(' + this.props.tokens[i].yPos + 'px + 50vh)';
            tokens.push(<Token id={this.props.tokens[i].id} color={this.props.tokens[i].color} xPos={xPos} yPos={yPos} selected={this.props.selectedToken} />);
        }
    
        return (
            <div className={className}>
                <div className="center-view">
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