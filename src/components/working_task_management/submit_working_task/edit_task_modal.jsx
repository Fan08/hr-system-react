/*
 * @Descripttion: 
 * @version: 
 * @Author: 马林谦
 * @Date: 2020-03-13
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-03-15 16:42:48
 */
import React,{Component} from 'react';
import moment from 'moment'
import {Modal,Button,Form,Input,Icon,Select,DatePicker} from "antd";
import {dispatchEditTaskVisible,dispatchSubmitTaskList} from "../store/actionCreators";
import {connect} from 'react-redux'

const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 12 },
};
const {TextArea}=Input;
const {Option}=Select;
class EditTaskModal extends Component{

    handleSubmit=(e)=>{
        e.preventDefault();
        const {submit_task_list}=this.props;
        const data = submit_task_list;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values["state"]=0;
                values["no"]=`${submit_task_list.length+1}`;
                values["son_task"]=[];
                values["start_time"]=moment(values["start_time"]).format('YYYY-MM-DD');
                values["end_time"]=moment(values["end_time"]).format('YYYY-MM-DD');
                if(values.father_task==='无'){
                    data.push(values);
                    this.props.dispatchSubmitTaskList(data);
                    alert('提交成功！');
                    return;
                }else{
                    for (let task of data){
                        if(task.no===values.father_task){
                            task.son_task.push(values);
                        }
                    }
                    this.props.dispatchSubmitTaskList(data);
                    alert('提交成功！');
                    return;
                }
            }
        });
        this.props.dispatchEditTaskVisible(false);
        return;
    }

    Cancel=()=>{
        this.props.dispatchEditTaskVisible(false);
        return;
    }

    render() {
        const {edit_task_visible,submit_task_list}=this.props;
        const {getFieldDecorator}=this.props.form;

        let group_list = submit_task_list.map(task=>{
            return task.group;
        })
        const groupList=Array.from(new Set(group_list));

        let people_list = submit_task_list.map(task=>{
           return task.people;
        })
        const peopleList=Array.from(new Set(people_list));
        return(
            <div>
                <Modal
                    onCancel={this.Cancel}
                    title={'新建任务'}
                    visible={edit_task_visible}
                    style={{top:50}}
                    footer={null}>
                    <Form {...layout}
                          onSubmit={this.handleSubmit}
                          style={{overflowY:'auto',height:370}}>
                        <Form.Item label={<span><Icon type='close'/>&nbsp;状态</span>}>
                            {getFieldDecorator('state',{initialValue:'未完成',rules:[{required:true}]})(<div>未完成</div>)}
                        </Form.Item>
                        <Form.Item label={<span><Icon type='apartment'/>&nbsp;父任务</span>}>
                            {getFieldDecorator('father_task',{rules:[{required:true}]})(
                            <Select>
                                <Option value='无'>无</Option>
                                {submit_task_list.map((task,index)=>{
                                    let task_item = null;
                                    if(task.father_task==='无'){
                                        task_item = <Option value={task.no} key={index}>{task.no}-{task.detail}</Option>
                                    }
                                    return task_item;
                                })}
                            </Select>)}
                        </Form.Item>
                        <Form.Item label={<span><Icon type='bank'/>&nbsp;项目组</span>}>
                            {getFieldDecorator('group',{rules:[{required:true,message:'请输入项目组名称'}]})(
                            <Select>
                                {
                                    groupList.map((item, index)=> {
                                        return <Option value={item} key={index}>{item}</Option>
                                    })
                                }
                            </Select>)}
                        </Form.Item>
                        <Form.Item label={<span><Icon type='user'/>&nbsp;执行人</span>}>
                            {getFieldDecorator('people',{rules:[{required:true,message:'请输入执行人'}]})(
                            <Select>
                                {
                                    peopleList.map((item, index)=>{
                                    return <Option value={item} key={index}>{item}</Option>
                                })
                                }
                            </Select>)}
                        </Form.Item>
                        <Form.Item label={<span><Icon type='calendar'/>&nbsp;开始时间</span>}>
                            {getFieldDecorator('start_time',{rules:[{required:true,message:'请输入开始时间'}]})(<DatePicker/>)}
                        </Form.Item>
                        <Form.Item label={<span><Icon type='calendar'/>&nbsp;截止时间</span>}>
                            {getFieldDecorator('end_time',{rules:[{required:true,message:'请输入截止时间'}]})(<DatePicker/>)}
                        </Form.Item>
                        <Form.Item label={<span><Icon type='read'/>&nbsp;任务内容</span>}>
                            {getFieldDecorator('detail',{rules:[{required:true,message:'请输入任务内容'}]})(<TextArea/>)}
                        </Form.Item>
                        <Form.Item label={<span><Icon type='book'/>&nbsp;备注</span>}>
                            {getFieldDecorator('addition',{rules:[{required:false}]})(<Input/>)}
                        </Form.Item>
                        <Form.Item label={<span><Icon type='file'/>&nbsp;附件</span>}>
                            {getFieldDecorator('accessory',{rules:[{required:false,}]})(<Button>添加附件</Button>)}
                        </Form.Item>
                        <Form.Item style={{display:"inline-block",marginLeft:160}}>
                            <Button type='primary' htmlType='submit' >提交</Button>
                        </Form.Item>
                        <Form.Item style={{display:"inline-block",marginLeft:10}}>
                            <Button onClick={this.Cancel}>取消</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
};

const mapStateToProps=(state)=>{
    return {
        submit_task_list: state.get("working_task_management").get("submit_task_list").toJS(),
        edit_task_visible: state.get("working_task_management").get("edit_task_visible"),
        task_list: state.get("working_task_management").get("task_list").toJS(),
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        dispatchEditTaskVisible(value){
            dispatch(dispatchEditTaskVisible(value))
        },
        dispatchSubmitTaskList(value){
            dispatch(dispatchSubmitTaskList(value))
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Form.create()(EditTaskModal));