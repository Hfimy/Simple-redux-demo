import React, { Component } from 'react';
import ControlPanel from './views/controlpanel';

export default class ReduxContainer extends Component {
    render() {
        return (
            <div>
                <h3>Redux组件拆分（容器组件和无状态组件）实现数据通信</h3>
                <ControlPanel />
            </div>
        )
    }
}