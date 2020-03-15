import { Input, DatePicker } from "antd";
import React, {Component} from "react";
import {connect} from "react-redux"
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import { Form, Select, Button } from 'antd';

import {dispatchEditVisible, dispatchModalVisible, updatePerson} from "../store/actionCreators"
import moment from "moment";

const { Option } = Select;

class EditBasicInformation extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e, personal_information) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values["inode"] = personal_information["inode"];
                values["owner"] = personal_information["owner"];
                values["shortname"] = personal_information["shortname"];
                values["gender"] = personal_information["gender"];
                this.props.dispatchModalVisible(false);
                this.props.dispatchEditVisible(1);
                // 获取输入框内所有值
                // console.log('Received values of form: ', values);
                updatePerson(values);
                this.props.form.setFields({
                    "name":"", "mobile_phone": "", "faculty": "", "major": "",
                    "email": "", "gender": "", "is_married": "", "university": "",
                    "student_id": ""
                })
            }
        });
    };

    render() {
        const { personal_information } = this.props;
        // console.log(personal_information["mobile_phone"])
        if (personal_information["mobile_phone"]===null){
            personal_information["mobile_phone"] = -1
        }else{
            personal_information["mobile_phone"] = personal_information["mobile_phone"].toString();
        }
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 2 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 0,
                },
            },
        };

        return (
            <div className = "item" style={{height:"20vw", overflowY:"scroll"}}>
            <Form
                {...formItemLayout}
                onSubmit={(e)=>this.handleSubmit(e, personal_information)}
                labelAlign="left"
            >
                <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                <div style={{display: "inline", fontSize:18}}>姓名：</div>
                <Form.Item >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入姓名!', whitespace: true }],
                        initialValue: personal_information['name']
                    })(<Input/>)}
                </Form.Item>
                {/*<div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>*/}
                {/*<div style={{display: "inline", fontSize:18}}>所在部门：</div>*/}
                {/*<Form.Item>*/}
                {/*    {getFieldDecorator('group', {*/}
                {/*        rules: [{ required: true, message: '请输入所在部门!', whitespace: true }],*/}
                {/*        initialValue: personal_information['group']*/}
                {/*    })(<Input />)}*/}
                {/*</Form.Item>*/}
                {/*<div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>*/}
                {/*<div style={{display: "inline", fontSize:18}}>岗位：</div>*/}
                {/*<Form.Item>*/}
                {/*    {getFieldDecorator('position', {*/}
                {/*        rules: [{ required: true, message: '请输入岗位!', whitespace: true }],*/}
                {/*        initialValue: personal_information['position']*/}
                {/*    })(<Input/>)}*/}
                {/*</Form.Item>*/}
                <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                <div style={{display: "inline", fontSize:18}}>电话：</div>
                <Form.Item>
                    {getFieldDecorator('mobile_phone', {
                        rules: [{ required: true, message: '请输入电话!', whitespace: true }],
                        initialValue: personal_information['mobile_phone']
                    })(<Input/>)}
                </Form.Item>
                <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                <div style={{display: "inline", fontSize:18}}>邮箱：</div>  <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: '请输入正确的邮箱格式!',
                            },
                            {
                                required: true,
                                message: '请输入邮箱!',
                            },
                        ],
                        initialValue: personal_information['email']
                    })(<Input/>)}
                </Form.Item>
                <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                <div style={{display: "inline", fontSize:18}}> 出生日期：</div>
                <Form.Item>
                    {getFieldDecorator('date-birthday', { type: 'object', required: true, message: '请选择时间!',
                            initialValue: moment(personal_information["birthday"], 'YYYY-MM-DD')
                        })(<DatePicker locale={locale} />)}
                </Form.Item>
                <div style={{display: "inline", fontSize:18}}> 婚否：</div>
                <Form.Item>
                    {getFieldDecorator('is_married', {
                        rules: [{ required: false, message: '请选择婚姻状态!' }],
                        initialValue: personal_information['is_married']
                    })(
                        <Select
                            placeholder="请选择婚姻状态"
                            onChange={this.handleSelectChange}
                        >
                            <Option value={0}>未婚</Option>
                            <Option value={1}>已婚</Option>
                        </Select>,
                    )}
                </Form.Item>

                {personal_information["university"]?
                    <div>
                        <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                        <div style={{display: "inline", fontSize:18}}>学校：</div>
                        <Form.Item>
                            {getFieldDecorator('university', {
                                rules: [{ required: true, message: '请输入学校!', whitespace: true }],
                                initialValue: personal_information["university"]
                            })(<Input/>)}
                        </Form.Item>
                        <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                        <div style={{display: "inline", fontSize:18}}>学院：</div>
                        <Form.Item>
                            {getFieldDecorator('faculty', {
                                rules: [{ required: true, message: '请输入学院!', whitespace: true }],
                                initialValue: personal_information['faculty']
                            })(<Input/>)}
                        </Form.Item>
                        <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                        <div style={{display: "inline", fontSize:18}}>专业：</div>
                        <Form.Item>
                            {getFieldDecorator('major', {
                                rules: [{ required: true, message: '请输入专业!', whitespace: true }],
                                initialValue: personal_information['major']
                            })(<Input/>)}
                        </Form.Item>
                        <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                        <div style={{display: "inline", fontSize:18}}>学号：</div>
                        <Form.Item>
                            {getFieldDecorator('student_id', {
                                rules: [{ required: true, message: '请输入学号!', whitespace: true }],
                                initialValue: personal_information['student_id']
                            })(<Input/>)}
                        </Form.Item>
                        <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                        <div style={{display: "inline", fontSize:18}}>入学时间：</div>
                        <Form.Item>
                            {getFieldDecorator('admission_date', { type: 'object', required: true, message: '请选择时间!',
                                initialValue: moment(personal_information["admission_date"], 'YYYY-MM-DD')
                            })(<DatePicker locale={locale} />)}
                        </Form.Item>
                        <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                        <div style={{display: "inline", fontSize:18}}>毕业时间：</div>
                        <Form.Item>
                            {getFieldDecorator('graduation_date', { type: 'object', required: true, message: '请选择时间!',
                                initialValue: moment(personal_information["graduation_date"], 'YYYY-MM-DD')
                            })(<DatePicker locale={locale} />)}
                        </Form.Item>
                    </div>:null
                }

                <Form.Item {...tailFormItemLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        提交
                    </Button>
                </Form.Item>
            </Form>
            </div>
        )
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(EditBasicInformation);

const mapStateToProps=(state)=>{
    return{
        personal_information: state.get("staff_management").get("personal_information").toJS(),
        modal_visible: state.get("staff_management").get("modal_visible"),
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

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);