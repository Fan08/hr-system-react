import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import "../../style/index.less"
import logoPNG from "../../style/img/logo.png";


const { Sider } = Layout;
// const SubMenu = Menu.SubMenu;

export default class SiderCustom extends Component{
    constructor(props){
        super(props);
        const { collapsed }= props;
        this.state = {
            collapsed: collapsed,
            firstHide: true, //第一次先隐藏暴露的子菜单
            selectedKey: '', //选择的路径
            openKey: '', //打开的路径（选择的上一层）
        }
    }

    componentDidMount() {
        this.setMenuOpen(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.onCollapse(nextProps.collapsed);
        this.setMenuOpen(nextProps);
    }

    setMenuOpen = props => {
        const {path} = props;
        this.setState({
            openKey: path.substr(0, path.lastIndexOf('/')),
            selectedKey: path
        });
    };

    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            firstHide: collapsed,
        });
    };

    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
    };

    openMenu = v => {
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    };

    render(){
        const { collapsed, firstHide, openKey, selectedKey } = this.state;
        return(
            <Sider
                trigger={null}
                collapsed={collapsed}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}
            >
                {/*<div className="logo"*/}
                {/*     style={{*/}
                {/*         height: 50,*/}
                {/*         background:`url("${logoPNG}") no-repeat center center`,*/}
                {/*         borderRadius: 6,*/}
                {/*         margin: 16,*/}
                {/*     }}/>*/}
                     <img
                         src={logoPNG}
                         style={{width:200}}
                        alt={"logo"}
                     />
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    onClick={this.menuClick}
                    onOpenChange={this.openMenu}
                    openKeys={firstHide ? null : [openKey]}
                >
                    <Menu.Item key={"/app"}>
                        <Link to={"/app"}><Icon type="home" /><span>首页</span></Link>
                    </Menu.Item>
                    <Menu.Item key={"/app/organization_management"}>
                        <Link to={"/app/organization_management"}>
                            <span><Icon type="api" /><span>组织管理</span></span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={"/app/staff_management"}>
                        <Link to={"/app/staff_management"}>
                            <span><Icon type="api" /><span>人员管理</span></span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={"/app/working_hours_management/working_hours_record"}>
                        <Link to={"/app/working_hours_management/working_hours_record"}>
                            <span><Icon type="api" /><span>工时管理</span></span>
                        </Link>
                    </Menu.Item>
                    {/*<SubMenu key="/app/working_hours_management" title={<span><Icon type="property-safety" /><span>工时管理</span></span>}>*/}
                    {/*    <Menu.Item key="/app/working_hours_management/submit_working_hours">*/}
                    {/*        <Link to={'/app/working_hours_management/submit_working_hours'}><Icon type="edit" /><span>提交工时</span></Link>*/}
                    {/*    </Menu.Item>*/}
                    {/*    <Menu.Item key="/app/hours_management/allowance_record">*/}
                    {/*        <Link to={'/app/hours_management/allowance_record'}><Icon type="edit" /><span>津贴记录</span></Link>*/}
                    {/*    </Menu.Item>*/}
                    {/*    <Menu.Item key="/app/hours_management/review_allowance">*/}
                    {/*        <Link to={'/app/hours_management/review_allowance'}><Icon type="edit" /><span>津贴审核</span></Link>*/}
                    {/*    </Menu.Item>*/}
                    {/*    <Menu.Item key="/app/hours_management/apply_allowance">*/}
                    {/*        <Link to={'/app/hours_management/apply_allowance'}><Icon type="edit" /><span>津贴申请</span></Link>*/}
                    {/*    </Menu.Item>*/}
                    {/*</SubMenu>*/}
                </Menu>
            </Sider>
        )
    }
}