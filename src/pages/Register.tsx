import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Form, Input } from 'antd';
import { IUserSignUp } from "../types/user";

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
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Register</h1>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600, margin: '0 auto' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                validateMessages={validateMessages}
            >
                <Form.Item
                    label="UserName"
                    {...register('name')}
                    rules={[{ required: true }]}
                    validateStatus={errors.name ? "error" : ""}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    {...register('email')}
                    rules={[{ type: "email", required: true }]}
                    validateStatus={errors.email ? "error" : ""}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    {...register('password')}
                    rules={[{ required: true, message: `bạn phải nhập password` }]}
                    validateStatus={errors.password ? "error" : ""}
                >
                    <Input.Password />

                </Form.Item>
                <Form.Item
                    label="ConfirmPassword"
                    {...register('confirmPassword')}
                    rules={[{ required: true, message: `bạn phải nhập lại password` }]}
                    validateStatus={errors.confirmPassword ? "error" : ""}
                >
                    <Input.Password />
                </Form.Item>
                {/* 
                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item> */}

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register