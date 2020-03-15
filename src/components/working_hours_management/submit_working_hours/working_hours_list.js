import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Input, Modal} from "antd";

import "../hours_style.css";
import {actionCreators} from "../store";
import ModalTable from "./modal_table"
import {submitInputtedStatistics} from "../store/actionCreators"

class WorkingHoursList extends Component{
    state = { show_modal: false, };

    showModal = () => {
        this.setState({
            show_modal: true,
        });
    };

    handleOk = (working_hours_statics) => {
        submitInputtedStatistics(working_hours_statics);
        this.setState({
            show_modal: false,
        });
    };

    handleCancel = e => {
        this.setState({
            show_modal: false,
        });
    };

    showStatics(department_staff_list, working_hours_statics){
        const staff_list = Object.keys(working_hours_statics);
        if (staff_list.length !== 0&&department_staff_list!==null){
                let staff_hours_statistics = department_staff_list.map(unit=>{
                    const inode = unit["inode"];
                    const one_staff_hours = working_hours_statics[inode];
                    return {"inode": inode, "name": unit["name"], "total_working_hours": one_staff_hours["total_working_hours"],
                        "unit_price": one_staff_hours["unit_price"], "total_price": one_staff_hours["total_price"]}
                        });
                return <ModalTable staff_hours_statistics={staff_hours_statistics}/>
                }
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
                        <Input
                            style={input_class_name}
                            value={staff_working_hours["total_working_hours"].toString()}
                            onChange={(e)=>this.changeWorkingHoursStatics(working_hours_statics, e.target.value, unit["inode"], "total_working_hours")}
                        />
                    </td>
                    <td className={td_class_name}>
                        <Input
                            style={input_class_name}
                            value={staff_working_hours["unit_price"].toString()}
                            onChange={(e)=>this.changeWorkingHoursStatics(working_hours_statics, e.target.value, unit["inode"], "unit_price")}
                        />
                    </td>
                    <td className={td_class_name}>
                        <Input
                            style={input_class_name}
                            value={staff_working_hours["total_price"].toString()}
                            onChange={(e)=>this.changeWorkingHoursStatics(working_hours_statics, e.target.value, unit["inode"], "total_price")}
                        />
                    </td>
                </tr>
            )
        });
    }

    render() {
        const {department_staff_list, working_hours_statics} = this.props;
        const {show_modal} = this.state;
        return(
            <div style={{minHeight: 450}}>
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
                <Button
                    onClick={()=>this.showModal(working_hours_statics)}
                    type="primary"
                    style={{marginLeft:"2vw", marginTop:"1vw", marginBottom:"4vw"}}
                >
                    提交津贴申请
                </Button>
                <Modal
                    title="提交津贴申请"
                    visible={show_modal}
                    okText={"确认"}
                    cancelText={"取消"}
                    onOk={()=>this.handleOk(working_hours_statics)}
                    onCancel={this.handleCancel}
                >
                    {this.showStatics(department_staff_list, working_hours_statics)}
                </Modal>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
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