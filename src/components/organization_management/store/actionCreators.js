import * as constants from './constants.js';
import {fromJS} from 'immutable';

import store from "../../store";
import {
    staff_list_url,
    add_group_url,
    group_information_url,
    update_group_information_url,
    add_organization_url,
    organization_information_url,
    update_organization_information_url,
    add_company_url,
    company_information_url,
    update_company_information_url,
    update_bank_account_url,
    bank_account_by_owner_url,
    update_group_relationship_url,

} from '../../http_request/APIList'
import http from '../../http_request/axios_component'
import {requestOrganizationStructure} from "../../common/store/actionCreators";


const dispatchOrganizationInformation = (organization_information) => ({
    type: constants.ORGANIZATION_INFORMATION,
    organization_information: fromJS(organization_information),
});

export const dispatchCurrentOrganizationInformation = (organization_information) => ({
    type: constants.CURRENT_ORGANIZATION_INFORMATION,
    current_organization_information: fromJS(organization_information),
});

export const dispatchStaffList = (staff_list) => ({
    type: constants.STAFF_LIST,
    staff_list: fromJS(staff_list),
});

export const requestOrganizationInformation = (organization_information_list, inode, change_current_information=false) => {
    let url = "";
    const state = store.getState().toJS();
    const common = state["common_store"];
    const selected_type = common["selected_type"];
    switch (selected_type) {
        case "_group":
            url = group_information_url;
            break;
        case "organization":
            url = organization_information_url;
            break;
        case "company":
            url = company_information_url;
            break;
        default:
            break;
    }
    http.post(url,{inode:inode},true)     //true动态开启loading值
        .then(function(data){
            let organization_information_list_js = organization_information_list.toJS();
            const new_data = data.data;
            if (new_data){
                organization_information_list_js[inode] = new_data;
                if (change_current_information===true){
                    store.dispatch(dispatchCurrentOrganizationInformation(new_data))
                }
                store.dispatch(dispatchOrganizationInformation(organization_information_list_js));
            }
        });
};

export const updateOrganizationInformation = (value, organization_information) => {
    let url = "";
    value["mobile_phone"] = parseInt(value["mobile_phone"]);
    switch (value["type"]) {
        case "_group":
            url = update_group_information_url;
            break;
        case "organization":
            url = update_organization_information_url;
            break;
        case "company":
            url = update_company_information_url;
            break;
        default:
            break;
    }
    http.post(url,[value],true)     //true动态开启loading值
        .then(function(data){
            if (data.data){
                organization_information[value['inode']] = value;
                store.dispatch(dispatchOrganizationInformation(organization_information));
                store.dispatch(dispatchCurrentOrganizationInformation(value))
            }
        });
};

export const requestStaffList = (staff_list_data, inode) => {
    http.post(staff_list_url,{inode:inode},true)     //true动态开启loading值
        .then(function(data){
            let staff_list_js = staff_list_data.toJS();
            const new_data = data.data;
            if (new_data){
                staff_list_js[inode] = new_data;
                store.dispatch(dispatchStaffList(staff_list_js))
            }else{
                staff_list_js[inode] = [];
                store.dispatch(dispatchStaffList(staff_list_js))
            }
        });
};

export const requestBankAccountByOwner = (inode) => {
    return (dispatch) =>{
        let new_data = null;
        http.post(bank_account_by_owner_url,{inode:inode},true)     //true动态开启loading值
            .then(function(data){
                new_data = data.data;
                let bank_account = new_data["bank_account"];
                new_data["bank_account"] = bank_account.toString();
                dispatch(dispatchCurrentBankAccount(new_data))
            });
    }
};

const dispatchCurrentBankAccount = (current_bank_account) => ({
    type: constants.CURRENT_BANK_ACCOUNT,
    current_bank_account: fromJS(current_bank_account),
});

export const updateBankAccountByOwner = (value) => {
    http.post(update_bank_account_url,value,true)     //true动态开启loading值
        .then(function(data){
            const new_data = data.data;
            if (new_data){
                alert("编辑成功！")
            }
        });
};

export const updateGroupRelationship = (value) => {
    http.post(update_group_relationship_url,value,true)     //true动态开启loading值
        .then(function(data){
            const new_data = data.data;
            if (new_data){
                alert("变更成功！");
                requestOrganizationStructure();
            }
        });
};

export const addGroup = (type, value) => {
    let url = "";
    switch (type) {
        case "group":
            url = add_group_url;
            break;
        case "organization":
            url = add_organization_url;
            break;
        case "company":
            url = add_company_url;
            break;
        default:
            break
    }
    http.post(url,value,true)     //true动态开启loading值
        .then(function(data){
            const new_data = data.data;
            if (new_data){
                alert("新建完成！");
                requestOrganizationStructure();
            }
        });
};
