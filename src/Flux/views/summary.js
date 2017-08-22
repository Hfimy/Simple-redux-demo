import React, { Component } from 'react';
import SummaryStore from '../stores/SummaryStore';

export default class Summary extends Component {
    constructor(props){
        super(props);
        this.onUpdate=this.onUpdate.bind(this);
        this.state={
            summary:SummaryStore.getSummary()
        }
    }
    componentDidMount(){
        SummaryStore.addChangeListener(this.onUpdate);
    }
    componentWillUnmount(){
        SummaryStore.removeChangeListener(this.onUpdate);
    }
    shouldComponentUpdate = (nextProps, nextState) => {
        return nextState.summary!==this.state.summary
    }
    
    onUpdate(){
        const newSummary=SummaryStore.getSummary();
        this.setState({
            summary:newSummary
        })
    }
    render() {
        return (
            <div>
                Total count: {this.state.summary}
            </div>
        )
    }
}