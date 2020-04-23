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
  }

  startGame() {
    // console.log('start game punks');
    const colors = ['red', 'green', 'blue', 'yellow'];
    let xPosSpacing = 80 / this.state.game.stacks;
    let stacks = [];
    for (var i = 0; i < this.state.game.stacks; i++) {
      let stack = {
        id: i,
        count: 0,
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
        tokenCounter++;
        let chosenStack = this.chooseRandomStack(stacks);
        stacks[chosenStack].count++;
        let token = {
          id: tokenCounter,
          color: colors[j],
          stack: chosenStack,
          stackPos: stacks[chosenStack].count,
          xPos: stacks[chosenStack].xPos,
          yPos: (stacks[chosenStack].count * -5) + (stacks[chosenStack].yPos + 50)
        }
        stacks[chosenStack].contents.push(token.id)
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

  manageStackAction(id) {
    if (this.state.selectedStack === null) {
      if (this.state.stacks[id].count > 0) {
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
          this.selectStack(id);
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
                count: state.stacks[id].count - 1
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
          yPos: (((state.stacks[stackID].count + 1) * -5) + state.stacks[stackID].yPos + 50)
        } : el
      ),
      stacks: state.stacks.map(
        el => (el.id === stackID) ? {
          ...el,
          contents: newStackContent,
          count: state.stacks[stackID].count + 1
        } : el
      )
    }), this.checkForWin)
    // console.log(this.state.stacks);
  }

  checkForWin() {
    console.log('CHECK FOR WIN');
    for (var i = 0; i < this.state.stacks.length; i++) {
      console.log('Stack ' + i);
      console.log('Contents: ' + this.state.stacks[i].contents);
      if (this.state.stacks[i].contents.length !== this.state.game.colorSet || this.state.stacks[i].contents.length !== 0) {
        console.log('Stack not full, quit this check');
        return
      }
      for (var j = 0; j < this.state.stacks[i].contents.length; j++) {
        if (this.state.tokens[this.state.stacks[i].contents[j]].color !== this.state.tokens[this.state.stacks[i].contents[0]].color) {
          console.log('fail');
          return
        }

      }
    }
  }

  getState() {
    console.log(this.state);
  }


  render() {
    let stacks = [];
    for (var i = 0; i < this.state.stacks.length; i++) {
      let xPos = this.state.stacks[i].xPos  + '%';
      stacks.push(<Stack top="20%" left={xPos} id={i} function={this.manageStackAction} selected={this.state.selectedStack} />);
    }
    let tokens = [];
    for (var i = 0; i < this.state.tokens.length; i++) {
      let xPos = this.state.tokens[i].xPos  + '%';
      let yPos = this.state.tokens[i].yPos  + '%';
      tokens.push(<Token id={this.state.tokens[i].id} color={this.state.tokens[i].color} xPos={xPos} yPos={yPos} selected={this.state.selectedToken} />);
    }

    return (
        <div className="App">
          <header className="App-header">
            {stacks}
            {tokens}
            {/* <Token color="lightblue" /> */}
            <img src={logo} className="App-logo" alt="logo" />
            <button className="button" onClick={() => this.startGame()}>
              Start Game
            </button>
            <button className="button" onClick={() => this.getState()}>
              Log App State
            </button>
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
