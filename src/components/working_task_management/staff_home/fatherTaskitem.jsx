import React,{Component} from 'react';
import {dispatchFatherTaskInformationVisible} from "../store/actionCreators";
import {connect} from 'react-redux'
import TaskInformationModal from "./father_task_information";

class TaskLItem extends Component{

    click=()=>{
        this.props.dispatchTaskInformationVisible(true)
    }

    render() {
        const {task}=this.props
        return(
            <div>
                <div style={{height:35,borderBottom:"solid #F0F0F0",marginBottom:5}} onClick={this.click}>
                    <div>
                        {task.state?
                            <div style={{backgroundColor:'green',height:20,width:20,display:'inline-block',paddingTop:10,borderRadius:5}}/>:
                            <div style={{backgroundColor:'#A6A6A6',height:20,width:20,display:'inline-block',paddingTop:10,borderRadius:5}}/>}
                        <div style={{display:'inline-block',marginLeft:10,marginBottom:15}}>{task.detail}</div>
                        <div style={{display:'inline-block',float:'right',marginRight:15,marginBottom:15}}>{task.end_time} 截止</div>
                        <div style={{width:'90%',marginLeft:'5%',backgroundColor:'#A6A6A6'}}/>
                    </div>
                </div>
                <TaskInformationModal task={task}/>
            </div>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        dispatchTaskInformationVisible(value){
            dispatch(dispatchFatherTaskInformationVisible(value))
        }
    }
};

export default connect(null,mapDispatchToProps)(TaskLItem)
