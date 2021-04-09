import React, { Component } from 'react';
import { Table, Button } from 'antd';
import './index.less'
import AddUser from './AddUser'
import { _userlist } from '../../http/api'
class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isShow: false,
            isEdit: false,
        }
        this.nid = 10;
        this.key = 10

        this.columns = [
            { title: '编号', dataIndex: 'nid', key: 'nid', width: '8%' },
            { title: '姓名', dataIndex: 'name', key: 'name', width: '15%' },
            { title: '性别', dataIndex: 'sex', key: 'sex', width: '10%' },
            { title: '年龄', dataIndex: 'age', key: 'age', width: '15%', },
            { title: '学校', dataIndex: 'school', key: 'school', width: '15%' },
            { title: '在校表现', dataIndex: 'desc', key: 'desc', width: '20%' },
            {
                title: '操作', dataIndex: '', key: 'operation', width: '32%',
                render: (text, record, index) => (
                    <span>
                        <Button>编辑</Button>
                        <Button>删除</Button>
                    </span>
                )
            },
        ];
    }
    //添加用户
    addPerson = () => {
        this.setState({
            isShow: true
        })
    }
    //关闭窗口
    closeModal = (val) => {
        let obj = val.user;
        obj.nid = this.nid++;
        obj.key = this.key++;
        this.state.data.push(obj);
        console.log(obj, 'obj');
        this.setState({
            ...this.state,
            isShow: val.bol
        })
    }


    render() {
        const { data, isShow, isEdit } = this.state
        return (
            <div className="list">
                <Button type="primary" onClick={this.addPerson}>添加</Button>
                <Table columns={this.columns} dataSource={data}></Table>
                <AddUser isShow={isShow} isEdit={isEdit} closeModal={this.closeModal}></AddUser>
            </div>
        );
    }
    componentDidMount() {
        this.getuserlist();
    }
    getuserlist() {
        _userlist().then(res => {
            // console.log(res);
            this.setState({
                data: res.data
            })
        })
    }
}

export default List;
