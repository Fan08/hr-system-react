import { fromJS } from "immutable";
import * as constants from './constants.js';


const defaultState =fromJS({
    working_hours_statics: {},
    working_hours_statics_record: {},
});

export default (state=defaultState, action)=> {
    switch (action.type) {
        case constants.WORKING_HOURS_STATICS:
            return state.set("working_hours_statics", action.working_hours_statics);

        case constants.WORKING_HOURS_STATICS_RECORD:
            return state.set("working_hours_statics_record", action.working_hours_statics_record);

        default:
            return state
    }

}