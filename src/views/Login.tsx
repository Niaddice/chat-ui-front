import 'antd/dist/antd.css';
import './login.css'
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input} from 'antd';
import React from 'react';
import {post} from '@/utils/axios'
import {useHistory} from "react-router-dom";
import {message} from 'antd';
import reactCookie from 'universal-cookie';

const cookies = new reactCookie();
const Login = () => {
    const history = useHistory();

    const onFinish = (values: any) => {
        post('/api/sso/login', values).then((r: any) => {
            if (r.code === 200) {
                var tomorrow = new Date();
                tomorrow.setDate(new Date().getDate() + 1);
                cookies.set('token', r.data.token, {expires: tomorrow})
                localStorage.setItem("username", r.data.name)
                history.push('/chat')
            } else {
                message.error(r.msg);
            }
        })
    };

    return (
        <Form name="normal_login" className="login-form" initialValues={{remember: true,}} onFinish={onFinish}>
            <div className="logo">
                <span>SWS小衡</span>
            </div>
            <Form.Item name="username" rules={[{required: true, message: '请输入手机号!',},]}>
                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="账号"/>
            </Form.Item>
            <Form.Item name="password" rules={[{required: true, message: '请输入密码！',},]}>
                <Input prefix={<LockOutlined className="site-form-item-icon"/>} type="password" placeholder="密码"/>
            </Form.Item>
            {/*<Form.Item>*/}
            {/*    <Form.Item name="remember" valuePropName="checked" noStyle>*/}
            {/*        <Checkbox>记住账号</Checkbox>*/}
            {/*    </Form.Item>*/}
            {/*    <a className="login-form-forgot" href="">忘记密码</a>*/}
            {/*</Form.Item>*/}

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            </Form.Item>
        </Form>
    );
};

export default Login;
