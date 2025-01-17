import React, {Component} from "react";
import {connect} from "react-redux"
import { Table} from 'antd';

import PersonalInformationModal from "./personal_information_modal";
import {requestStaffList} from "../../organization_management/store/actionCreators"
import "../../../style/details_page.css"
import {dispatchPersonalInformation, dispatchModalVisible} from "../store/actionCreators"

const columns = [
    {
        title: '编号',
        width:"10vw",
        dataIndex: 'inode',
        key: 'inode',
    },
    {
        title: '姓名',
        dataIndex: 'name',
        width:"10vw",
        key: 'name',
    },
    {
        title: '所在组/部门',
        width:"10vw",
        dataIndex: 'group_name',
        key: 'group_name',
    },
    {
        title: '角色',
        width:"10vw",
        key: 'role',
        dataIndex: 'role',
    },
];

class StaffList extends Component{
    render() {
        const {staff_list, inode} = this.props;
        let department_staff_list = null;
        if (staff_list.get(inode)){
            department_staff_list = staff_list.get(inode);
            department_staff_list = department_staff_list.toJS();
        }
        else if(inode !== null && staff_list.get(inode) === undefined){
            requestStaffList(staff_list, inode)
        }

        return(
            <div>
                <Table
                    size={"small"}
                    style={{width:"40vw", marginLeft:"4vw", marginBottom:"2vw"}}
                    columns={columns}
                    dataSource={department_staff_list}
                    rowKey={record=>record['inode']}
                    // onChange={(current)=>this.showModal(current)}
                    onRow={(record) => {
                        return{
                            onClick:()=>{
                                this.props.dispatchPersonalInformation(record);
                                this.props.dispatchModalVisible(true)
                            }
                        }
                    }}
                />
                <PersonalInformationModal  edit={true}/>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        staff_list: state.get("organization_management").get("staff_list"),
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        dispatchPersonalInformation(value){
            dispatch(dispatchPersonalInformation(value))
        },
        dispatchModalVisible(value){
            dispatch(dispatchModalVisible(value))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffList);