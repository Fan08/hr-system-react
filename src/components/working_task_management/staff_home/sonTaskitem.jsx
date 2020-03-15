import React,{Component} from 'react';
import {connect} from 'react-redux'

import SonTaskInformation from './son_task_information';

class SonTaskItem extends Component{
    constructor(props){
        super(props);
        this.state={
            child_visible: false,
        };
        this.changeChildVisible = this.changeChildVisible.bind(this)
    }
    
    changeChildVisible(){
        const {child_visible} = this.state;
        this.setState({
            child_visible: !child_visible,
        })
    }

    render() {
        const {task}=this.props
        return(
            <div style={{height:30,border:"solid",marginBottom:5,marginTop:5,borderRadius:5}} onClick={this.changeChildVisible}>
                <div>
                    {task.state?
                        <div style={{backgroundColor:'green',height:20,width:20,marginTop:2,float:"left",borderRadius:5,marginLeft:3}}/>:
                        <div style={{backgroundColor:'#A6A6A6',height:20,width:20,marginTop:2,float:"left",borderRadius:5,marginLeft:3}}/>}
                </div>
                <div style={{float:"left",marginLeft:10}}>{task.detail}</div>
                <div style={{float:'right',marginRight:15,marginBottom:15}}>{task.end_time} 截止</div>
                <SonTaskInformation task={task} changeChildVisible={this.changeChildVisible} visible={this.state.child_visible}/>
            </div>
        )
    }
}

export default connect(null,null)(SonTaskItem)