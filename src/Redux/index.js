import React, { Component } from 'react';
import ControlPanel from './views/controlpanel';

export default class ReduxVersion extends Component {
    render() {
        return (
            <div>
                <h3>Redux实现数据通信</h3>
                <ControlPanel />
            </div>
        )
    }
}