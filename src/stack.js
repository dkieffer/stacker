import React from 'react';
import logo from './logo.svg';
// import './App.css';

class Stack extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const divStyle = {
            top: this.props.top,
            left: this.props.left
        };
        return (
            <div class="stack" style={divStyle}></div>
        )
    }
}

export default Stack