(this.webpackJsonpstacker=this.webpackJsonpstacker||[]).push([[0],[,,,,,,,,,function(t,e,s){t.exports=s(18)},,,,,function(t,e,s){},function(t,e,s){},function(t,e,s){t.exports=s.p+"static/media/logo.5d5d9eef.svg"},function(t,e,s){},function(t,e,s){"use strict";s.r(e);var a=s(0),n=s.n(a),o=s(8),c=s.n(o),i=(s(14),s(6)),r=s(1),l=s(2),u=s(5),h=s(4),v=s(3),k=(s(15),s(16),function(t){Object(h.a)(s,t);var e=Object(v.a)(s);function s(t){return Object(r.a)(this,s),e.call(this,t)}return Object(l.a)(s,[{key:"render",value:function(){var t=this,e={top:this.props.top,left:this.props.left,height:this.props.height},s=this.props.id,a="stack";return this.props.selected===this.props.id&&(a+=" selected"),n.a.createElement("div",{id:"s"+this.props.id,className:a,style:e,onClick:function(){return t.props.function(s)}})}}]),s}(n.a.Component)),m=(s(17),function(t){Object(h.a)(s,t);var e=Object(v.a)(s);function s(t){return Object(r.a)(this,s),e.call(this,t)}return Object(l.a)(s,[{key:"render",value:function(){var t={top:this.props.yPos,left:this.props.xPos},e="token "+this.props.color;return this.props.selected===this.props.id&&(e+=" selected"),n.a.createElement("div",{className:e,style:t,id:"t"+this.props.id})}}]),s}(n.a.Component)),p=function(t){Object(h.a)(s,t);var e=Object(v.a)(s);function s(t){return Object(r.a)(this,s),e.call(this,t)}return Object(l.a)(s,[{key:"render",value:function(){var t=this,e="view";return"start"===this.props.activeView&&(e+=" active"),n.a.createElement("div",{className:e},n.a.createElement("div",null,n.a.createElement("h1",null,"Stacker"),n.a.createElement("button",{className:"button",onClick:function(){return t.props.initGame()}},"Play"),n.a.createElement("button",{className:"button exit-button top left",onClick:function(){return t.props.toggleSettings()}},"Settings")))}}]),s}(n.a.Component),g=function(t){Object(h.a)(s,t);var e=Object(v.a)(s);function s(t){return Object(r.a)(this,s),e.call(this,t)}return Object(l.a)(s,[{key:"render",value:function(){var t=this,e="view";return"win"===this.props.activeView&&(e+=" active"),n.a.createElement("div",{className:e},n.a.createElement("div",{className:"center-view"},n.a.createElement("h1",null,"You Stacked"),n.a.createElement("button",{className:"button",onClick:function(){return t.props.startGame(!0)}},"Continue")))}}]),s}(n.a.Component),d=function(t){Object(h.a)(s,t);var e=Object(v.a)(s);function s(t){return Object(r.a)(this,s),e.call(this,t)}return Object(l.a)(s,[{key:"render",value:function(){var t=this,e="view";"game"===this.props.activeView&&(e+=" active");for(var s=[],a=0;a<this.props.stacks.length;a++){var o="calc(50vw + "+this.props.stacks[a].xPos+"px)",c="calc("+this.props.stacks[a].yPos+"px + 50vh)";console.log(this.props.stacks[a].yPos),console.log(c),s.push(n.a.createElement(k,{top:c,left:o,height:"103px",id:a,function:this.props.manageStackAction,selected:this.props.selectedStack}))}var i=[];for(a=0;a<this.props.tokens.length;a++){var r="calc("+this.props.tokens[a].xPos+"px + 50vw)",l="calc("+this.props.tokens[a].yPos+"px + 50vh)";i.push(n.a.createElement(m,{id:this.props.tokens[a].id,color:this.props.tokens[a].color,xPos:r,yPos:l,selected:this.props.selectedToken}))}return n.a.createElement("div",{className:e},n.a.createElement("div",null,s,i),n.a.createElement("div",null,n.a.createElement("p",{className:"hud"},this.props.level),n.a.createElement("button",{className:"button exit-button",onClick:function(){return t.props.quitGame()}},"Exit"),n.a.createElement("p",{className:"counter"},this.props.moveCounter)))}}]),s}(n.a.Component),f=function(t){Object(h.a)(s,t);var e=Object(v.a)(s);function s(t){return Object(r.a)(this,s),e.call(this,t)}return Object(l.a)(s,[{key:"render",value:function(){var t=this,e="view";return"settings"===this.props.activeView&&(e+=" active"),n.a.createElement("div",{className:e},n.a.createElement("div",{className:""},n.a.createElement("h1",null,"Settings"),n.a.createElement("p",null,"Level ",this.props.level,n.a.createElement("button",{className:"button",onClick:function(){return t.props.startOver()}},"Start Over")),n.a.createElement("button",{className:"button exit-button top left",onClick:function(){return t.props.quitGame()}},"Exit")))}}]),s}(n.a.Component),S=function(t){Object(h.a)(s,t);var e=Object(v.a)(s);function s(t){var a;return Object(r.a)(this,s),(a=e.call(this,t)).state={activeView:"start",tokens:[],stacks:[],game:{tokenSet:4,colorSet:2,stacks:3,stackCapacity:4,level:1},selectedStack:null,previouslySelectedStack:null,selectedToken:null,moveCounter:0,previousView:"start"},a.chooseRandomStack=a.chooseRandomStack.bind(Object(u.a)(a)),a.startGame=a.startGame.bind(Object(u.a)(a)),a.manageStackAction=a.manageStackAction.bind(Object(u.a)(a)),a.selectStack=a.selectStack.bind(Object(u.a)(a)),a.deselectStack=a.deselectStack.bind(Object(u.a)(a)),a.moveToken=a.moveToken.bind(Object(u.a)(a)),a.quitGame=a.quitGame.bind(Object(u.a)(a)),a.initGame=a.initGame.bind(Object(u.a)(a)),a.toggleSettings=a.toggleSettings.bind(Object(u.a)(a)),a.startOver=a.startOver.bind(Object(u.a)(a)),a}return Object(l.a)(s,[{key:"componentDidMount",value:function(){console.log("hey der hey"),this.checkSavedLevel()}},{key:"checkSavedLevel",value:function(){localStorage.getItem("level")||localStorage.setItem("level",1);var t=localStorage.getItem("level");this.setState((function(e){return{game:Object(i.a)({},e.game,{level:t})}}))}},{key:"initGame",value:function(t){console.log("init game"),localStorage.getItem("level")||localStorage.setItem("level",1);var e=localStorage.getItem("level");t&&e++,localStorage.setItem("level",e),this.setState((function(t){return{moveCounter:0}}),(function(){this.setupGame()}))}},{key:"setupGame",value:function(){console.log("setup game");var t=Math.floor(.25*this.state.game.level)+3;console.log("stack quantity: "+t),this.setState((function(e){return{game:Object(i.a)({},e.game,{stacks:t,colorSet:t-1})}}),(function(){this.startGame()}))}},{key:"startGame",value:function(){console.log("start game");var t=["one","two","three","four","five","six","seven","eight","nine","ten"],e=this.positionStacks(this.state.game.stacks);console.log(e);for(var s=[],a=0;a<this.state.game.stacks;a++){var n={id:a,xPos:e[a].xPos,yPos:e[a].yPos,contents:[],selected:!1};s.push(n)}console.log(s);for(var o=[],c=0,i=0;i<this.state.game.tokenSet;i++)for(var r=0;r<this.state.game.colorSet;r++){var l=this.chooseRandomStack(s),u={id:c,color:t[r],stack:l,stackPos:s[l].contents.length,xPos:s[l].xPos,yPos:25*-s[l].contents.length+(s[l].yPos+103-25)};c++,s[l].contents.push(u.id),o.push(u)}console.log("ready to set state"),this.setState((function(t){return{activeView:"game",stacks:s,tokens:o}}),(function(){console.log(this.state.stacks)}))}},{key:"positionStacks",value:function(t){console.log("position stacks");var e=t,s=Math.ceil(e/5),a=Math.ceil(e/s),n=e%a;0===n&&(n=a);var o=[];if(e<5)o.push(e);else{o.push(n);for(var c=0;c<s-1;c++)o.push(a)}var i=[],r=(103*s+12*(s-1))/2;for(c=0;c<o.length;c++)for(var l=(48*o[c]+12*(o[c]-1))/2,u=0;u<o[c];u++){var h={xPos:48*u+12*u-l,yPos:103*c+12*c-r};i.push(h)}return i}},{key:"chooseRandomStack",value:function(t){console.log("choose random stack");for(var e=Math.floor(Math.random()*this.state.game.stacks);t[e].contents.length>this.state.game.stackCapacity-1;)e=Math.floor(Math.random()*this.state.game.stacks);return e}},{key:"manageStackAction",value:function(t){if(null===this.state.selectedStack){if(!(this.state.stacks[t].contents.length>0))return;this.setState((function(e){return{previouslySelectedStack:t}})),this.selectStack(t)}else if(this.state.selectedStack===t)this.deselectStack(t);else if(this.state.stacks[t].contents.length>=this.state.game.stackCapacity)this.deselectStack(this.state.previouslySelectedStack);else{var e=Array.from(this.state.stacks[this.state.previouslySelectedStack].contents);e.pop(),this.setState((function(t){return{stacks:t.stacks.map((function(s){return s.id===t.previouslySelectedStack?Object(i.a)({},s,{contents:e}):s}))}}),(function(){this.moveToken(t)}))}}},{key:"selectStack",value:function(t){var e;e=this.state.stacks[t].contents[this.state.stacks[t].contents.length-1],this.setState((function(s){return{selectedStack:t,selectedToken:e}}))}},{key:"deselectStack",value:function(t){this.setState((function(t){return{selectedStack:null,selectedToken:null}}))}},{key:"moveToken",value:function(t){var e=this.state.selectedToken,s=Array.from(this.state.stacks[t].contents);s.push(this.state.selectedToken),this.deselectStack(t),this.setState((function(a){return{tokens:a.tokens.map((function(s){return s.id===e?Object(i.a)({},s,{xPos:a.stacks[t].xPos,yPos:25*-a.stacks[t].contents.length+(a.stacks[t].yPos+103-25)}):s})),stacks:a.stacks.map((function(e){return e.id===t?Object(i.a)({},e,{contents:s}):e})),moveCounter:a.moveCounter++}}),this.checkForWin)}},{key:"checkForWin",value:function(){console.log("CHECK FOR WIN");for(var t=0;t<this.state.stacks.length;t++){if(this.state.stacks[t].contents.length!==this.state.game.tokenSet&&0!==this.state.stacks[t].contents.length)return;for(var e=0;e<this.state.stacks[t].contents.length;e++)if(console.log("stack "+t+", token "+e),this.state.tokens[this.state.stacks[t].contents[e]].color!==this.state.tokens[this.state.stacks[t].contents[0]].color)return}this.endGame(),console.log("you win")}},{key:"endGame",value:function(){this.setState((function(t){return{activeView:"win"}}))}},{key:"quitGame",value:function(){this.setState((function(t){return{activeView:"start"}}))}},{key:"getState",value:function(){console.log(this.state)}},{key:"toggleSettings",value:function(){"settings"!==this.state.activeView?this.setState((function(t){return{activeView:"settings",previousView:t.previousView}})):this.setState((function(t){return{activeView:t.previousView,previousView:"settings"}}))}},{key:"startOver",value:function(){localStorage.setItem("level",1),this.setState((function(t){return{game:Object(i.a)({},t.game,{level:1})}}))}},{key:"render",value:function(){for(var t=[],e=0;e<this.state.stacks.length;e++){var s=this.state.stacks[e].xPos+"%",a=45*this.state.game.stackCapacity+"px";t.push(n.a.createElement(k,{top:"50%",left:s,height:a,id:e,function:this.manageStackAction,selected:this.state.selectedStack}))}var o=[];for(e=0;e<this.state.tokens.length;e++){var c=this.state.tokens[e].xPos+"%",i=this.state.tokens[e].yPos+"%";o.push(n.a.createElement(m,{id:this.state.tokens[e].id,color:this.state.tokens[e].color,xPos:c,yPos:i,selected:this.state.selectedToken}))}return n.a.createElement("div",{className:"App"},n.a.createElement(f,{activeView:this.state.activeView,quitGame:this.quitGame,level:this.state.game.level,startOver:this.startOver}),n.a.createElement(p,{initGame:this.initGame,activeView:this.state.activeView,level:this.state.game.level,toggleSettings:this.toggleSettings}),n.a.createElement(g,{startGame:this.initGame,activeView:this.state.activeView,level:this.state.game.level}),n.a.createElement(d,{stacks:this.state.stacks,game:this.state.game,selectStack:this.state.selectedStack,tokens:this.state.tokens,selectedToken:this.state.selectedToken,activeView:this.state.activeView,manageStackAction:this.manageStackAction,quitGame:this.quitGame,level:this.state.game.level,moveCounter:this.state.moveCounter}))}}]),s}(n.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(S,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}],[[9,1,2]]]);
//# sourceMappingURL=main.18817cdd.chunk.js.map