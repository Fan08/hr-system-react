import { Input, DatePicker, Collapse } from "antd";
import React, {Component} from "react";
import {connect} from "react-redux"
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import {Form, Select, Button, Row, Col } from 'antd';

import {dispatchModalVisible, addNewStaff} from "../store/actionCreators"

const { Option } = Select;
const { Panel } = Collapse;

class EditPersonalInformation extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        whether_student: false,
    };

    handleSubmit = (e, whether_student, selected_inode, selected_name, selected_type, staff_list) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // 获取输入框内所有值
                // console.log('Received values of form: ', values);
                values["group_inode"] = selected_inode;
                values["group_name"] = selected_name;
                values["group_type"] = selected_type;
                addNewStaff(whether_student, values, staff_list);
                this.props.form.setFields({
                    "name":"", "mobile_phone": "", "faculty": "", "major": "",
                    "email": "", "gender": "", "is_married": "", "university": "",
                    "student_id": ""
                })
            }
        });
    };

    whetherStudent(value){
        if (value){
            this.setState({whether_student: false})
        }else {
            this.setState({whether_student: true})
        }
    }

    render() {
        const {whether_student} = this.state;
        const { getFieldDecorator } = this.props.form;
        const {selected_inode, selected_name, selected_type, staff_list} = this.props;

        const config = {
            rules: [{ type: 'object', required: true, message: '请选择时间!' }],
        };

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
                    onSubmit={(e)=>this.handleSubmit(e, whether_student, selected_inode, selected_name, selected_type, staff_list)}
                    labelAlign="left"
                >
                    <Row gutter={24}>
                        <Col span={12} key={1} style={{ display: 'block' }}>
                            <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                            <div style={{display: "inline", fontSize:18}}>姓名：</div>
                            <Form.Item >
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '请输入姓名!', whitespace: true }],
                                })(<Input style={{width:"20vw"}}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={12} key={2} style={{ display: 'block' }}>
                            <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                            <div style={{display: "inline", fontSize:18}}>所在部门：</div>
                            <Form.Item>
                                {getFieldDecorator('group', {
                                    rules: [{ required: true, message: '请输入所在部门!', whitespace: true }],
                                    initialValue: selected_name
                                })(<Input style={{width:"20vw"}} />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12} key={3} style={{ display: 'block' }}>
                            <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                            <div style={{display: "inline", fontSize:18}}>岗位：</div>
                            <Form.Item>
                                {getFieldDecorator('position', {
                                    rules: [{ required: true, message: '请输入岗位!', whitespace: true }],
                                })(<Input style={{width:"20vw"}}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={12} key={4} style={{ display: 'block' }}>
                            <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                            <div style={{display: "inline", fontSize:18}}>电话：</div>
                            <Form.Item>
                                {getFieldDecorator('mobile_phone', {
                                    rules: [{ required: true, message: '请输入电话!', whitespace: true }],
                                })(<Input style={{width:"20vw"}}/>)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12} key={5} style={{ display: 'block' }}>
                            <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                            <div style={{display: "inline", fontSize:18}}>邮箱：</div>
                                <Form.Item>
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
                                    })(<Input style={{width:"20vw"}}/>)}
                                </Form.Item>
                        </Col>
                        <Col span={12} key={6} style={{ display: 'block' }}>
                            <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                            <div style={{display: "inline", fontSize:18}}> 出生日期：</div>
                            <Form.Item>
                                {getFieldDecorator('birthday', config)(<DatePicker locale={locale} style={{width:"20vw"}} />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={12} key={"gender"} style={{ display: 'block' }}>
                            <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                            <div style={{display: "inline", fontSize:18}}>性别：</div>
                            <Form.Item>
                                {getFieldDecorator('gender', {
                                    rules: [{ required: true, message: '请选择性别!' }],
                                })(
                                    <Select
                                        placeholder="请选择性别"
                                        onChange={this.handleSelectChange}
                                        style={{width:"20vw"}}
                                    >
                                        <Option value={0}>女</Option>
                                        <Option value={1}>男</Option>
                                    </Select>,
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12} key={"is_married"} style={{ display: 'block' }}>
                            <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                            <div style={{display: "inline", fontSize:18}}> 婚否：</div>
                            <Form.Item>
                                {getFieldDecorator('is_married', {
                                    rules: [{ required: true, message: '请选择婚姻状态!' }],
                                })(
                                    <Select
                                        placeholder="请选择婚姻状态"
                                        onChange={this.handleSelectChange}
                                        style={{width:"20vw"}}
                                    >
                                        <Option value={0}>未婚</Option>
                                        <Option value={1}>已婚</Option>
                                    </Select>,
                                )}
                            </Form.Item>
                        </Col>
                        {/*<Col span={12} key={"whether_student"} style={{ display: 'block' }}>*/}
                        {/*    <div style={{fontSize:18}}>是否是学生：</div>*/}
                        {/*    <Radio.Group onChange={this.onChange} value={whether_student} style={{marginTop:"10px"}}>*/}
                        {/*        <Radio value={true}>是</Radio>*/}
                        {/*        <Radio value={false}>不是</Radio>*/}
                        {/*    </Radio.Group>*/}
                        {/*</Col>*/}
                    </Row>
                    <Collapse style={{width:"50vw"}} onChange={()=>this.whetherStudent(whether_student)}>
                        <Panel header="填写在校学生信息" key="1">
                            {whether_student?
                            <div>
                                <Row gutter={24}>
                                    <Col span={12} key={8} style={{ display: 'block' }}>
                                        <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                                        <div style={{display: "inline", fontSize:18}}>学校：</div>
                                        <Form.Item>
                                            {getFieldDecorator('university', {
                                                rules: [{ required: true, message: '请输入学校!', whitespace: true }],
                                            })(<Input style={{width:"20vw"}}/>)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} key={9} style={{ display: 'block' }}>
                                        <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                                        <div style={{display: "inline", fontSize:18}}>学院：</div>
                                        <Form.Item>
                                            {getFieldDecorator('faculty', {
                                                rules: [{ required: true, message: '请输入学院!', whitespace: true }],
                                            })(<Input style={{width:"20vw"}}/>)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={12} key={10} style={{ display: 'block' }}>
                                        <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                                        <div style={{display: "inline", fontSize:18}}>专业：</div>
                                        <Form.Item>
                                            {getFieldDecorator('major', {
                                                rules: [{ required: true, message: '请输入专业!', whitespace: true }],
                                            })(<Input style={{width:"20vw"}}/>)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} key={11} style={{ display: 'block' }}>
                                        <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                                        <div style={{display: "inline", fontSize:18}}>学号：</div>
                                        <Form.Item>
                                            {getFieldDecorator('student_id', {
                                                rules: [{ required: true, message: '请输入学号!', whitespace: true }],
                                            })(<Input style={{width:"20vw"}}/>)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={12} key={12} style={{ display: 'block' }}>
                                        <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                                        <div style={{display: "inline", fontSize:18}}>入学时间：</div>
                                        <Form.Item>
                                            {getFieldDecorator('admission_date', config)(<DatePicker locale={locale} style={{width:"20vw"}} />)}
                                        </Form.Item>
                                    </Col>
                                    <Col span={12} key={13} style={{ display: 'block' }}>
                                        <div style={{display: "inline", fontSize:18, color:"red"}}>*&nbsp;</div>
                                        <div style={{display: "inline", fontSize:18}}>毕业时间：</div>
                                        <Form.Item>
                                            {getFieldDecorator('graduation_date', config)(<DatePicker locale={locale} style={{width:"20vw"}} />)}
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </div>: null}
                        </Panel>
                    </Collapse>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" style={{marginTop:"1.5vw"}}>
                            提交新增人员信息
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(EditPersonalInformation);

const mapStateToProps=(state)=>{
    return{
        staff_list: state.get("organization_management").get("staff_list"),
        modal_visible: state.get("staff_management").get("modal_visible"),
        selected_name: state.get("common_store").get("selected_name"),
        selected_inode: state.get("common_store").get("selected_inode"),
        selected_type: state.get("common_store").get("selected_type"),
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        dispatchModalVisible(value){
            dispatch(dispatchModalVisible(value))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);