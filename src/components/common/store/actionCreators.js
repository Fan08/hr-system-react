import * as constants from './constants.js';
import {fromJS} from 'immutable';

import {organization_structure_url} from '../../http_request/APIList'
import http from '../../http_request/axios_component'
import store from "../../store";

export const dispatchChildAndFather = (child_and_father) => ({
    type: constants.CHILD_AND_FATHER,
    child_and_father: fromJS(child_and_father),
});

export const dispatchSelectedType = (selected_type) => ({
    type: constants.SELECTED_TYPE,
    selected_type: fromJS(selected_type),
});

export const dispatchSelectedInode = (selected_inode) => ({
    type: constants.SELECTED_INODE,
    selected_inode: fromJS(selected_inode),
});

export const dispatchSelectedName = (selected_name) => ({
    type: constants.SELECTED_NAME,
    selected_name: fromJS(selected_name),
});

export const dispatchWindowWidth = (window_width) => ({
    type: constants.WINDOW_WIDTH,
    window_width: fromJS(window_width)
});

export const dispatchOrganizationStructure = (organization_structure) => ({
    type: constants.ORGANIZATION_STRUCTURE,
    organization_structure: fromJS(organization_structure)
});

export const requestOrganizationStructure = () => {
    const now_state = store.getState().toJS();
    const  common_store = now_state["common_store"];
    const top_inode = common_store["top_group_inode"];
    http.post(organization_structure_url,{inode: top_inode},true)     //true动态开启loading值
        .then(function(data){
            let new_data = data.data;
            // console.log(new_data)
            if(new_data!==null&&new_data!==undefined){
                const list = {};
                const result = getList(new_data, list, new_data["inode"]);
                store.dispatch(dispatchOrganizationStructure(new_data));
                store.dispatch(dispatchChildAndFather(result))
            }
        })
};

const getList = (new_data, list, father_inode) => {
    if (new_data["children"]){
        for (let i of new_data["children"]){
            list[i["inode"]] = father_inode;
            Object.assign(list, getList(i, list, i["inode"]));
        }
    }
    return list;
};
