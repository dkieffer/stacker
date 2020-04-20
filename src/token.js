import React from 'react';
// import './App.css';

class Token extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const divStyle = {
            backgroundColor: this.props.color,
            top: this.props.yPos,
            left: this.props.xPos
        };
        return (
            <div class="token" style={divStyle}></div>
        )
    }
}

export default Token