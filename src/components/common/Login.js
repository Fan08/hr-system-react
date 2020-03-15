import React, {Component} from "react";
import {setCookie} from "../../helpers/cookies";
import '../../style/login.css'
import { Form, Icon, Input, Button, message, Checkbox, Spin } from 'antd';

// const client_id = 'b7f8065ab0c7188c2a21';
// const authorize_uri = 'https://github.com/login/oauth/authorize';
// const redirect_uri = 'http://localhost:8080/oauth/redirect';

const users = [{
    username:'admin',
    password:'admin'
},{
    username:'11',
    password:'11'
}];

function PatchUser(values) {  //匹配用户
    const {username, password} = values;
    return users.find(user => user.username === username && user.password === password);
}

class NormalLoginForm extends Component {
    state = {
        isLoding:false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of operation: ', values);
                if(PatchUser(values)){
                    this.setState({
                        isLoding: true,
                    });

                    setCookie('mspa_user',JSON.stringify(values));
                    message.success('login successed!'); //成功信息
                    let that = this;
                    setTimeout(function() { //延迟进入
                        that.props.history.push({pathname:'/app',state:values});
                    }, 1000);

                }else{
                    message.error('login failed!'); //失败信息
                }
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            this.state.isLoding?<div style={{width:"100%", paddingLeft:"45%", paddingTop:"20%"}}><Spin size="large" className="loading" /></div>:
            <div style={{width:"100%"}}>
                <Form onSubmit={this.handleSubmit} className="login-form" style={{margin:"0 auto", paddingTop:"10%"}}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>记住密码</Checkbox>)}
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a className="login-form-forgot" href="#">
                            忘记密码
                        </a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登陆
                        </Button>
                        {/*Or <a href="">register now!</a>*/}
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);
export default Login;