import React, {Component} from "react";
import {connect} from "react-redux";
import { Button, Select } from "antd";

import {updateGroupRelationship} from "../store/actionCreators"
import "./tabs_style.css"
import "../../../style/details_page.css"

const { Option } = Select;

class ChangeParentAgency extends Component{
    constructor(props){
        super(props);
        this.state={
            selected_group: "",
            group_relationship: null,
            parent_organization_list: null
        };
    }

    handleSubmit(group_relationship){
        updateGroupRelationship(group_relationship);
        this.setState({
            selected_group: "",
            group_relationship: null,
        })
    }

    handleChange(value, selected_name, selected_inode, selected_type) {
        const split_value = value.split("，");
        let group_relationship = {
            "father_name": split_value[0],
            "father_inode": split_value[1],
            "father_type": split_value[2],
            "child_name": selected_name,
            "child_inode": selected_inode,
            "child_type": selected_type,
        };
        this.setState({
            group_relationship: group_relationship,
            selected_group: value,
        });
    }

    possibleParentOrganization(parent_organization_list, organization_structure){
        if (parent_organization_list===null){
            parent_organization_list = [];
        }
        if (organization_structure !== null){
            if (organization_structure["_root"]){
                organization_structure = organization_structure.toJS();
            }
            parent_organization_list.push({
                name:organization_structure["name"],
                inode:organization_structure['inode'],
                type:organization_structure['type'],
            });
            if (organization_structure["children"]){
                for (let i of organization_structure["children"]){
                    this.possibleParentOrganization(parent_organization_list, i)
                }
            }}
        this.setState({
            parent_organization_list: parent_organization_list
        })
    }

    render() {
        const {parent_organization_list, group_relationship, selected_group} = this.state;
        const {organization_structure, selected_name, selected_inode, selected_type} = this.props;
        return(
            <div className="tab" style={{height:"40vh"}}>
                {organization_structure!==null&&parent_organization_list===null?
                    this.possibleParentOrganization(parent_organization_list, organization_structure):null}
                <div style={{marginBottom:"1.5vw"}}>
                    <p style={{display:"inline",marginLeft:0}} className="item">选择新上级机构：</p>
                    <Select
                        style={{ width: 200 }}
                        value={selected_group}
                        onChange={(e)=>this.handleChange(e, selected_name, selected_inode, selected_type)}
                        placeholder="选择机构"
                    >
                        {parent_organization_list===null?null:parent_organization_list.map(i=>{
                            return(<Option value={i["name"]+"，"+i["inode"]+"，"+i["type"]} key={i["inode"]}>{i["name"]+"，"+i["inode"]}</Option>)}
                        )}
                    </Select>
                </div>
                <Button
                    type="primary"
                    onClick={()=>this.handleSubmit(group_relationship)}
                >提交申请</Button>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        organization_structure: state.get("common_store").get("organization_structure"),
        selected_name: state.get("common_store").get("selected_name"),
        selected_inode: state.get("common_store").get("selected_inode"),
        selected_type: state.get("common_store").get("selected_type"),
    }
};

export default connect(mapStateToProps, null)(ChangeParentAgency);