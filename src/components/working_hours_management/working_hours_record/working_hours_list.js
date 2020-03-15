import React, {Component} from "react";
import {connect} from "react-redux";

import "../hours_style.css";
import {actionCreators} from "../store";

class WorkingHoursList extends Component{
    constructor(props){
        super(props);
        this.state = {
            state_working_hours_statics: {},
            current_selected_month: "",
        };
    }

    showTrs(department_staff_list, working_hours_statics_record, department_inode, selected_month){
        let department_statics = working_hours_statics_record[department_inode];
        if (department_statics){
            department_statics = department_statics[selected_month];
        }
        let number = 0;
        return department_staff_list.map(unit => {
            number += 1;
            let td_class_name= "table_of_tr_odd";
            if (number%2===0){
                td_class_name="table_of_tr_even";
            }
            let tr_html = null;
            if (department_statics){
                let staff_working_hours = department_statics[unit["inode"]];
                tr_html =(
                <tr key={unit["inode"]}>
                    <td className={td_class_name}>{number}</td>
                    <td className={td_class_name}>{unit["inode"]}</td>
                    <td className={td_class_name}>{unit["name"]}</td>
                    <td className={td_class_name}>{unit["group"]}</td>
                    <td className={td_class_name}>{unit["role"]}</td>
                    <td className={td_class_name}>{staff_working_hours?staff_working_hours["total_working_hours"]:null}</td>
                    <td className={td_class_name}>{staff_working_hours?staff_working_hours["unit_price"]:null}</td>
                    <td className={td_class_name}>{staff_working_hours?staff_working_hours["total_price"]:null}</td>
                </tr>
            )}
            return tr_html;
        });
    }

    render() {
        const {department_staff_list, working_hours_statics_record, selected_inode, selected_month} = this.props;
        // status为1指已经通过审核的申请
        // status为0指未通过审核的申请
        const status = 1;
        if (working_hours_statics_record[selected_inode] === null || working_hours_statics_record[selected_inode] === undefined){
            if (selected_inode!==null&&selected_inode!==undefined&&selected_month!==undefined) {
                actionCreators.requestWorkingHoursRecord(working_hours_statics_record, selected_inode, selected_month, status);
            }
        }
        if (working_hours_statics_record[selected_inode]){
            const current_month_statics = working_hours_statics_record[selected_inode];
            const keys_of_months = Object.keys(current_month_statics);
            if(keys_of_months.indexOf(selected_month)=== -1){
                actionCreators.requestWorkingHoursRecord(working_hours_statics_record, selected_inode, selected_month, status);
            }
        }
        return(
            <div>
                <table style={{marginLeft:"2vw", width:"54vw", marginTop:'10px', marginBottom:"4vw"}}>
                    <tbody>
                        <tr>
                            <td className="table_of_title">序号</td>
                            <td className="table_of_title">人员编号</td>
                            <td className="table_of_title">人员姓名</td>
                            <td className="table_of_title">所在组/部门</td>
                            <td className="table_of_title">角色</td>
                            <td className="table_of_title">本月总工时</td>
                            <td className="table_of_title">单价</td>
                            <td className="table_of_title">总价</td>
                        </tr>
                        {department_staff_list!==null?this.showTrs(department_staff_list, working_hours_statics_record, selected_inode, selected_month):null}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        working_hours_statics_record: state.get("working_hours_management").get("working_hours_statics_record").toJS(),
        working_hours_statics: state.get("working_hours_management").get("working_hours_statics").toJS(),
        selected_inode: state.get("common_store").get("selected_inode"),
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        dispatchWorkingHoursStatics(value){
            dispatch(actionCreators.dispatchWorkingHoursStatics(value))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkingHoursList);