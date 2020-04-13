/*
 * @Descripttion: 
 * @version: 
 * @Author: 马林谦
 * @Date: 2020-03-15 15:52:15
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-03-15 20:23:55
 */
import React,{Component} from 'react';
import {Button, Modal} from 'antd'
import {connect} from 'react-redux'
import {dispatchTaskListVisible} from '../store/actionCreators'
import TaskItem from "./fatherTaskitem";


class TaskModal extends Component{

    taskListCancel=()=>{
        this.props.changeTaskList(false)
    }


    render() {
        const {task_list_visible,task_list}=this.props
        return(
            <div>
                <Modal
                    visible={task_list_visible}
                    footer={<Button type='primary' onClick={this.taskListCancel}>返回</Button>}
                    onCancel={this.taskListCancel}
                    title={'任务列表'}>
                    <div style={{overflowY:'auto',height:250}}>
                        {task_list.map((task,index)=>{
                            return <TaskItem task={task} key={index}/>
                        })}
                    </div>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        task_list_visible: state.get('working_task_management').get('task_list_visible'),
        task_list: state.get('working_task_management').get('task_list').toJS(),
    }
}

const dispatchStateToProps=(dispatch)=>{
    return{
        changeTaskList(data){
            dispatch(
                dispatchTaskListVisible(data)
            )
        },
    }
}
export default connect(mapStateToProps,dispatchStateToProps)(TaskModal)