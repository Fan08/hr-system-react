/*
 * @Descripttion: 
 * @version: 
 * @Author: 马林谦
 * @Date: 2020-03-15 15:52:15
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-03-15 20:23:42
 */
import React,{Component} from 'react';
import {Table} from "antd";
import {dispatchFatherTaskInformationVisible} from '../store/actionCreators'
import {connect} from "react-redux";
import TaskInformationModal from "../staff_home/father_task_information";


const columns = [
    {
        title: '任务详情',
        dataIndex: 'detail',
        key: 'detail',
    },
    {
        title: '项目组',
        dataIndex: 'group',
        key: 'group',
    },
    {
        title: '执行人',
        dataIndex: 'people',
        key: 'people',
    },
    {
        title: '开始日期',
        dataIndex: 'start_time',
        key: 'start_time',
    },
    {
        title: '截止日期',
        dataIndex: 'end_time',
        key: 'end_time',
    },
]
class TaskTable extends Component{
    state={
        no:0
    }

    recordClick(no){
        this.setState({
            no:no
        })
        this.props.dispatchTaskInformationVisible(true)
    }

    render() {
        const {submit_task_list}=this.props
        const {no}=this.state
        return(
            <div>
                <Table
                    columns={columns}
                    rowKey={(record,index)=>{
                        return record.no
                    }}
                    style={{width:"40vw", marginLeft:"4vw", marginBottom:"2vw"}}
                    dataSource={submit_task_list}
                    onRow={(record,index) => {
                        return{
                            onClick:()=>{
                                this.recordClick(index)
                            }
                        }
                    }}
                />
                <TaskInformationModal task={submit_task_list[no]} key={no}/>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    return {
        submit_task_list: state.get("working_task_management").get("submit_task_list").toJS(),
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        dispatchTaskInformationVisible(value){
            dispatch(dispatchFatherTaskInformationVisible(value))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskTable);