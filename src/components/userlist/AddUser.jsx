import React, { Component } from 'react';
import { Modal, Form, Input, Radio, Select, Button, InputNumber } from 'antd'
import { SuiEditor } from '@sudy/sui-react'
const FormItem = Form.Item;
const { Option } = Select

class AddUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                name: '',
                age: 0,
                sex: 0,
                school: "",
                desc: ""
            }
        }
    }

    //点击确定，弹窗关闭
    handleOk = () => {
        const user = this.props.form.getFieldsValue();
        this.props.closeModal({ user, bol: false });
    }

    handleCancel = () => {
        this.props.closeModal({ user: {}, bol: false });
    }

    // handleSubmit = e => { //提交表单
    //     e.preventDefault();
    //     this.props.form.validateFields((err, values) => {
    //         console.log(err);
    //         if (!err) {
    //             console.log('Received values of form: ', values);
    //         }
    //     });
    // }

    render() {
        // const { getFieldDecorator } = this.props.form;
        const { isShow, isEdit, form } = this.props
        const { getFieldDecorator } = form;
        const { user } = this.state;
        return (
            <div>
                <Modal title={isEdit ? "编辑用户" : "新建用户"} visible={isShow} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <Form layout="inline" className="form" onSubmit={this.handleSubmit}>
                        <FormItem label="姓名">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '必填' }],
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="年龄">
                            {getFieldDecorator('age', { rules: [{ required: true, message: '必填' }] })(<InputNumber />)}
                        </FormItem>
                        <FormItem label="性别">
                            {getFieldDecorator('sex', { initialValue: '男', rules: [{ required: true, message: '必填' }] })(
                                <Radio.Group>
                                    <Radio value='男'>男</Radio>
                                    <Radio value='女'>女</Radio>
                                </Radio.Group>,
                            )}
                        </FormItem>
                        <FormItem label="学校" className="select-school">
                            {getFieldDecorator('school', { rules: [{ required: true, message: '必填' }] })(
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="选择学校"
                                    allowClear
                                >
                                    <Option value="firstSchool">第一中学</Option>
                                    <Option value="secondSchool">第二中学</Option>
                                    <Option value="thirdSchool">第三中学</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="在校表现" className="editor">
                            {getFieldDecorator('desc', { initialValue: '', })(
                                <SuiEditor />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="submit">提交</Button>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default Form.create({})(AddUser);
