import React, { Component } from 'react';
import ControlPanel from './views/controlpanel';
import store from './store';
import Provider from './provider';

export default class ReduxContext extends Component {
    render() {
        return (
            <div>
                <h3>Redux组件拆分（容器组件和无状态组件）实现数据通信 + 使用Context</h3>
                <Provider store={store}>
                    <ControlPanel />
                </Provider>
            </div>
        )
    }
}