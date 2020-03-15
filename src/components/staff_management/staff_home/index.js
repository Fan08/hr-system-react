import React, {Component} from "react";
import {connect} from "react-redux";
import {menu} from "../menu_form"

import "../../../style/details_page.css"
import OrganizationTree from "../../common/OrganizationTree"
import {requestOrganizationStructure} from "../../common/store/actionCreators";
import StaffList from "./staff_list"

class StaffHome extends Component{
    render() {
        const {selected_name, organization_structure, selected_inode, top_group_inode} = this.props;
        return(
            <div style={{height:"100%"}}>
                <div style={{width: "30%", display:"block-inline", float:"left"}}>
                    <div className={"title-of-tree"}>人员管理</div>
                    {organization_structure === null || organization_structure === undefined? requestOrganizationStructure(top_group_inode):
                    <OrganizationTree
                        page_type={"organization"}
                        data={organization_structure.toJS()}
                        menu={menu}
                    />}
                </div>
                <div style={{width: "69.5%", display:"block-inline", float:"right", backgroundColor:"white", height: "100%"}}>
                    <div id={"title"} className="title">{selected_name}</div>
                    <p className={"item"} style={{marginTop:"1vw"}}>人员名单</p>
                    <StaffList inode={selected_inode}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        top_group_inode: state.get("common_store").get("top_group_inode"),
        selected_name: state.get("common_store").get("selected_name"),
        selected_inode: state.get("common_store").get("selected_inode"),
        organization_structure: state.get("common_store").get("organization_structure"),
    }
};

export default connect(mapStateToProps, null)(StaffHome);