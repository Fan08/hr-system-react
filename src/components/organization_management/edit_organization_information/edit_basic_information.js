import { Input } from "antd";
import React, {Component} from "react";
import {connect} from "react-redux"
// import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import { Form, Button } from 'antd';

import {requestOrganizationInformation, updateOrganizationInformation} from "../store/actionCreators";
import "./form_style.css"

class EditForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        const {selected_inode, organization_information} = this.props;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values["inode"] = selected_inode;
                const current_organization_information = organization_information.get(selected_inode).toJS();
                values["owner"] = current_organization_information["owner"];
                values["type"] = current_organization_information["type"];
                // 获取输入框内所有值
                // console.log('Received values of form: ', values);
                updateOrganizationInformation(values, organization_information.toJS());
                this.props.form.setFields({
                    "name":"", "shortname":"", "mobile_phone": "",
                    "email": "", "description": "", "address": "",
                    "trade": "", "tax_number": ""
                })
            }
        });
    };

    render() {
        const {organization_information, selected_inode} = this.props;

        let current_organization_information = {};
        if (organization_information.get(selected_inode) === null || organization_information.get(selected_inode) === undefined){
            if (selected_inode !== null){
                requestOrganizationInformation(organization_information, selected_inode);
            }
        }else {
            current_organization_information = organization_information.get(selected_inode).toJS();
            current_organization_information["mobile_phone"] = current_organization_information["mobile_phone"].toString();
        }

        const { getFieldDecorator } = this.props.form;
        // const config = {
        //     rules: [{ type: 'object', required: true, message: '请选择时间!' }],
        // };

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
            <div className = "item" style={{marginTop:"1vw"}}>
                <Form
                    {...formItemLayout}
                    onSubmit={this.handleSubmit}
                    labelAlign="left"
                >
                    <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                    <div style={{display: "inline", fontSize:18}}>组织名称：</div>
                    <Form.Item >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入组织名称!', whitespace: true }],
                            initialValue: current_organization_information["name"]
                        })(<Input className={"input-style"}/>)}
                    </Form.Item>
                    <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                    <div style={{display: "inline", fontSize:18}}>简称：</div>
                    <Form.Item>
                        {getFieldDecorator('shortname', {
                            rules: [{ required: true, message: '请输入简称!', whitespace: true }],
                            initialValue: current_organization_information['shortname']
                        })(<Input className={"input-style"}/>)}
                    </Form.Item>
                    <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                    <div style={{display: "inline", fontSize:18}}>电话：</div>
                    <Form.Item>
                        {getFieldDecorator('mobile_phone', {
                            rules: [{ required: true, message: '请输入简称!', whitespace: true }],
                            initialValue: current_organization_information['mobile_phone']
                        })(<Input className={"input-style"}/>)}
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
                        initialValue: current_organization_information['email']
                    })(<Input className={"input-style"}/>)}
                </Form.Item>

                    {/* 当组织类型为organization或company时进行显示 */}
                    {current_organization_information["type"]==="organization"||current_organization_information["type"]==="company"?
                    <div>
                        <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                        <div style={{display: "inline", fontSize:18}}>地址：</div>
                        <Form.Item>
                            {getFieldDecorator('address', {
                                rules: [{ required: true, message: '请输入地址!', whitespace: true }],
                                initialValue: current_organization_information['address']
                            })(<Input className={"input-style"}/>)}
                        </Form.Item>
                        <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                        <div style={{display: "inline", fontSize:18}}>行业：</div>
                        <Form.Item>
                            {getFieldDecorator('trade', {
                                rules: [{ required: true, message: '请输入行业!', whitespace: true }],
                                initialValue: current_organization_information['trade']
                            })(<Input className={"input-style"}/>)}
                        </Form.Item>
                    </div>:null}

                    {/* 当组织类型为company时进行显示 */}
                    {current_organization_information["type"]==="company"?
                        <div>
                            <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                            <div style={{display: "inline", fontSize:18}}>税号：</div>
                            <Form.Item>
                                {getFieldDecorator('tax_number', {
                                    rules: [{ required: true, message: '请输入税号!', whitespace: true }],
                                    initialValue: current_organization_information['tax_number']
                                })(<Input className={"input-style"}/>)}
                            </Form.Item>
                        </div>:null}

                    {/*<div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>*/}
                    {/*<div style={{display: "inline", fontSize:18}}> 创建日期：</div>*/}
                    {/*<Form.Item>*/}
                    {/*    {getFieldDecorator('created_date', config)(<DatePicker locale={locale}  className={"input-style"}/>)}*/}
                    {/*</Form.Item>*/}
                    <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                    <div style={{display: "inline", fontSize:18}}>组织介绍：</div>
                    <Form.Item>
                        {getFieldDecorator('description', {
                            rules: [{ required: true, message: '请输入组织介绍!', whitespace: true }],
                            initialValue: current_organization_information['description']
                        })(<Input className={"input-style"}/>)}
                    </Form.Item>
                    {/*{console.log("组织类型", current_organization_information["type"])}*/}
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(EditForm);

const mapStateToProps=(state)=>{
    return{
        organization_information: state.get("organization_management").get("organization_information"),
        selected_inode: state.get("common_store").get("selected_inode"),
    }
};

export default connect(mapStateToProps, null)(WrappedRegistrationForm);