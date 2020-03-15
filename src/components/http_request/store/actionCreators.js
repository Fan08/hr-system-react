import * as constants from './constants.js';
import {fromJS} from 'immutable';

export const dispatchGalobData =()=>({
    type:constants.GALOB_DATA,
    data:fromJS(true)
});

export const dispatchGaladFalse =()=>({
    type:constants.GLOAD_FLASE,
    data:fromJS(false)
});

export const dispatchChangeList =(list)=>({
    type:constants.CHANGE_LIST,
    list:fromJS(list)
});