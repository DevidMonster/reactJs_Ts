import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Card, Form, Input } from 'antd';
import { IUserSignUp } from "../types/user";
import { Link } from "react-router-dom";

interface IProps {
    signUp(value: IUserSignUp): void
}

interface IFormInput {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: "user" | "admin"
}

const Register = (props: IProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
    const [form] = Form.useForm()
    const onHandSubmit: SubmitHandler<IFormInput> = async (data: IUserSignUp): Promise<void> => {
        props.signUp(data)
    }
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    const onFinish: SubmitHandler<IFormInput> = async (values: IUserSignUp): Promise<void> => {
        props.signUp(values)
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const validateConfirmPassword = (_: any, value: any) => {
        const password = form.getFieldValue('password');
        if (value !== password) {
            return Promise.reject(new Error('The two passwords that you entered do not match!'));
        }
        return Promise.resolve();
    };
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Register</h1>
            <Card style={{ width: '40%', margin: '0 auto', padding: '20px' }}>
                <Form
                    form={form}
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
                        label="UserName"
                        {...register('name')}
                        rules={[{ required: true, message: `bạn phải nhập user name` }]}
                        validateStatus={errors.name ? "error" : ""}
                    >
                        <Input size="large" />
                    </Form.Item>
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
                    <Form.Item
                        label="ConfirmPassword"
                        {...register('confirmPassword')}
                        dependencies={['password']}
                        rules={[{ required: true, message: `bạn phải xác nhận lại password` }, { validator: validateConfirmPassword },]}
                        validateStatus={errors.confirmPassword ? "error" : ""}
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
                            <Link to={"/Login"}>Login</Link>
                        </span>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Register