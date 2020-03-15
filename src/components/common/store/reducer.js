import { fromJS } from "immutable";
import * as constants from './constants.js';


const defaultState =fromJS({
    window_width: null,
    selected_inode: null,
    selected_name: null,
    selected_type: null,
    organization_structure: null,
    child_and_father: {},
    top_group_inode: "d85a0cf2-62a2-11ea-93b1-b1f16acf0759",
});

export default (state=defaultState, action)=> {
    switch (action.type) {
        case constants.CHILD_AND_FATHER:
            return state.set("child_and_father", action.child_and_father);

        case constants.WINDOW_WIDTH:
            return state.set("window_width", action.window_width);

        case constants.SELECTED_TYPE:
            return state.set("selected_type", action.selected_type);

        case constants.SELECTED_INODE:
            return state.set("selected_inode", action.selected_inode);

        case constants.SELECTED_NAME:
            return state.set("selected_name", action.selected_name);

        case constants.ORGANIZATION_STRUCTURE:
            return state.set("organization_structure", action.organization_structure);

        default:
            return state
    }

}