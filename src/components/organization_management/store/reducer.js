import { fromJS } from "immutable";
import * as constants from './constants.js';


const defaultState =fromJS({
    current_bank_account: {},
    organization_information: {},
    current_organization_information: {},
    staff_list: {},
});

export default (state=defaultState, action)=> {
    switch (action.type) {
        case constants.CURRENT_BANK_ACCOUNT:
            return state.set("current_bank_account", action.current_bank_account);

        case constants.ORGANIZATION_INFORMATION:
            return state.set("organization_information", action.organization_information);

        case constants.CURRENT_ORGANIZATION_INFORMATION:
            return state.set("current_organization_information", action.current_organization_information);

        case constants.STAFF_LIST:
            return state.set("staff_list", action.staff_list);

        default:
            return state
    }

}