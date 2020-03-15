import { Table } from 'antd';
import React, {Component} from "react";

const columns = [
    {
        title: '人员编号',
        dataIndex: 'inode',
        key: 'inode',
    },
    {
        title: '人员姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '总工时',
        dataIndex: 'total_working_hours',
        key: 'total_working_hours',
    },
    {
        title: '单价',
        key: 'unit_price',
        dataIndex: 'unit_price',
    },
    {
        title: '总价',
        key: 'total_price',
        dataIndex: 'total_price',
    },
];

export default class ModalTable extends Component{
    render() {
        const {staff_hours_statistics} = this.props;
        return(
            <Table
                columns={columns}
                dataSource={staff_hours_statistics}
                rowKey={record => record["inode"]}
            />)
    }
}