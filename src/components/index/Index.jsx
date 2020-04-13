import React, { Component } from 'react';
import BreadcrumbCustom from '../common/BreadcrumbCustom';
// import {Row, Col} from 'antd';
import './index.less';
// import ReactEcharts from 'echarts-for-react';
import SubmitWorkingTask from "../working_task_management/submit_working_task/index"

export default class MIndex extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {

    //     }
    // }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                {/* <BreadcrumbCustom paths={['首页']} /> */}
                {/* 首页测试 */}
                <SubmitWorkingTask />
            </div>
        )
    }
}
