import * as constants from './constants.js';
import {fromJS} from 'immutable';
import 'moment/locale/zh-cn';
import moment from "moment";
import {
    add_person_url,
    add_student_url,
    update_person_url,
    update_student_url,
    move_person_to_father_url,
    move_person_to_child_url
} from "../../http_request/APIList";
import http from "../../http_request/axios_component";
import {getCookie} from "../../../helpers/cookies";
import {requestStaffList, dispatchStaffList} from "../../organization_management/store/actionCreators";
import store from "../../store";

export const dispatchModalVisible = (value) => ({
    type: constants.MODAL_VISIBLE,
    modal_visible: fromJS(value),
});

export const dispatchEditVisible = (value) => ({
    type: constants.EDIT_VISIBLE,
    edit_visible: fromJS(value),
});

export const dispatchPersonalInformation = (value) => ({
    type: constants.PERSONAL_INFORMATION,
    personal_information: fromJS(value),
});

export const addNewStaff = (whether_student, value, staff_list) => {
    let url = "";
    if (whether_student){
        url = add_student_url;
        value["admission_date"] = moment(value["admission_date"]).format('YYYY-MM-DD');
        value["graduation_date"] = moment(value["graduation_date"]).format('YYYY-MM-DD');
    }else {
        url = add_person_url;
    }
    value["owner"] = JSON.parse(getCookie("mspa_user")).username;
    value["mobile_phone"] = parseInt(value["mobile_phone"]);
    value["shortname"] = "";
    value["role_inode"] = "";
    value["birthday"] = moment(value["birthday"]).format('YYYY-MM-DD');

    http.post(url,[value],true)     //true动态开启loading值
        .then(function(data){
            const new_data = data.data;
            if (new_data){
                alert("新建完成！");
                requestStaffList(staff_list, value["group_inode"])
            }
        });
};

export const updatePerson = (value) => {
    let url = "";
    if (value["university"]){
        url = update_student_url;
        value["admission_date"] = moment(value["admission_date"]).format('YYYY-MM-DD');
        value["graduation_date"] = moment(value["graduation_date"]).format('YYYY-MM-DD');
    }else {
        url = update_person_url
    }
    value["birthday"] = moment(value["birthday"]).format('YYYY-MM-DD');
    http.post(url,value,true)     //true动态开启loading值
        .then(function(data){
            const new_data = data.data;
            if (new_data){
                alert("编辑完成！");
            }
        });
};

export const movePersonToFather = (value, group_inode, staff_list) => {
    let new_value = [];
    for (let i in value){
        new_value.push({"group_inode": group_inode, "person_inode": value[i]["inode"]});
        const current_staff_list = staff_list[group_inode];
        current_staff_list.splice(i, 1);
    }
    http.post(move_person_to_father_url,new_value,true)     //true动态开启loading值
        .then(function(data){
            const new_data = data.data;
            if (new_data){
                alert("操作成功！");
                if (typeof(new_data)=='string'){
                    const group_staff_list = staff_list[new_data];
                    staff_list[new_data] = group_staff_list.concat(value);
                }
                store.dispatch(dispatchStaffList(staff_list));
            }
        });
};

export const movePersonToChild = (selected_staffs, group_inode, staff_list, father_inode) => {
    // console.log(selected_staffs, group_inode, staff_list, father_inode);
    let new_value = [];
    for (let i in selected_staffs){
        new_value.push({"child_group_inode": group_inode, "father_group_inode": father_inode, "person_inode": selected_staffs[i]["inode"]});
        const current_staff_list = staff_list[father_inode];
        current_staff_list.splice(i, 1);
    }
    http.post(move_person_to_child_url,new_value,true)     //true动态开启loading值
        .then(function(data){
            const new_data = data.data;
            if (new_data){
                alert("操作成功！");
                const group_staff_list = staff_list[group_inode];
                staff_list[group_inode] = group_staff_list.concat(selected_staffs);
                store.dispatch(dispatchStaffList(staff_list));
            }
        });
};
