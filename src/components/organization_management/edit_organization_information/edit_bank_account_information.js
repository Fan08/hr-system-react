import { Input } from "antd";
import React, {Component} from "react";
import {connect} from "react-redux"
import 'moment/locale/zh-cn';
import { Form, Button } from 'antd';
import {requestBankAccountByOwner, updateBankAccountByOwner} from "../store/actionCreators";

class WrappedRegistrationForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        const {current_bank_account, selected_inode} = this.props;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // 获取输入框内所有值
                // console.log('Received values of form: ', values);
                values["inode"] = current_bank_account.get("inode");
                values["owner_inode"] = selected_inode;
                values["bank_account"] = parseInt(values["bank_account"]);
                updateBankAccountByOwner(values);
                //对表单进行清空操作，避免提交后的表单被固定为提交内容
                this.props.form.setFields({
                    "bank_account":"", "account_name":"",
                    "opening_bank": "", "id_card": "",
                    "id_card_address": "",
                })
            }
        });
    };

    render() {
        const { selected_inode, current_bank_account } = this.props;
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
            <div className = "item">
                {/*{console.log(current_bank_account["size"], current_bank_account.get("owner_inode"), selected_inode)}*/}
                {current_bank_account["size"]===0?this.props.requestBankAccountByOwner(selected_inode):null}
                {current_bank_account["size"]!==0&&current_bank_account.get("owner_inode")!==selected_inode?
                    this.props.requestBankAccountByOwner(selected_inode):null}
                <Form
                    {...formItemLayout}
                    onSubmit={this.handleSubmit}
                    labelAlign="left"
                >
                    <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                    <div style={{display: "inline", fontSize:18}}>银行账户：</div>
                    <Form.Item >
                        {getFieldDecorator('bank_account', {
                            rules: [{ required: true, message: '请输入银行账户!', whitespace: true }],
                            initialValue: current_bank_account.get('bank_account')
                        })(<Input/>)}
                    </Form.Item>
                    <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                    <div style={{display: "inline", fontSize:18}}>所在银行账户名：</div>
                    <Form.Item>
                        {getFieldDecorator('account_name', {
                            rules: [{ required: true, message: '请输入所在银行账户名!', whitespace: true }],
                            initialValue: current_bank_account.get('account_name')
                        })(<Input />)}
                    </Form.Item>
                    <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                    <div style={{display: "inline", fontSize:18}}>开户行：</div>
                    <Form.Item>
                        {getFieldDecorator('opening_bank', {
                            rules: [{ required: true, message: '请输入开户行!', whitespace: true }],
                            initialValue: current_bank_account.get('opening_bank')
                        })(<Input/>)}
                    </Form.Item>
                    <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                    <div style={{display: "inline", fontSize:18}}>身份证号：</div>
                    <Form.Item>
                        {getFieldDecorator('id_card', {
                            rules: [{ required: true, message: '请输入身份证号!', whitespace: true }],
                            initialValue: current_bank_account.get('id_card')
                        })(<Input/>)}
                    </Form.Item>
                    <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                    <div style={{display: "inline", fontSize:18}}>身份证地址：</div>
                    <Form.Item>
                        {getFieldDecorator('id_card_address', {
                            rules: [{ required: true, message: '请输入身份证地址!', whitespace: true }],
                            initialValue: current_bank_account.get('id_card_address')
                        })(<Input/>)}
                    </Form.Item>
                    {/*<div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>*/}
                    {/*<div style={{display: "inline", fontSize:18}}>邮箱：</div>  <Form.Item>*/}
                    {/*    {getFieldDecorator('email', {*/}
                    {/*        rules: [*/}
                    {/*            {*/}
                    {/*                type: 'email',*/}
                    {/*                message: '请输入正确的邮箱格式!',*/}
                    {/*            },*/}
                    {/*            {*/}
                    {/*                required: true,*/}
                    {/*                message: '请输入邮箱!',*/}
                    {/*            },*/}
                    {/*        ],*/}
                    {/*        initialValue: personal_information['email']*/}
                    {/*    })(<Input/>)}*/}
                    {/*</Form.Item>*/}

                    <Form.Item {...tailFormItemLayout}>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            提交银行账户信息
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const EditBankAccountInformation = Form.create({ name: 'register' })(WrappedRegistrationForm);

const mapStateToProps=(state)=>{
    return{
        selected_inode: state.get("common_store").get("selected_inode"),
        current_bank_account: state.get("organization_management").get("current_bank_account"),
    }
};

const mapDispatchToProps=(dispatch)=> {
    return {
        requestBankAccountByOwner(value){
            dispatch(requestBankAccountByOwner(value));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBankAccountInformation);