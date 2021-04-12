import React, { Component } from 'react';
import { Button, Card, Table, Popconfirm, Tag, Input, Select, Checkbox, Form } from 'antd'
import { listApi, delOne } from '../../../http/api'
import { serverUrl } from '../../../utils/config'
const { Option } = Select;
const options = [
    { label: '在售', value: true },
    { label: '已下架', value: false },
];

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            paginationProps: { //设置分页属性
                total: 0,
                pageSize: 3,
                onChange: (current) => this.changePage(current),
                current: 1
            },
            filter: null  //筛选条件
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
                title: '分类',
                key: 'categoryID',
                dataIndex: 'categoryID',
                render: (txt, record) => {
                    if (record.categoryID === '101') {
                        return '水果'
                    } else if (record.categoryID === '102') {
                        return '蔬菜'
                    } else if (record.categoryID === '103') {
                        return '生活用品'
                    }
                }
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
    changePage = (current) => {
        const { filter } = this.state;
        console.log(current, filter, '下一页');
        this.getlist({ page: current, per: 3, filter });
    }
    //点击筛选
    filterData = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values);
                this.setState({
                    filter: values
                })
                //发请求
                this.getlist({ page: 1, per: 3, filter: values });
                //回到第一页
                this.setState({
                    paginationProps: {
                        current: 1
                    }
                })
            }
        })
    }

    render() {
        const { dataSource, paginationProps } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <Card title="商品列表" extra>
                <Form onSubmit={this.filterData} layout="inline">
                    <div className="filter">
                        <Form.Item label="价格区间(元)：" className="price">
                            {getFieldDecorator('lowerPrice', {
                            })(<Input placeholder="最低价" />)}
                        </Form.Item>
                        <Form.Item className="price">
                            {getFieldDecorator('highPrice', {
                            })(<Input placeholder="最高价" />)}
                        </Form.Item>

                        <Form.Item label="分类">
                            {getFieldDecorator('categoryArr')(
                                <Select
                                    style={{ width: 200 }}
                                    showSearch
                                    placeholder="请选择分类"
                                    onChange={this.onSelectChange}
                                    mode="multiple"
                                >
                                    <Option value="101">水果</Option>
                                    <Option value="102">蔬菜</Option>
                                    <Option value="103">生活用品</Option>
                                </Select>
                            )}
                        </Form.Item>
                        <Form.Item label="商品状态：">
                            {getFieldDecorator('status', {
                                initialValue: [true, false]
                            })(
                                <Checkbox.Group
                                    options={options}
                                />
                            )}
                        </Form.Item>
                        <Form.Item style={{ margin: '5px 30px 0 45px' }}>
                            <Button htmlType="submit" type="primary">筛选</Button>
                        </Form.Item>
                    </div>
                </Form>
                <div className="addNew">
                    <Button type="primary" onClick={() => this.props.history.push('/admin/products/edit')}>新增</Button>
                </div>

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
    getlist = (param) => {
        listApi(param).then(res => {
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

export default Form.create({})(List);
