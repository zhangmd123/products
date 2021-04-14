import React, { Component } from 'react';
import { Form, Card, Input, Button, message, Icon, Upload, Radio, Select } from 'antd';
import { createApi } from '../../../http/api';
import { getOneById, modifyOne, _getCategory } from '../../../http/api'
import { serverUrl } from '../../../utils/config'
const FormItem = Form.Item;
const { Option } = Select;

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: {
                coverImg: '',
                onSale: true,
                productCategory: '',
                options: []
            },
            loading: false,
            defaultSelectValue: ''
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const id = this.props.match.params.id;
        const { coverImg } = this.state.products;
        console.log(this.props, 'this.props');
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log(values, '提交');
                //调用接口
                if (id) {
                    modifyOne(id, { ...values, coverImg }).then(res => {
                        console.log(res, '编辑');
                        message.info('修改成功');
                        this.props.history.go(-1);
                    })
                        .catch(err => {
                            message.error('修改失败')
                        })

                } else {
                    createApi({ ...values, coverImg }).then(res => {
                        console.log(res, '新增');
                        message.info('添加成功');
                        this.props.history.go(-1);
                    })
                        .catch(err => {
                            message.error('添加失败')
                        })
                }
            }
            else {
                message.error('请输入正确的内容');
            }
        });
    }

    //上传图片
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {  //上传成功
            this.setState({ loading: false });
            console.log(info);
            this.setState({
                products: {
                    ...this.state.products,
                    coverImg: info.file.response.info
                }
            })
        }
    };

    //商品上架
    handleRadioChange = e => {
        console.log(e.target.value);
        //设置onSale的值
        this.setState({
            products: {
                ...this.state.products,
                onSale: e.target.value
            }
        })
    }

    //选择商品分类
    onSelectChange = (value) => {
        // console.log(`selected ${value}`);
        this.setState({
            products: {
                ...this.state.products,
                productCategory: value
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { name, price, coverImg, onSale, options } = this.state.products;
        const { defaultSelectValue } = this.state;
        const id = this.props.match.params.id;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        //价格处理
        const priceValidator = (rule, value, callback) => {
            let reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;//整数or两位小数
            if (!reg.test(value) && value) {
                callback('输入格式不正确');
            } else {
                callback();
            }
        }

        return (
            <Card title={id ? "编辑商品" : "新增商品"} className="product-edit">
                <Form onSubmit={this.handleSubmit} layout="inline">
                    <div>
                        <FormItem label="名字">
                            {getFieldDecorator('name', {
                                rules: [
                                    { required: true, message: '请输入商品名字' }],
                                initialValue: name
                            }
                            )(<Input placeholder="请输入商品名字" />)}
                        </FormItem>
                        <FormItem label="价格">
                            {getFieldDecorator('price', {
                                rules: [
                                    { required: true, message: '请输入商品价格' },
                                    { validator: priceValidator }
                                ],
                                initialValue: price
                            }
                            )(<Input placeholder="请输入商品价格" />)}
                        </FormItem>
                    </div>

                    <FormItem label="主图" className="upload-img" style={{ display: 'block', marginTop: '30px' }}>
                        <Upload
                            name="file"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={serverUrl + '/api/v1/common/file_upload'}
                            onChange={this.handleChange}
                        >
                            {coverImg ? <img src={serverUrl + coverImg} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </FormItem>

                    {/*上架*/}
                    <FormItem label="商品状态">
                        {getFieldDecorator('onSale', {
                            rules: [
                                { required: true, message: '必选' },
                            ],
                            initialValue: onSale
                        })
                            (<Radio.Group onChange={this.handleRadioChange}>
                                <Radio value={true}>上架</Radio>
                                <Radio value={false}>下架</Radio>
                            </Radio.Group>)}
                    </FormItem>

                    {/* 选择分类 */}
                    <FormItem style={{ display: 'block', margin: '30px 0' }} label="商品分类">
                        {getFieldDecorator('productCategory', { initialValue: defaultSelectValue })
                            (<Select
                                allowClear
                                style={{ width: 200 }}
                                showSearch
                                placeholder="选择分类"
                                onChange={this.onSelectChange}
                            >
                                {
                                    options ? options.map((item, index) => {
                                        return (
                                            <Option value={item._id} key={item._id}>{item.name}</Option>
                                        )
                                    }) : ''
                                }
                            </Select>)}
                    </FormItem>
                    <FormItem style={{ display: 'block', margin: '30px 50px' }}>
                        <Button htmlType="submit" type="primary">保存</Button>
                    </FormItem>
                </Form>
            </Card>
        );
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        if (id) {
            getOneById(id).then(res => {
                console.log(res, 'getOneById');
                //获取数据库中的数据并且赋值
                this.setState({
                    products: res,
                    defaultSelectValue: res.productCategory
                })
            });
            this.getCategory();
        } else {
            this.getCategory();
        }
    }
    //获取分类options
    getCategory = () => {
        _getCategory().then(res => {
            console.log(res, '分类');
            this.setState({
                products: {
                    ...this.state.products,
                    options: res.categories
                }
            })
        })
    }

}
export default Form.create({ name: 'productEdit' })(Edit);
