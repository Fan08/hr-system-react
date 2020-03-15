import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Layout} from 'antd';
import '../../style/index.less';
import {getCookie, setCookie} from "../../helpers/cookies";
import {Provider} from 'react-redux';

import store from "../store";
// import {actionCreators} from "./store"
import SiderCustom from './SiderCustom';
import HeaderCustom from './HeaderCustom';
import MIndex from '../index/Index';
import noMatch from './404';

import OrganizationHome from '../organization_management/organization_home';
import OrganizationConstructorManage from '../organization_management/organization_constructor_manage';
import EditOrganizationInformation from "../organization_management/edit_organization_information";
import AddChildOrganization from "../organization_management/add_child_organization"

import StaffHome from "../staff_management/staff_home";
import AddStaff from "../staff_management/add_staff";
import StaffListManagement from "../staff_management/staff_list_management";

import SubmitWorkingHours from "../working_hours_management/submit_working_hours"
import WorkingHoursRecord from "../working_hours_management/working_hours_record"
import ReviewWorkingHours from "../working_hours_management/review_working_hours"

import DetailInformationOfTask from "../working_task_management/staff_home/index"
import SubmitWorkingTask from "../working_task_management/submit_working_task/index"

const {Content, Footer} = Layout;

export default class App extends Component {

    state = {
        collapsed: getCookie("mspa_SiderCollapsed") === "true",
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        }, function () {
            setCookie("mspa_SiderCollapsed", this.state.collapsed);
        });
    };

    componentDidMount() {
        //保存Sider收缩
        if (getCookie("mspa_SiderCollapsed") === null) {
            setCookie("mspa_SiderCollapsed", false);
        }
    }

    render() {
        const {collapsed} = this.state;
        const {location} = this.props;
        let name;
        // console.log(typeof getCookie(""));
        if (!getCookie("mspa_user") || getCookie("mspa_user") === "undefined") {
            return <Redirect to="/login"/>
        } else {
            name = JSON.parse(getCookie("mspa_user")).username;
        }

        // let winWidth = 0;
        // let winHeight = 0;
        // function findDimensions() //函数：获取尺寸
        // {
        //     //获取窗口宽度
        //     if (window.innerWidth)
        //         winWidth = window.innerWidth;
        //     else if ((document.body) && (document.body.clientWidth))
        //         winWidth = document.body.clientWidth;
        //     //获取窗口高度
        //     if (window.innerHeight)
        //         winHeight = window.innerHeight;
        //     else if ((document.body) && (document.body.clientHeight))
        //         winHeight = document.body.clientHeight;
        //
        //     //通过深入Document内部对body进行检测，获取窗口大小
        //     if (document.documentElement  && document.documentElement.clientHeight &&
        //         document.documentElement.clientWidth)
        //     {
        //         winHeight = document.documentElement.clientHeight;
        //         winWidth = document.documentElement.clientWidth;
        //     }
        //     store.dispatch(actionCreators.dispatchWindowWidth(winWidth));
        // }
        // window.addEventListener("resize", findDimensions);
        // findDimensions();

        return (
            <div style={{height:"100vh"}}>
            <Layout className="ant-layout-has-sider">
                <SiderCustom collapsed={collapsed} path={location.pathname}/>
                <Layout style={{marginLeft:200, }}>
                    <HeaderCustom collapsed={collapsed} toggle={this.toggle} username={name}/>
                    <Content style={{margin: '0 16px', paddingTop: "15px", paddingBottom: "15px"}}>
                        <Provider store={store}>
                            {/*<PersistGate loading={null} persistor={persistor}>*/}
                            <Switch>
                                <Route exact path={'/app'} component={MIndex} />

                                <Route exact path={'/app/organization_management'} component={OrganizationHome}/>
                                <Route exact path={'/app/organization_management/organization_constructor_manage'} component={OrganizationConstructorManage}/>
                                <Route exact path={'/app/organization_management/edit_organization_information'} component={EditOrganizationInformation}/>
                                <Route exact path={'/app/organization_management/add_child_organization'} component={AddChildOrganization}/>

                                <Route exact path={'/app/staff_management'} component={StaffHome}/>
                                <Route exact path={'/app/staff_management/add_staff'} component={AddStaff}/>
                                <Route exact path={'/app/staff_management/staff_list_management'} component={StaffListManagement}/>

                                <Route exact path={'/app/working_hours_management/submit_working_hours'} component={SubmitWorkingHours}/>
                                <Route exact path={'/app/working_hours_management/working_hours_record'} component={WorkingHoursRecord}/>
                                <Route exact path={'/app/working_hours_management/review_working_hours'} component={ReviewWorkingHours}/>

                                <Route exact path={'/app/working_task_management/submit_working_task'} component={SubmitWorkingTask}/>
                                <Route exact path={'/app/working_task_management/detail_information'} component={DetailInformationOfTask}/>
                                <Route component={noMatch} />
                            </Switch>
                            {/*</PersistGate>*/}
                        </Provider>
                    </Content>
                    <Footer 
                                style={{
                                    textAlign: 'center', 
                                    color:"black",
                                    }}
                            >
                                <p style={{marginBottom:"0px"}}>公司地址：上海市杨浦区军工路516号上海理工大学</p>
                                <p style={{marginBottom:"0px"}}>联系电话：12345</p>
                                <p style={{marginBottom:"0px"}}>邮箱：12345@qq.com</p>
                            </Footer>
                </Layout>
            </Layout>
            </div>
        );
    }
}
