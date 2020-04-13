import React, { Component } from "react";
import { connect } from "react-redux";
import { DatePicker } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';

import "../../../style/details_page.css"
import OrganizationTree from "../../common/OrganizationTree"
import { requestOrganizationStructure } from "../../common/store/actionCreators";
import { menu } from "../menu_form"
import { getStaffList } from "../../organization_management/get_staff_list";
import WorkingHoursList from "./working_hours_list"

moment.locale('zh-cn');
const { MonthPicker } = DatePicker;

class WorkingHoursRecord extends Component {
    constructor(props) {
        super(props);
        const myDate = new Date();
        const tYear = myDate.getFullYear();
        let tMonth = myDate.getMonth() + 1;
        if (tMonth < 10) {
            tMonth = "0" + tMonth;
        }
        this.state = {
            selected_month: tYear + "-" + tMonth,
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(date, dateString) {
        if (dateString !== "") {
            this.setState({
                selected_month: dateString,
            })
        }
    }

    static getCurrentData() {
        return new Date().toLocaleDateString();
    }

    render() {
        const { selected_name, organization_structure, top_group_inode } = this.props;
        const { staff_list, selected_inode } = this.props;
        const { selected_month } = this.state;
        let department_staff_list = getStaffList(staff_list, selected_inode);

        if (department_staff_list !== null && department_staff_list !== undefined) {
            let working_hours_statics = {};
            for (let i of department_staff_list) {
                let staff_inode = i["inode"];
                let unit_default_working_hours_statics = {};
                unit_default_working_hours_statics.total_working_hours = "";
                unit_default_working_hours_statics.total_price = "";
                unit_default_working_hours_statics.unit_price = "";
                working_hours_statics[staff_inode] = unit_default_working_hours_statics
            }
        }

        return (
            <div>
                <div>
                    <div style={{ width: "30%", display: "block-inline", float: "left" }}>
                        <div className={"title-of-tree"}>工时管理</div>
                        {organization_structure === null || organization_structure === undefined ? requestOrganizationStructure(top_group_inode) :
                            <OrganizationTree
                                page_type={"organization"}
                                data={organization_structure.toJS()}
                                menu={menu}
                            />
                        }
                    </div>
                    <div style={{ width: "69.5%", display: "block-inline", float: "right", backgroundColor: "white", minHeight: "71.5vh" }}>
                        <div id={"title"} className="title">{selected_name}</div>
                        <p className={"item"} style={{ marginTop: "1vw" }}>津贴记录</p>
                        <MonthPicker
                            onChange={this.onChange}
                            placeholder="选择月份"
                            style={{ marginLeft: "2vw" }}
                            locale={locale}
                            defaultValue={moment(WorkingHoursRecord.getCurrentData(), 'YYYY-MM')}
                        />
                        <WorkingHoursList department_staff_list={department_staff_list} selected_month={selected_month} />
                    </div>
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

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkingHoursRecord);