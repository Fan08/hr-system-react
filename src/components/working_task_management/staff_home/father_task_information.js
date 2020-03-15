/*
 * @Descripttion: 点击人员列表时以弹窗的形式展示任务信息
 * @version: 
 * @Author: 马林谦
 * @Date: 2020-03-13
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-03-15 17:04:34
 */
import React, {Component} from "react";
import {connect} from "react-redux"
import {Modal, Icon, Button} from "antd";
import SonTaskItem from "./sonTaskitem";

import {dispatchFatherTaskInformationVisible} from '../store/actionCreators'


const style_of_modal_Icon = {display:"inline-block", marginRight: 10}

class TaskInformationModal extends Component{

    taskInformationCancel=()=>{
        this.props.dispatchTaskVisible(false)
    }


    render() {
        const {father_task_information_visible,task} = this.props;
        return(
            <Modal
                title="任务详情"
                onCancel={this.taskInformationCancel}
                visible={father_task_information_visible}
                footer={<Button type='primary' onClick={this.taskInformationCancel}>返回</Button>}
            >
                <div style={{padding:10,fontSize:15,overflowY:'auto',height:250}}>
                    {task.state===0?
                        <div style={{marginTop:8}}>
                            <Icon type={'close'} style={style_of_modal_Icon}/>
                            状态: 
                            <span style={{marginLeft:105}}>未完成</span>
                        </div>:
                        <div>
                            <Icon type={'check'} style={style_of_modal_Icon}/>
                            状态: <span style={{marginLeft:100,display:"inline-block"}}>已完成</span>
                        </div>}
                    <div style={{marginTop:8}}>
                        <Icon type={'user'} style={style_of_modal_Icon}/>
                        父组件: <span style={{marginLeft:85,display:"inline-block"}}>{task.father_task}</span>
                    </div>
                    <div style={{marginTop:8}}>
                        <Icon type={'user'} style={style_of_modal_Icon}/>
                        执行人: <span style={{marginLeft:85,display:"inline-block"}}>{task.people}</span>
                    </div>
                    <div style={{marginTop:8}}>
                        <Icon type={'calendar'} style={style_of_modal_Icon}/>
                        时间: <span style={{marginLeft:100,display:"inline-block"}}>{task.start_time}——{task.end_time}</span>
                    </div>
                    <div style={{marginTop:8}}>
                        <Icon type={'bank'} style={style_of_modal_Icon}/>
                        项目组: <span style={{marginLeft:85,display:"inline-block"}}>{task.group}</span>
                    </div>
                    <div style={{marginTop:8}}>
                        <Icon type={'read'} style={style_of_modal_Icon}/>
                        任务: <span style={{marginLeft:100,display:"inline-block"}}>{task.detail}</span>
                    </div>
                    <div style={{marginTop:8}}>
                        <Icon type={'book'} style={style_of_modal_Icon}/>
                        备注: <span style={{marginLeft:100,display:"inline-block"}}>{task.addition}</span>
                    </div>
                    <div style={{marginTop:8}}>
                        <Icon type={'apartment'} style={style_of_modal_Icon}/>
                        子任务:
                        {task.son_task.map((task,index)=>{
                            return <SonTaskItem task={task} key={index}/>
                        })}
                    </div>
                    <div style={{marginTop:8}}>
                        <Icon type={'file'} style={style_of_modal_Icon}/>
                        附件: <div style={{marginLeft:100,display:"inline-block"}}>{task.accessory}</div>
                    </div>
                </div>
            </Modal>
        )
    }

}

const mapStateToProps=(state)=>{
    return{
        father_task_information_visible: state.get("working_task_management").get("father_task_information_visible"),
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        dispatchTaskVisible(value){
            dispatch(dispatchFatherTaskInformationVisible(value))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskInformationModal);