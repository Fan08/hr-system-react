import React, {Component} from "react";
import {connect} from "react-redux"

import {requestOrganizationInformation} from "../store/actionCreators"
import "../../../style/details_page.css"
// import {Form, Input} from "antd";
// import store from "../../store";


class InformationItems extends Component{

    showDetails(current_organization_information, item_css, selected_type){
        if (current_organization_information === null || current_organization_information === undefined){
            // requestOrganizationInformation();
            return null
        } else{
            return(
                <div className = {item_css}>
                    <p>{current_organization_information.get("name")}</p>
                    <p>{current_organization_information.get("shortname")}</p>
                    <p>{current_organization_information.get("mobile_phone")}</p>
                    <p>{current_organization_information.get("email")}</p>
                    <p>{current_organization_information.get("description")}</p>
                    {/* 当组织类型为organization或company时进行显示 */}
                    {selected_type==="organization"||selected_type==="company"?
                        <div>
                            <p>{current_organization_information.get('address')}</p>
                            <p>{current_organization_information.get('trade')}</p>
                        </div>:null}

                    {/* 当组织类型为company时进行显示 */}
                    {selected_type==="company"?
                        <p>{current_organization_information.get('tax_number')}</p>
                        :null}
                </div>
            )
        }
    }

    render() {
        const {organization_information, selected_inode, selected_type} = this.props;
        let current_organization_information = null;
        if (organization_information.get(selected_inode) === null || organization_information.get(selected_inode) === undefined){
            if (selected_inode !== null){
                requestOrganizationInformation(organization_information, selected_inode);
            }
        }else {
            current_organization_information = organization_information.get(selected_inode);
        }
        return(
            <div style={{marginTop: 20}}>
                <div style={{float:"left"}} className = "item">
                    <p>名称：</p>
                    <p>简称：</p>
                    <p>电话：</p>
                    <p>邮箱：</p>
                    <p>组织介绍：</p>
                    {/* 当组织类型为organization或company时进行显示 */}
                    {selected_type==="organization"||selected_type==="company"?
                        <div>
                            <p>地址：</p>
                            <p>行业：</p>
                        </div>:null}

                    {/* 当组织类型为company时进行显示 */}
                    {selected_type==="company"?
                        <p>税号：</p>
                        :null}
                    <p>人员名单：</p>
                </div>
                <div style={{display: "in-block"}}>
                {this.showDetails(current_organization_information, "item", selected_type)}
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        organization_information: state.get("organization_management").get("organization_information"),
        selected_type: state.get("common_store").get("selected_type"),
        selected_inode: state.get("common_store").get("selected_inode"),
        window_width: state.get("common_store").get("window_width"),
    }
};

export default connect(mapStateToProps, null)(InformationItems);