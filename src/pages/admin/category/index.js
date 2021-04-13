import { Card, Table, Button, Modal, Input, message, Popconfirm } from 'antd';
import React, { Component } from 'react';
import { _getCategory, _createCategory, _delCategory, _modifyCategory } from '../../../http/api'
import './index.less'

class Category extends Component {
    state = {
        dataSource: [],
        showModal: false,
        isAdd: true
    }
    columns = [
        {
            title: '分类ID',
            dataIndex: '_id',
        },
        {
            title: '分类名称',
            dataIndex: 'name',
        },
        {
            title: '操作',
            render: (txt, record, index) => {
                return (
                    <div style={{ width: "150px" }}>
                        <Button type="link" size="small" style={{ background: 'orange', margin: '0 10px', color: '#fff' }}
                            onClick={this.editOne.bind(this, record)}>编辑</Button>
                        <Popconfirm title="确认删除此项？" onCancel={() => console.log('用户取消删除')} onConfirm={this.delOne.bind(this, record._id)}>
                            <Button type="danger" size="small">删除</Button>
                        </Popconfirm>
                    </div>
                )
            }
        },
    ];

    addOne = () => {
        this.setState({
            showModal: true,
            inputValue: '',
            isAdd: true
        })
    }
    //点击删除
    delOne = (id) => {
        console.log('用户确认删除');
        _delCategory(id).then((res) => {
            console.log(res, '删除一条');
            this.getCategory();
        });
    }
    //点击修改
    editOne = (record) => {
        this.setState({
            showModal: true,
            inputValue: record.name,
            isAdd: false,
            id: record._id
        })
    }

    //点击取消
    handleCancel = e => {
        this.setState({
            showModal: false,
        });
    };

    //点击OK
    handleOk = () => {
        this.setState({
            showModal: false
        })
        const { inputValue, isAdd, id } = this.state;

        //发请求
        if (inputValue) {
            if (isAdd) {
                _createCategory({ name: inputValue }).then(res => {
                    message.success('添加成功');
                    this.getCategory();
                })
            } else {
                _modifyCategory(id, { name: inputValue }).then((res) => {
                    message.success('修改成功');
                    this.getCategory();
                });
            }
        }
    }

    inputChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }

    render() {
        const { showModal, dataSource, inputValue, isAdd } = this.state;
        return (
            <Card title="分类管理" className="category">
                <Button type="primary" style={{ margin: '0 0 10px 2px' }} onClick={this.addOne}>新增</Button>
                <Table rowKey="_id" columns={this.columns} dataSource={dataSource} bordered />
                <Modal
                    title={isAdd ? '新增' : '修改'}
                    visible={showModal}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p><Input placeholder="分类名称" onChange={this.inputChange} value={inputValue} /></p>
                </Modal>
            </Card>
        );
    }

    componentDidMount() {
        this.getCategory();
    }
    //获取列表
    getCategory() {
        _getCategory().then(res => {
            // console.log(res);
            this.setState({
                dataSource: res.categories
            })
        })
    }
}

export default Category;
