import {Modal, Button} from "antd";
import React, {Component} from "react";
import {connect} from "react-redux"

import {dispatchEditVisible, dispatchModalVisible} from "../store/actionCreators"
import EditBasicInformation from "../edit_personal_information/edit_basic_information"
import EditAccountInformation from "../edit_personal_information/edit_bank_account_information"

class PersonalInformationModal extends Component{

    judgeShowWhichModal(edit, personal_information, edit_visible){
        switch (edit_visible) {
            case 1:
                return this.showBasicInformation(edit, personal_information, edit_visible);
            case 2:
                return <EditBasicInformation/>;
            case 3:
                return <EditAccountInformation/>;
            default:
                return this.showBasicInformation(edit, personal_information, edit_visible);
        }
    }

    handleCancel = e => {
        this.props.dispatchModalVisible(false);
        this.props.dispatchEditVisible(1);
    };

    whetherStudent(personal_information){
        if (personal_information['university']){
            return(
                <div>
                    <div style={{display:"inline-block"}} >
                        <p>学校：</p>
                        <p>专业：</p>
                        <p>学院：</p>
                        <p>学号：</p>
                        <p>入学时间：</p>
                        <p>毕业时间：</p>
                    </div>
                    <div style={{display: "inline-block", marginLeft: "2vw"}}>
                        <p>{personal_information["university"] ? personal_information["university"] : "无"}</p>
                        <p>{personal_information["faculty"] ? personal_information["faculty"] : "无"}</p>
                        <p>{personal_information["major"] ? personal_information["major"] : "无"}</p>
                        <p>{personal_information["student_id"] ? personal_information["student_id"] : "无"}</p>
                        <p>{personal_information["admission_date"] ? personal_information["admission_date"] : "无"}</p>
                        <p>{personal_information["graduation_date"] ? personal_information["graduation_date"] : "无"}</p>
                    </div>
                </div>
            )
        }
    }

    showBasicInformation(edit, personal_information, edit_visible){
        /**
         * edit用于判断是否显示编辑按钮
         * personal_information包含当前个人信息
         */
        return(
            <div className = "item" style={{height:"20vw", overflowY:"scroll"}}>
                <div>
                    <div style={{display:"inline-block"}} >
                        <p>姓名：</p>
                        {/*<p>人员编号：</p>*/}
                        <p>出生日期：</p>
                        <p>所在部门：</p>
                        <p>岗位：</p>
                        <p>电话：</p>
                        <p>e-mail：</p>
                        <p>婚否：</p>
                    </div>
                    <div style={{display:"inline-block", marginLeft:"2vw"}} >
                        <p>{personal_information["name"]?personal_information["name"]:"无"}</p>
                        {/*<p>{personal_information["inode"]?personal_information["inode"]:"无"}</p>*/}
                        <p>{personal_information["birthday"]?personal_information["birthday"]:"无"}</p>
                        <p>{personal_information["group"]?personal_information["group"]:"无"}</p>
                        <p>{personal_information["role"]?personal_information["role"]:"无"}</p>
                        <p>{personal_information["mobile_phone"]?personal_information["mobile_phone"]:"无"}</p>
                        <p>{personal_information["email"]?personal_information["email"]:"无"}</p>
                        {
                            personal_information["is_married"]===0||personal_information["is_married"]===1?
                                <p>{personal_information["is_married"]===0?"未婚":"已婚"}</p>:null
                        }
                    </div>
                </div>
                {this.whetherStudent(personal_information, edit_visible)}
                {edit===false?null:
                    <div>
                        <Button
                            type="primary"
                            onClick={()=>this.props.dispatchEditVisible(2)}
                        >
                            编辑信息
                        </Button>
                        <Button
                            style={{marginLeft:"10px"}}
                            onClick={()=>this.props.dispatchEditVisible(3)}
                        >
                            编辑银行账户
                        </Button>
                    </div>
                }
            </div>
        )
    }

    render() {
        const {personal_information, modal_visible, edit, edit_visible} = this.props;
        return(
            <Modal
                title="个人信息"
                visible={modal_visible}
                onOk={this.handleOk}
                footer={null}
                onCancel={this.handleCancel}
            >
                {this.judgeShowWhichModal(edit, personal_information, edit_visible)}
            </Modal>
        )
    }

}

const mapStateToProps=(state)=>{
    return{
        personal_information: state.get("staff_management").get("personal_information").toJS(),
        modal_visible: state.get("staff_management").get("modal_visible"),
        edit_visible: state.get("staff_management").get("edit_visible"),
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        dispatchModalVisible(value){
            dispatch(dispatchModalVisible(value))
        },
        dispatchEditVisible(value){
            dispatch(dispatchEditVisible(value))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformationModal);