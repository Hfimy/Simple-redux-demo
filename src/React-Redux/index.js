import React, { Component } from 'react';
import ControlPanel from './views/controlpanel';
import store from './store';
import {Provider} from 'react-redux';
// import Provider from './provider';

export default class ReactRedux extends Component {
    render() {
        return (
            <div>
                <h3>React-Redux实现</h3>
                <Provider store={store}>
                    <ControlPanel />
                </Provider>
            </div>
        )
    }
}