import React, { Component } from 'react';
import { Button, Card, Table, Popconfirm, Tag } from 'antd'
import { listApi, delOne } from '../../../http/api'
import { serverUrl } from '../../../utils/config'
/* const dataSource = [
    {
        id: 1,
        key: 1,
        name: '干脆面',
        price: 3
    },
    {
        id: 2,
        key: 2,
        name: '桃子',
        price: 13
    },
    {
        id: 3,
        key: 3,
        name: '苹果',
        price: 9.9
    },
] */

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            paginationProps: { //设置分页属性
                total: 0,
                pageSize: 3,
                onChange: (current) => this.changePage(current),
            }
        }
        this.columns = [
            {
                title: '序号',
                key: '_id',
                width: 80,
                align: 'center',
                render: (txt, record, index) => index + 1
            },
            {
                title: '名字',
                key: 'name',
                dataIndex: 'name',
            },
            {
                title: '主图',
                dataIndex: 'coverImg',
                render: (txt, record) => record.coverImg ? <img src={serverUrl + record.coverImg} alt={record.name} /> : "暂无图片"
            },
            {
                title: '价格',
                key: 'price',
                dataIndex: 'price',
            },
            {
                title: "是否在售",
                dataIndex: "onSale",
                render: (txt, record) => record.onSale ? <Tag color="blue">在售</Tag> : <Tag color="red">已下架</Tag>
            },
            {
                title: '操作',
                render: (txt, record, index) => {
                    return (
                        <div>
                            <Button type="link" size="small" style={{ background: 'orange', margin: '0 10px', color: '#fff' }}
                                onClick={() => {
                                    // 跳转到edit页面，传递id作为参数
                                    this.props.history.push(`/admin/products/edit/${record._id}`);
                                }}
                            >编辑</Button>
                            <Popconfirm title="确认删除此项？" onCancel={() => console.log('用户取消删除')} onConfirm={
                                () => {
                                    console.log('用户确认删除');
                                    //调接口
                                    delOne(record._id).then((res) => {
                                        console.log(res, '删除一条');
                                        this.getlist();
                                    });
                                }
                            }>
                                <Button type="danger" size="small">删除</Button>
                            </Popconfirm>
                        </div>
                    )
                }
            },
        ];
    }
    //点击下一页
    changePage = current => {
        // console.log(current);
        this.getlist({ page: current, per: 3 });
    }

    render() {
        const { dataSource, paginationProps } = this.state;
        return (
            <Card title="商品列表" extra={<Button type="primary" size="small" onClick={() => this.props.history.push('/admin/products/edit')}>新增</Button>}>
                <Table rowKey="_id" columns={this.columns} bordered dataSource={dataSource}
                    onChange={this.loadData} pagination={paginationProps}
                ></Table>
                <div>
                    {this.dataSource}
                </div>
            </Card>
        );
    }
    componentDidMount() {
        this.getlist({ page: 1, per: 3 });
    }
    getlist = (current) => {
        listApi(current).then(res => {
            console.log(res);
            this.setState({
                dataSource: res.products,
                paginationProps: {
                    total: res.totalCount
                }
            })
        })
            .catch(err => {
                console.log(err);
            })
    }
}

export default List;
