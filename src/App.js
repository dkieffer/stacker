import React from 'react';
import logo from './logo.svg';
import './App.css';
import Stack from './stack';
import Token from './token';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tokens: [],
      stacks: [],
      game: {
        colors: 4,
        colorSet: 4,
        stacks: 6,
        stackCapacity: 4
      }
    }
    
    this.chooseRandomStack = this.chooseRandomStack.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    console.log('start game punks');
    const colors = ['red', 'green', 'blue', 'yellow'];
    let xPosSpacing = 80 / this.state.game.stacks;
    let stacks = [];
    for (var i = 0; i < this.state.game.stacks; i++) {
      let stack = {
        id: i,
        count: 0,
        xPos: (i + 1) * xPosSpacing,
        yPos: 20
      }
      stacks.push(stack);
    }

    let tokens = [];
    for (var i = 0; i < (this.state.game.colors); i++) {
      for (var j = 0; j < this.state.game.colorSet; j++) {
        let chosenStack = this.chooseRandomStack(stacks);
        stacks[chosenStack].count++;
        let token = {
          id: i,
          color: colors[j],
          stack: chosenStack,
          stackPos: stacks[chosenStack].count,
          xPos: stacks[chosenStack].xPos,
          yPos: (stacks[chosenStack].count * 5) + stacks[chosenStack].yPos
        }
        tokens.push(token);
      }
    }

    this.setState((state) => ({
      stacks: stacks,
      tokens: tokens
    }))
  }

  chooseRandomStack(stackSet) {
    var stackChoice = Math.floor(Math.random() * this.state.game.stacks);
    while (stackSet[stackChoice].count > this.state.game.stackCapacity - 1) {
      stackChoice = Math.floor(Math.random() * this.state.game.stacks)
    }
    return stackChoice;
  }


  render() {
    let stacks = [];
    for (var i = 0; i < this.state.stacks.length; i++) {
      let xPos = this.state.stacks[i].xPos  + '%';
      stacks.push(<Stack top="20%" left={xPos} key={this.state.stacks[i].id} />);
    }
    let tokens = [];
    for (var i = 0; i < this.state.tokens.length; i++) {
      let xPos = this.state.tokens[i].xPos  + '%';
      let yPos = this.state.tokens[i].yPos  + '%';
      tokens.push(<Token id={this.state.tokens[i].id} color={this.state.tokens[i].color} xPos={xPos} yPos={yPos} />);
    }

    return (
        <div className="App">
          <header className="App-header">
            {stacks}
            {tokens}
            {/* <Token color="lightblue" /> */}
            <img src={logo} className="App-logo" alt="logo" />
            <p onClick={() => this.startGame()}>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      );
    }
  }


export default App;
