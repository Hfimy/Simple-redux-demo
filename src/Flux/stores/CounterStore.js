import AppDispatcher from '../AppDispatcher';
import * as ActionTypes from '../ActionTypes';
import { EventEmitter } from 'events';

const counterValues = {
    'First': 0,
    'Second': 10,
    'Third': 20
};
const CounterStore = Object.assign({}, EventEmitter.prototype, {
    getCounterValues: function () {
        return counterValues;
    },
    addChangeListener: function (callback) {
        this.on('changed', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('changed', callback);
    },
    emitChange: function () {
        this.emit('changed');
    },
})
CounterStore.dispatchToken = AppDispatcher.register((action) => {
    if (action.type === ActionTypes.INCREMENT) {
        counterValues[action.counterCaption]++;
        CounterStore.emitChange();
    } else if (action.type === ActionTypes.DECREMENT) {
        counterValues[action.counterCaption]--;
        CounterStore.emitChange();
    }
})
export default CounterStore;