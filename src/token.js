import React from 'react';
// import './App.css';
import './colors.scss';

class Token extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var divStyle = {
            // backgroundColor: this.props.color,
            top: this.props.yPos,
            left: this.props.xPos
        };
        let className = 'token ' + this.props.color;
        if (this.props.selected === this.props.id) {
            className += ' selected';
        }
        return (
            <div className={className} style={divStyle} id={'t' + this.props.id}></div>
        )
    }
}

export default Token