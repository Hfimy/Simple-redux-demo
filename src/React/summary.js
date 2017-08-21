import React, { Component } from 'react';
import Counter from './counter';

export default class Summary extends Component {
    constructor(props){
        super(props);
        this.initValues=[0,10,20];
        const initSum=this.initValues.reduce((a,b)=>a+b);
        this.state={
            summary:initSum
        }
        this.updateSummary=this.updateSummary.bind(this);
    }
    updateSummary(changeValue){
        this.setState({
            summary:this.state.summary+changeValue
        })
    }
    render() {
        return (
            <div>
                <Counter onClickButton={this.updateSummary} initValue={this.initValues[0]}/>
                <Counter onClickButton={this.updateSummary} caption="Second" initValue={this.initValues[1]}/>
                <Counter onClickButton={this.updateSummary} caption='Third' initValue={this.initValues[2]}/>
                <p>Total count: {this.state.summary}</p>
            </div>
        )
    }
}