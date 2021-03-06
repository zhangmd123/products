import React, { Component } from 'react';
import { Button, Card, Table, Popconfirm, Tag, Input, Select, Checkbox, Form } from 'antd'
import { listApi, delOne, _getCategory } from '../../../http/api'
import { serverUrl } from '../../../utils/config'
import Store from '../../../context';
const { Option } = Select;
const proStatus = [
    { label: '在售', value: true },
    { label: '已下架', value: false }
];

class List extends Component {
    static contextType = Store;

    constructor(props, context) {
        super(props)
        this.state = {
            dataSource: [],
            paginationProps: { //设置分页属性
                total: 0,
                pageSize: context.page || 3,
                onChange: (current) => this.changePage(current),
            },
            filter: null,  //筛选条件
            options: [],   //获取所有的商品分类
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
                key: 'productCategory',
                dataIndex: 'productCategory',
                render: (txt, record) => <span>{record.productCategory ? record.productCategory.name : '暂无分类'}</span>
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
                                onClick={this.editProduct.bind(this, record._id)}
                            >编辑</Button>
                            <Popconfirm title="确认删除此项？" onCancel={() => console.log('用户取消删除')}
                                onConfirm={this.delOneProduct.bind(this, record._id)}>
                                <Button type="danger" size="small">删除</Button>
                            </Popconfirm>
                        </div>
                    )
                }
            },
        ];
    }
    //删除一条
    delOneProduct = (id) => {
        console.log('用户确认删除');
        delOne(id).then((res) => {
            console.log(res, '删除一条');
            this.getlist();
        });
    }

    //点击编辑
    editProduct = (id) => {
        // 跳转到edit页面，传递id作为参数
        this.props.history.push(`/admin/products/edit/${id}`);
    }

    //点击下一页
    changePage = (current) => {
        const { filter } = this.state;
        // console.log(current, filter, '下一页');
        this.context.onChangePageInfo({
            current: current
        })
        this.getlist({ page: current, per: this.state.paginationProps.pageSize, filter });
    }

    //点击筛选
    filterData = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values);
                this.setState(Object.assign(this.state, {
                    filter: values
                }))
                //发请求
                this.getlist({ page: 1, per: this.state.paginationProps.pageSize, filter: values });
                //回到第一页
                const pagination = Object.assign(this.state.paginationProps, {
                    current: 1
                })
                this.setState(Object.assign(this.state, {
                    paginationProps: pagination
                }))
            }
        })
    }

    render() {
        const { dataSource, paginationProps, options } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <Card title="商品列表" extra>
                <Form onSubmit={this.filterData} layout="inline" className="form">
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
                                    {
                                        options ? options.map((item, index) => {
                                            return (
                                                <Option value={item._id} key={item._id}>{item.name}</Option>
                                            )
                                        }) : ''
                                    }
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item label="商品状态：">
                            {getFieldDecorator('status', {
                                initialValue: [true, false]
                            })(
                                <Checkbox.Group
                                    options={proStatus}
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
                    onChange={this.loadData} pagination={Object.assign(paginationProps, { current: this.context.current })}
                ></Table>
            </Card>
        );
    }
    componentDidMount() {
        this.getlist({ page: this.context.current, per: this.state.paginationProps.pageSize });
        this.getCategory();
    }
    getlist = (param) => {
        listApi(param).then(res => {
            console.log(res);
            const state = this.state
            state.dataSource = res.products
            state.paginationProps.total = res.totalCount
            this.setState(state)
        })
            .catch(err => {
                console.log(err);
            })
    }
    //获取分类options
    getCategory = () => {
        _getCategory().then(res => {
            // console.log(res, '分类');
            this.setState(Object.assign(this.state, {
                options: res.categories
            }))
        })
    }
}

export default Form.create({})(List);
