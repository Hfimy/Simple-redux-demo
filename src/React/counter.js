import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Counter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: props.initValue || 0
        };
        this.addValue=this.addValue.bind(this);
        this.subValue=this.subValue.bind(this);
        this.changeValue=this.changeValue.bind(this);
    }
    addValue(){
        this.changeValue(true);
    }
    subValue(){
        this.changeValue(false);
    }
    changeValue(isTrue){
        const changeValue=isTrue?1:-1;
        this.setState({count:this.state.count+changeValue});
        this.props.onClickButton(changeValue);
    }
    render() {
        // const { caption } = this.props;
        return (
            <div>
                <button onClick={this.addValue}>+</button>
                <button onClick={this.subValue}>-</button>
                <span> {this.props.caption} count {this.state.count}</span>
            </div>
        )
    }
}
Counter.propTypes={
    initValue:PropTypes.number,
    caption:PropTypes.string,
    onClickButton:PropTypes.func
}
Counter.defaultProps={
    caption:'First',
    onClickButton:f=>f
}