import {Menu} from "antd";
import {Link} from "react-router-dom";
import React from "react";

export const menu = (
    <Menu>
        <Menu.Item key="0">
            <Link to={"/app/working_hours_management/working_hours_record"}>津贴记录</Link>
        </Menu.Item>
        <Menu.Item key="1">
            <Link to={"/app/working_hours_management/submit_working_hours"}>津贴申请</Link>
        </Menu.Item>
        <Menu.Item key="2">
            <Link to={"/app/working_hours_management/review_working_hours"}>津贴审核</Link>
        </Menu.Item>
    </Menu>
);