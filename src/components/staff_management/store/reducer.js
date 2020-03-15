import { fromJS } from "immutable";
import * as constants from './constants.js';


const defaultState =fromJS({
    modal_visible: false,
    personal_information: {},
    edit_visible: 1,
});

export default (state=defaultState, action)=> {
    switch (action.type) {
        case constants.MODAL_VISIBLE:
            return state.set("modal_visible", action.modal_visible);

        case constants.EDIT_VISIBLE:
            return state.set("edit_visible", action.edit_visible);

        case constants.PERSONAL_INFORMATION:
            return state.set("personal_information", action.personal_information);

        default:
            return state
    }

}