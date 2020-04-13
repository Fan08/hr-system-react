/*
 * @Descripttion: 
 * @version: 
 * @Author: 唐帆
 * @Date: 2019-12-26 16:00:42
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-04-11 15:43:30
 */
import React, { Component } from "react";
import { connect } from "react-redux";

import "../../../style/details_page.css"
import OrganizationTree from "../../common/OrganizationTree"
import { requestOrganizationStructure } from "../../common/store/actionCreators";
import { menu } from "../menu_form"
import WorkingHoursList from "./working_hours_list"
import { getStaffList } from "../../organization_management/get_staff_list";
import { actionCreators } from "../store"


class SubmitWorkingHours extends Component {

    render() {
        const { selected_name, organization_structure, top_group_inode, selected_inode } = this.props;
        const { staff_list } = this.props;
        let department_staff_list = getStaffList(staff_list, selected_inode);

        if (department_staff_list !== null && department_staff_list !== undefined) {
            let working_hours_statics = {};
            for (let i of department_staff_list) {
                let staff_inode = i["inode"];
                let unit_default_working_hours_statics = {};
                unit_default_working_hours_statics.total_working_hours = "";
                unit_default_working_hours_statics.total_price = "";
                unit_default_working_hours_statics.unit_price = "";
                unit_default_working_hours_statics.group_inode = selected_inode;
                working_hours_statics[staff_inode] = unit_default_working_hours_statics
            }
            this.props.dispatchWorkingHoursStatics(working_hours_statics)
        }

        return (
            <div>
                <div style={{ width: "30%", display: "block-inline", float: "left" }}>
                    <div className={"title-of-tree"}>工时管理</div>
                    {organization_structure === null || organization_structure === undefined ? requestOrganizationStructure(top_group_inode) :
                        <OrganizationTree
                            page_type={"organization"}
                            data={organization_structure.toJS()}
                            menu={menu}
                        />}
                </div>
                <div style={{ width: "69.5%", display: "block-inline", float: "right", backgroundColor: "white", minHeight: "71.5vh" }}>
                    <div id={"title"} className="title">{selected_name}</div>
                    <p className={"item"} style={{ marginTop: "1vw" }}>津贴申请</p>
                    <WorkingHoursList department_staff_list={department_staff_list} />
                    {/*<Button onClick={()=>console.log(working_hours_statics)}>提交工时统计</Button>*/}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        top_group_inode: state.get("common_store").get("top_group_inode"),
        selected_inode: state.get("common_store").get("selected_inode"),
        selected_name: state.get("common_store").get("selected_name"),
        organization_structure: state.get("common_store").get("organization_structure"),
        staff_list: state.get("organization_management").get("staff_list"),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchWorkingHoursStatics(value) {
            dispatch(actionCreators.dispatchWorkingHoursStatics(value))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitWorkingHours);