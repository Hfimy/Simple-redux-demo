import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// import SummaryStore from '../stores/SummaryStore';
// import store from '../store';

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
function mapStateToProps(state){
    let sum=0;
    for(let key in state){
        if(state.hasOwnProperty(key)){
            sum+=state[key]
        }
    }
    return {summary:sum}
}
export default connect(mapStateToProps)(Summary);
/*export default class SummaryContainer extends Component {
    constructor(props,context) {
        super(props,context);
        this.onUpdate = this.onUpdate.bind(this);
        this.state = this.getSummary();
    }
    getSummary() {
        const state = this.context.store.getState()
        let sum = 0;
        for (let key in state) {
            if (state.hasOwnProperty(key)) {
                sum += state[key]
            }
        }
        return { summary: sum }
    }
    componentDidMount() {
        this.context.store.subscribe(this.onUpdate);
    }
    componentWillUnmount() {
        this.context.store.unsubscribe(this.onUpdate);
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
SummaryContainer.contextTypes={
    store:PropTypes.object
}*/