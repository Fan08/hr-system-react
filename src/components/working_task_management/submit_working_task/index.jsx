/*
 * @Descripttion: 
 * @version: 
 * @Author: 马林谦
 * @Date: 2020-03-15 15:52:15
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-03-15 20:23:34
 */
import React, {Component} from "react";
import {connect} from "react-redux";
import {Button} from "antd";
import {menu} from "../menu_form"

import "../../../style/details_page.css"
import OrganizationTree from "../../common/OrganizationTree"
import {requestOrganizationStructure} from "../../common/store/actionCreators";
import {dispatchEditTaskVisible} from '../store/actionCreators'
import SubmitTaskList from "./submit_task_list"
import EditTaskModal from "./edit_task_modal";

class StaffHome extends Component{

    onClick=()=>{
        this.props.dispatchEditTaskVisible(true)
    }

    render() {
        const {selected_name, organization_structure, top_group_inode} = this.props;
        return(
            <div style={{height: "71.5vh"}}>
                <div style={{width: "30%", display:"block-inline", float:"left"}}>
                    <div className={"title-of-tree"}>任务管理</div>
                    {organization_structure === null || organization_structure === undefined? requestOrganizationStructure(top_group_inode):
                        <OrganizationTree
                            page_type={"organization"}
                            data={organization_structure.toJS()}
                            menu={menu}
                        />}
                </div>
                <div style={{width: "69.5%", display:"block-inline", float:"right", backgroundColor:"white", height: "100%"}}>
                    <div id={"title"} className="title">{selected_name}</div>
                    <p className={"item"} style={{marginTop:"1vw",display:'inline-block'}}>分配任务</p>
                    <Button type='primary' onClick={this.onClick} style={{display:'inline-block',marginLeft:20}}>新建任务</Button>
                    <SubmitTaskList/>
                </div>
                <EditTaskModal/>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        top_group_inode: state.get("common_store").get("top_group_inode"),
        selected_name: state.get("common_store").get("selected_name"),
        organization_structure: state.get("common_store").get("organization_structure"),
        edit_task_visible: state.get("working_task_management").get("edit_task_visible"),
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        dispatchEditTaskVisible(value){
            dispatch(dispatchEditTaskVisible(value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaffHome);