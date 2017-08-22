import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Actions from '../Action';
import store from '../store';

export default class Counter extends Component {
    constructor(props) {
        super(props);
        this.addValue = this.addValue.bind(this);
        this.subValue = this.subValue.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.state = {
            count: store.getState()[props.caption]
        }
    }
    addValue() {
        store.dispatch(Actions.increment(this.props.caption));
    }
    subValue() {
        store.dispatch(Actions.decrement(this.props.caption));
    }
    changeValue() {
        this.setState({ count: store.getState()[this.props.caption] })
    }
    componentDidMount() {
        store.subscribe(this.changeValue);
    }
    componentWillUnmount() {
        store.unsubscribe(this.changeValue);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.caption !== this.props.caption) || (nextState.count !== this.state.count);
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
