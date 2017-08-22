import AppDispatcher from '../AppDispatcher';
import * as ActionTypes from '../ActionTypes';
import CounterStore from './CounterStore';
import { EventEmitter } from 'events';



function computeSummary(counterValues) {
    let summary = 0;
    for (let key in counterValues) {
        if (counterValues.hasOwnProperty(key)) {
            summary += counterValues[key];
        }
    }
    return summary;
}
const SummaryStore = Object.assign({}, EventEmitter.prototype, {
    getSummary: function () {
        return computeSummary(CounterStore.getCounterValues());
    },
    addChangeListener: function (callback) {
        this.on('changed', callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener('changed', callback);
    },
    emitChange: function () {
        this.emit('changed');
    }
})
SummaryStore.dispatchToken = AppDispatcher.register((action) => {
    if (action.type === ActionTypes.INCREMENT || action.type === ActionTypes.DECREMENT) {
        AppDispatcher.waitFor([CounterStore.dispatchToken]);
        SummaryStore.emitChange();
    }
})
export default SummaryStore;