import React from 'react';
import List from './products/List';
import { Route, Switch } from 'react-router-dom'
import Edit from './products/Edit';
import Index from './dashboard';
import Category from './category'
import { Layout, Menu, Icon, Dropdown, Avatar, message } from 'antd';
import { isLogined } from '../../utils/auth'
import { Redirect, withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { getToken, clearToken } from '../../utils/auth'
import './Frame.less'
import { _getManager } from '../../http/api';
const { Header, Content, Sider } = Layout;


function Frame(props) {
    console.log(isLogined());
    //处理导航菜单选中
    let path = [];
    switch (props.location.pathname) {
        case '/admin': path = ['1']; break;
        case '/admin/products': path = ['2']; break;
        case '/admin/category': path = ['3']; break;
        default: path = []
    }
    
    //获取超级管理员
    _getManager().then(res => {
    }).catch(err => {
        props.history.push('/login');
    })

    //下拉菜单
    const popMenu = (
        <Menu onClick={(p) => {
            if (p.key === 'logout') {
                clearToken();  //清除token
                props.history.push('/login')
            } else {
                message.info(p.key);
            }

        }}>
            <Menu.Item key="notice">通知中心</Menu.Item>
            <Menu.Item key="setting">设置</Menu.Item>
            <Menu.Item key="logout">退出</Menu.Item>
        </Menu>
    )
    return (
        isLogined() ?
            (
                <Layout>
                    <Header className="header">
                        <div className="logo" >
                            后台管理
                         </div>
                        <Dropdown overlay={popMenu}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                <Avatar size="small" icon="user" /> 你好，{getToken()} <Icon type="down" />
                            </a>
                        </Dropdown>
                    </Header>
                    <Layout>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                selectedKeys={path}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                <Menu.Item key="1" onClick={() => props.history.push('/admin')} ><Icon type="area-chart" />看板</Menu.Item>
                                <Menu.Item key="2" onClick={() => props.history.push('/admin/products')} ><Icon type="shop" />商品管理</Menu.Item>
                                <Menu.Item key="3" onClick={() => props.history.push('/admin/category')} ><Icon type="appstore" />分类管理</Menu.Item>
                            </Menu>

                        </Sider>
                        <Layout style={{ padding: '10px' }}>
                            {/* <Breadcrumb style={{ margin: '16px 0' }}>
                                <Breadcrumb.Item>Home</Breadcrumb.Item>
                                <Breadcrumb.Item>List</Breadcrumb.Item>
                                <Breadcrumb.Item>App</Breadcrumb.Item>
                           </Breadcrumb> */}
                            <Content
                                style={{
                                    background: '#fff',
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >

                                <Switch>
                                    <Route path="/admin/products" exact component={List}></Route>
                                    <Route path="/admin/category" exact component={Category}></Route>
                                    <Route path='/admin/products/edit/:id?' component={Edit}></Route>
                                    <Route path="/admin" component={Index}></Route>
                                </Switch>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout >
            ) : (
                <Redirect to="/login" />
            )
    );
}

export default withRouter(Frame);
