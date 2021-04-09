import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Card, message } from 'antd';
import './Login.less'
import { setToken } from '../utils/auth';
import { loginApi } from "../http/api"

class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log(values);
                const { username, password } = values;
                loginApi({ userName: username, password }).then(res => {
                    // console.log(res);
                    if (res.code === 'success') {
                        setToken(res.token);  //存储token
                        message.success('登录成功');
                        this.props.history.push('/admin');//跳转首页
                    } else {
                        message.error(res.message);
                    }
                })
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Card className="login-form">
                <Form onSubmit={this.handleSubmit} >
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入用户名' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item className="login">
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>记住我</Checkbox>)}

                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default Form.create({ name: 'loginForm' })(Login);
