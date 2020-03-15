import React, {Component} from "react";
import {connect} from "react-redux";
import {Table, Icon, Modal} from "antd";

import "./tabs_style.css"
import "../../../style/details_page.css"
import {requestOrganizationInformation, dispatchCurrentOrganizationInformation} from "../store/actionCreators";
import store from "../../store";

class ManageChildAgencies extends Component{
    constructor(props){
        super(props);
        this.state={
            child_organization_list: null,
            state_selected_inode: null,
            visible: false,
        };
    }

    showModal = (record, organization_information) => {
        const selected_inode = record["inode"];
        let current_organization_information = {};
        if (organization_information.get(selected_inode) === null || organization_information.get(selected_inode) === undefined){
            if (selected_inode !== null){
                requestOrganizationInformation(organization_information, selected_inode, true);
            }
        }
        else {
            current_organization_information = organization_information.get(selected_inode);
            store.dispatch(dispatchCurrentOrganizationInformation(current_organization_information))
        }
        this.setState({
            visible: true,
        });
    };

    handleCancel=()=>{
        this.setState({
            visible: false,
        });
    };

    possibleParentOrganization(organization_structure, selected_inode){
        if (organization_structure !== null){
            if (organization_structure["_root"]){
                organization_structure = organization_structure.toJS();
            }
            if (organization_structure["children"] && organization_structure["inode"]!==selected_inode){
                for (let i of organization_structure["children"]){
                    this.possibleParentOrganization(i, selected_inode)
                }
            }else if(organization_structure["children"] && organization_structure["inode"]===selected_inode){
                this.setState({
                    state_selected_inode: selected_inode,
                    child_organization_list: organization_structure["children"]
                });
            }else if(organization_structure["inode"]===selected_inode){
                this.setState({
                    child_organization_list: [],
                    state_selected_inode: selected_inode,
                });
            }
        }
    }

    render() {
        const {child_organization_list, state_selected_inode, visible, } = this.state;
        const {organization_structure, selected_inode, organization_information, current_organization_information} = this.props;
        const columns = [
            {
                title: '编号',
                width:"15vw",
                dataIndex: 'inode',
                key: 'inode',
                // className: "antd-table-fontsize"
            },
            {
                title: '组织名称',
                dataIndex: 'name',
                width:"10vw",
                key: 'name',
                // className: "antd-table-fontsize"
            },
            {
                title: '操作',
                width:"10vw",
                // className: "antd-table-fontsize",
                render: (text, record) => (
                    <div>
                        <Icon
                            type="unordered-list"
                            style={{color: "blue"}}
                            onClick={()=>{this.showModal(record, organization_information)}}
                        />
                        <Icon
                            type="delete"
                            style={{color: "red", marginLeft:"1vw"}}
                            onClick={()=>console.log(record)}
                        />

                    </div>
                ),
            }
        ];

        return(
            <div className="tab" >
                {organization_structure!==null && state_selected_inode!==selected_inode?
                    this.possibleParentOrganization(organization_structure, selected_inode):null}
                <Table
                    size={"large"}
                    dataSource={child_organization_list}
                    rowKey={record=>record['inode']}
                    style={{width:"30vw", marginLeft:"4vw", marginBottom:"2vw"}}
                    columns={columns}
                />
                <Modal
                    title="组织信息"
                    visible={visible}
                    onOk={this.handleOk}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <div className = "item">
                        <div style={{display:"inline-block"}} >
                            <p>名称：</p>
                            <p>简称：</p>
                            <p>电话：</p>
                            <p>邮箱：</p>
                            <p>创建时间：</p>
                            <p>组织介绍：</p>
                        </div>
                        <div style={{display:"inline-block", marginLeft:"2vw"}} >
                            <p>{current_organization_information.get("name")}</p>
                            <p>{current_organization_information.get("shortname")}</p>
                            <p>{current_organization_information.get("mobile_phone")}</p>
                            <p>{current_organization_information.get("email")}</p>
                            <p>{current_organization_information.get("created_date")}</p>
                            <p>{current_organization_information.get("description")}</p>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        organization_information: state.get("organization_management").get("organization_information"),
        current_organization_information: state.get("organization_management").get("current_organization_information"),

        organization_structure: state.get("common_store").get("organization_structure"),
        selected_name: state.get("common_store").get("selected_name"),
        selected_inode: state.get("common_store").get("selected_inode"),
    }
};

export default connect(mapStateToProps, null)(ManageChildAgencies);