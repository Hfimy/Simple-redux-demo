import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Actions from '../Actions';
// import * as ActionTypes from '../ActionTypes';

import { connect } from 'react-redux';
// import store from '../store';



//无状态组件（UI组件）
function Counter({ caption, addValue, subValue, count }) {
    return (
        <div>
            <button onClick={addValue}>+</button>
            <button onClick={subValue}>-</button>
            <span> {caption} count {count}</span>
        </div>
    )
}

Counter.propTypes = {
    caption: PropTypes.string.isRequired,
    addValue: PropTypes.func.isRequired,
    subValue: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired
}
/*第一个参数state相当于store.getState()的值，store可由this.context.store获得，此处react-redux封装了一切，直接使用
mapStateToProps会订阅Store，每当state更新的时候就会自动执行，重新计算UI组件的参数，从而触发UI组件的重新渲染*/
function mapStateToProps(state, ownProps) {
    return {
        count: state[ownProps.caption]
    }
}
// const mapDispatchToProps = {
//     addValue: (counterCaption) => {
//         return {
//             type: ActionTypes.INCREMENT,
//             counterCaption: counterCaption
//         }
//     },
//     subValue: (counterCaption) => {
//         return {
//             type: ActionTypes.INCREMENT,
//             counterCaption: counterCaption
//         }
//     }
// }

function mapDispatchToProps(dispatch,ownProps){
    return {
        addValue:()=>{
            dispatch(Actions.increment(ownProps.caption));
        },
        subValue:()=>{
            dispatch(Actions.decrement(ownProps.caption))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
/*export default class CounterContainer extends Component {
    constructor(props,context) {
        super(props,context);
        this.addValue = this.addValue.bind(this);
        this.subValue = this.subValue.bind(this);
        this.changeValue = this.changeValue.bind(this);
        this.state = {
            count: this.context.store.getState()[props.caption]
        }
    }
    addValue() {
        this.context.store.dispatch(Actions.increment(this.props.caption));
    }
    subValue() {
        this.context.store.dispatch(Actions.decrement(this.props.caption));
    }
    changeValue() {
        this.setState({ count: this.context.store.getState()[this.props.caption] })
    }
    componentDidMount() {
        this.context.store.subscribe(this.changeValue);
    }
    componentWillUnmount() {
        this.context.store.unsubscribe(this.changeValue);
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.caption !== this.props.caption) || (nextState.count !== this.state.count);
    }

    render() {
        // const { caption } = this.props;
        return (
            <Counter caption={this.props.caption} addValue={this.addValue} subValue={this.subValue}
            count={this.state.count}/>
        )
    }
}
CounterContainer.propTypes = {
    caption: PropTypes.string.isRequired
}
CounterContainer.contextTypes={
    store:PropTypes.object
}*/