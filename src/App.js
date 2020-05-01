import React from 'react';
import './App.css';
import Stack from './stack';
import Token from './token';
import Menu from './menu';
import Win from './win';
import Game from './game';
import Settings from './settings';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeView: 'start',
      tokens: [],
      stacks: [],
      game: {
        tokenSet: 4,
        colorSet: 2,
        stacks: 3,
        stackCapacity: 4,
        level: 1
      },
      selectedStack: null,
      previouslySelectedStack: null,
      selectedToken: null,
      moveCounter: 0,
      previousView: 'start'
    }
    this.chooseRandomStack = this.chooseRandomStack.bind(this);
    this.startGame = this.startGame.bind(this);
    this.manageStackAction = this.manageStackAction.bind(this);
    this.selectStack = this.selectStack.bind(this);
    this.deselectStack = this.deselectStack.bind(this);
    this.moveToken = this.moveToken.bind(this);
    this.quitGame = this.quitGame.bind(this);
    this.initGame = this.initGame.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.startOver = this.startOver.bind(this);
  }
  componentDidMount() {
    // console.log('hey der hey')
    this.checkSavedLevel();
  }

  checkSavedLevel() {
    if (!localStorage.getItem('level')) {
      localStorage.setItem('level', 1);
    }
    let lvl = localStorage.getItem('level');
    this.setState((state) => ({
      game: {
        ...state.game,
        level: lvl
      }
    }))
  }

  initGame(lvlup) {
    console.log('init game');
    if (!localStorage.getItem('level')) {
      localStorage.setItem('level', 1);
    }
    let lvl = this.state.game.level;
    if (lvlup) {
      lvl++;
    }
    localStorage.setItem('level', lvl);

    this.setState((state) => ({
      moveCounter: 0,
      game: {
        ...state.game,
        level: lvl
      }
    }), function() {this.setupGame()})
  }

  setupGame() {
    console.log('setup game');
    var stackQuantity = (Math.floor(this.state.game.level * 0.25) + 3);
    console.log('stack quantity: ' + stackQuantity);
    this.setState((state) => ({
      game: {
        ...state.game,
        stacks: stackQuantity,
        colorSet: stackQuantity - 1
      }
    }), function() {this.startGame()})
  }

  startGame() {
    console.log('start game');
    const colors = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
    // let xPosSpacing = 48;
    var stackPositions = this.positionStacks(this.state.game.stacks);
    console.log(stackPositions);
    let stacks = [];
    for (let i = 0; i < this.state.game.stacks; i++) {
      let stack = {
        id: i,
        xPos: stackPositions[i].xPos,
        yPos: stackPositions[i].yPos,
        contents: [],
        selected: false
      }
      stacks.push(stack);
    }
    console.log(stacks);

    let tokens = [];
    let tokenCounter = 0;
    for (let i = 0; i < (this.state.game.tokenSet); i++) {
      for (var j = 0; j < this.state.game.colorSet; j++) {
        
        let chosenStack = this.chooseRandomStack(stacks);
        let token = {
          id: tokenCounter,
          color: colors[j],
          stack: chosenStack,
          stackPos: stacks[chosenStack].contents.length,
          xPos: stacks[chosenStack].xPos,
          yPos: (-stacks[chosenStack].contents.length * 25) + (stacks[chosenStack].yPos + 103 - 25)
        }
        tokenCounter++;
        stacks[chosenStack].contents.push(token.id)
        tokens.push(token);
      }
    }
    console.log('ready to set state');
    this.setState((state) => ({
      activeView: 'game',
      stacks: stacks,
      tokens: tokens
    }), function() {console.log(this.state.stacks)})
  }

  positionStacks(stacks) {
    console.log('position stacks');
    const maxRowLength = 5;
    const stackWidth = 48;
    const stackHeight = 103;
    const stackSpacer = 12;

    var stackQuantity = stacks;
    var rowQuantity = Math.ceil(stackQuantity / maxRowLength);
    var fullRowQuantity = Math.ceil(stackQuantity / rowQuantity);
    var remainderRowQuantity = stackQuantity % fullRowQuantity;
    if (remainderRowQuantity === 0) {
      remainderRowQuantity = fullRowQuantity;
    }
    var rowInventory = [];
    if (stackQuantity < maxRowLength) {
      rowInventory.push(stackQuantity);
    } else {
      rowInventory.push(remainderRowQuantity);
      for (let i = 0; i < rowQuantity - 1; i++) {
        rowInventory.push(fullRowQuantity);
      }
    }
    // console.log(rowInventory);
    
    var stackPositions = [];
    let centerYOffset = (((rowQuantity * stackHeight) + ((rowQuantity - 1) * stackSpacer)) / 2);
    for (let i = 0; i < rowInventory.length; i++) {
      let centerXOffset = (((rowInventory[i] * stackWidth) + ((rowInventory[i] - 1) * stackSpacer)) / 2);
      for(var j = 0; j < rowInventory[i]; j++) {
        let coords = {
          xPos: (stackWidth * j) + (stackSpacer * j) - centerXOffset,
          yPos: (stackHeight * i) + (stackSpacer * i) - centerYOffset
        }
        stackPositions.push(coords);
      }
    }
    // console.log(stackPositions);
    return stackPositions;
  }

  chooseRandomStack(stackSet) {
    console.log('choose random stack');
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
        if (this.state.stacks[id].contents.length >= this.state.game.stackCapacity) {
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
          yPos: ((-state.stacks[stackID].contents.length * 25) + (state.stacks[stackID].yPos + 103 - 25)),
          zIndex: state.stacks[stackID].contents.length
        } : el
      ),
      stacks: state.stacks.map(
        el => (el.id === stackID) ? {
          ...el,
          contents: newStackContent,
        } : el
      ),
      moveCounter: state.moveCounter++
    }), this.checkForWin)
    // console.log(this.state.stacks);
  }

  checkForWin() {
    console.log('CHECK FOR WIN');
    for (let i = 0; i < this.state.stacks.length; i++) {
      // console.log('Stack ' + i);
      // console.log('Contents: ' + this.state.stacks[i].contents);
      if (this.state.stacks[i].contents.length !== this.state.game.tokenSet && this.state.stacks[i].contents.length !== 0) {
        // console.log('Stack not full, quit this check');
        return
      }
      for (let j = 0; j < this.state.stacks[i].contents.length; j++) {
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

  toggleSettings() {
    if (this.state.activeView !== 'settings') {
      this.setState((state) => ({
        activeView: 'settings',
        previousView: state.previousView
      }));
    } else {
      this.setState((state) => ({
        activeView: state.previousView,
        previousView: 'settings'
      }));
    }
  }

  startOver() {
    localStorage.setItem('level', 1);
    this.setState((state) => ({
      game: {
        ...state.game,
        level: 1
      }
    }))
  }

  render() {
    let stacks = [];
    for (let i = 0; i < this.state.stacks.length; i++) {
      let xPos = this.state.stacks[i].xPos  + '%';
      let height = (this.state.game.stackCapacity * 45) + 'px';
      stacks.push(<Stack top="50%" left={xPos} height={height} id={i} function={this.manageStackAction} selected={this.state.selectedStack} />);
    }
    let tokens = [];
    for (let i = 0; i < this.state.tokens.length; i++) {
      let xPos = this.state.tokens[i].xPos  + '%';
      let yPos = this.state.tokens[i].yPos  + '%';
      tokens.push(<Token id={this.state.tokens[i].id} color={this.state.tokens[i].color} xPos={xPos} yPos={yPos} selected={this.state.selectedToken} />);
    }

    return (
        <div className="App">
          <Settings 
            activeView={this.state.activeView}
            quitGame={this.quitGame}
            level={this.state.game.level}
            startOver={this.startOver}
          />
          <Menu
            initGame={this.initGame}
            activeView={this.state.activeView}
            level={this.state.game.level} 
            toggleSettings={this.toggleSettings}
          />
          <Win startGame={this.initGame} activeView={this.state.activeView} level={this.state.game.level} />
          <Game 
            stacks={this.state.stacks}
            game={this.state.game}
            selectStack={this.state.selectedStack}
            tokens={this.state.tokens}
            selectedToken={this.state.selectedToken}
            activeView={this.state.activeView} 
            manageStackAction={this.manageStackAction}
            quitGame={this.quitGame}
            level={this.state.game.level}
            moveCounter={this.state.moveCounter}
          />

        </div>
      );
    }
  }
  
export default App;
