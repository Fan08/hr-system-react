import React, {Component} from "react";
import { Dropdown, Tree, Icon } from 'antd';
import {connect} from 'react-redux';
import {actionCreators} from './store'

const { TreeNode } = Tree;

class OrganizationTree extends Component {
    constructor(props){
        super(props);
        const organization_structure = this.props.organization_structure;
        if (this.props.selected_inode=== null){
            this.props.dispatchSelectedName(organization_structure.get("name"));
            this.props.dispatchSelectedInode(organization_structure.get("inode"));
            this.props.dispatchSelectedType(organization_structure.get("type"));
        }
    };

    //遍历json绘制出tree结构
    mapData = (children, menu) => {
        if (children && Array.isArray(children)) {
            return children.map((ele) => {
                if (ele.children && Array.isArray(ele.children)) {
                    return (
                        <TreeNode
                            id="tree_node"
                            title={ele.name}
                            key={ele.inode}
                            inode={ele.inode}
                            type={ele.type}
                            icon={
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <Icon
                                        type="unordered-list"
                                        style={{fontSize:"15px"}}
                                    />
                                </Dropdown>
                            }
                        >
                            {this.mapData(ele.children, menu)}
                        </TreeNode>
                    )
                } else {
                    return (
                        <TreeNode
                            id="tree_node"
                            title={ele.name}
                            key={ele.inode}
                            inode={ele.inode}
                            type={ele.type}
                            icon={
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <Icon
                                        type="unordered-list"
                                        style={{fontSize:"15px"}}
                                    />
                                </Dropdown>
                            }
                        />
                    )
                }
            })
        }
        return []
    };

    treeNodeOnClick(selectedKeys, info){
        if (info !== null){
            const inode = info.node.props.inode;
            const name = info.node.props.title;
            const type = info.node.props.type;
            this.props.dispatchSelectedInode(inode);
            this.props.dispatchSelectedName(name);
            this.props.dispatchSelectedType(type);
        }
        else {
            this.props.dispatchSelectedInode(selectedKeys["inode"]);
            this.props.dispatchSelectedName(selectedKeys["name"]);
            this.props.dispatchSelectedType(selectedKeys["type"]);
        }
        // history.go(-1);
    }

    render() {
        const {menu} = this.props;
        let content = [];
        const {name, children, inode, type} = this.props.data;
        if (name) {
            content.push(
                <TreeNode
                    title={name}
                    type={type}
                    key="/"
                    inode={inode}
                    icon={
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Icon
                                type="unordered-list"
                                style={{fontSize:"15px"}}
                            />
                        </Dropdown>
                    }
                >
                    {this.mapData(children, menu)}
                </TreeNode>
            )
        }

        return (
                <Tree
                    showIcon
                    defaultExpandAll={true}
                    style={{fontSize: "18px",backgroundColor:'white', height: "67.1vh", width: "97%"}}
                    onSelect={
                        this.treeNodeOnClick.bind(this)
                    }
                >
                    {content}
                </Tree>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        organization_structure: state.get("common_store").get("organization_structure"),
        selected_name: state.get("common_store").get("selected_name"),
        selected_inode: state.get("common_store").get("selected_inode"),
        child_and_father: state.get("common_store").get("child_and_father").toJS(),
    }
};

const mapDispatchToProps=(dispatch)=>{
    return {
        dispatchSelectedInode(value){
            dispatch(actionCreators.dispatchSelectedInode(value))
        },
        dispatchSelectedName(value){
            dispatch(actionCreators.dispatchSelectedName(value))
        },
        dispatchSelectedType(value){
            dispatch(actionCreators.dispatchSelectedType(value))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationTree);