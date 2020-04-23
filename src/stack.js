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
        console.log(this.props.selected);
        if (this.props.selected === this.props.id) {
            className += ' selected';
        }

        return (
            <div id={'s' + this.props.id} className={className} style={divStyle} onClick={() => this.props.function(id)}></div>
        )
    }
}

export default Stack