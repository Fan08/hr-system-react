/*
 * @Descripttion: 
 * @version: 
 * @Author: 唐帆
 * @Date: 2019-12-13 10:26:27
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-04-11 15:46:09
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { menu } from "../menu_form"

import "../../../style/details_page.css"
import OrganizationTree from "../../common/OrganizationTree"
import InformationItems from "./inforamtion_items"
import { requestOrganizationStructure } from "../../common/store/actionCreators";
import StaffList from './staff_list'

class OrganizationHome extends Component {
    render() {
        const { selected_name, organization_structure, selected_inode, top_group_inode } = this.props;
        return (
            <div style={{ height: "100%" }}>
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
                    <InformationItems />
                    <StaffList inode={selected_inode} />
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

export default connect(mapStateToProps, null)(OrganizationHome);