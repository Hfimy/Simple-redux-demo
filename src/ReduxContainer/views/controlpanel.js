import React, { Component } from 'react';
import Counter from './counter';
import Summary from './summary';

export default class ControlPanel extends Component {
    render() {
        return (
            <div>
                <Counter caption='First' />
                <Counter caption='Second' />
                <Counter caption='Third' />
                <Summary />
            </div>
        )
    }
}