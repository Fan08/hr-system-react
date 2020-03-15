import React, {Component} from "react";
import {Button, Modal, Table} from 'antd';
import { connect } from "react-redux";

import PersonalInformationModal from "../staff_home/personal_information_modal";
import {
    dispatchModalVisible,
    dispatchPersonalInformation,
    movePersonToFather,
    movePersonToChild
} from "../store/actionCreators";
import { getStaffList } from "../../organization_management/get_staff_list"

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

const columns2 = [
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
        title: '角色',
        width:"10vw",
        key: 'role',
        dataIndex: 'role',
    },
];

class StaffList extends Component{
    constructor(props){
        super(props);
        this.state={
            to_be_added_staffs: null,
            selected_added_staffs: null,
            selected_staffs: null,
            adding_modal_visible: false,
        }
    }

    onChangeAddedStaffs(selectedRowKeys, selectedRows){
        // console.log("selectedRows", selectedRows)
        this.setState({
            selected_added_staffs: selectedRows
        })
    }

    onChange(selectedRowKeys, selectedRows){
        this.setState({
            selected_staffs: selectedRows
        })
    }

    removeStaffs(selected_staffs, group_inode, staff_list){
        if (selected_staffs !== null){
            movePersonToFather(selected_staffs, group_inode, staff_list);
            this.setState({
                selected_added_staffs: null
            });
        }
    }

    addStaffVisible(child_and_father, selected_inode, staff_list){
        if (child_and_father[selected_inode]){
            const staff_list_js = staff_list.toJS();
            this.setState({
                adding_modal_visible: true,
            });
            if (staff_list_js[child_and_father[selected_inode]]){
                this.setState({
                    to_be_added_staffs: staff_list_js[child_and_father[selected_inode]],
                    selected_added_staffs: null,
                });
            }
        }
    }

    handleCancel = e => {
        this.setState({
            adding_modal_visible: false,
            to_be_added_staffs: null,
            selected_added_staffs: null,
        });
    };

    handleOk = (selected_staffs, group_inode, staff_list, father_inode) => {
        movePersonToChild(selected_staffs, group_inode, staff_list, father_inode);
        this.setState({
            adding_modal_visible: false,
            to_be_added_staffs: null,
            selected_added_staffs: null
        });
    };

    render() {
        const {staff_list, group_inode, child_and_father, selected_inode} = this.props;
        const {selected_staffs, adding_modal_visible, to_be_added_staffs, selected_added_staffs} = this.state;
        let department_staff_list = getStaffList(staff_list, group_inode);

        // rowSelection object indicates the need for row selection
        const rowSelection = {onChange: this.onChange.bind(this)};
        const rowSelection2 = {onChange: this.onChangeAddedStaffs.bind(this)};

        return(
            <div  style={{marginLeft:"4vw"}}>
                <Button
                    type="primary"
                    onClick={()=>{this.addStaffVisible(child_and_father, selected_inode, staff_list)}}
                >新增人员</Button>
                <Button
                    type="danger"
                    style={{marginLeft:"1vw"}}
                    onClick={()=>this.removeStaffs(selected_staffs, group_inode, staff_list.toJS())}
                >
                    移除人员
                </Button>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={department_staff_list}
                    style={{width:"40vw", marginTop:"1vw"}}
                    rowKey={record=>record['inode']}
                    onChange={(current)=>console.log(current)}
                    onRow={(record) => {
                        return{
                            onClick:()=>{
                                this.props.dispatchPersonalInformation(record);
                                this.props.dispatchModalVisible(true)
                            }
                        }
                    }}
                />
                <PersonalInformationModal edit={false}/>
                <Modal
                    title="个人信息"
                    visible={adding_modal_visible}
                    onOk={()=>this.handleOk(selected_added_staffs, group_inode, staff_list.toJS(), child_and_father[group_inode])}
                    // footer={null}
                    onCancel={this.handleCancel}
                >
                    <Table
                        rowSelection={rowSelection2}
                        columns={columns2}
                        dataSource={to_be_added_staffs}
                        style={{width:"30vw", marginTop:"1vw"}}
                        rowKey={record=>record['inode']}
                        onChange={(current)=>console.log(current)}
                    />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        staff_list: state.get("organization_management").get("staff_list"),
        child_and_father: state.get("common_store").get("child_and_father").toJS(),
        selected_inode: state.get("common_store").get("selected_inode"),
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        dispatchPersonalInformation(value){
            dispatch(dispatchPersonalInformation(value))
        },
        dispatchModalVisible(value){
            dispatch(dispatchModalVisible(value))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffList);