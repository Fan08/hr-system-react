import {Menu} from "antd";
import {Link} from "react-router-dom";
import React from "react";

export const menu = (
    <Menu>
        <Menu.Item key="0">
            <Link to={"/app/organization_management/organization_constructor_manage"}>组织结构管理</Link>
        </Menu.Item>
        <Menu.Item key="2">
            <Link to={"/app/organization_management/edit_organization_information"}>组织信息编辑</Link>
        </Menu.Item>
        <Menu.Item key="1">
            角色管理
        </Menu.Item>
        <Menu.Item key="3">
            <Link to={"/app/organization_management/add_child_organization"}>新建子组织</Link>
        </Menu.Item>
    </Menu>
);