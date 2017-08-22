import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CounterStore from '../stores/CounterStore';
import * as Actions from '../Action';


export default class Counter extends Component {
    constructor(props) {
        super(props);
        this.addValue = this.addValue.bind(this);
        this.subValue = this.subValue.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.state = {
            count: CounterStore.getCounterValues()[props.caption]
        };
    }
    addValue() {
        Actions.increment(this.props.caption);
    }
    subValue() {
        Actions.decrement(this.props.caption);
    }
    changeValue() {
        const newCount = CounterStore.getCounterValues()[this.props.caption];
        this.setState({ count: newCount })
    }
    componentDidMount() {
        CounterStore.addChangeListener(this.changeValue);
    }
    componentWillUnmount() {
        CounterStore.removeChangeListener(this.changeValue);
    }
    shouldComponentUpdate (nextProps, nextState){
        return (nextProps.caption!==this.props.caption)||(nextState.count!==this.state.count);
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
Counter.propTypes = {
    caption: PropTypes.string.isRequired
}
