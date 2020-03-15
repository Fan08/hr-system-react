import * as constants from './constants.js';
import {fromJS} from 'immutable';

import {
    working_hours_record_url,
    submit_inputted_hours_record_url,
    review_hours_record_url
} from "../../http_request/APIList"
import http from "../../http_request/axios_component";
import store from "../../store";

export const requestWorkingHoursRecord = (current_working_hours_record, inode, selected_month, status) => {
    // status为1指已经通过审核的申请
    // status为0指未通过审核的申请
    http.post(working_hours_record_url,{"group_inode": inode, "needed_date": selected_month, "status": status},true)     //true动态开启loading值
        .then(function(data){
            const new_data = data.data;
            if (new_data){
                if (current_working_hours_record[inode]){
                    let all_current_working_hours_record = current_working_hours_record[inode];
                    all_current_working_hours_record[selected_month] = new_data;
                    current_working_hours_record[inode] = all_current_working_hours_record;
                }else {
                    let current_month_data = {};
                    current_month_data[selected_month] = new_data;
                    current_working_hours_record[inode] = current_month_data;
                }
                store.dispatch(dispatchWorkingHoursStaticsRecord(current_working_hours_record));
            }
        });
};

export const dispatchWorkingHoursStaticsRecord = (value) => ({
    type: constants.WORKING_HOURS_STATICS_RECORD,
    working_hours_statics_record: fromJS(value),
});

export const dispatchWorkingHoursStatics = (value) => ({
    type: constants.WORKING_HOURS_STATICS,
    working_hours_statics: fromJS(value),
});

export const requestReviewingWorkingHours = (conditions, department_staff_list) => {
    // status为1指已经通过审核的申请
    // status为0指未通过审核的申请
    http.post(working_hours_record_url,conditions,true)     //true动态开启loading值
        .then(function(data){
            const new_data = data.data;
            if (JSON.stringify(new_data)==="{}"){
                let working_hours_statics = {};
                for (let i of department_staff_list){
                    let staff_inode = i["inode"];
                    let unit_default_working_hours_statics = {};
                    unit_default_working_hours_statics.total_working_hours = "";
                    unit_default_working_hours_statics.total_price = "";
                    unit_default_working_hours_statics.unit_price = "";
                    working_hours_statics[staff_inode] = unit_default_working_hours_statics
                }
                store.dispatch(dispatchWorkingHoursStatics(working_hours_statics));
            }else if(JSON.stringify(new_data)!=="{}" && new_data){
                store.dispatch(dispatchWorkingHoursStatics(new_data))
            }
        });
};

export const reviewingWorkingHours = (statistics, group_inode) => {
    const keys_list = Object.keys(statistics);
    const statistics_list = [];
    for(let i in keys_list){
        let unit_statistics = statistics[keys_list[i]];
        unit_statistics["group_inode"] = group_inode;
        unit_statistics["total_working_hours"] = parseFloat(unit_statistics["total_working_hours"]);
        unit_statistics["total_price"] = parseFloat(unit_statistics["total_price"]);
        unit_statistics["unit_price"] = parseFloat(unit_statistics["unit_price"]);
        unit_statistics["person_inode"] = unit_statistics["inode"];
        delete unit_statistics.inode;
        statistics_list.push(unit_statistics)
    }
    http.post(review_hours_record_url,statistics_list,true)     //true动态开启loading值
        .then(function(data){
            const new_data = data.data;
            if(new_data){
                alert("提交成功！")
            }
        });
};

export const submitInputtedStatistics = (value) => {
    http.post(submit_inputted_hours_record_url,value,true)     //true动态开启loading值
        .then(function(data){
            const new_data = data.data;
            if(new_data){
                alert("提交成功！")
            }
        });
};
