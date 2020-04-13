import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs } from "antd";

import { requestOrganizationStructure } from "../../common/store/actionCreators";
import OrganizationTree from "../../common/OrganizationTree";
import EditBasicInformation from "./edit_basic_information"
import EditAccountInformation from "./edit_bank_account_information"
import { menu } from "../menu_form"

const { TabPane } = Tabs;

class EditOrganizationInformation extends Component {
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
                    <div className="title">组织信息编辑</div>
                    <Tabs defaultActiveKey="1" style={{ marginTop: "1vw", height: "100%" }} size="large">
                        <TabPane tab={<span style={{ fontSize: 20 }}>基础信息编辑</span>} key="1">
                            <EditBasicInformation />
                        </TabPane>
                        <TabPane tab={<span style={{ fontSize: 20 }}>账户信息编辑</span>} key="2">
                            <EditAccountInformation />
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

export default connect(mapStateToProps, null)(EditOrganizationInformation);