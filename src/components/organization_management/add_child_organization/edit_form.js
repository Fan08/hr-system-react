import {Button, Form, Input, Radio} from "antd";
import React, {Component} from "react";
import {connect} from "react-redux"
import 'moment/locale/zh-cn';
import {addGroup} from "../store/actionCreators";

import "../edit_organization_information/form_style.css"
import {getCookie} from "../../../helpers/cookies";

class EditForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        group_type: "group"
    };

    handleSubmit = (e, group_type, selected_inode, selected_name, selected_type) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values["mobile_phone"] = parseInt(values["mobile_phone"]);
                values["owner"] = JSON.parse(getCookie("mspa_user")).username;
                values["father_inode"] = selected_inode;
                values["father_name"] = selected_name;
                values["father_type"] = selected_type;
                if (group_type==="group"){
                    values["child_type"] = "_group";
                }else {
                    values["child_type"] = group_type;
                }
                // 获取输入框内所有值
                // console.log('Received values of form: ', values, group_type);
                addGroup(group_type, [values]);
                this.props.form.setFields({
                    "name":"", "shortname":"", "mobile_phone": "",
                    "email": "", "description": "", "address": "",
                    "trade": "", "tax_number": ""
                })
            }
        });
    };

    onChange = e => {
        this.setState({
            group_type: e.target.value,
        });
    };

    render() {
        const {group_type} = this.state;
        const {selected_inode, selected_name, selected_type} = this.props;

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
                <Radio.Group onChange={this.onChange} value={group_type} style={{marginBottom: "1vw"}}>
                    <Radio value={"group"} style={{fontSize: 18}}>基本组</Radio>
                    <Radio value={"organization"} style={{fontSize: 18}}>一般组织</Radio>
                    <Radio value={"company"} style={{fontSize: 18}}>公司</Radio>
                </Radio.Group>
                <Form
                    {...formItemLayout}
                    onSubmit={(e)=>this.handleSubmit(e, group_type, selected_inode, selected_name, selected_type)}
                    labelAlign="left"
                >
                    <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                    <div style={{display: "inline", fontSize:18}}>组织名称：</div>
                    <Form.Item >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入组织名称!', whitespace: true }],
                        })(<Input className={"input-style"}/>)}
                    </Form.Item>
                    <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                    <div style={{display: "inline", fontSize:18}}>简称：</div>
                    <Form.Item>
                        {getFieldDecorator('shortname', {
                            rules: [{ required: true, message: '请输入简称!', whitespace: true }],
                        })(<Input className={"input-style"}/>)}
                    </Form.Item>
                    <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                    <div style={{display: "inline", fontSize:18}}>电话：</div>
                    <Form.Item>
                        {getFieldDecorator('mobile_phone', {
                            rules: [{ required: true, message: '请输入简称!', whitespace: true }],
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
                    })(<Input className={"input-style"}/>)}
                </Form.Item>

                    {/* 当组织类型为organization或company时进行显示 */}
                    {group_type!=="group"?
                        <div>
                            <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                            <div style={{display: "inline", fontSize:18}}>地址：</div>
                            <Form.Item>
                                {getFieldDecorator('address', {
                                    rules: [{ required: true, message: '请输入地址!', whitespace: true }],
                                })(<Input className={"input-style"}/>)}
                            </Form.Item>
                            <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                            <div style={{display: "inline", fontSize:18}}>行业：</div>
                            <Form.Item>
                                {getFieldDecorator('trade', {
                                    rules: [{ required: true, message: '请输入行业!', whitespace: true }],
                                })(<Input className={"input-style"}/>)}
                            </Form.Item>
                        </div>:null}

                    {/* 当组织类型为company时进行显示 */}
                    {group_type==="company"?
                        <div>
                            <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                            <div style={{display: "inline", fontSize:18}}>税号：</div>
                            <Form.Item>
                                {getFieldDecorator('tax_number', {
                                    rules: [{ required: true, message: '请输入税号!', whitespace: true }],
                                })(<Input className={"input-style"}/>)}
                            </Form.Item>
                        </div>:null}

                    <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                    <div style={{display: "inline", fontSize:18}}>组织介绍：</div>
                    <Form.Item>
                        {getFieldDecorator('description', {
                            rules: [{ required: true, message: '请输入组织介绍!', whitespace: true }],
                        })(<Input className={"input-style"}/>)}
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            提交新建申请
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
        // organization_information: state.get("organization_management").get("organization_information"),
        selected_name: state.get("common_store").get("selected_name"),
        selected_inode: state.get("common_store").get("selected_inode"),
        selected_type: state.get("common_store").get("selected_type"),
    }
};


export default connect(mapStateToProps, null)(WrappedRegistrationForm);