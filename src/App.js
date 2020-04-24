import React from 'react';
import logo from './logo.svg';
import './App.css';
import Stack from './stack';
import Token from './token';
import Menu from './menu';
import Win from './win';
import Game from './game';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeView: 'start',
      tokens: [],
      stacks: [],
      game: {
        colors: 4,
        colorSet: 4,
        stacks: 6,
        stackCapacity: 4
      },
      selectedStack: null,
      previouslySelectedStack: null,
      selectedToken: null
    }
    this.chooseRandomStack = this.chooseRandomStack.bind(this);
    this.startGame = this.startGame.bind(this);
    this.manageStackAction = this.manageStackAction.bind(this);
    this.selectStack = this.selectStack.bind(this);
    this.deselectStack = this.deselectStack.bind(this);
    this.moveToken = this.moveToken.bind(this);
    this.quitGame = this.quitGame.bind(this);
  }

  startGame() {
    // console.log('start game punks');

    const colors = ['red', 'green', 'blue', 'yellow'];
    let xPosSpacing = 80 / this.state.game.stacks;
    let stacks = [];
    for (var i = 0; i < this.state.game.stacks; i++) {
      let stack = {
        id: i,
        xPos: (i + 1) * xPosSpacing,
        yPos: 20,
        contents: [],
        selected: false
      }
      stacks.push(stack);
    }

    let tokens = [];
    let tokenCounter = 0;
    for (var i = 0; i < (this.state.game.colors); i++) {
      for (var j = 0; j < this.state.game.colorSet; j++) {
        
        let chosenStack = this.chooseRandomStack(stacks);
        let token = {
          id: tokenCounter,
          color: colors[j],
          stack: chosenStack,
          stackPos: stacks[chosenStack].contents.length,
          xPos: stacks[chosenStack].xPos,
          yPos: (stacks[chosenStack].contents.length * -5) + (stacks[chosenStack].yPos + 50)
        }
        tokenCounter++;
        stacks[chosenStack].contents.push(token.id)
        tokens.push(token);
      }
    }
    this.setState((state) => ({
      activeView: 'game',
      stacks: stacks,
      tokens: tokens
    }))
  }

  chooseRandomStack(stackSet) {
    var stackChoice = Math.floor(Math.random() * this.state.game.stacks);
    while (stackSet[stackChoice].contents.length > this.state.game.stackCapacity - 1) {
      stackChoice = Math.floor(Math.random() * this.state.game.stacks)
    }
    return stackChoice;
  }

  manageStackAction(id) {
    if (this.state.selectedStack === null) {
      if (this.state.stacks[id].contents.length > 0) {
        this.setState((state) => ({
          previouslySelectedStack: id
        }))
        this.selectStack(id);
      } else {
        return
      }
    } else {
      if (this.state.selectedStack === id) {
        this.deselectStack(id);
      } else {
        if (this.state.stacks[id].contents.length >= this.state.game.colorSet) {
          this.deselectStack(this.state.previouslySelectedStack);
        } else {
          let oldStackContent = Array.from(this.state.stacks[this.state.previouslySelectedStack].contents);
          // console.log('old stack content below'); 
          oldStackContent.pop();
          // console.log(oldStackContent);
          this.setState((state) => ({
            stacks: state.stacks.map(
              el => (el.id === state.previouslySelectedStack) ? {
                ...el,
                contents: oldStackContent,
              } : el
            )
          }), function() {this.moveToken(id)})
        }
      }
    }
  }

  selectStack(id) {
    let topToken;
    topToken = this.state.stacks[id].contents[this.state.stacks[id].contents.length - 1];
    this.setState((state) => ({
      selectedStack: id,
      selectedToken: topToken
    }))
  }

  deselectStack(id) {
    // console.log('deselect');
    this.setState((state) => ({
      selectedStack: null,
      selectedToken: null
    }))
  }

  moveToken(stackID) {
    // console.log(stackID);
    let key = this.state.selectedToken;
    let newStackContent = Array.from(this.state.stacks[stackID].contents);
    // console.log(newStackContent);
    newStackContent.push(this.state.selectedToken);
    this.deselectStack(stackID);
    this.setState((state) => ({
      tokens: state.tokens.map(
        el => (el.id === key) ? {
          ...el,
          xPos: state.stacks[stackID].xPos,
          yPos: (((state.stacks[stackID].contents.length) * -5) + state.stacks[stackID].yPos + 50)
        } : el
      ),
      stacks: state.stacks.map(
        el => (el.id === stackID) ? {
          ...el,
          contents: newStackContent,
        } : el
      )
    }), this.checkForWin)
    // console.log(this.state.stacks);
  }

  checkForWin() {
    console.log('CHECK FOR WIN');
    for (var i = 0; i < this.state.stacks.length; i++) {
      // console.log('Stack ' + i);
      // console.log('Contents: ' + this.state.stacks[i].contents);
      if (this.state.stacks[i].contents.length !== this.state.game.colorSet && this.state.stacks[i].contents.length !== 0) {
        // console.log('Stack not full, quit this check');
        return
      }
      for (var j = 0; j < this.state.stacks[i].contents.length; j++) {
        console.log('stack '  + i + ', token ' + j);
        if (this.state.tokens[this.state.stacks[i].contents[j]].color !== this.state.tokens[this.state.stacks[i].contents[0]].color) {
          // console.log('fail');
          return
        }
      }
    }
    this.endGame();
    console.log('you win');
  }

  endGame() {
    this.setState((state) => ({
      activeView: 'win',
    }));
  }

  quitGame() {
    this.setState((state) => ({
      activeView: 'start',
    }));
  }

  getState() {
    console.log(this.state);
  }


  render() {
    let stacks = [];
    for (var i = 0; i < this.state.stacks.length; i++) {
      let xPos = this.state.stacks[i].xPos  + '%';
      let height = (this.state.game.stackCapacity * 45) + 'px';
      stacks.push(<Stack top="50%" left={xPos} height={height} id={i} function={this.manageStackAction} selected={this.state.selectedStack} />);
    }
    let tokens = [];
    for (var i = 0; i < this.state.tokens.length; i++) {
      let xPos = this.state.tokens[i].xPos  + '%';
      let yPos = this.state.tokens[i].yPos  + '%';
      tokens.push(<Token id={this.state.tokens[i].id} color={this.state.tokens[i].color} xPos={xPos} yPos={yPos} selected={this.state.selectedToken} />);
    }

    return (
        <div className="App">
          <Menu startGame={this.startGame} activeView={this.state.activeView} />
          <Win startGame={this.startGame} activeView={this.state.activeView} />
          <Game 
            stacks={this.state.stacks}
            game={this.state.game}
            selectStack={this.state.selectedStack}
            tokens={this.state.tokens}
            selectedToken={this.state.selectedToken}
            activeView={this.state.activeView} 
            manageStackAction={this.manageStackAction}
            quitGame={this.quitGame}
          />

        </div>
      );
    }
  }
  
export default App;
