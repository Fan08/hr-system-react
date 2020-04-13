/*
 * @Descripttion: 
 * @version: 
 * @Author: 唐帆
 * @Date: 2019-12-24 15:17:38
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-04-11 15:46:00
 */
import React, { Component } from "react";
import { Tabs } from 'antd';
import { connect } from "react-redux";

import "../../../style/details_page.css"
import OrganizationTree from "../../common/OrganizationTree"
import { requestOrganizationStructure } from "../../common/store/actionCreators";
import ChangeParentAgency from "./change_parent_agency"
import ManageChildAgencies from "./manage_child_agencies"
import { menu } from "../menu_form"

const { TabPane } = Tabs;

class OrganizationConstructorManage extends Component {
    render() {
        const { selected_name, organization_structure, top_group_inode } = this.props;
        return (
            <div>
                <div style={{ width: "30%", display: "block-inline", float: "left" }}>
                    <div className={"title-of-tree"}>组织管理</div>
                    {organization_structure === null || organization_structure === undefined ? requestOrganizationStructure(top_group_inode) :
                        <OrganizationTree
                            page_type={"organization"}
                            data={organization_structure.toJS()}
                            menu={menu}
                        />}
                </div>
                <div style={{ width: "69.5%", display: "block-inline", float: "right", backgroundColor: "white", minHeight: "71.5vh" }}>
                    <div id={"title"} className="title">{selected_name}</div>
                    <div className="title">组织结构管理</div>
                    <Tabs defaultActiveKey="1" style={{ marginTop: "1vw", height: "100%" }} size="large">
                        <TabPane tab={<span style={{ fontSize: 20 }}>上级机构变更</span>} key="1">
                            <ChangeParentAgency />
                        </TabPane>
                        <TabPane tab={<span style={{ fontSize: 20 }}>下属机构管理</span>} key="2">
                            <ManageChildAgencies />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        top_group_inode: state.get("common_store").get("top_group_inode"),
        selected_name: state.get("common_store").get("selected_name"),
        selected_inode: state.get("common_store").get("selected_inode"),
        organization_structure: state.get("common_store").get("organization_structure"),
    }
};

export default connect(mapStateToProps, null)(OrganizationConstructorManage);