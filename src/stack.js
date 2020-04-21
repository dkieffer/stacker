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
        let id = this.props.id;
        let className = 'stack';
        if (this.props.selected === this.props.id) {
            className += ' selected';
        }

        return (
            <div className={className} style={divStyle} onClick={() => this.props.function(id)}></div>
        )
    }
}

export default Stack