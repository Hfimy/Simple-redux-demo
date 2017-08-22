import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import SummaryStore from '../stores/SummaryStore';
import store from '../store';

function Summary({summary}) {
    return (
        <div>
            Total count: {summary}
        </div>
    )
}
Summary.PropTypes = {
    sum: PropTypes.number.isRequired
}
export default class SummaryContainer extends Component {
    constructor(props) {
        super(props);
        this.onUpdate = this.onUpdate.bind(this);
        this.state = this.getSummary();
    }
    getSummary() {
        const state = store.getState()
        let sum = 0;
        for (let key in state) {
            if (state.hasOwnProperty(key)) {
                sum += state[key]
            }
        }
        return { summary: sum }
    }
    componentDidMount() {
        store.subscribe(this.onUpdate);
    }
    componentWillUnmount() {
        store.unsubscribe(this.onUpdate);
    }
    shouldComponentUpdate = (nextProps, nextState) => {
        return nextState.summary !== this.state.summary
    }
    onUpdate() {
        this.setState(this.getSummary());
    }
    render() {
        return (
            <Summary summary={this.state.summary} />
        )
    }
}