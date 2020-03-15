import {Menu} from "antd";
import {Link} from "react-router-dom";
import React from "react";

export const menu = (
    <Menu>
        <Menu.Item key="1">
            <Link to={"/app/staff_management"}>人员名单</Link>
        </Menu.Item>
        <Menu.Item key="0">
            <Link to={"/app/staff_management/staff_list_management"}>人员组成管理</Link>
        </Menu.Item>
        <Menu.Item key="3">
            <Link to={"/app/staff_management/add_staff"}>新建人员</Link>
        </Menu.Item>
    </Menu>
);