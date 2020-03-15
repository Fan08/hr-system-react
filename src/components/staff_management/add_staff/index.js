import React, {Component} from "react";
import {connect} from "react-redux";

import "../../../style/details_page.css"
import OrganizationTree from "../../common/OrganizationTree"
import {requestOrganizationStructure} from "../../common/store/actionCreators";
import WrappedRegistrationForm from "./edit_personal_information"
import {menu} from "../menu_form"


class AddStaff extends Component{
    render() {
        const {selected_name, organization_structure, top_group_inode} = this.props;
        return(
            <div>
                <div style={{width: "30%", display:"block-inline", float:"left"}}>
                    <div className={"title-of-tree"}>人员管理</div>
                    {organization_structure === null || organization_structure === undefined? requestOrganizationStructure(top_group_inode):
                        <OrganizationTree
                            page_type={"organization"}
                            data={organization_structure.toJS()}
                            menu={menu}
                        />}
                </div>
                <div style={{width: "69.5%", display:"block-inline", float:"right", backgroundColor:"white"}}>
                    <div id={"title"} className="title">{selected_name}</div>
                    <WrappedRegistrationForm selected_name={selected_name}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        top_group_inode: state.get("common_store").get("top_group_inode"),
        selected_name: state.get("common_store").get("selected_name"),
        organization_structure: state.get("common_store").get("organization_structure"),
    }
};

export default connect(mapStateToProps, null)(AddStaff);