import React, { Component } from 'react';
import { Layout, Icon, Menu } from 'antd';
// import { Link } from 'react-router-dom';
import history from './history';
import {removeCookie} from "../../helpers/cookies";

const { Header } = Layout;
const SubMenu = Menu.SubMenu;

function nowTime(){
    const date = new Date();
    const seperator1 = "-";
    const seperator2 = ":";
    const month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
    const strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
    const strHours = date.getHours()<10?'0' + date.getHours():date.getHours();
    const strSeconds = date.getSeconds()<10?'0' + date.getSeconds():date.getSeconds();
    const strMinutes = date.getMinutes()<10?'0' + date.getMinutes():date.getMinutes();
    const currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
        + " "  + strHours  + seperator2  + strMinutes + seperator2 + strSeconds;
    return currentdate
}

export default class HeaderCustom extends Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed: props.collapsed,
            date: nowTime()
        }
        this.logout = this.logout.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        this.onCollapse(nextProps.collapsed);
    }
    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
        });
    };
    logout(){
        removeCookie("mspa_user");
        history.push('/login');
    }

    //setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: nowTime()
        });
    }

    render(){
        return(
            <Header style={{ background: '#fff', padding: 0, fontSize: "1.2vw", height:"9vh"}} className="header">
                {/*<Icon*/}
                {/*className="trigger"*/}
                {/*type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}*/}
                {/*onClick={this.props.toggle}*/}
                {/*/>*/}
                <p style={{ marginLeft:"3%", display:'inline-block', lineHeight:"9vh", float:'left'}}>HR系统</p>
                <p style={{ float:'right', display:'inline-block', marginRight:"2vw", lineHeight:"9vh"}}>
                    {this.state.date.toLocaleString()}
                </p>
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '9vh', float: 'right' }}
                >
                    {/*<Menu.Item key="schedule">*/}
                    {/*    <Link to="/app/header/Calendars">*/}
                    {/*        <Badge count={3} overflowCount={99} style={{height:'15px',lineHeight:'15px'}}>*/}
                    {/*            <Icon type="schedule" style={{fontSize:"1vw", color: '#1DA57A' }}/>*/}
                    {/*        </Badge>*/}
                    {/*    </Link>*/}
                    {/*</Menu.Item>*/}
                    <SubMenu 
                        title={<span style={{fontSize:"1vw"}}>
                            <Icon type="user" style={{fontSize:"1vw", color: '#1DA57A' }}/>{this.props.username}
                        </span>}
                        >
                        <Menu.Item key="logout" style={{textAlign:'center'}} className="logout">
                            <span onClick={this.logout}>退出登录</span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Header>
        )
    }
} 