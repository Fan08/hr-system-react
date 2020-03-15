import React, {Component} from "react";
import {connect} from "react-redux";

import "../hours_style.css";
import {actionCreators} from "../store";
import {Button, Input} from "antd";

class WorkingHoursList extends Component{
    state = {
        show_or_no: false,
    };

    reviewingWorkingHoursStatistics(working_hours_statics, group_inode){
        actionCreators.reviewingWorkingHours(working_hours_statics, group_inode)
    }

    changeWorkingHoursStatics(working_hours_statics, input_value, staff_inode, type){
        let unit_staff_data = working_hours_statics[staff_inode];
        switch (type) {
            case "total_working_hours":
                unit_staff_data["total_working_hours"] = input_value;
                let total_working_hours_1 = parseFloat(input_value);
                let unit_price_1 = parseFloat(unit_staff_data["unit_price"]);
                if (!isNaN(unit_price_1)&&!isNaN(total_working_hours_1)){
                    unit_staff_data["total_price"] = unit_price_1 * total_working_hours_1;
                }
                break;
            case "unit_price":
                unit_staff_data["unit_price"] = input_value;
                let unit_price_2 = parseFloat(input_value);
                let total_working_hours_2 = parseFloat(unit_staff_data["total_working_hours"]);
                if (!isNaN(unit_price_2)&&!isNaN(total_working_hours_2)){
                    unit_staff_data["total_price"] = unit_price_2 * total_working_hours_2;
                }
                break;
            case "total_price":
                unit_staff_data["total_price"] = input_value;
                break;
            default:
                break;
        }
        working_hours_statics[staff_inode] = unit_staff_data;
        this.props.dispatchWorkingHoursStatics(working_hours_statics);
    };

    showTrs(department_staff_list, working_hours_statics){
        let number = 0;
        return department_staff_list.map(unit => {
            number += 1;
            let td_class_name= "table_of_tr_odd";
            let input_class_name = {border:"none", textAlign:"center"};
            if (number%2===0){
                td_class_name="table_of_tr_even";
                input_class_name = {border:"none", textAlign:"center", backgroundColor:"#F0F8FF"};
            }
            let staff_working_hours = working_hours_statics[unit["inode"]];
            return (
                <tr key={unit["inode"]}>
                    <td className={td_class_name}>{number}</td>
                    <td className={td_class_name}>{unit["inode"]}</td>
                    <td className={td_class_name}>{unit["name"]}</td>
                    <td className={td_class_name}>{unit["group"]}</td>
                    <td className={td_class_name}>{unit["role"]}</td>
                    <td className={td_class_name}>
                        {staff_working_hours?
                            <Input
                                style={input_class_name}
                                value={staff_working_hours["total_working_hours"].toString()}
                                onChange={(e)=>this.changeWorkingHoursStatics(working_hours_statics, e.target.value, unit["inode"], "total_working_hours")}
                            />
                            :null}
                    </td>
                    <td className={td_class_name}>
                        {staff_working_hours?
                            <Input
                                style={input_class_name}
                                value={staff_working_hours["unit_price"].toString()}
                                onChange={(e)=>this.changeWorkingHoursStatics(working_hours_statics, e.target.value, unit["inode"], "unit_price")}
                            />
                            :null}
                    </td>
                    <td className={td_class_name}>
                        {staff_working_hours?
                            <Input
                                style={input_class_name}
                                value={staff_working_hours["total_price"].toString()}
                                onChange={(e)=>this.changeWorkingHoursStatics(working_hours_statics, e.target.value, unit["inode"], "total_price")}
                            />
                            :null}
                    </td>
                </tr>
            )
        });
    }

    render() {
        const {department_staff_list, working_hours_statics, selected_inode} = this.props;
        let first_staff = null;
        let first_staff_working_hours_statics_id = null;
        if(department_staff_list && JSON.stringify(department_staff_list) !== "[]"){
            first_staff = department_staff_list[0];
            let first_staff_inode = first_staff["inode"];
            if (working_hours_statics[first_staff_inode]){
                let first_staff_working_hours_statics = working_hours_statics[first_staff_inode];
                first_staff_working_hours_statics_id = first_staff_working_hours_statics["id"];
            }
        }
        return(
            <div>
                <table style={{marginLeft:"2vw", width:"54vw", marginTop:'10px'}}>
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
                        {department_staff_list!==null?this.showTrs(department_staff_list, working_hours_statics):null}
                    </tbody>
                </table>
                {first_staff_working_hours_statics_id?
                    // console.log(department_staff_list)
                    <div>
                        <Button
                            onClick={()=>this.reviewingWorkingHoursStatistics(working_hours_statics, selected_inode)}
                            type="primary"
                            style={{marginLeft:"2vw", marginTop:"1vw", marginBottom:"4vw"}}
                        >
                            申请通过
                        </Button>
                        <Button
                            onClick={()=>console.log(working_hours_statics)}
                            type="danger"
                            style={{marginLeft:"10px", marginTop:"1vw", marginBottom:"4vw"}}
                        >
                            申请驳回
                        </Button>
                    </div>
                    : <div style={{height: "2vw"}}/>}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        selected_inode: state.get("common_store").get("selected_inode"),
        working_hours_statics: state.get("working_hours_management").get("working_hours_statics").toJS(),
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        dispatchWorkingHoursStatics(value){
            dispatch(actionCreators.dispatchWorkingHoursStatics(value))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkingHoursList);