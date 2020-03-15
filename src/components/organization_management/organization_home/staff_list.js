import React, {Component} from "react";
import {connect} from "react-redux"
import {Modal, Table} from 'antd';

import "../../../style/details_page.css"
import { getStaffList } from "../get_staff_list"

const columns = [
    {
        title: '编号',
        dataIndex: 'account_code',
        width:"10vw",
        key: 'account_code',
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
        dataIndex: 'department',
        key: 'department',
    },
    {
        title: '角色',
        width:"10vw",
        key: 'role',
        dataIndex: 'role',
    },
];

class StaffList extends Component{
    state = {
        visible: false,
        personal_information: {}
    };

    showModal = (record) => {
        this.setState({
            visible: true,
            personal_information: record
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    render() {
        const {staff_list, inode} = this.props;
        const {personal_information, visible} = this.state;
        let department_staff_list = getStaffList(staff_list, inode);

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
                            onClick:()=>this.showModal(record)
                        }
                    }}
                />
                <Modal
                    title="个人信息"
                    visible={visible}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <div className = "item">
                        <div style={{display:"inline-block"}} >
                            <p>姓名：</p>
                            <p>人员编号：</p>
                            <p>出生日期：</p>
                            <p>所在部门：</p>
                            <p>岗位：</p>
                            <p>电话：</p>
                            <p>e-mail：</p>
                            <p>婚否：</p>
                        </div>
                        <div style={{display:"inline-block", marginLeft:"2vw"}} >
                            <p>{personal_information["name"]?personal_information["name"]:"无"}</p>
                            <p>
                                {personal_information["account_code"]?personal_information["account_code"]:"无"}
                            </p>
                            <p>{personal_information["birthday"]?personal_information["birthday"]:"无"}</p>
                            <p>{personal_information["group"]?personal_information["group"]:"无"}</p>
                            <p>{personal_information["role"]?personal_information["role"]:"无"}</p>
                            <p>{personal_information["mobile_phone"]?personal_information["mobile_phone"]:"无"}</p>
                            <p>{personal_information["email"]?personal_information["email"]:"无"}</p>
                            <p>{personal_information["is_married"]===0?"未婚":"已婚"}</p>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        staff_list: state.get("organization_management").get("staff_list"),
    }
};

export default connect(mapStateToProps, null)(StaffList);