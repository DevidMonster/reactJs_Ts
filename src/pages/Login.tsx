import { useForm, SubmitHandler } from "react-hook-form";
import { IUserLogin } from '../types/user'
import { Button, Card, Form, Input } from 'antd';
import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";

interface IProps {
    login(value: IUserLogin): void
}

interface IFormInput {
    email: string,
    password: string
}

const Login = (props: IProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
        mode: 'onBlur'
    })

    const onHandSubmit: SubmitHandler<IFormInput> = async (data: IUserLogin): Promise<void> => {
        //props.login(data)

        //console.log('Success:', values);
    }

    const onFinish: SubmitHandler<IFormInput> = async (values: IUserLogin): Promise<void> => {
        props.login(values)
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    console.log(errors)
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
        }
    };
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Login</h1>
            <Card style={{ width: '40%', margin: '0 auto', padding: '20px' }}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    style={{ width: '100%', margin: '0 auto' }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                    size="large"
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        label="Email"
                        {...register('email')}
                        rules={[{ type: "email", required: true, message: `bạn phải nhập email` }]}
                        validateStatus={errors.email ? "error" : ""}
                    >
                        <Input size="large" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        {...register('password')}
                        rules={[{ required: true, message: `bạn phải nhập password` }]}
                        validateStatus={errors.password ? "error" : ""}
                    >
                        <Input.Password size="large" />
                    </Form.Item>
                    {/* 
                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item> */}

                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <span style={{ marginLeft: '10px' }}>
                            <Link to={"/register"}>Register</Link>
                        </span>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Login