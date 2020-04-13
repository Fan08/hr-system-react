/*
 * @Descripttion: 
 * @version: 
 * @Author: 唐帆
 * @Date: 2019-12-28 11:07:04
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-04-11 15:43:58
 */
import React, { Component } from "react";
import { connect } from "react-redux";

import "../../../style/details_page.css"
import OrganizationTree from "../../common/OrganizationTree"
import { requestOrganizationStructure } from "../../common/store/actionCreators";
import { menu } from "../menu_form"
import WorkingHoursList from "./working_hours_list";
import { getStaffList } from "../../organization_management/get_staff_list";
import { actionCreators } from "../store";


class ReviewWorkingHours extends Component {

    render() {
        const { selected_name, organization_structure, top_group_inode, working_hours_statics } = this.props;
        const { staff_list, selected_inode } = this.props;
        let department_staff_list = getStaffList(staff_list, selected_inode);

        if (department_staff_list !== null && JSON.stringify(department_staff_list) !== "[]") {
            const first_staff = department_staff_list[0];
            if (working_hours_statics[first_staff["inode"]] === undefined) {
                const myDate = new Date();
                const tYear = myDate.getFullYear();
                let tMonth = myDate.getMonth() + 1;
                if (tMonth < 10) {
                    tMonth = "0" + tMonth;
                }
                const { selected_inode } = this.props;
                const current_date = tYear + "-" + tMonth;
                actionCreators.requestReviewingWorkingHours({
                    "needed_date": current_date,
                    "group_inode": selected_inode,
                    "status": 0
                }, department_staff_list)
            }
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
                    <p className={"item"} style={{ marginTop: "1vw" }}>津贴审核</p>
                    <WorkingHoursList department_staff_list={department_staff_list} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        working_hours_statics: state.get("working_hours_management").get("working_hours_statics").toJS(),
        selected_inode: state.get("common_store").get("selected_inode"),
        top_group_inode: state.get("common_store").get("top_group_inode"),
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewWorkingHours);