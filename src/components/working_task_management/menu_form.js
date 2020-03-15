/*
 * @Descripttion: 
 * @version: 
 * @Author: 唐帆
 * @Date: 2020-03-14 15:36:16
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-03-15 15:59:31
 */
import {Menu} from "antd";
import {Link} from "react-router-dom";
import React from "react";

export const menu = (
    <Menu>
        <Menu.Item key="0">
            <Link to={"/app/working_task_management/detail_information"}>任务详情</Link>
        </Menu.Item>
        <Menu.Item key="1">
            <Link to={"/app/working_task_management/submit_working_task"}>任务分配</Link>
        </Menu.Item>
    </Menu>
);