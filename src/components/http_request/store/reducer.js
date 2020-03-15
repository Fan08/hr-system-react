import { fromJS } from "immutable";
import * as constants from './constants.js';


const defaultState =fromJS({
    data:false,
    list:[],

});

export default (state=defaultState, action)=> {
    switch (action.type) {

        case constants.GALOB_DATA:
            return state.set('data', action.data);

        case constants.GLOAD_FLASE:
            return state.set('data', action.data);

        case constants.CHANGE_LIST:
            return state.set('list', action.list);

        default:
            return state
    }

}